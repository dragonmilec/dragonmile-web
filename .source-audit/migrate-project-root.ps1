$ErrorActionPreference = 'Stop'
$workspace = [IO.Path]::GetFullPath('C:\Users\c2715\dragonmile-web')
$project = Join-Path $workspace 'redesign'
function Assert-InWorkspace([string]$candidate) {
    $absolute = [IO.Path]::GetFullPath($candidate)
    if (-not $absolute.StartsWith($workspace + [IO.Path]::DirectorySeparatorChar, [StringComparison]::OrdinalIgnoreCase)) {
        throw "Target escapes workspace: $absolute"
    }
    if (Test-Path -LiteralPath $absolute) {
        $resolved = (Resolve-Path -LiteralPath $absolute).ProviderPath
        if (-not $resolved.StartsWith($workspace + [IO.Path]::DirectorySeparatorChar, [StringComparison]::OrdinalIgnoreCase)) {
            throw "Resolved target escapes workspace: $resolved"
        }
    }
    return $absolute
}
$null = Assert-InWorkspace $project
if (-not (Test-Path -LiteralPath (Join-Path $project 'package.json'))) { throw 'The redesign project is missing.' }

# Preserve source evidence and the retired partial Git cache without touching root .git.
$audit = Assert-InWorkspace (Join-Path $workspace '.source-audit')
$childAudit = Assert-InWorkspace (Join-Path $project '.source-audit')
if (Test-Path -LiteralPath $childAudit) {
    foreach ($entry in Get-ChildItem -LiteralPath $childAudit -Force) {
        $destination = Assert-InWorkspace (Join-Path $audit $entry.Name)
        if (Test-Path -LiteralPath $destination) { throw "Audit collision: $destination" }
        Move-Item -LiteralPath (Assert-InWorkspace $entry.FullName) -Destination $destination
    }
    Remove-Item -LiteralPath $childAudit
}
$childGit = Assert-InWorkspace (Join-Path $project '.git')
if (Test-Path -LiteralPath $childGit) {
    $gitCache = Assert-InWorkspace (Join-Path $audit 'retired-redesign-git')
    if (Test-Path -LiteralPath $gitCache) { throw 'Retired Git cache already exists.' }
    Move-Item -LiteralPath $childGit -Destination $gitCache -Force
}
$verification = Assert-InWorkspace (Join-Path $workspace 'googleebae894bf230a7a3.html')
if (Test-Path -LiteralPath $verification) {
    Move-Item -LiteralPath $verification -Destination (Assert-InWorkspace (Join-Path $project 'public\googleebae894bf230a7a3.html'))
}

# These are the old exported WordPress layouts explicitly requested for deletion.
$legacyNames = @(
    '2022','2024','2026','404','about-us','category','comments','contact-us',
    'elementor-1014','feed','products-2','simply-static-1-1769745651',
    'simply-static-1-1769749891','simply-static-1-1769752269','wp-content',
    'wp-includes','服務項目','資質認證'
)
$removed = @()
$pending = @()
foreach ($name in $legacyNames) {
    $target = Assert-InWorkspace (Join-Path $workspace $name)
    if (Test-Path -LiteralPath $target) {
        try {
            Remove-Item -LiteralPath $target -Recurse -Force
            $removed += $name
        } catch { $pending += $target }
    }
}
$moved = @()
foreach ($entry in Get-ChildItem -LiteralPath $project -Force) {
    $source = Assert-InWorkspace $entry.FullName
    $destination = Assert-InWorkspace (Join-Path $workspace $entry.Name)
    if ((Test-Path -LiteralPath $destination) -and $entry.Name -ne 'index.html') { throw "Destination exists: $destination" }
    Move-Item -LiteralPath $source -Destination $destination -Force
    $moved += $entry.Name
}
if (@(Get-ChildItem -LiteralPath $project -Force).Count -ne 0) { throw 'redesign is not empty.' }
Remove-Item -LiteralPath $project
foreach ($target in $pending) {
    try { Remove-Item -LiteralPath (Assert-InWorkspace $target) -Recurse -Force }
    catch { Write-Warning "Legacy path still in use: $target" }
}
[pscustomobject]@{ RemovedLegacyDirectories = $removed.Count; MovedProjectEntries = $moved.Count; Root = $workspace; RemainingLegacyPaths = @($pending | Where-Object { Test-Path -LiteralPath $_ }) } | ConvertTo-Json

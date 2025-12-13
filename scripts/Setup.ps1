# Set up project for the first time after , or set it back to the initial first unused state.
param(
    [switch]$GitClean
)

. $PSScriptRoot\Write-Status.ps1
$project_root = Split-Path $PSScriptRoot
$node_root = $project_root

if ($GitClean) {
    Write-Status "Running 'git clean -df'"
    & git clean -df
}

# Remove local state if it exists
$node_modules = Join-Path $node_root "node_modules"
if (Test-Path $node_modules) {
    Write-Status "Removing $node_modules"
    Remove-Item -Recurse -Force -Path $node_modules
}

. $PSScriptRoot\Bootstrap.ps1 -Verbose
# Run npm install a second time because npm produces inconsistent
# package-lock.json files on first run
. $PSScriptRoot\Invoke-Npm install

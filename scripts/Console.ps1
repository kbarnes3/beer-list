# Launch a console for the project.
param(
    [switch]$Quick,
    [switch]$Verbose
)

$project_root = Split-Path $PSScriptRoot
$node_root = $project_root
. $PSScriptRoot\Write-Status.ps1

Write-Status "BaseAngularApp console"
# Set a global variable to indicate we want to set and update some useful console functions
$Global:console_functions = $true

$modules = Join-Path $node_root "node_modules"
if (Test-Path $modules) {
    if (-Not($Quick)) {
        . $PSScriptRoot\Update.ps1 -Verbose:$Verbose
    }
}
else {
    if ($Quick) {
        Write-Warning "No node modules detected, -Quick will be ignored"
    }
    . $PSScriptRoot\Setup.ps1
}

Write-Status "BaseAngularApp ready"

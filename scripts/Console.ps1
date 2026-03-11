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
        $currentBranch = & git rev-parse --abbrev-ref HEAD 2>$null
        if ($currentBranch -eq "main") {
            $localSha = & git rev-parse HEAD 2>$null
            $originSha = & git rev-parse origin/main 2>$null
            if ($localSha -eq $originSha) {
                Write-Status "Fetching latest changes..."
                & git fetch --all --quiet
                & git merge --ff-only 2>$null
                if (-Not $?) {
                    Write-Status "Warning: fast-forward merge failed, continuing with current state"
                }
            }
        }
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

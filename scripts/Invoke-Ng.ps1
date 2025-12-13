# Runs ng from a consistent context
# Any arguments passed into this function are passed to ng
param(
    [switch]$Async,
    $NgArgs
)

$project_root = Split-Path $PSScriptRoot
$node_root = $project_root

Push-Location $node_root
if ($Async) {
    Start-Process ng.cmd -ArgumentList $NgArgs
}
else {
    & ng.cmd @NgArgs
}
Pop-Location

# Resolve all dependencies that the project requires to run.
param(
    [switch]$Verbose
)

. $PSScriptRoot\Write-Status.ps1

if ($Verbose) {
    $quiet = ""
}
else {
    $quiet = "--quiet"
}

Write-Status "Updating npm"
. $PSScriptRoot\Invoke-Npm @('install', '--location=global', 'npm@11')
Write-Status "Updating Angular CLI"
. $PSScriptRoot\Invoke-Npm @('install', '--location=global', '@angular/cli')
Write-Status "Updating requirements"
. $PSScriptRoot\Invoke-Npm @('install')

if ($Global:console_functions) {
  # Define or update the console scripts if we want them
  . $PSScriptRoot\Console-Scripts.ps1
}

$project=Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location (Join-Path $project 'frontend')
if(-not (Test-Path 'node_modules')) { npm.cmd install }
npm.cmd run dev

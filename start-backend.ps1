$ErrorActionPreference='Stop'
$project=Split-Path -Parent $MyInvocation.MyCommand.Path
& (Join-Path $project 'setup-postgresql.ps1')
if($LASTEXITCODE -ne 0) {throw 'Database not ready'}
$passFile=Join-Path $env:LOCALAPPDATA 'BlutecPuppy\db-password.txt'
$env:SPRING_PROFILES_ACTIVE='postgres'
$env:DATABASE_URL='jdbc:postgresql://127.0.0.1:55432/blutec_puppies'
$env:DATABASE_USERNAME='blutec'
$env:DATABASE_PASSWORD=(Get-Content $passFile -Raw).Trim()
Set-Location (Join-Path $project 'backend')
mvn.cmd spring-boot:run

$ErrorActionPreference='Stop'
$bin='C:\Program Files\PostgreSQL\18\bin'
$state=Join-Path $env:LOCALAPPDATA 'BlutecPuppy'
$data=Join-Path $state 'pgdata'
$passFile=Join-Path $state 'db-password.txt'
New-Item -ItemType Directory -Force -Path $state | Out-Null
if(-not (Test-Path $passFile)) {
  $secret=[guid]::NewGuid().ToString('N')+'v6'
  Set-Content -Path $passFile -Value $secret -Encoding Ascii -NoNewline
}
$env:PGPASSWORD=(Get-Content $passFile -Raw).Trim()
if(-not (Test-Path (Join-Path $data 'PG_VERSION'))) {
  Write-Output 'Initializing isolated PostgreSQL 18 cluster on port 55432'
  & "$bin\initdb.exe" -D $data -U blutec --pwfile=$passFile -A scram-sha-256 -E UTF8 --no-instructions
  if($LASTEXITCODE -ne 0) {throw 'PostgreSQL initialization failed'}
}
& "$bin\pg_isready.exe" -h 127.0.0.1 -p 55432 -q
if($LASTEXITCODE -ne 0) {
  Write-Output 'Starting isolated PostgreSQL cluster'
  & "$bin\pg_ctl.exe" -D $data -o '-p 55432 -h 127.0.0.1' -l (Join-Path $state 'postgres.log') start
  if($LASTEXITCODE -ne 0) {throw 'PostgreSQL did not start'}
}
$dbExists=(& "$bin\psql.exe" -h 127.0.0.1 -p 55432 -U blutec -w -d postgres -At -c "SELECT 1 FROM pg_database WHERE datname='blutec_puppies'")
if(($dbExists -join '').Trim() -ne '1') {
  & "$bin\createdb.exe" -h 127.0.0.1 -p 55432 -U blutec blutec_puppies
  if($LASTEXITCODE -ne 0) {throw 'Could not create database'}
}
Write-Output 'PostgreSQL ready on 127.0.0.1:55432'

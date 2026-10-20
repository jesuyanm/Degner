# Runs the site on your computer with working forms, for testing.
# Emails are not really sent: each one is saved in dev\test-emails as an .eml file.
# Run it from VS Code: Terminal > Run Task > "Test forms". Press Ctrl+C to stop.

param([switch]$NoBrowser)

$root = Split-Path $PSScriptRoot -Parent
$emails = Join-Path $PSScriptRoot 'test-emails'

$php = (Get-Command php -ErrorAction SilentlyContinue).Source
if (-not $php) { $php = Join-Path $env:USERPROFILE 'tools\php\php.exe' }
if (-not (Test-Path $php)) {
    Write-Host "PHP was not found. Put PHP in $env:USERPROFILE\tools\php (download from windows.php.net)."
    exit 1
}

# Tells send.php it's a test, so the 5-per-hour limit doesn't get in the way.
$env:DEGNER_FORMS_TEST = '1'

$catcher = Start-Process python -ArgumentList "`"$PSScriptRoot\mail-catcher.py`"", "`"$emails`"" -NoNewWindow -PassThru
Start-Sleep -Milliseconds 500

Write-Host ''
Write-Host 'Open these in your browser:'
Write-Host '  http://localhost:8080/contact-us.html'
Write-Host '  http://localhost:8080/apply-now.html'
Write-Host '  http://localhost:8080/contact.html'
Write-Host '  http://localhost:8080/careers.html'
Write-Host 'Press Ctrl+C to stop.'
Write-Host ''
if (-not $NoBrowser) { Start-Process 'http://localhost:8080/apply-now.html' }

try {
    & $php -d SMTP=127.0.0.1 -d smtp_port=2525 -d sendmail_from=website@degner.ca `
        -d upload_max_filesize=10M -d post_max_size=25M -S localhost:8080 -t $root
}
finally {
    Stop-Process -Id $catcher.Id -ErrorAction SilentlyContinue
}

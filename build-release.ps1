Write-Host "Building Release AAB for Acadex..." -ForegroundColor Green

# Clean previous builds
Write-Host "Cleaning previous builds..." -ForegroundColor Yellow
Set-Location android
& .\gradlew clean

# Generate release AAB
Write-Host "Generating release AAB..." -ForegroundColor Yellow
& .\gradlew bundleRelease

Write-Host ""
Write-Host "Build completed!" -ForegroundColor Green
Write-Host "AAB file location: android\app\build\outputs\bundle\release\app-release.aab" -ForegroundColor Cyan
Write-Host ""
Write-Host "To install on device for testing:" -ForegroundColor Yellow
Write-Host "1. Extract APK from AAB: bundletool build-apks --bundle=android\app\build\outputs\bundle\release\app-release.aab --output=app-release.apks"
Write-Host "2. Install APK: bundletool install-apks --apks=app-release.apks"
Write-Host ""
Read-Host "Press Enter to continue"


@echo off
echo Building Release AAB for Acadex...

REM Clean previous builds
echo Cleaning previous builds...
cd android
call gradlew clean

REM Generate release AAB
echo Generating release AAB...
call gradlew bundleRelease

echo.
echo Build completed! 
echo AAB file location: android\app\build\outputs\bundle\release\app-release.aab
echo.
echo To install on device for testing:
echo 1. Extract APK from AAB: bundletool build-apks --bundle=android\app\build\outputs\bundle\release\app-release.aab --output=app-release.apks
echo 2. Install APK: bundletool install-apks --apks=app-release.apks
echo.
pause


#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Get version from command line arguments
const newVersion = process.argv[2];

if (!newVersion) {
  console.error('❌ Please provide a version number (e.g., npm run version 1.0.1)');
  process.exit(1);
}

// Validate version format (semantic versioning)
const versionRegex = /^\d+\.\d+\.\d+$/;
if (!versionRegex.test(newVersion)) {
  console.error('❌ Invalid version format. Please use semantic versioning (e.g., 1.0.1)');
  process.exit(1);
}

console.log(`🚀 Updating version to ${newVersion}...`);

try {
  // Update package.json
  const packageJsonPath = path.join(__dirname, '..', 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  
  const oldVersion = packageJson.version;
  packageJson.version = newVersion;
  
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
  console.log(`✅ Updated package.json: ${oldVersion} → ${newVersion}`);

  // Update Android version
  const androidBuildGradlePath = path.join(__dirname, '..', 'android', 'app', 'build.gradle');
  
  if (fs.existsSync(androidBuildGradlePath)) {
    let androidContent = fs.readFileSync(androidBuildGradlePath, 'utf8');
    
    // Update versionName
    androidContent = androidContent.replace(
      /versionName\s+"[^"]*"/,
      `versionName "${newVersion}"`
    );
    
    // Update versionCode (increment by 1)
    const versionCodeMatch = androidContent.match(/versionCode\s+(\d+)/);
    if (versionCodeMatch) {
      const newVersionCode = parseInt(versionCodeMatch[1]) + 1;
      androidContent = androidContent.replace(
        /versionCode\s+\d+/,
        `versionCode ${newVersionCode}`
      );
      console.log(`✅ Updated Android versionCode: ${versionCodeMatch[1]} → ${newVersionCode}`);
    }
    
    fs.writeFileSync(androidBuildGradlePath, androidContent);
    console.log(`✅ Updated Android versionName: ${newVersion}`);
  }

  // Update iOS version (if exists)
  const iosProjectPath = path.join(__dirname, '..', 'ios', 'Acadex.xcodeproj', 'project.pbxproj');
  
  if (fs.existsSync(iosProjectPath)) {
    let iosContent = fs.readFileSync(iosProjectPath, 'utf8');
    
    // Update MARKETING_VERSION
    iosContent = iosContent.replace(
      /MARKETING_VERSION = [^;]+;/g,
      `MARKETING_VERSION = ${newVersion};`
    );
    
    fs.writeFileSync(iosProjectPath, iosContent);
    console.log(`✅ Updated iOS MARKETING_VERSION: ${newVersion}`);
  }

  // Update app.json (if exists)
  const appJsonPath = path.join(__dirname, '..', 'app.json');
  if (fs.existsSync(appJsonPath)) {
    const appJson = JSON.parse(fs.readFileSync(appJsonPath, 'utf8'));
    if (appJson.expo) {
      appJson.expo.version = newVersion;
    } else {
      appJson.version = newVersion;
    }
    fs.writeFileSync(appJsonPath, JSON.stringify(appJson, null, 2) + '\n');
    console.log(`✅ Updated app.json: ${newVersion}`);
  }

  console.log(`🎉 Successfully updated version to ${newVersion}!`);
  console.log('📝 Next steps:');
  console.log('   1. Commit your changes: git add . && git commit -m "Bump version to ' + newVersion + '"');
  console.log('   2. Create a tag: git tag -a "v' + newVersion + '" -m "Version ' + newVersion + '"');
  console.log('   3. Push changes: git push && git push --tags');

} catch (error) {
  console.error('❌ Error updating version:', error.message);
  process.exit(1);
}

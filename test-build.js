<<<<<<< HEAD
const fs = require('fs');
const path = require('path');

console.log('🔍 Checking build output...');

// Check if out directory exists
if (!fs.existsSync('./out')) {
  console.error('❌ Build output directory "out" not found. Run "npm run build" first.');
  process.exit(1);
}

// Check for key files
const keyFiles = [
  'index.html',
  'favicons.png',
  'avatar-landing.png',
  'checkmark.png',
  'skills.png'
];

console.log('📁 Checking key files...');
keyFiles.forEach(file => {
  const filePath = path.join('./out', file);
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${file} found`);
  } else {
    console.log(`⚠️  ${file} not found`);
  }
});

// Check for project images
const projectImagesDir = './out/projects';
if (fs.existsSync(projectImagesDir)) {
  console.log('✅ Projects directory found');
  
  // Check thumbnail directory
  const thumbnailDir = path.join(projectImagesDir, 'thumbnail');
  if (fs.existsSync(thumbnailDir)) {
    const thumbnails = fs.readdirSync(thumbnailDir);
    console.log(`✅ Found ${thumbnails.length} project thumbnails`);
  }
  
  // Check images directory
  const imagesDir = path.join(projectImagesDir, 'images');
  if (fs.existsSync(imagesDir)) {
    const images = fs.readdirSync(imagesDir);
    console.log(`✅ Found ${images.length} project images`);
  }
} else {
  console.log('⚠️  Projects directory not found');
}

console.log('✅ Build check completed!');
=======
const fs = require('fs');
const path = require('path');

console.log('🔍 Checking build output...');

// Check if out directory exists
if (!fs.existsSync('./out')) {
  console.error('❌ Build output directory "out" not found. Run "npm run build" first.');
  process.exit(1);
}

// Check for key files
const keyFiles = [
  'index.html',
  'favicons.png',
  'avatar-landing.png',
  'checkmark.png',
  'skills.png'
];

console.log('📁 Checking key files...');
keyFiles.forEach(file => {
  const filePath = path.join('./out', file);
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${file} found`);
  } else {
    console.log(`⚠️  ${file} not found`);
  }
});

// Check for project images
const projectImagesDir = './out/projects';
if (fs.existsSync(projectImagesDir)) {
  console.log('✅ Projects directory found');
  
  // Check thumbnail directory
  const thumbnailDir = path.join(projectImagesDir, 'thumbnail');
  if (fs.existsSync(thumbnailDir)) {
    const thumbnails = fs.readdirSync(thumbnailDir);
    console.log(`✅ Found ${thumbnails.length} project thumbnails`);
  }
  
  // Check images directory
  const imagesDir = path.join(projectImagesDir, 'images');
  if (fs.existsSync(imagesDir)) {
    const images = fs.readdirSync(imagesDir);
    console.log(`✅ Found ${images.length} project images`);
  }
} else {
  console.log('⚠️  Projects directory not found');
}

console.log('✅ Build check completed!');
>>>>>>> 9f79861c6bfae7b04227058b247465dbfd563334

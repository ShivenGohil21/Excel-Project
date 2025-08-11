import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envPath = path.join(__dirname, '.env');

// Check if .env file already exists
if (fs.existsSync(envPath)) {
  console.log('✅ .env file already exists');
  console.log('Please make sure it contains the following Cloudinary variables:');
  console.log('CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name');
  console.log('CLOUDINARY_API_KEY=your_cloudinary_api_key');
  console.log('CLOUDINARY_API_SECRET=your_cloudinary_api_secret');
} else {
  // Create .env file template
  const envTemplate = `# Database Configuration
MONGODB_URI=your_mongodb_connection_string

# JWT Configuration
JWT_SECRET=your_jwt_secret_key

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Server Configuration
PORT=5000
`;

  fs.writeFileSync(envPath, envTemplate);
  console.log('✅ .env file created successfully!');
  console.log('📝 Please edit the .env file and add your actual Cloudinary credentials:');
  console.log('1. Go to https://cloudinary.com/ and sign up/login');
  console.log('2. Get your credentials from the Dashboard');
  console.log('3. Replace the placeholder values in the .env file');
}

console.log('\n🔗 To test Cloudinary connection, visit:');
console.log('http://localhost:5000/api/test-cloudinary');
console.log('\n📚 For more help, see: CLOUDINARY_SETUP.md');

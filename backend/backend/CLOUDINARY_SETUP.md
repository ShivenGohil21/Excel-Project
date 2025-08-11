# Cloudinary Setup Guide

This guide will help you set up Cloudinary for file storage in your Excel upload application.

## Prerequisites

1. A Cloudinary account (sign up at https://cloudinary.com/)
2. Node.js and npm installed
3. Your backend project set up

## Step 1: Get Cloudinary Credentials

1. Log in to your Cloudinary dashboard
2. Go to the "Dashboard" section
3. Copy your credentials:
   - Cloud Name
   - API Key
   - API Secret

## Step 2: Create Environment Variables

Create a `.env` file in your backend root directory with the following variables:

```env
# Database Configuration
MONGODB_URI=your_mongodb_connection_string

# JWT Configuration
JWT_SECRET=your_jwt_secret_key

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Server Configuration
PORT=5000
```

Replace the Cloudinary values with your actual credentials from Step 1.

## Step 3: Verify Installation

The required packages are already installed in your `package.json`:
- `cloudinary`: For Cloudinary SDK
- `multer-storage-cloudinary`: For multer integration (optional, we're using memory storage)

## Step 4: Test the Setup

1. Start your backend server:
   ```bash
   npm start
   ```

2. Upload an Excel file through your frontend
3. Check your Cloudinary dashboard to see if the file was uploaded
4. Verify that the file URL is stored in your database

## Features Implemented

### Backend Changes:
- ✅ Modified upload route to use Cloudinary
- ✅ Added Cloudinary URL and public ID to database schema
- ✅ Added delete route to remove files from both Cloudinary and database
- ✅ Files are stored in a "excel-files" folder on Cloudinary

### Frontend Changes:
- ✅ Updated UploadedFiles component to show Cloudinary status
- ✅ Added download functionality for Cloudinary-stored files
- ✅ Added delete functionality
- ✅ Improved UI with action buttons

## File Structure

```
backend/
├── src/
│   ├── config/
│   │   └── cloudinary.config.js    # Cloudinary configuration
│   ├── models/
│   │   └── uploadedFile.js         # Updated schema with Cloudinary fields
│   └── routes/
│       └── upload.js               # Updated upload routes
└── .env                            # Environment variables
```

## Troubleshooting

### Common Issues:

1. **"Cloudinary configuration error"**
   - Check your `.env` file has all required Cloudinary variables
   - Verify your Cloudinary credentials are correct

2. **"Upload failed"**
   - Check your internet connection
   - Verify Cloudinary account has sufficient storage space
   - Check file size limits

3. **"Delete failed"**
   - Ensure the file exists in both Cloudinary and database
   - Check if you have proper permissions

### Support:
- Cloudinary Documentation: https://cloudinary.com/documentation
- Cloudinary Support: https://support.cloudinary.com/

## Security Notes

- Never commit your `.env` file to version control
- Keep your Cloudinary API secret secure
- Consider implementing file type validation
- Set up proper CORS configuration for production

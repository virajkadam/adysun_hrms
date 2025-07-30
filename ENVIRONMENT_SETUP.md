# Environment Variables Setup

This guide helps you set up the required environment variables for your Netlify deployment.

## Firebase Configuration

You need to set these environment variables in your Netlify dashboard:

### Required Variables

```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### How to Get These Values

1. **Go to Firebase Console:**
   - Visit [console.firebase.google.com](https://console.firebase.google.com)
   - Select your project

2. **Get Configuration:**
   - Click on the gear icon (⚙️) next to "Project Overview"
   - Select "Project settings"
   - Scroll down to "Your apps" section
   - Click on your web app (or create one if you haven't)
   - Copy the configuration values

3. **Example Configuration:**
   ```javascript
   const firebaseConfig = {
     apiKey: "AIzaSyC...",
     authDomain: "your-project.firebaseapp.com",
     projectId: "your-project",
     storageBucket: "your-project.appspot.com",
     messagingSenderId: "123456789",
     appId: "1:123456789:web:abc123"
   };
   ```

## Setting Environment Variables in Netlify

### Method 1: Netlify Dashboard

1. Go to your Netlify dashboard
2. Click on your site
3. Go to "Site settings" > "Environment variables"
4. Click "Add a variable"
5. Add each variable with its corresponding value
6. Click "Save"

### Method 2: Netlify CLI

```bash
# Set environment variables via CLI
netlify env:set NEXT_PUBLIC_FIREBASE_API_KEY "your_api_key"
netlify env:set NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN "your_project.firebaseapp.com"
netlify env:set NEXT_PUBLIC_FIREBASE_PROJECT_ID "your_project"
netlify env:set NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET "your_project.appspot.com"
netlify env:set NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID "your_sender_id"
netlify env:set NEXT_PUBLIC_FIREBASE_APP_ID "your_app_id"
```

## Optional Variables

```
NEXT_PUBLIC_APP_NAME=Employee Admin Dashboard
NEXT_PUBLIC_APP_VERSION=1.0.0
```

## Local Development

For local development, create a `.env.local` file in your project root:

```bash
# .env.local
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

## Verification

After setting up environment variables:

1. **Redeploy your site** in Netlify
2. **Check the build logs** for any environment-related errors
3. **Test the application** to ensure Firebase authentication works
4. **Verify data loading** from Firestore

## Troubleshooting

### Common Issues

1. **"Firebase not initialized" error:**
   - Check that all environment variables are set correctly
   - Ensure variable names start with `NEXT_PUBLIC_`

2. **Authentication not working:**
   - Verify Firebase project is properly configured
   - Check that authentication methods are enabled in Firebase console

3. **Database access denied:**
   - Check Firestore security rules
   - Ensure your Firebase project is on the correct plan

### Testing Environment Variables

You can test if environment variables are loaded correctly by adding this to any page:

```javascript
console.log('Firebase Config:', {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
});
```

## Security Notes

- Never commit your actual Firebase keys to version control
- Use different Firebase projects for development and production
- Regularly rotate your API keys
- Monitor your Firebase usage to avoid unexpected charges 
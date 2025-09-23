# Video Calling Feature

This feature integrates GetStream.io video calling into the collaboration panel.

## Setup

1. **Backend Service**
   - Navigate to the `backend/` directory
   - Install dependencies: `npm install`
   - Create `.env` file with Stream credentials:
   ```
   STREAM_API_KEY=rsb8ag8zfg9z
   STREAM_API_SECRET=hukt62642876pjpwgkvgwxr9xu78u8vz2ak8br3v7uknx9whube9749dpdhre3g5
   NODE_ENV=development
   PORT=3001
   ```
   - Start the TypeScript service: `npm run dev`

2. **Get Stream Credentials**
   - Sign up at [getstream.io](https://getstream.io/)
   - Create a new app in your dashboard
   - Get your API key and secret from the dashboard

3. **Frontend Configuration (Optional)**
   - Create a `.env` file in the `example/` directory if you want to change the backend URL:
   ```
   VITE_TOKEN_SERVICE_URL=http://localhost:3001
   ```

## Current Status

✅ **Ready to Use**: Professional TypeScript backend with proper JWT token authentication is now implemented.

## Backend Features

- 🚀 **TypeScript**: Full type safety and professional development experience
- 🛡️ **Security**: Helmet, CORS, rate limiting, and comprehensive input validation
- 📊 **Monitoring**: Health checks and structured logging
- 🔧 **Development**: Hot reload and proper error handling
- 📦 **Production Ready**: Compression, graceful shutdown, and security best practices

## Usage

1. Make sure the backend service is running (`npm run dev` in `backend/` directory)
2. Enter your name to connect
3. Enter a Call ID to join/create a call
4. Share the Call ID with others to join the same call

## Features

- Video calling with multiple participants
- Camera and microphone controls
- Screen sharing (via Stream's built-in controls)
- Call management (join/leave)
- Clean, minimal UI integrated with Chakra UI

## Technical Details

- Uses `@stream-io/video-react-sdk`
- Environment variables for API key security
- Integrated with existing Chakra UI design system
- Proper cleanup and state management
- Error handling for connection issues

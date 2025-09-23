# Stream Token Service

Professional TypeScript backend service for generating Stream JWT tokens for video calling.

## Features

- 🚀 **TypeScript**: Full type safety and modern development experience
- 🛡️ **Security**: Helmet, CORS, rate limiting, and input validation
- 📊 **Monitoring**: Health checks and structured logging
- 🔧 **Development**: Hot reload with tsx and proper error handling
- 📦 **Production Ready**: Compression, proper error handling, and graceful shutdown

## Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Environment Variables**
   Create a `.env` file with:
   ```
   # Stream API Configuration
   STREAM_API_KEY=rsb8ag8zfg9z
   STREAM_API_SECRET=hukt62642876pjpwgkvgwxr9xu78u8vz2ak8br3v7uknx9whube9749dpdhre3g5
   
   # Server Configuration
   NODE_ENV=development
   PORT=3001
   
   # CORS Configuration (comma-separated list for production)
   # ALLOWED_ORIGINS=https://yourfrontend.com,https://anotherdomain.com
   ```

## Running

```bash
# Development (with hot reload)
npm run dev

# Build for production
npm run build

# Production
npm start

# Type checking only
npm run type-check
```

## API Endpoints

### POST /api/tokens
Generate a Stream JWT token for a user.

**Request:**
```json
{
  "userId": "john_doe"
}
```

**Response:**
```json
{
  "apiKey": "rsb8ag8zfg9z",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "userId": "john_doe"
}
```

**Error Response:**
```json
{
  "message": "Failed to generate token",
  "details": "User ID is required",
  "code": "TOKEN_GENERATION_FAILED"
}
```

### GET /api/health
Health check endpoint.

**Response:**
```json
{
  "status": "ok",
  "service": "stream-token-service",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "uptime": 3600
}
```

## Project Structure

```
src/
├── config/          # Configuration files
├── middleware/      # Express middleware
├── routes/          # API route handlers
├── services/        # Business logic services
├── types/           # TypeScript type definitions
└── server.ts        # Main server file
```

## Security Features

- **Helmet**: Security headers
- **CORS**: Configurable cross-origin resource sharing
- **Rate Limiting**: Prevents abuse (100 req/15min in production)
- **Input Validation**: Strict request validation
- **Error Handling**: Secure error responses (no stack traces in production)

## Production Deployment

1. Set `NODE_ENV=production`
2. Configure `ALLOWED_ORIGINS` for CORS
3. Use a process manager like PM2
4. Set up proper logging and monitoring
5. Use HTTPS in production

## Development Notes

- TypeScript strict mode enabled
- Hot reload with tsx
- Comprehensive error handling
- Structured logging
- Health checks for monitoring

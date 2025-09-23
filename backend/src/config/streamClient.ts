import { StreamChat } from 'stream-chat';
import { env } from './environment';

// Initialize the Stream Chat Server Client
// The StreamChat type comes from the stream-chat library
const serverClient: StreamChat = StreamChat.getInstance(env.STREAM_API_KEY, env.STREAM_API_SECRET);

console.log('Stream Chat server client initialized.');

// Export the singleton instance
export default serverClient;

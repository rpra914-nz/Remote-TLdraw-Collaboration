import serverClient from '../config/streamClient';
import { env } from '../config/environment';
import { StreamTokenResponse } from '../types';

export class StreamService {
  private readonly apiKey: string;

  constructor() {
    this.apiKey = env.STREAM_API_KEY;
  }

  /**
   * Generates a Stream token using the official Stream SDK
   */
  generateToken(userId: string): string {
    // Use Stream's official createToken method - this handles all JWT signing correctly
    return serverClient.createToken(userId);
  }

  /**
   * Creates a complete token response for the client
   */
  createTokenResponse(userId: string): StreamTokenResponse {
    // Clean userId to ensure it's valid for Stream
    const cleanUserId = this.cleanUserId(userId);
    
    return {
      apiKey: this.apiKey,
      token: this.generateToken(cleanUserId),
      userId: cleanUserId,
    };
  }

  /**
   * Cleans and validates userId for Stream compatibility
   */
  private cleanUserId(userId: string): string {
    if (!userId) {
      throw new Error('User ID is required');
    }

    // Remove invalid characters and convert to lowercase
    const cleaned = userId.toLowerCase().replace(/[^a-z0-9_-]/g, '_');
    
    if (cleaned.length === 0) {
      throw new Error('Invalid user ID: results in empty string after cleaning');
    }

    if (cleaned.length > 64) {
      throw new Error('User ID too long: maximum 64 characters allowed');
    }

    return cleaned;
  }
}

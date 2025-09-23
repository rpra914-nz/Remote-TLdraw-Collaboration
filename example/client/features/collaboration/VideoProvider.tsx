import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { 
	StreamVideoClient, 
	StreamVideo, 
	User as VideoUser 
} from '@stream-io/video-react-sdk'
import '@stream-io/video-react-sdk/dist/css/styles.css'

interface VideoContextType {
	client: StreamVideoClient | null
	isConnected: boolean
	connectUser: (userName: string) => Promise<void>
	disconnectUser: () => void
}

const VideoContext = createContext<VideoContextType | null>(null)

export const useVideo = () => {
	const context = useContext(VideoContext)
	if (!context) {
		throw new Error('useVideo must be used within VideoProvider')
	}
	return context
}

interface VideoProviderProps {
	children: ReactNode
}

// Backend service URL for token generation
const TOKEN_SERVICE_URL = import.meta.env.VITE_TOKEN_SERVICE_URL || 'http://localhost:3001'

export function VideoProvider({ children }: VideoProviderProps) {
	const [client, setClient] = useState<StreamVideoClient | null>(null)
	const [isConnected, setIsConnected] = useState(false)

	const connectUser = async (userName: string) => {
		if (client) {
			await disconnectUser()
		}

		try {
			// Clean username to create valid userId
			const userId = userName.toLowerCase().replace(/[^a-z0-9_-]/g, '_')
			
			// Fetch token from backend service
			const response = await fetch(`${TOKEN_SERVICE_URL}/api/tokens`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ userId }),
			})

			if (!response.ok) {
				throw new Error(`Token service error: ${response.status} ${response.statusText}`)
			}

			const data = await response.json() as { apiKey: string; token: string; userId: string }
			const { apiKey, token } = data
			
			const user: VideoUser = {
				id: userId,
				name: userName,
			}

			const videoClient = new StreamVideoClient({ 
				apiKey, 
				user, 
				token 
			})

			setClient(videoClient)
			setIsConnected(true)
			console.log(`Video client connected for user: ${userName}`)
		} catch (error) {
			console.error('Failed to connect video client:', error)
			setIsConnected(false)
		}
	}

	const disconnectUser = async () => {
		if (client) {
			try {
				await client.disconnectUser()
				setClient(null)
				setIsConnected(false)
				console.log('Video client disconnected')
			} catch (error) {
				console.error('Error disconnecting video client:', error)
			}
		}
	}

	useEffect(() => {
		return () => {
			disconnectUser()
		}
	}, [])

	const contextValue: VideoContextType = {
		client,
		isConnected,
		connectUser,
		disconnectUser
	}

	return (
		<VideoContext.Provider value={contextValue}>
			{client ? (
				<StreamVideo client={client}>
					{children}
				</StreamVideo>
			) : (
				children
			)}
		</VideoContext.Provider>
	)
}

// Video calling now uses proper JWT tokens from backend service
// Requires the token service to be running on localhost:3001 (or VITE_TOKEN_SERVICE_URL)

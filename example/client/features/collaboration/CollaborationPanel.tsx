import { Box } from '@chakra-ui/react'
import { VideoProvider } from './VideoProvider'
import { VideoCall } from './VideoCall'

interface CollaborationPanelProps {
	isExpanded: boolean
}

export function CollaborationPanel({ isExpanded }: CollaborationPanelProps) {
	return (
		<VideoProvider>
			<Box h="100%" bg="gray.50">
				<VideoCall />
			</Box>
		</VideoProvider>
	)
}


import { 
	Box, 
	Stack, 
	Heading, 
	Text, 
	Button,
	HStack,
	Flex
} from '@chakra-ui/react'
import { useState } from 'react'

interface CollaborationPanelProps {
	isExpanded: boolean
}

export function CollaborationPanel({ isExpanded }: CollaborationPanelProps) {
	const [activeUsers] = useState([
		{ id: 1, name: 'Alice Johnson', status: 'online', initials: 'AJ' },
		{ id: 2, name: 'Bob Smith', status: 'online', initials: 'BS' },
		{ id: 3, name: 'Carol Davis', status: 'away', initials: 'CD' }
	])

	const bgColor = 'gray.50'
	const cardBg = 'white'
	const borderColor = 'gray.200'

	return (
		<Box 
			p={6} 
			h="100%" 
			bg={bgColor}
			display="flex" 
			flexDirection="column"
			transition="all 0.3s ease"
		>
			{/* Header */}
			<Stack direction="column" gap={4} mb={8}>
				<Box textAlign="center">
					<Heading size="lg" color="gray.700" mb={2}>
						Collaboration
					</Heading>
					<Text color="gray.500" fontSize="sm">
						Team tools and management
					</Text>
				</Box>
				
				{/* Active Users */}
				<Box w="100%">
					<HStack justify="space-between" mb={3}>
						<Text fontSize="sm" fontWeight="medium" color="gray.600">
							Active Users
						</Text>
						<Box 
							px={2} 
							py={1} 
							bg="green.100" 
							color="green.800" 
							borderRadius="md" 
							fontSize="xs"
							fontWeight="medium"
						>
							{activeUsers.filter(u => u.status === 'online').length} online
						</Box>
					</HStack>
					<HStack>
						{activeUsers.map(user => (
							<Box
								key={user.id}
								w="32px"
								h="32px"
								borderRadius="full"
								bg={user.status === 'online' ? 'blue.500' : 'gray.400'}
								color="white"
								display="flex"
								alignItems="center"
								justifyContent="center"
								fontSize="xs"
								fontWeight="bold"
								border="2px solid white"
								title={user.name}
							>
								{user.initials}
							</Box>
						))}
					</HStack>
				</Box>
			</Stack>

			{/* Divider */}
			<Box h="1px" bg="gray.200" mb={6} />
			
			{/* Feature Cards */}
			<Stack direction="column" gap={3} flex={1}>
				<FeatureCard
					title="Video Call"
					description="Start a video conference with your team"
					action="Start Call"
					onClick={() => console.log('Starting video call...')}
					bg={cardBg}
					borderColor={borderColor}
				/>
				
				<FeatureCard
					title="Team Chat"
					description="Real-time messaging with collaborators"
					action="Open Chat"
					onClick={() => console.log('Opening chat...')}
					bg={cardBg}
					borderColor={borderColor}
				/>
				
				<FeatureCard
					title="Shared Notes"
					description="Collaborative notes and documentation"
					action="View Notes"
					onClick={() => console.log('Opening notes...')}
					bg={cardBg}
					borderColor={borderColor}
				/>
				
				<FeatureCard
					title="Version History"
					description="Track changes and restore previous versions"
					action="View History"
					onClick={() => console.log('Opening history...')}
					bg={cardBg}
					borderColor={borderColor}
				/>
			</Stack>
		</Box>
	)
}

interface FeatureCardProps {
	title: string
	description: string
	action: string
	onClick: () => void
	bg: string
	borderColor: string
}

function FeatureCard({ title, description, action, onClick, bg, borderColor }: FeatureCardProps) {
	return (
		<Box 
			w="100%" 
			p={4} 
			bg={bg}
			borderRadius="md" 
			shadow="sm" 
			border="1px solid" 
			borderColor={borderColor}
			_hover={{ 
				shadow: "md", 
				transform: "translateY(-1px)",
				borderColor: "gray.300"
			}} 
			transition="all 0.2s ease"
			cursor="pointer"
			onClick={onClick}
		>
			<Flex direction="column" gap={2}>
				<Heading size="sm" color="gray.700">{title}</Heading>
				<Text color="gray.600" fontSize="sm" lineHeight="1.4">
					{description}
				</Text>
				<Button 
					size="xs" 
					variant="ghost"
					fontSize="xs"
					fontWeight="medium"
					alignSelf="flex-start"
					color="blue.600"
					_hover={{ bg: "blue.50" }}
					p={0}
				>
					{action}
				</Button>
			</Flex>
		</Box>
	)
}

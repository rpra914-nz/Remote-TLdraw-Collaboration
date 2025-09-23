import { useState } from 'react'
import { 
	Box, 
	Flex, 
	Button, 
	HStack,
	Text
} from '@chakra-ui/react'
import { CollaborationPanel } from './features/collaboration'
import { TldrawCanvas } from './features/tldraw'

function App() {
	const [isCanvasCollapsed, setIsCanvasCollapsed] = useState(false)
	
	const toggleCanvas = () => {
		setIsCanvasCollapsed(!isCanvasCollapsed)
	}

	const bgColor = 'gray.50'
	const toggleBg = 'white'
	const borderColor = 'gray.200'

	return (
		<Flex h="100vh" w="100vw" position="fixed" inset={0} bg={bgColor}>
			{/* Left Panel - Collaboration */}
			<Box 
				w={isCanvasCollapsed ? "100%" : "50%"}
				position="relative"
				borderRight={isCanvasCollapsed ? "none" : "1px solid"}
				borderColor={borderColor}
				transition="width 0.3s ease"
				overflow="hidden"
			>
				{/* Toggle Button */}
				<Button
					onClick={toggleCanvas}
					position="absolute"
					top={4}
					right={4}
					size="sm"
					colorScheme="blue"
					variant="outline"
					bg={toggleBg}
					shadow="md"
					zIndex={1000}
					minW="auto"
					w="40px"
					h="32px"
					borderRadius="lg"
					title={isCanvasCollapsed ? 'Show Canvas' : 'Hide Canvas'}
					_hover={{
						transform: "translateY(-1px)",
						shadow: "lg",
						borderColor: "blue.400"
					}}
					_active={{
						transform: "translateY(0)",
						shadow: "md"
					}}
				>
					<Text fontSize="sm" fontWeight="bold">
						{isCanvasCollapsed ? '→' : '←'}
					</Text>
				</Button>

				{/* Collaboration Panel */}
				<CollaborationPanel isExpanded={isCanvasCollapsed} />
			</Box>

			{/* Right Panel - TLdraw Canvas */}
			<Box 
				w={isCanvasCollapsed ? "0" : "50%"}
				transition="all 0.3s ease"
				overflow="hidden"
				position="relative"
			>
				<TldrawCanvas isVisible={!isCanvasCollapsed} />
			</Box>

			{/* Status Bar */}
			<Box
				position="absolute"
				bottom={0}
				left={0}
				right={isCanvasCollapsed ? 0 : "50%"}
				h="24px"
				bg="gray.100"
				borderTop="1px solid"
				borderColor={borderColor}
				px={3}
				transition="right 0.3s ease"
			>
				<HStack h="100%" justify="space-between" fontSize="xs" color="gray.500">
					<Text>Ready</Text>
					<HStack gap={3}>
						<Text>Collaboration</Text>
						{!isCanvasCollapsed && <Text>•</Text>}
						{!isCanvasCollapsed && <Text>Canvas</Text>}
					</HStack>
				</HStack>
			</Box>
		</Flex>
	)
}

export default App

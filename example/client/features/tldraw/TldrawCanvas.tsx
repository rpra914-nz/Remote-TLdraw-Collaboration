import { useState, useEffect } from 'react'
import { Box } from '@chakra-ui/react'
import { Editor, Tldraw } from 'tldraw'
import { AiInputBar } from './AiInputBar'

interface TldrawCanvasProps {
	isVisible: boolean
}

export function TldrawCanvas({ isVisible }: TldrawCanvasProps) {
	const [editor, setEditor] = useState<Editor | null>(null)

	// Put the editor on the window for debugging
	useEffect(() => {
		if (!editor) return
		;(window as any).editor = editor
	}, [editor])

	return (
		<Box 
			h="100%" 
			display="grid" 
			gridTemplateRows="1fr 60px"
			opacity={isVisible ? 1 : 0}
			transition="opacity 0.3s ease"
		>
			{/* TLdraw Canvas */}
			<Box position="relative" overflow="hidden">
				<Tldraw 
					persistenceKey="tldraw-ai-demo" 
					onMount={setEditor}
				/>
			</Box>
			
			{/* AI Input Bar */}
			{editor && <AiInputBar editor={editor} />}
		</Box>
	)
}

import { TLAssetStore, uniqueId } from 'tldraw'

// Use an environment variable for the Worker URL (fallback to localhost for dev)
const WORKER_BASE_URL = 'https://remote-tldraw-sync.jiachen023212.workers.dev'

export const multiplayerAssetStore: TLAssetStore = {
	async upload(_asset, file) {
		const id = uniqueId()
		const objectName = `${id}-${file.name}`.replace(/[^a-zA-Z0-9.]/g, '-')
		const uploadUrl = `${WORKER_BASE_URL}/api/assets/upload/${objectName}`
	  
		const response = await fetch(uploadUrl, {
		  method: 'POST',
		  body: file,
		})
	  
		if (!response.ok) {
		  throw new Error(`Failed to upload asset: ${response.status} ${response.statusText}`)
		}
	  
		// TypeScript now knows the shape of the returned JSON
		const data = (await response.json()) as { url: string }
		const { url } = data
	  
		return { src: url }
	  }
	  ,

  resolve(asset) {
    // Load the asset from the stored URL
    return asset.props.src
  },
}

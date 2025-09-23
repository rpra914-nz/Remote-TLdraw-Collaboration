import { AssetRecordType, TLAsset, TLBookmarkAsset, getHashForString } from 'tldraw'

// Use an environment variable for the Worker URL (fallback to localhost for dev)
const WORKER_BASE_URL = 'https://remote-tldraw-sync.jiachen023212.workers.dev'

// How our server handles bookmark unfurling
export async function getBookmarkPreview({ url }: { url: string }): Promise<TLAsset> {
  // Start with an empty asset record
  const asset: TLBookmarkAsset = {
    id: AssetRecordType.createId(getHashForString(url)),
    typeName: 'asset',
    type: 'bookmark',
    meta: {},
    props: {
      src: url,
      description: '',
      image: '',
      favicon: '',
      title: '',
    },
  }

  try {
    // Use the configurable Worker URL for the unfurl endpoint
    const response = await fetch(`${WORKER_BASE_URL}/api/unfurl?url=${encodeURIComponent(url)}`)
    const data = (await response.json()) as {
      description?: string
      image?: string
      favicon?: string
      title?: string
    }

    // Fill in our asset with whatever info we found
    asset.props.description = data?.description ?? ''
    asset.props.image = data?.image ?? ''
    asset.props.favicon = data?.favicon ?? ''
    asset.props.title = data?.title ?? ''
  } catch (e) {
    console.error(e)
  }

  return asset
}

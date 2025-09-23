import { IRequest } from 'itty-router';
declare global {
    interface CacheStorage {
        default: Cache;
    }
}
export declare function handleAssetUpload(request: IRequest, env: Env): Promise<Response | {
    ok: boolean;
}>;
export declare function handleAssetDownload(request: IRequest, env: Env, ctx: ExecutionContext): Promise<Response>;
//# sourceMappingURL=assetUploads.d.ts.map
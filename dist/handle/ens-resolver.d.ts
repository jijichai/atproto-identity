export interface EnsResolverConfig {
    providerUrl: string;
    chainId: number;
    timeout?: number;
}
export declare class EnsHandleResolver {
    private provider;
    private cache;
    private cacheTtl;
    constructor(config: EnsResolverConfig);
    resolve(handle: string): Promise<string | undefined>;
    private isEnsName;
}
//# sourceMappingURL=ens-resolver.d.ts.map
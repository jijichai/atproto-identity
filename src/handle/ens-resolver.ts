import { ethers } from 'ethers'

export interface EnsResolverConfig {
  providerUrl: string
  chainId: number
  timeout?: number
}

export class EnsHandleResolver {
  private provider: ethers.JsonRpcProvider
  private cache: Map<string, { did: string; timestamp: number }>
  private cacheTtl: number

  constructor(config: EnsResolverConfig) {
    this.provider = new ethers.JsonRpcProvider(
      config.providerUrl,
      config.chainId,
    )
    this.cache = new Map()
    this.cacheTtl = config.timeout ?? 5000
  }

  async resolve(handle: string): Promise<string | undefined> {
    // Only handle ENS TLDs
    if (!this.isEnsName(handle)) {
      return undefined
    }

    // Check cache first
    const cached = this.cache.get(handle)
    if (cached && Date.now() - cached.timestamp < this.cacheTtl) {
      return cached.did
    }

    try {
      // Get ENS resolver for this name
      const resolver = await this.provider.getResolver(handle)
      if (!resolver) {
        return undefined
      }

      // Query the _atproto text record
      const record = await resolver.getText('_atproto')
      const did = record?.startsWith('did=') ? record.slice(4) : record

      if (did && did.startsWith('did:')) {        // Cache the result
        this.cache.set(handle, { did, timestamp: Date.now() })
      }

      return did || undefined
    } catch (err) {
      // Log error but don't throw - let other resolvers try
      console.error('ENS resolution error:', err)
      return undefined
    }
  }

  private isEnsName(handle: string): boolean {
    // Only .eth is a native ENS TLD
    return handle.endsWith('.eth')
  }
}

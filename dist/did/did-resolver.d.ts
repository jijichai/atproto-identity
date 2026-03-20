import { DidResolverOpts } from '../types';
import { BaseResolver } from './base-resolver';
export declare class DidResolver extends BaseResolver {
    methods: Map<string, BaseResolver>;
    constructor(opts: DidResolverOpts);
    resolveNoCheck(did: string): Promise<unknown>;
}
//# sourceMappingURL=did-resolver.d.ts.map
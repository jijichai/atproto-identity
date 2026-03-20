"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DidResolver = void 0;
const errors_1 = require("../errors");
const base_resolver_1 = require("./base-resolver");
const plc_resolver_1 = require("./plc-resolver");
const web_resolver_1 = require("./web-resolver");
class DidResolver extends base_resolver_1.BaseResolver {
    constructor(opts) {
        super(opts.didCache);
        const { timeout = 3000, plcUrl = 'https://plc.directory' } = opts;
        // do not pass cache to sub-methods or we will be double caching
        this.methods = new Map([
            ['plc', new plc_resolver_1.DidPlcResolver(plcUrl, timeout)],
            ['web', new web_resolver_1.DidWebResolver(timeout)],
        ]);
    }
    async resolveNoCheck(did) {
        if (!did.startsWith('did:')) {
            throw new errors_1.PoorlyFormattedDidError(did);
        }
        const methodSepIdx = did.indexOf(':', 4);
        if (methodSepIdx === -1) {
            throw new errors_1.PoorlyFormattedDidError(did);
        }
        const methodName = did.slice(4, methodSepIdx);
        const method = this.methods.get(methodName);
        if (!method) {
            throw new errors_1.UnsupportedDidMethodError(did);
        }
        return method.resolveNoCheck(did);
    }
}
exports.DidResolver = DidResolver;
//# sourceMappingURL=did-resolver.js.map
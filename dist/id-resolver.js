"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdResolver = void 0;
const did_resolver_1 = require("./did/did-resolver");
const handle_1 = require("./handle");
class IdResolver {
    constructor(opts = {}) {
        const { timeout = 3000, plcUrl, didCache } = opts;
        this.handle = new handle_1.HandleResolver({
            timeout,
            backupNameservers: opts.backupNameservers,
        });
        this.did = new did_resolver_1.DidResolver({ timeout, plcUrl, didCache });
    }
}
exports.IdResolver = IdResolver;
//# sourceMappingURL=id-resolver.js.map
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseDidKey = exports.formatMultikey = exports.parseMultikey = void 0;
exports.formatDidKey = formatDidKey;
const uint8arrays = __importStar(require("uint8arrays"));
const const_1 = require("./const");
const plugins_1 = require("./plugins");
const utils_1 = require("./utils");
const parseMultikey = (multikey) => {
    const prefixedBytes = (0, utils_1.extractPrefixedBytes)(multikey);
    const plugin = plugins_1.plugins.find((p) => (0, utils_1.hasPrefix)(prefixedBytes, p.prefix));
    if (!plugin) {
        throw new Error('Unsupported key type');
    }
    const keyBytes = plugin.decompressPubkey(prefixedBytes.slice(plugin.prefix.length));
    return {
        jwtAlg: plugin.jwtAlg,
        keyBytes,
    };
};
exports.parseMultikey = parseMultikey;
const formatMultikey = (jwtAlg, keyBytes) => {
    const plugin = plugins_1.plugins.find((p) => p.jwtAlg === jwtAlg);
    if (!plugin) {
        throw new Error('Unsupported key type');
    }
    const prefixedBytes = uint8arrays.concat([
        plugin.prefix,
        plugin.compressPubkey(keyBytes),
    ]);
    return (const_1.BASE58_MULTIBASE_PREFIX + uint8arrays.toString(prefixedBytes, 'base58btc'));
};
exports.formatMultikey = formatMultikey;
const parseDidKey = (did) => {
    const multikey = (0, utils_1.extractMultikey)(did);
    return (0, exports.parseMultikey)(multikey);
};
exports.parseDidKey = parseDidKey;
function formatDidKey(jwtAlg, keyBytes) {
    return `${const_1.DID_KEY_PREFIX}${(0, exports.formatMultikey)(jwtAlg, keyBytes)}`;
}
//# sourceMappingURL=did.js.map
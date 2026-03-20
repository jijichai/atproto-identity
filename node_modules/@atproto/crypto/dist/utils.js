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
exports.hasPrefix = exports.extractPrefixedBytes = exports.extractMultikey = void 0;
const uint8arrays = __importStar(require("uint8arrays"));
const const_1 = require("./const");
const extractMultikey = (did) => {
    if (!did.startsWith(const_1.DID_KEY_PREFIX)) {
        throw new Error(`Incorrect prefix for did:key: ${did}`);
    }
    return did.slice(const_1.DID_KEY_PREFIX.length);
};
exports.extractMultikey = extractMultikey;
const extractPrefixedBytes = (multikey) => {
    if (!multikey.startsWith(const_1.BASE58_MULTIBASE_PREFIX)) {
        throw new Error(`Incorrect prefix for multikey: ${multikey}`);
    }
    return uint8arrays.fromString(multikey.slice(const_1.BASE58_MULTIBASE_PREFIX.length), 'base58btc');
};
exports.extractPrefixedBytes = extractPrefixedBytes;
const hasPrefix = (bytes, prefix) => {
    return uint8arrays.equals(prefix, bytes.subarray(0, prefix.byteLength));
};
exports.hasPrefix = hasPrefix;
//# sourceMappingURL=utils.js.map
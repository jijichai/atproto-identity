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
exports.randomIntFromSeed = exports.randomStr = exports.randomBytes = void 0;
const noble = __importStar(require("@noble/hashes/utils"));
const uint8arrays = __importStar(require("uint8arrays"));
const sha_1 = require("./sha");
exports.randomBytes = noble.randomBytes;
const randomStr = (byteLength, encoding) => {
    const bytes = (0, exports.randomBytes)(byteLength);
    return uint8arrays.toString(bytes, encoding);
};
exports.randomStr = randomStr;
const randomIntFromSeed = async (seed, high, low = 0) => {
    const hash = await (0, sha_1.sha256)(seed);
    const number = Buffer.from(hash).readUintBE(0, 6);
    const range = high - low;
    const normalized = number % range;
    return normalized + low;
};
exports.randomIntFromSeed = randomIntFromSeed;
//# sourceMappingURL=random.js.map
global.structuredClone = (val: any) => JSON.parse(JSON.stringify(val));
// @ts-ignore
global.__ExpoImportMetaRegistry = {};

if (typeof TextEncoder === "undefined") {
  global.TextEncoder = require("util").TextEncoder;
}
if (typeof TextDecoder === "undefined") {
  global.TextDecoder = require("util").TextDecoder;
}

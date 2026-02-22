// src/__tests__/pre-setup.ts

// Neutralizamos el runtime de Expo que causa el ReferenceError
global.structuredClone = (val: any) => JSON.parse(JSON.stringify(val));
// @ts-ignore
global.__ExpoImportMetaRegistry = {};

// Si da error de TextEncoder
if (typeof TextEncoder === "undefined") {
  global.TextEncoder = require("util").TextEncoder;
}
if (typeof TextDecoder === "undefined") {
  global.TextDecoder = require("util").TextDecoder;
}

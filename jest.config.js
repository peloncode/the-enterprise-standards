module.exports = {
  preset: "jest-expo",
  testEnvironment: "node",
  // setupFiles corre ANTES de que se cargue el entorno de test
  setupFiles: ["<rootDir>/src/__tests__/pre-setup.ts"],
  setupFilesAfterEnv: ["<rootDir>/src/__tests__/setup.ts"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
  },
  transformIgnorePatterns: [
    "node_modules/(?!(empty-module|((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg|expo-router|expo-constants|expo-modules-core|nanoid))",
  ],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },
  testPathIgnorePatterns: [
    "/node_modules/",
    "/src/__tests__/setup.ts",
    "/src/__tests__/pre-setup.ts", // <--- Añade este también
  ],
};

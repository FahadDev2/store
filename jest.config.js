/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  displayName: {
    name: 'node-express',
    color: 'greenBright',
  },
  testMatch: ['**/**/*.test.ts'],
  verbose: true,
  forceExit: true,

  //clearMocks
};

// module.exports = {
//   preset: 'ts-jest',
//   testEnvironment: 'node',
//   displayName: {
//     name: 'node-express',
//     color: 'greenBright',
//   },
//   testTimeout: 120000,
//   verbose: true,
//   detectOpenHandles: true,
//   collectCoverage: true,
//   forceExit: true,
//   // moduleDirectories: ['node_modules', 'src'],
//   testMatch: ['**/**/*.test.ts'],
// };

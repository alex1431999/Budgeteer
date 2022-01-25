// vetur.config.js
/** @type {import('vls').VeturConfig} */
module.exports = {
  settings: {
    "vetur.useWorkspaceDependencies": true,
    "vetur.experimental.templateInterpolationService": true
  },
  projects: [
    './client', // Shorthand for specifying only the project root location
    {
      root: './client',
      package: './client/package.json',
      tsconfig: './client/tsconfig.json',
    }
  ]
}
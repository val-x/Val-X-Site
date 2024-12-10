module.exports = {
  monorepo: {
    type: 'turborepo',
    root: '../..',
  },
  build: {
    env: {
      TURBO_REMOTE_ONLY: 'true',
    },
  },
}; 
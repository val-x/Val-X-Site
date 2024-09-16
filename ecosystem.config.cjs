module.exports = {
  apps: [{
    name: "val-x",
    script: "serve",
    args: "-s dist",
    env: {
      NODE_ENV: "production",
      PM2_SERVE_PORT: 3000,
    },
  }],
};
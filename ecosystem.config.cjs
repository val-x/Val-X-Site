module.exports = {
  apps: [{
    name: "val-x",
    script: "serve -s",
    args: "dist",
    env: {
      NODE_ENV: "production",
      PM2_SERVE_PORT: 3000,
    },
  }],
};


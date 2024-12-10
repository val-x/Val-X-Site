module.exports = {
  apps: [{
    name: "val-x",
    script: "serve",
    args: "-s dist --cors -l tcp://localhost:3000",
    env: {
      NODE_ENV: "production",
      PM2_SERVE_PORT: 3000,
      PM2_SERVE_SPA: "true",
      PM2_SERVE_HOMEPAGE: "/index.html"
    },
  }],
};


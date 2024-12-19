// If you're using Express
app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    [
      "default-src 'self' https: data: blob:",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://vercel.live https://*.vercel.live",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://*.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com https://*.gstatic.com",
      "img-src 'self' data: blob: https: http:",
      "media-src 'self' https: data: blob:",
      "connect-src 'self' https: wss: blob:",
      "worker-src 'self' blob:",
      "frame-src 'self' https:"
    ].join('; ')
  );
  next();
}); 
const express = require('express');
const path = require('path');
const app = express();

// Existing CSP middleware
app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    [
      "default-src 'self' https://*.firebaseio.com https://*.soundhelix.com",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://vercel.live https://*.vercel.live https://*.val-x.in",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://*.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com https://*.gstatic.com",
      "img-src 'self' data: blob: https: http:",
      "media-src 'self' https: data: blob: https://*.soundhelix.com",
      "connect-src 'self' https: wss: blob: https://*.firebaseio.com",
      "worker-src 'self' blob:",
      "frame-src 'self' https:"
    ].join('; ')
  );
  next();
});

// Serve static files
app.use(express.static(path.join(__dirname, 'dist')));

// Catch-all route for client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 
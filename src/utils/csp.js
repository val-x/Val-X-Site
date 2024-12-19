// Content Security Policy configuration
export const CSP_POLICY = {
  'default-src': ["'self'"],
  'script-src': ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
  'style-src': ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
  'font-src': ["'self'", "data:", "https://fonts.gstatic.com"],
  'img-src': ["'self'", "data:", "https:", "http:"],
  'connect-src': ["'self'", "https://hacker-news.firebaseio.com"],
};

export const getCSPString = () => {
  return Object.entries(CSP_POLICY)
    .map(([key, values]) => `${key} ${values.join(' ')}`)
    .join('; ');
}; 
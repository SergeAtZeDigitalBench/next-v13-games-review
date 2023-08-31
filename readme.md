## Deployment

1. As a node.js application

- can deploy to Vercel, AWS Amplify, Netlify and other hosting that are hosting a node server.

2. If we want to serve the website as static files

- `next.config.js`

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
};

module.exports = nextConfig;
```

- `yarn build`
- `npx serve@latest out/`, that will imitate the server serving static files (html/css/js)

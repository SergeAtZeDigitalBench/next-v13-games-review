## Jamstack = FE:Next.js <=> BE: CMS + DB

The games data will be fetched from the CMS which is Strapi Node.js app

The `next-reviews-cms` application codebase can be cloned from: https://github.com/SergeAtZeDigitalBench/games-review-strapi-cms

Once cloned, install as per readme instructions in there.

You need to run it locally, which will be at `http://localhost:1337/`,

and the CMS API will be accessible from `http://localhost:1337/api`

**IMPORTANT:** for now, while the CMS is available only locally, the version of the `'main'` branch will be the `'main-local'`,
so the Vercel production build doesn't fail due to the CMS API unavailability

## Deployment

1. **As a node.js application**

- can deploy to Vercel, AWS Amplify, Netlify and other hosting that are hosting a node server.

2. **If we want to serve the website as static files**

to note: if any <Image/> component is used - replace by <img/>, as it will not work on static website version.

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

#### Hosting static website on Netlify example:

- `yarn build` will produce an `out/` directory
- On Netlify dashboard, select `Deploy manually` option, then drag your whole `out/` folder into the drag-n-drop window

3. **Self-Hosting**

As mentioned, you can also deploy your Next.js app to your own servers, provided that you have the required system administration skills to set up and maintain the servers.

Your servers could be on premise, or on cloud computing platforms like Amazon Web Service, Microsoft Azure, Google Cloud, Digital Ocean, etc.

If you can do a Static Export you can then run your website using any web server software, such as Nginx.
Just an example you can follow the [How To Install Nginx on Ubuntu 22.04 tutorial](https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-22-04)

If your app uses full-stack features like server-side rendering you'll need to run it with Node.js. In this case setting up the server will involve a few different steps;

Install Node.js;

Transfer your project code to the server, e.g. by downloading it from a Git repository;

Run next build to prepare the production files;

Start the server with next start;

Configure the system to start your app automatically on boot, using e.g. systemd on Linux.

For a detailed example you can read [How To Set Up a Node.js Application for Production on Ubuntu 20.04.](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-20-04) To start your Next.js app, rather than running node hello.js like in the tutorial you'd launch the next start command in your project folder.

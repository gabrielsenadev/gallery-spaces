# Gallery Spaces - Netlify Dynamic Site Challenge
Gallery Spaces is a fullstack application hat empowers users to create their own galleries, manage them (uploading and deleting images), share their work with others, and customize images before downloading.

This is a submisison for Netlify Dynamic Site Challenge.

[Demo link](https://gallery-spaces.netlify.app)

## Some application features

- Authentication system (with bcrypt and JWT token);
- Persistent data storage (Netlify Blobs);
- Back-end API, with authentication, image uploader, gallery creator, image provider, etc;
- Powerful Image Customization with Netlify Image CDN

## Technologies
- Netlify Image CDN
- Netlify Blobs
- Netlify Functions
- Nuxt
- Vue 3
- TailwindCSS
- Zod


## Running

1. Clone this repository;
2. Install dependencies:
```bash
npm ci
```
3. Link this repository to a netlify site
```bahs
netlify link
```
4. Start the server
```bash
npm run start
```

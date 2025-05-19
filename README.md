This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Document Generator Integration

This admin dashboard integrates with the Employee Document Generator application to provide document generation capabilities. Here's how to set it up:

### Running Both Applications Together (Development)

1. **Start the Document Generator on port 3001**:
   ```bash
   cd ../employee_document_generator/employee_document_generator
   # Install dependencies if you haven't already
   npm install
   # Start on port 3001
   PORT=3001 npm start
   ```

2. **Start the Admin Dashboard**:
   ```bash
   # In the admin-dashboard directory
   npm run dev
   ```

3. **Access the Integrated Application**:
   - Open your browser to `http://localhost:3000`
   - Navigate to Documents > Offer Letters > Create Offer Letter
   - The document generator will be embedded within the admin dashboard page

### Production Deployment

For production deployment, you have two options:

1. **Proxy Configuration (Recommended)**:
   - Deploy the Document Generator app to its own subdomain (e.g., `document-generator.yourdomain.com`)
   - Update the destination URL in `next.config.js` to point to your deployed Document Generator
   - Deploy the Admin Dashboard

2. **Single Server Setup**:
   - Serve both applications from the same server
   - Configure your web server (Nginx, Apache, etc.) to route requests appropriately

### Troubleshooting

If the iframe is not loading properly, ensure:

1. The Document Generator is running and accessible
2. There are no Cross-Origin Resource Sharing (CORS) issues
3. The proxy rewrites are correctly configured in `next.config.js`

For additional help, please refer to the documentation of both applications.

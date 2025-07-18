# Deployment Guide

This guide covers deploying your Next.js 15 + Supabase application to various platforms.

## Quick Deploy

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/tesseract-creator/nextjs-supabase-2025-starter)

1. Click the deploy button above
2. Connect your GitHub account
3. Add environment variables (see below)
4. Deploy!

### Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/tesseract-creator/nextjs-supabase-2025-starter)

1. Click the deploy button above
2. Connect your GitHub account
3. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
4. Add environment variables
5. Deploy!

## Manual Deployment

### Prerequisites

- Node.js 18.x or 20.x
- npm or yarn
- Git

### Environment Variables

Set these environment variables in your deployment platform:

```bash
# Required
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Optional
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
SENTRY_DSN=your_sentry_dsn
NEXT_PUBLIC_GA_MEASUREMENT_ID=your_ga_id
```

### Platform-Specific Guides

#### Vercel

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Deploy**:
   ```bash
   vercel
   ```

3. **Add environment variables**:
   ```bash
   vercel env add
   ```

#### Netlify

1. **Install Netlify CLI**:
   ```bash
   npm i -g netlify-cli
   ```

2. **Build and deploy**:
   ```bash
   npm run build
   netlify deploy --prod --dir=.next
   ```

#### AWS Amplify

1. **Connect repository** in AWS Amplify console
2. **Build settings**:
   ```yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm install
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: .next
       files:
         - '**/*'
     cache:
       paths:
         - node_modules/**/*
   ```

#### Railway

1. **Connect repository** in Railway dashboard
2. **Environment variables**: Add in dashboard
3. **Deploy**: Automatic on push

#### Digital Ocean App Platform

1. **Create app** from GitHub repository
2. **Build settings**:
   - Build command: `npm run build`
   - Run command: `npm start`
3. **Environment variables**: Add in dashboard

#### Heroku

1. **Create Heroku app**:
   ```bash
   heroku create your-app-name
   ```

2. **Add Node.js buildpack**:
   ```bash
   heroku buildpacks:set heroku/nodejs
   ```

3. **Set environment variables**:
   ```bash
   heroku config:set NEXT_PUBLIC_SUPABASE_URL=your_url
   ```

4. **Deploy**:
   ```bash
   git push heroku main
   ```

#### Docker

1. **Create Dockerfile**:
   ```dockerfile
   FROM node:18-alpine AS deps
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci --only=production

   FROM node:18-alpine AS builder
   WORKDIR /app
   COPY . .
   COPY --from=deps /app/node_modules ./node_modules
   RUN npm run build

   FROM node:18-alpine AS runner
   WORKDIR /app
   ENV NODE_ENV production
   
   COPY --from=builder /app/public ./public
   COPY --from=builder /app/.next ./.next
   COPY --from=builder /app/node_modules ./node_modules
   COPY --from=builder /app/package.json ./package.json

   EXPOSE 3000
   CMD ["npm", "start"]
   ```

2. **Build and run**:
   ```bash
   docker build -t nextjs-app .
   docker run -p 3000:3000 nextjs-app
   ```

## Environment Configuration

### Development
```bash
NODE_ENV=development
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Staging
```bash
NODE_ENV=staging
NEXT_PUBLIC_SITE_URL=https://staging.yourdomain.com
```

### Production
```bash
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

## Performance Optimization

### Build Optimizations

1. **Bundle analysis**:
   ```bash
   npm run analyze
   ```

2. **Static exports** (if applicable):
   ```bash
   npm run build && npm run export
   ```

### CDN Configuration

Configure your CDN to cache static assets:

- `/_next/static/*` - Cache for 1 year
- `/images/*` - Cache for 1 month
- `/api/*` - No cache

### Database Optimization

1. **Connection pooling**: Enable in Supabase
2. **Indexes**: Add for frequently queried fields
3. **Row Level Security**: Enable for data protection

## Monitoring & Analytics

### Error Tracking (Sentry)

```bash
SENTRY_DSN=your_sentry_dsn
NEXT_PUBLIC_SENTRY_DSN=your_sentry_dsn
```

### Analytics (Google Analytics)

```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### Performance Monitoring

```bash
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=your_analytics_id
```

## Security Checklist

- [ ] HTTPS enabled
- [ ] Environment variables secured
- [ ] Supabase Row Level Security enabled
- [ ] CORS configured properly
- [ ] Security headers configured
- [ ] Dependencies updated

## Troubleshooting

### Common Issues

1. **Build fails**:
   - Check Node.js version (18.x or 20.x required)
   - Verify all dependencies are installed
   - Check TypeScript errors

2. **Runtime errors**:
   - Verify environment variables
   - Check Supabase connection
   - Review browser console for errors

3. **Performance issues**:
   - Enable caching
   - Optimize images
   - Use static generation where possible

### Support

For deployment issues:
1. Check platform documentation
2. Review build logs
3. Test locally first
4. Open an issue if needed

## Post-Deployment

### Domain Setup

1. Configure custom domain in platform dashboard
2. Set up SSL certificate (usually automatic)
3. Update DNS records
4. Test all functionality

### Monitoring

1. Set up error tracking
2. Configure performance monitoring
3. Enable analytics
4. Set up health checks

### Maintenance

1. Regular dependency updates
2. Monitor performance metrics
3. Review error logs
4. Security updates

## CI/CD Pipeline

Example GitHub Actions workflow:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-node@v4
      with:
        node-version: '20'
        cache: 'npm'
    
    - run: npm ci
    - run: npm run build
    - run: npm run test
    
    - name: Deploy to Vercel
      uses: amondnet/vercel-action@v25
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.ORG_ID }}
        vercel-project-id: ${{ secrets.PROJECT_ID }}
        vercel-args: '--prod'
```

Ready to deploy? Choose your platform and follow the guide above! 🚀
# 🐳 Coolify Pay-as-You-Go Deployment Guide

Deploy Lead Orchestra to Coolify's managed pay-as-you-go service.

## 📋 Coolify Pricing

- **$5 base price** per month
- **$3 per additional server** (billed monthly + VAT)
- **Bring your own servers** from any cloud provider (Hetzner, DigitalOcean, AWS, etc.)
- **Unlimited servers** can be connected
- **Unlimited applications** per server
- **Free email notifications**
- **Email support included**

---

## 🚀 Quick Start

### Step 1: Sign Up for Coolify

1. Go to [Coolify.io](https://coolify.io)
2. Sign up for an account
3. Choose the **Pay-as-You-Go** plan
4. Complete payment setup ($5 base + $3 per server)

### Step 2: Set Up Your First Server

#### Option A: Use Existing Server (Recommended)
If you already have a server from Hetzner, DigitalOcean, AWS, etc.:

1. **SSH into your server**
2. **Install Docker** (if not already installed):
   ```bash
   curl -fsSL https://get.docker.com -o get-docker.sh
   sudo sh get-docker.sh
   sudo usermod -aG docker $USER
   ```

3. **Install Docker Compose**:
   ```bash
   sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
   sudo chmod +x /usr/local/bin/docker-compose
   ```

#### Option B: Create New Server
1. Create a server from your preferred provider:
   - **Hetzner**: CX21 (€6.66/month) or CPX21 (€12.96/month)
   - **DigitalOcean**: Basic Droplet ($6/month)
   - **AWS**: t3.micro or t3.small
   - **Any VPS**: Minimum 2GB RAM, 1 CPU core

2. **Install Docker and Docker Compose** (see Option A above)

### Step 3: Connect Server to Coolify

1. **In Coolify Dashboard**:
   - Go to **Servers** → **Add Server**
   - Choose **Connect Existing Server**

2. **On Your Server**:
   - Run the connection command provided by Coolify
   - This will install the Coolify agent on your server
   - The server will appear in your Coolify dashboard

3. **Verify Connection**:
   - Check server status in Coolify dashboard
   - Should show "Connected" and "Healthy"

---

## 📦 Deploy Lead Orchestra Application

### Step 1: Add Git Repository

1. In Coolify dashboard, go to **Sources** → **Add Source**
2. **Connect GitHub/GitLab**:
   - Click "Connect GitHub" or "Connect GitLab"
   - Authorize Coolify to access your repositories
   - Select your Lead Orchestra repository

   OR

3. **Add Repository Manually**:
   - Repository URL: `https://github.com/your-username/deal-scale-lead-scraper`
   - Branch: `main` or `dev`
   - Authentication: Use personal access token if private repo

### Step 2: Create New Application

1. Go to **Projects** → **New Project**
2. Click **New Application**
3. Select **From Git Repository**
4. Choose your Lead Orchestra repository
5. Select the server you connected earlier

### Step 3: Configure Build Settings

Coolify will auto-detect your Dockerfile, but you can customize:

```yaml
# Build Configuration
Build Type: Dockerfile
Dockerfile Path: Dockerfile
Build Command: (auto-detected from Dockerfile)
Start Command: pnpm start

# Port Configuration
Port: 3000
Publish Directory: .next

# Resource Limits (adjust based on your server)
Memory Limit: 1GB
CPU Limit: 1.0
```

### Step 4: Set Environment Variables

In the application settings, add these environment variables:

```bash
# Application
NODE_ENV=production
PORT=3000

# Next.js
NEXT_PUBLIC_APP_URL=https://your-domain.com

# Authentication (if using)
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=your-secret-key-here

# Database (if using PostgreSQL)
DATABASE_URL=postgresql://user:password@host:5432/database

# Redis (if using)
REDIS_URL=redis://host:6379
UPSTASH_REDIS_REST_URL=https://your-redis.upstash.io
UPSTASH_REDIS_REST_TOKEN=your-token

# Analytics (if using)
NEXT_PUBLIC_GA_ID=your-ga-id
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=your-domain.com

# Add any other environment variables your app needs
```

### Step 5: Configure Domain & SSL

1. **Add Custom Domain**:
   - Go to application settings → **Domains** tab
   - Click **Add Domain**
   - Enter your domain: `yourdomain.com`
   - Add `www.yourdomain.com` if needed

2. **DNS Configuration**:
   Add these DNS records to your domain provider:
   ```
   A     @              -> YOUR_COOLIFY_SERVER_IP
   A     www            -> YOUR_COOLIFY_SERVER_IP
   CNAME *              -> your-coolify-instance.coolify.io (if using Coolify subdomain)
   ```

3. **SSL Certificate**:
   - Coolify automatically provisions Let's Encrypt SSL
   - Wait 5-10 minutes for certificate to be issued
   - Your site will be available at `https://yourdomain.com`

### Step 6: Deploy

1. Click **Deploy** button
2. Coolify will:
   - Pull your code from Git
   - Build the Docker image
   - Start the container
   - Set up SSL certificate
   - Make your app live

3. **Monitor Deployment**:
   - Watch build logs in real-time
   - Check for any errors
   - Verify application is running

---

## 🗄️ Database Setup (Optional)

If your application needs a database:

### Option 1: Use Coolify's Built-in PostgreSQL

1. Go to **Databases** → **New Database**
2. Choose **PostgreSQL**
3. Select your server
4. Set database name: `leadorchestra`
5. Note the connection details
6. Use the connection string in your app's `DATABASE_URL`

### Option 2: Use External Database

- **Upstash Redis**: Free tier available
- **Supabase PostgreSQL**: Free tier available
- **Railway PostgreSQL**: Free tier available
- **Any managed database**: Use connection string in environment variables

---

## 🔄 Automatic Deployments

### Enable Auto-Deploy

1. Go to application settings → **Deployments**
2. Enable **Auto Deploy**
3. Choose trigger:
   - **On Push**: Deploys on every git push
   - **On Tag**: Deploys only on git tags
   - **Manual**: Deploy only when you click deploy

### Webhook Deployments

1. Go to application settings → **Webhooks**
2. Copy the webhook URL
3. Add to your GitHub/GitLab repository:
   - **GitHub**: Settings → Webhooks → Add webhook
   - **GitLab**: Settings → Webhooks → Add webhook
4. Paste Coolify webhook URL
5. Select events: `push`, `merge_request`

---

## 📊 Monitoring & Logs

### View Logs

1. Go to your application in Coolify dashboard
2. Click **Logs** tab
3. View real-time application logs
4. Filter by log level (info, error, warn)

### Resource Monitoring

1. Go to **Servers** → Select your server
2. View:
   - CPU usage
   - Memory usage
   - Disk usage
   - Network traffic

### Application Health

- Coolify automatically monitors your application
- Health checks run every 30 seconds
- Failed health checks trigger alerts

---

## 🔧 Advanced Configuration

### Custom Dockerfile

Your project already has a `Dockerfile`. Coolify will use it automatically. If you need to customize:

```dockerfile
FROM node:20-alpine AS base
WORKDIR /app
ENV PNPM_HOME="/root/.local/share/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
RUN pnpm install --frozen-lockfile

FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm run build

FROM base AS runner
ENV NODE_ENV=production
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
RUN pnpm install --prod --frozen-lockfile
EXPOSE 3000
CMD ["pnpm", "start"]
```

### Resource Limits

Adjust based on your server capacity:

```yaml
# For small server (2GB RAM)
memory_limit: 512MB
cpu_limit: 0.5

# For medium server (4GB RAM)
memory_limit: 1GB
cpu_limit: 1.0

# For large server (8GB+ RAM)
memory_limit: 2GB
cpu_limit: 2.0
```

### Health Checks

Configure health check endpoint:

```yaml
Health Check Path: /api/health
Health Check Interval: 30s
Health Check Timeout: 10s
Health Check Retries: 3
```

---

## 💰 Cost Optimization

### Monthly Costs

**Single Server Setup**:
- Coolify base: $5/month
- Server (Hetzner CX21): €6.66/month (~$7.20)
- **Total: ~$12.20/month**

**Multi-Server Setup**:
- Coolify base: $5/month
- Server 1: $3/month
- Server 2: $3/month
- Server costs: Varies by provider
- **Total: $11 + server costs**

### Tips to Reduce Costs

1. **Use affordable VPS providers**:
   - Hetzner: €6.66/month (CX21)
   - DigitalOcean: $6/month (Basic)
   - Contabo: €4.99/month

2. **Optimize resource usage**:
   - Set appropriate memory/CPU limits
   - Use smaller server if possible
   - Monitor and adjust based on actual usage

3. **Combine services**:
   - Run multiple apps on one server
   - Use built-in databases instead of external services

---

## 🆘 Troubleshooting

### Build Failures

**Issue**: Build fails with dependency errors
**Solution**:
```bash
# Check build logs in Coolify
# Verify Dockerfile is correct
# Ensure all dependencies are in package.json
```

### Application Won't Start

**Issue**: Container starts but app crashes
**Solution**:
1. Check application logs in Coolify
2. Verify all environment variables are set
3. Check port configuration (should be 3000)
4. Verify database connection if using one

### SSL Certificate Issues

**Issue**: SSL certificate not provisioning
**Solution**:
1. Verify DNS records are correct
2. Wait 10-15 minutes for propagation
3. Check domain is pointing to correct IP
4. Try manual SSL certificate renewal

### Database Connection Issues

**Issue**: Can't connect to database
**Solution**:
1. Verify `DATABASE_URL` environment variable
2. Check database is running in Coolify
3. Verify network connectivity between app and database
4. Check database credentials

---

## 🔄 CI/CD Integration

### GitHub Actions Deployment

Create `.github/workflows/deploy-coolify.yml`:

```yaml
name: Deploy to Coolify

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger Coolify Deployment
        run: |
          curl -X POST ${{ secrets.COOLIFY_WEBHOOK_URL }} \
            -H "Content-Type: application/json"
```

Add `COOLIFY_WEBHOOK_URL` to your GitHub repository secrets.

---

## 📚 Additional Resources

- [Coolify Documentation](https://coolify.io/docs/)
- [Coolify Pricing](https://coolify.io/pricing)
- [Coolify Support](https://coolify.io/support)
- [Server Requirements](https://coolify.io/docs/requirements)

---

## ✅ Deployment Checklist

- [ ] Signed up for Coolify pay-as-you-go
- [ ] Set up server (or connected existing)
- [ ] Connected server to Coolify
- [ ] Added Git repository to Coolify
- [ ] Created new application
- [ ] Configured build settings
- [ ] Set all environment variables
- [ ] Added custom domain
- [ ] Configured DNS records
- [ ] SSL certificate issued
- [ ] Application deployed successfully
- [ ] Tested application functionality
- [ ] Set up automatic deployments
- [ ] Configured monitoring/alerts

---

*Your Lead Orchestra application is now live on Coolify! 🚀*

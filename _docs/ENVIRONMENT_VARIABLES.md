# Environment Variables Configuration

This document outlines all the environment variables required for the DealScale application to function properly.

## Required Environment Variables

### NextAuth Configuration
```bash
# NextAuth secret for JWT signing and encryption
NEXTAUTH_SECRET=your-nextauth-secret-here

# NextAuth URL for callbacks and redirects
NEXTAUTH_URL=http://localhost:3000
```

### DealScale API Configuration
```bash
# DealScale API base URL (optional, defaults to https://api.dealscale.io)
DEALSCALE_API_BASE=https://api.dealscale.io
```

### Social OAuth Providers

#### LinkedIn OAuth
```bash
# LinkedIn OAuth client credentials
LINKEDIN_CLIENT_ID=your-linkedin-client-id
LINKEDIN_CLIENT_SECRET=your-linkedin-client-secret
LINKEDIN_REDIRECT_URI=https://qmunpzmthgpekebwjazo.supabase.co/auth/v1/callback
```

#### Facebook OAuth
```bash
# Facebook OAuth client credentials
FACEBOOK_CLIENT_ID=your-facebook-client-id
FACEBOOK_CLIENT_SECRET=your-facebook-client-secret
FACEBOOK_REDIRECT_URI=https://qmunpzmthgpekebwjazo.supabase.co/auth/v1/callback
```

### Exit Intent Controls
```bash
# Optional: gate the exit-intent modal to avoid layout clipping caused by
# lazy-loaded sections. Leave unset or any value other than "true" to keep
# the detector disabled by default.
NEXT_PUBLIC_ENABLE_EXIT_INTENT=false
# Optional: short-lived cooldown after the modal is dismissed (milliseconds)
# Defaults to 2000 if omitted or invalid.
NEXT_PUBLIC_EXIT_INTENT_SNOOZE_MS=2000
# Optional: emit detailed console logs for the exit intent flow when troubleshooting
NEXT_PUBLIC_EXIT_INTENT_DEBUG=false
```

### Google Analytics Configuration
```bash
# Google Analytics 4 Measurement ID (required for analytics tracking)
NEXT_PUBLIC_GOOGLE_ANALYTICS=G-XXXXXXXXX

# Enable automatic analytics consent (required for Google Analytics to load)
# Set to "true" to automatically grant consent and load analytics
# If not set or set to anything other than "true", analytics will be blocked
# until user explicitly grants consent via consent UI
NEXT_PUBLIC_ANALYTICS_AUTOLOAD=true
```

**Note:** Both `NEXT_PUBLIC_GOOGLE_ANALYTICS` and `NEXT_PUBLIC_ANALYTICS_AUTOLOAD=true` must be set for Google Analytics to load automatically. Without `NEXT_PUBLIC_ANALYTICS_AUTOLOAD=true`, analytics will be blocked by the consent mechanism.

## Environment Setup Instructions

### Development (.env.local)
Create a `.env.local` file in your project root with the following variables:

```bash
# NextAuth Configuration
NEXTAUTH_SECRET=your-development-secret-here
NEXTAUTH_URL=http://localhost:3000

# DealScale API
DEALSCALE_API_BASE=https://api.dealscale.io

# LinkedIn OAuth (optional for development)
LINKEDIN_CLIENT_ID=your-linkedin-client-id
LINKEDIN_CLIENT_SECRET=your-linkedin-client-secret
LINKEDIN_REDIRECT_URI=https://qmunpzmthgpekebwjazo.supabase.co/auth/v1/callback

# Facebook OAuth (optional for development)
FACEBOOK_CLIENT_ID=your-facebook-client-id
FACEBOOK_CLIENT_SECRET=your-facebook-client-secret
FACEBOOK_REDIRECT_URI=https://qmunpzmthgpekebwjazo.supabase.co/auth/v1/callback
```

### Production (Vercel/Deployment Platform)
Set the following environment variables in your deployment platform:

1. **NEXTAUTH_SECRET** - Generate a secure random string
2. **NEXTAUTH_URL** - Your production domain (e.g., https://yourdomain.com)
3. **DEALSCALE_API_BASE** - Production API URL
4. **LINKEDIN_CLIENT_ID** & **LINKEDIN_CLIENT_SECRET** - LinkedIn app credentials
5. **FACEBOOK_CLIENT_ID** & **FACEBOOK_CLIENT_SECRET** - Facebook app credentials
6. **LINKEDIN_REDIRECT_URI** & **FACEBOOK_REDIRECT_URI** - OAuth callback URLs
7. **NEXT_PUBLIC_GOOGLE_ANALYTICS** - Google Analytics 4 Measurement ID (e.g., G-XXXXXXXXX)
8. **NEXT_PUBLIC_ANALYTICS_AUTOLOAD** - Set to `true` to enable automatic analytics consent

## OAuth Provider Setup

### LinkedIn OAuth Setup
1. Go to [LinkedIn Developer Console](https://www.linkedin.com/developers/)
2. Create a new app or use existing app
3. Add the redirect URI: `https://qmunpzmthgpekebwjazo.supabase.co/auth/v1/callback`
4. Request permissions for: `openid`, `profile`, `email`
5. Copy Client ID and Client Secret to environment variables

### Facebook OAuth Setup
1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Create a new app or use existing app
3. Add Facebook Login product
4. Add the redirect URI: `https://qmunpzmthgpekebwjazo.supabase.co/auth/v1/callback`
5. Request permissions for: `email`, `public_profile`
6. Copy App ID and App Secret to environment variables

### Observability Telemetry
```bash
# Optional: webhook that receives guard telemetry payloads from the frontend
DATA_GUARD_WEBHOOK=https://observability.example.com/data-guards

# Optional: override the client endpoint that sends guard telemetry
NEXT_PUBLIC_DATA_GUARD_ENDPOINT=https://your-domain.com/api/internal/data-guards
```

## Security Notes

- **Never commit environment variables to version control**
- **Use different secrets for development and production**
- **Rotate secrets regularly**
- **Use strong, randomly generated secrets**
- **Restrict OAuth app permissions to minimum required**

## Troubleshooting

### Common Issues

1. **OAuth providers not showing up**: Ensure client ID and secret are set
2. **Callback URL mismatch**: Verify redirect URIs match exactly in provider settings
3. **NextAuth errors**: Check NEXTAUTH_SECRET and NEXTAUTH_URL are set correctly
4. **API connection issues**: Verify DEALSCALE_API_BASE is correct and accessible

### Analytics Not Loading in Production

**Symptom**: Google Analytics not loading, console shows `NEXT_PUBLIC_ANALYTICS_AUTOLOAD: undefined`

**Root Cause**: `NEXT_PUBLIC_*` environment variables are inlined at BUILD TIME. If the variable isn't set in Vercel before the build, it becomes `undefined` in the bundle.

**Solution**:

1. **Verify Variable is Set in Vercel**:
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Ensure `NEXT_PUBLIC_ANALYTICS_AUTOLOAD` is set to `true` (exact string, not boolean)
   - **CRITICAL**: Ensure it's set for **Production** environment (not just Preview/Development)
   - Verify `NEXT_PUBLIC_GOOGLE_ANALYTICS` is also set for Production

2. **Trigger New Build**:
   - Variables set after a build won't be inlined until a new build
   - Option 1: Push a new commit (even a small change)
   - Option 2: In Vercel Dashboard → Deployments → Redeploy latest
   - Option 3: Clear build cache and redeploy

3. **Verify in Build Logs**:
   - Check Vercel build logs to confirm variables are being read
   - Look for any warnings about missing environment variables

4. **Check Production Console**:
   - After deployment, check browser console
   - Should see: `NEXT_PUBLIC_ANALYTICS_AUTOLOAD: "true"` (string, not undefined)
   - If still undefined, the variable wasn't set before the build

**Note**: The code includes a fallback that enables autoload if `NEXT_PUBLIC_ANALYTICS_AUTOLOAD` is undefined but `NEXT_PUBLIC_GOOGLE_ANALYTICS` is present. However, you should still set the variable explicitly in Vercel for clarity.

### Testing OAuth Setup

You can test if OAuth providers are configured correctly by checking the NextAuth configuration:

```typescript
// The providers will only be included if environment variables are set
console.log(authOptions.providers.length); // Should be > 1 if OAuth is configured
```

# IndexNow Setup for Lead Orchestra

IndexNow is an open protocol that allows websites to instantly inform search engines about URL changes on their website. This setup automates IndexNow submissions for Lead Orchestra.

## 🔑 Key File

The IndexNow key file must be publicly accessible at:
```
https://leadorchestra.com/<key>.txt
```

**Current key file:** `public/06663aa83dc949d6bde61889ae81d42f.txt`

This file contains only the key itself (no other content). The key is **public by design** - it's used to verify domain ownership, similar to Google Search Console verification files.

## 🔐 Environment Variables

Add to your `.env` file or GitHub Secrets:

```bash
INDEXNOW_KEY=06663aa83dc949d6bde61889ae81d42f
INDEXNOW_CANONICAL_BASE=https://leadorchestra.com
```

### GitHub Secrets Setup

1. Go to your repository **Settings → Secrets and variables → Actions**
2. Click **New repository secret**
3. Add:
   - **Name:** `INDEXNOW_KEY`
   - **Value:** `06663aa83dc949d6bde61889ae81d42f`

## 📦 Usage

### Manual Submission

Submit specific URLs:
```bash
pnpm run submit:indexnow urls https://leadorchestra.com/about https://leadorchestra.com/pricing
```

Submit sitemap:
```bash
pnpm run submit:indexnow:sitemap
```

### Automated via GitHub Actions

The workflow (`.github/workflows/indexnow.yml`) automatically:

1. **On push to main** - Detects changed files and submits corresponding URLs
2. **On schedule** - Submits sitemap every 12 hours
3. **Manual trigger** - Can be run manually with custom URLs

### Programmatic Usage

```typescript
import { submitUrls, submitSitemap } from '@/tools/deploy/submit-indexnow';

// Submit specific URLs
await submitUrls([
  'https://leadorchestra.com/about',
  'https://leadorchestra.com/pricing'
]);

// Submit sitemap
await submitSitemap();
```

## 🚀 How It Works

1. **GitHub Actions detects changes** in:
   - `landing/src/app/**` (Next.js routes)
   - `landing/content/**` (content files)
   - `landing/public/sitemap*.xml` (sitemap files)

2. **Maps file paths to URLs**:
   - `src/app/about/page.tsx` → `https://leadorchestra.com/about`
   - `content/blog/post.md` → `https://leadorchestra.com/blog/post`

3. **Submits to IndexNow API** at `https://www.bing.com/indexnow`

4. **IndexNow distributes** to participating search engines:
   - Bing
   - Yandex
   - Seznam.cz
   - Naver

## 📋 API Limits

- **Maximum 10,000 URLs per request**
- **No rate limits** (but be reasonable)
- **Instant indexing** (usually within seconds)

## 🔍 Verification

After deployment, verify the key file is accessible:
```bash
curl https://leadorchestra.com/06663aa83dc949d6bde61889ae81d42f.txt
```

Should return: `06663aa83dc949d6bde61889ae81d42f`

## 🛠️ Troubleshooting

### Key file not accessible
- Ensure the file is in `public/` directory
- Verify it's deployed to production
- Check file permissions

### Submissions failing
- Verify `INDEXNOW_KEY` is set correctly
- Check GitHub Actions logs
- Ensure URLs are absolute and valid

### No URLs detected
- Check file paths match workflow patterns
- Verify git history is available (fetch-depth: 2)

## 📚 Resources

- [IndexNow Protocol](https://www.indexnow.org/)
- [Bing IndexNow API](https://www.bing.com/indexnow)
- [IndexNow Documentation](https://www.indexnow.org/documentation)


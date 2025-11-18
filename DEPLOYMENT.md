# 🚀 Deployment Guide - Tobago Visitor Experience Survey

## Quick Deploy to Vercel

### Prerequisites
- GitHub repository: https://github.com/ultratelecom/rate-tobago ✅
- Neon PostgreSQL database configured ✅
- Vercel account (free tier works)

### Deployment Steps

#### 1. Import Project to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/new)
2. Click "Import Project"
3. Select "Import Git Repository"
4. Choose `ultratelecom/rate-tobago` from your GitHub repositories
5. Click "Import"

#### 2. Configure Environment Variables

In the Vercel project settings, add the following environment variable:

**Required:**
```
DATABASE_URL = postgresql://neondb_owner:npg_LHs0SXlA7VyJ@ep-icy-rain-a4v0zjxg-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
```

**Note:** For security, you may want to create a new database user with limited permissions for production.

#### 3. Deploy

1. Click "Deploy"
2. Wait for the build to complete (usually 2-3 minutes)
3. Your site will be live at `https://rate-tobago.vercel.app` (or your custom domain)

### Post-Deployment

#### Verify Database Connection
1. Visit your deployed site
2. Complete a test survey
3. Check Neon database to confirm the data was saved

#### Custom Domain (Optional)
1. Go to Vercel Project Settings → Domains
2. Add your custom domain (e.g., `survey.visittobago.gov.tt`)
3. Follow Vercel's DNS configuration instructions

## 🔧 Build Configuration

The project is already configured for Vercel deployment:

- **Framework**: Next.js 15 (auto-detected)
- **Build Command**: `prisma generate && next build` (configured in `vercel.json`)
- **Install Command**: `npm install`
- **Output Directory**: `.next` (default)

## 📊 Monitoring & Analytics

### View Survey Responses

**Option 1: Prisma Studio (Local)**
```bash
npx prisma studio
```

**Option 2: Neon Console**
1. Go to [Neon Console](https://console.neon.tech)
2. Navigate to your project
3. Use the SQL Editor to query:
```sql
SELECT * FROM survey_responses ORDER BY created_at DESC;
```

**Option 3: API Endpoint**
Visit: `https://your-domain.vercel.app/api/survey`

### Database Backups

Neon automatically handles backups. Configure additional backup schedules in the Neon console if needed.

## 🐛 Troubleshooting

### Build Fails
- **Error**: "Prisma Client could not be generated"
  - **Solution**: Ensure `DATABASE_URL` environment variable is set in Vercel

### Database Connection Issues
- **Error**: "Can't reach database server"
  - **Solution**: Verify the `DATABASE_URL` is correct and Neon database is active
  - Check Neon project status in the Neon console

### Images Not Loading
- **Issue**: Images appear broken
  - **Solution**: Ensure images are in the `public/images` directory
  - Clear Vercel cache and redeploy

## 🔒 Security Recommendations

1. **Environment Variables**: Never commit `.env.local` to git (it's in `.gitignore`)
2. **Database Access**: Consider creating a separate database user for production with restricted permissions
3. **API Rate Limiting**: Add rate limiting to prevent abuse (consider Vercel Edge Config)
4. **Email Validation**: Current implementation validates format only; consider adding verification if sending promotional emails

## 📈 Scaling Considerations

### Current Setup Handles:
- **Neon Free Tier**: Up to 512 MB storage, sufficient for thousands of survey responses
- **Vercel Free Tier**: Unlimited bandwidth, 100 GB/month

### If Traffic Increases:
1. Upgrade Neon plan for more storage and compute
2. Add Redis caching for frequently accessed data
3. Implement CDN for static assets (already handled by Vercel)
4. Add database connection pooling (already configured via Neon's pooler)

## 🎯 Next Steps After Deployment

1. ✅ Test the survey flow end-to-end
2. ✅ Share the URL with stakeholders
3. ✅ Monitor initial responses
4. ✅ Set up analytics (Google Analytics, Plausible, etc.)
5. ✅ Configure custom domain if needed
6. ✅ Set up automated email notifications for new responses (optional)

## 📞 Support

For deployment issues:
- Vercel Documentation: https://vercel.com/docs
- Neon Documentation: https://neon.tech/docs
- Next.js Documentation: https://nextjs.org/docs

---

**Deployment Status**: ✅ Ready to Deploy
**Last Updated**: November 18, 2025


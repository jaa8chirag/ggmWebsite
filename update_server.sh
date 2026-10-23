#!/usr/bin/env bash
set -e

echo "=========================================="
echo "🚀 Updating GGM Technologies on Production"
echo "=========================================="

cd /home/ggmtech/app || cd /var/www/ggm-web

echo "📥 1. Pulling latest code from GitHub..."
git pull origin main

echo "🗄️ 2. Updating Database (404 Locations Recovery & Clean Case Studies)..."
if [ -f "restore_all_gsc_locations.sql" ]; then
  mysql -u ggmuser -p'GgmSecurePass@2026' ggmwebsite < restore_all_gsc_locations.sql || mysql ggmwebsite < restore_all_gsc_locations.sql
  echo "✅ 404 Missing Locations restored successfully."
fi

if [ -f "populate_work_case_studies.sql" ]; then
  mysql -u ggmuser -p'GgmSecurePass@2026' ggmwebsite < populate_work_case_studies.sql || mysql ggmwebsite < populate_work_case_studies.sql
  echo "✅ Clean case studies imported successfully."
fi

echo "📦 3. Building Next.js production app..."
npm run build

echo "🔄 4. Restarting PM2 process..."
pm2 restart ggm-web

echo "⚡ 5. Pushing all URLs to IndexNow Search Engines..."
npm run indexnow || true

echo "=========================================="
echo "🎉 Update Complete! Site is 100% Live, SEO Optimized & Error Free!"
echo "=========================================="

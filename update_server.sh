#!/usr/bin/env bash
set -e

echo "=========================================="
echo "🚀 Updating GGM Technologies on Production"
echo "=========================================="

cd /var/www/ggm-web

echo "📥 1. Pulling latest code from GitHub..."
git pull origin main

echo "🗄️ 2. Updating Database (Work Case Studies & Digital Marketing Services)..."
if [ -f "populate_work_case_studies.sql" ]; then
  mysql -u ggmuser -p'GgmSecurePass@2026' ggmwebsite < populate_work_case_studies.sql || mysql ggmwebsite < populate_work_case_studies.sql
  echo "✅ Case studies imported successfully."
fi

if [ -f "add_digital_marketing_services.sql" ]; then
  mysql -u ggmuser -p'GgmSecurePass@2026' ggmwebsite < add_digital_marketing_services.sql || mysql ggmwebsite < add_digital_marketing_services.sql
  echo "✅ Digital marketing services imported successfully."
fi

echo "📦 3. Building Next.js production app..."
npm run build

echo "🔄 4. Restarting PM2 process..."
pm2 restart ggm-web

echo "=========================================="
echo "🎉 Update Complete! Site is live with new Work & Services!"
echo "=========================================="

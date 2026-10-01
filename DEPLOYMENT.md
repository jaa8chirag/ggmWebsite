# GGM Technologies — Production Server & Deployment Guide

Yeh document new2secure VPS par **GGM Technologies (`ggmtechnologies.com`)** ke setup, deployment aur future updates ke saare instructions aur commands ko record karta hai.

---

## 🖥️ Server Details

- **Server IP:** `160.187.87.79`
- **OS:** AlmaLinux 9 (RHEL-based)
- **Web Server:** Nginx Reverse Proxy (Port 80/443 -> Port 3000)
- **Node.js Version:** v20 LTS
- **Process Manager:** PM2 (Service: `pm2-root.service`)
- **Database:** MariaDB Server (Local on VPS, Port 3306)
- **Live URL:** [https://ggmtechnologies.com](https://ggmtechnologies.com)
- **Admin Panel:** [https://ggmtechnologies.com/admin](https://ggmtechnologies.com/admin)
- **Server Project Path:** `/var/www/ggm-web`
- **GitHub Repository:** [https://github.com/jaa8chirag/ggmWebsite.git](https://github.com/jaa8chirag/ggmWebsite.git)

---

## 🚀 1. Future me CODE Update kaise karein (Workflow)

Jab bhi aap apne local system par naya feature banayein ya UI change karein:

### Step 1 (Local PC par):
```bash
git add .
git commit -m "Naya feature ya bug fix"
git push origin main
```

### Step 2 (Server par):
Server me login karke bas ye **1 single command** run karein:
```bash
cd /var/www/ggm-web && git pull && npm run build && pm2 restart ggm-web
```
*Yeh command GitHub se naya code download karegi, production build generate karegi, aur zero-downtime ke saath site restart kar degi.*

---

## 🗄️ 2. DATABASE Updates & Management

### Option A: Admin Panel se (Content updates)
Website ka 95% content (Services, Locations, Blogs, Testimonials, Case Studies, Settings, SEO) dynamic hai.
- Login karein: `https://ggmtechnologies.com/admin`
- Yahan se jo bhi change karenge wo **turant live** database me update ho jata hai.

### Option B: Direct SQL Terminal se
Agar aapko directly database me queries chalani ho ya backup lena ho:
```bash
# MariaDB shell me login karein
mysql -u ggmuser -p'GgmSecurePass@2026' ggmwebsite
```

### Option C: Database ka naya Backup lena (Dump Export)
```bash
mysqldump -u ggmuser -p'GgmSecurePass@2026' ggmwebsite > /var/www/ggm-web/backup_$(date +%F).sql
```

### Option D: Missing Service & Location Data Import karna (465 Locations + 171 Service Locations)
Agar naye server par Service Location pages (`/services/.../...`) ya Location data nahi dikh raha:
```bash
# Step 1: Server par latest code pull karein
cd /var/www/ggm-web && git pull

# Step 2: Location aur Service-Location data import karein
mysql -u ggmuser -p'GgmSecurePass@2026' ggmwebsite < /var/www/ggm-web/import_service_locations.sql

# Step 3: Website restart karein
pm2 restart ggm-web
```

---

## ⚙️ 3. Environment Variables (`.env`)

Server par environment file path: `/var/www/ggm-web/.env`

```env
NEXT_PUBLIC_SITE_URL=https://ggmtechnologies.com
DATABASE_URL="mysql://ggmuser:GgmSecurePass@2026@127.0.0.1:3306/ggmwebsite"
ADMIN_EMAIL="admin@ggmtechnologies.com"
ADMIN_PASSWORD="ChangeMe123!"
```

Agar `.env` me kuch badalna ho:
```bash
nano /var/www/ggm-web/.env
# Changes karein -> Ctrl + O dabayein -> Enter -> Ctrl + X dabayein
pm2 restart ggm-web
```

---

## 🌐 4. Nginx & Cloudflare Configuration

- **Cloudflare DNS:**
  - `A` record `@` -> `160.187.87.79` (Proxied - Orange Cloud)
  - `A` record `www` -> `160.187.87.79` (Proxied - Orange Cloud)
- **Cloudflare SSL/TLS:** Mode **"Flexible"**
- **Nginx Config Path:** `/etc/nginx/conf.d/ggm-web.conf`

Agar Nginx test ya restart karna ho:
```bash
nginx -t
systemctl restart nginx
```

---

## 🔍 5. Troubleshooting & Useful PM2 Commands

```bash
# App ka status check karein
pm2 status

# Live logs check karein (Errors dekhne ke liye)
pm2 logs ggm-web

# App restart karein
pm2 restart ggm-web

# Server reboot hone par auto-start settings save karein
pm2 save
```

---

## ⚡ 6. One-Word Shortcut (Server par set karein)

Server terminal me ye command ek baar chala dein:
```bash
echo "alias update-site='cd /var/www/ggm-web && git pull && npm run build && pm2 restart ggm-web'" >> ~/.bashrc
source ~/.bashrc
```

Iske baad aage se jab bhi update karna ho, terminal me sirf likhein:
```bash
update-site
```
Aur pura update automatic ho jayega!

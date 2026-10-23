const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

const rawData = `
https://ggmtechnologies.com/services/mobile-app-development/mahakali-caves
https://ggmtechnologies.com/services/lead-generation/bihar-sharif-3
https://ggmtechnologies.com/services/e-commerce-Development/barakhamba-road-3
https://ggmtechnologies.com/services/seo/narendra-nagar
https://ggmtechnologies.com/services/mobile-app-development/doddanekundi
https://ggmtechnologies.com/services/seo/doddanekundi
https://ggmtechnologies.com/services/mobile-app-development/horamavu
https://ggmtechnologies.com/services/website-development-services/zinj
https://ggmtechnologies.com/services/mobile-app-development/latur
https://ggmtechnologies.com/services/website-development-services/krishnarajapuram
https://ggmtechnologies.com/services/website-development-services/attiguppe
https://ggmtechnologies.com/services/seo/hingoli
https://ggmtechnologies.com/services/website-development-services/trimurthi-nagar
https://ggmtechnologies.com/services/seo/kuvempu
https://ggmtechnologies.com/services/seo/dairy-circle
https://ggmtechnologies.com/services/mobile-app-development/pattandur
https://ggmtechnologies.com/services/e-commerce-Development/udham-singh-nagar-3
https://ggmtechnologies.com/services/mobile-app-development/kasturi-park
https://ggmtechnologies.com/services/shopify-website-development/lajpat-nagar-3
https://ggmtechnologies.com/services/seo/kadubeesanahalli
https://ggmtechnologies.com/services/website-development-services/magarpatta-city
https://ggmtechnologies.com/services/website-development-services/krishna-rajendra-market
https://ggmtechnologies.com/services/website-development-services/sakinaka
https://ggmtechnologies.com/services/mobile-app-development/prem-nagar
https://ggmtechnologies.com/services/website-development-services/national-college
https://ggmtechnologies.com/services/website-development-services/wadala-road
https://ggmtechnologies.com/services/seo/chembur-west
https://ggmtechnologies.com/services/social-media-marketing/faridabad-3
https://ggmtechnologies.com/services/website-development-services/narendra-nagar
https://ggmtechnologies.com/services/e-commerce-Development/dwarka-sector-12-3
https://ggmtechnologies.com/services/shopify-website-development/palam-vihar-3
https://ggmtechnologies.com/services/website-development-services/hosa-road
https://ggmtechnologies.com/services/website-development-services/sangli
https://ggmtechnologies.com/services/website-development-services/shivaji-nagar
https://ggmtechnologies.com/services/e-commerce-Development/dilshad-garden-3
https://ggmtechnologies.com/services/mobile-app-development/agara
https://ggmtechnologies.com/services/seo-2
https://ggmtechnologies.com/services/seo/jalahalli
https://ggmtechnologies.com/services/website-development-services/kengeri
https://ggmtechnologies.com/services/seo/cuffe-parade-colaba
https://ggmtechnologies.com/services/seo/m-g-road
https://ggmtechnologies.com/services/mobile-app-development/wadala-road
https://ggmtechnologies.com/services/website-development-services/gondia
https://ggmtechnologies.com/services/mobile-app-development/kanpur-dehat-3
https://ggmtechnologies.com/services/mobile-app-development/krishnarajapuram
https://ggmtechnologies.com/services/website-development-services/dairy-circle
https://ggmtechnologies.com/services/website-development-services/kalyan-nagar
https://ggmtechnologies.com/services/e-commerce-Development/mahakali-caves
https://ggmtechnologies.com/services/mobile-app-development/sakinaka
https://ggmtechnologies.com/services/mobile-app-development/rajouri-garden-3
https://ggmtechnologies.com/services/e-commerce-Development/faridabad-3
https://ggmtechnologies.com/services/mobile-app-development/kharadi
https://ggmtechnologies.com/services/website-development-services/latur
https://ggmtechnologies.com/services/mobile-app-development/narendra-nagar
https://ggmtechnologies.com/services/website-development-services/diamond-garden
https://ggmtechnologies.com/services/mobile-app-development/nallurahalli
https://ggmtechnologies.com/services/mobile-app-development/adarsh-nagar-3
https://ggmtechnologies.com/services/website-development-services/malad
https://ggmtechnologies.com/services/website-development-services/vidya-vihar
https://ggmtechnologies.com/services/website-development-services/chembur
https://ggmtechnologies.com/services/website-development-services/h-b-r-layout-3rd-block
https://ggmtechnologies.com/services/seo/h-b-r-layout-3rd-block
https://ggmtechnologies.com/services/seo/hosa-road
https://ggmtechnologies.com/services/seo/kharadi
https://ggmtechnologies.com/services/website-development-services/jayadeva-hospital-jayanagar
https://ggmtechnologies.com/services/mobile-app-development/dahisar
https://ggmtechnologies.com/services/website-development-services/diraz
https://ggmtechnologies.com/services/website-development-services/nagpur
https://ggmtechnologies.com/services/seo/washim
https://ggmtechnologies.com/services/seo/jayadeva-hospital-jayanagar
https://ggmtechnologies.com/services/mobile-app-development/kurla-east
https://ggmtechnologies.com/services/seo/kanjurmarg
https://ggmtechnologies.com/services/shopify-website-development/west-delhi-3
https://ggmtechnologies.com/services/seo/national-college
https://ggmtechnologies.com/services/mobile-app-development/ad-dakhiliyah
https://ggmtechnologies.com/services/mobile-app-development/indiranagar
https://ggmtechnologies.com/services/website-development-services/gudaibiya
https://ggmtechnologies.com/blog/how-to-lower-cost-per-lead-in-google-ads-10-proven-tips-2
https://ggmtechnologies.com/services/mobile-app-development/shadipur-3
https://ggmtechnologies.com/services/website-development-services/bagalur
https://ggmtechnologies.com/services/mobile-app-development/whitefield
https://ggmtechnologies.com/services/seo/masjid
https://ggmtechnologies.com/services/seo/gondia
https://ggmtechnologies.com/services/website-development-services/midc
https://ggmtechnologies.com/services/website-development-services/maan
https://ggmtechnologies.com/services/website-development-services/madaba
https://ggmtechnologies.com/services/website-development-services/dasarahalli
https://ggmtechnologies.com/services/website-development-services/shankar-vihar-3
https://ggmtechnologies.com/services/seo/mahalaxmi
https://ggmtechnologies.com/services/seo/kengeri
https://ggmtechnologies.com/services/website-development-services/basti-3
https://ggmtechnologies.com/services/website-development-services/jamshedpur
https://ggmtechnologies.com/services/website-development-services/beed
https://ggmtechnologies.com/services/website-development-services/irbid
https://ggmtechnologies.com/services/website-development-services/raj-bagh-3
https://ggmtechnologies.com/services/website-development-services/sitra
https://ggmtechnologies.com/services/e-commerce-Development/noida-sector-83-3
https://ggmtechnologies.com/services/shopify-website-development/moolchand-3
https://ggmtechnologies.com/services/e-commerce-Development/kirti-nagar-industrial-area-3
https://ggmtechnologies.com/services/website-development-services/mafraq
https://ggmtechnologies.com/services/website-development-services/samaheej
https://ggmtechnologies.com/services/seo/harhua-3
https://ggmtechnologies.com/services/lead-generation/budaun-3
https://ggmtechnologies.com/services/website-development-services/science-centre-mumbai
https://ggmtechnologies.com/services/seo/bellandur-3
https://ggmtechnologies.com/services/e-commerce-Development/sohna-road-gurgaon-3
https://ggmtechnologies.com/services/website-development-services/vimannagar
https://ggmtechnologies.com/services/e-commerce-Development/patel-nagar-3
https://ggmtechnologies.com/services/lead-generation/auraiya-3
https://ggmtechnologies.com/services/seo/mg-road-gurgaon-3
https://ggmtechnologies.com/services/e-commerce-Development/civil-lines-kanpur-3
https://ggmtechnologies.com/services/wordpress-development-2
https://ggmtechnologies.com/services/seo/challaghatta-3
https://ggmtechnologies.com/services/wordpress-development/ambedkar-nagar-3
https://ggmtechnologies.com/services/seo/pattandur
https://ggmtechnologies.com/services/e-commerce-Development/trimurthi-nagar
https://ggmtechnologies.com/services/seo/east-delhi-3
https://ggmtechnologies.com/services/website-development-services/mulund-west
https://ggmtechnologies.com/services/website-development-services/ash-sharqiyah-north
https://ggmtechnologies.com/services/website-development-services/manama
https://ggmtechnologies.com/services/e-commerce-Development/nirman-vihar-3
https://ggmtechnologies.com/services/seo/mulund-west
https://ggmtechnologies.com/services/website-development-services/dadar-west
https://ggmtechnologies.com/services/website-development-services/asimah-governorate
https://ggmtechnologies.com/services/website-development-services/balqa
https://ggmtechnologies.com/services/website-development-services/zarqa
https://ggmtechnologies.com/services/mobile-app-development/dlf-phase-3-3
https://ggmtechnologies.com/services/shopify-website-development-2
https://ggmtechnologies.com/services/website-development-services/amman
https://ggmtechnologies.com/services/e-commerce-Development/tehri-garhwal-3
https://ggmtechnologies.com/services/website-development-services/hamad-town
https://ggmtechnologies.com/services/website-development-services/sanad
https://ggmtechnologies.com/services/e-commerce-Development/chembur-west
https://ggmtechnologies.com/services/shopify-website-development/red-fort-3
https://ggmtechnologies.com/services/mobile-app-development/dadar-3
https://ggmtechnologies.com/services/mobile-app-development/kuvempu
https://ggmtechnologies.com/services/website-development-services/agar-malwa
https://ggmtechnologies.com/services/mobile-app-development/washim
https://ggmtechnologies.com/services/website-development-services/riffa
https://ggmtechnologies.com/services/google-adsense/adarsh-nagar-3
https://ggmtechnologies.com/services/mobile-app-development/hingoli
https://ggmtechnologies.com/services/seo/kurla-east
https://ggmtechnologies.com/services/website-development-services/muscat
https://ggmtechnologies.com/services/e-commerce-Development/daryaganj-3
https://ggmtechnologies.com/services/website-development-services/nashik
https://ggmtechnologies.com/services/lead-generation/pitampura-3
https://ggmtechnologies.com/services/website-development-services/kalyan
https://ggmtechnologies.com/services/e-commerce-Development/sangli
https://ggmtechnologies.com/services/website-development-services/busaiteen
https://ggmtechnologies.com/services/website-development-services/musandam
https://ggmtechnologies.com/services/website-development-services/arad
https://ggmtechnologies.com/services/google-adsense/marathahalli-3
https://ggmtechnologies.com/services/website-development-services/kuvempu
https://ggmtechnologies.com/services/mobile-app-development/kadubeesanahalli
https://ggmtechnologies.com/services/mobile-app-development/bangur-nagar
https://ggmtechnologies.com/services/website-development-services/hawalli-governorate
https://ggmtechnologies.com/services/mobile-app-development/bagalur
https://ggmtechnologies.com/services/lead-generation/malviya-nagar-3
https://ggmtechnologies.com/services/mobile-app-development/chembur
https://ggmtechnologies.com/services/seo/latur
https://ggmtechnologies.com/services/website-development-services/banashankari
https://ggmtechnologies.com/services/website-development-services/chikkabidarakallu
https://ggmtechnologies.com/services/website-development-services/grant-road-3
https://ggmtechnologies.com/services/website-development-services/durrat-al-bahrain
https://ggmtechnologies.com/services/website-development-services/cantonment
https://ggmtechnologies.com/services/website-development-services/aqaba
https://ggmtechnologies.com/services/shopify-website-development/kalindi-kunj-3
https://ggmtechnologies.com/services/website-development-services/whitefield
https://ggmtechnologies.com/blog/lead-generation-vs-prospecting-2
https://ggmtechnologies.com/services/social-media-marketing/shankar-vihar-3
https://ggmtechnologies.com/services/website-development-services/kodigehalli-3
https://ggmtechnologies.com/services/seo/mandala-mankhurd-3
https://ggmtechnologies.com/services/e-commerce-Development/kasturi-nagar
https://ggmtechnologies.com/services/shopify-website-development/ghazipur-3
https://ggmtechnologies.com/services/website-development-services/kadubeesanahalli
https://ggmtechnologies.com/services/mobile-app-development/noida-sector-34-3
https://ggmtechnologies.com/services/e-commerce-Development/mahadevapura
https://ggmtechnologies.com/services/mobile-app-development/malviya-nagar-3
https://ggmtechnologies.com/services/website-development-services/huskur-3
https://ggmtechnologies.com/services/e-commerce-Development/golf-course-road-3
https://ggmtechnologies.com/services/seo/rajatalab-3
https://ggmtechnologies.com/services/lead-generation/bhojpur-3
https://ggmtechnologies.com/services/mobile-app-development/don-bosco-3
https://ggmtechnologies.com/services/lead-generation/gtb-nagar-3
https://ggmtechnologies.com/services/e-commerce-Development/basai-darapur-3
https://ggmtechnologies.com/services/lead-generation/okhla-3
https://ggmtechnologies.com/services/social-media-marketing/byappanahalli-3
https://ggmtechnologies.com/services/lead-generation/okhla-vihar-3
https://ggmtechnologies.com/services/lead-generation/anand-vihar-3
https://ggmtechnologies.com/services/lead-generation/old-rajinder-nagar-3
https://ggmtechnologies.com/services/google-adsense/dabri-mor-3
https://ggmtechnologies.com/services/social-media-marketing/langford-town-3
https://ggmtechnologies.com/services/lead-generation/tughlakabad-3
https://ggmtechnologies.com/services/social-media-marketing/khandeshwar-3
https://ggmtechnologies.com/services/social-media-marketing/dwarka-sector-12-3
https://ggmtechnologies.com/services/lead-generation/nandurbar-3
https://ggmtechnologies.com/services/shopify-website-development/marine-lines-3
https://ggmtechnologies.com/services/lead-generation/inderlok-3
https://ggmtechnologies.com/services/seo/lajpat-nagar-3
https://ggmtechnologies.com/services/lead-generation/pitam-pura-3
https://ggmtechnologies.com/services/social-media-marketing/akola-3
https://ggmtechnologies.com/services/mobile-app-development/ambli-bopal-road-3
https://ggmtechnologies.com/services/website-development-services/washim-3
https://ggmtechnologies.com/services/shopify-website-development/indiranagar-kanpur-3
https://ggmtechnologies.com/services/google-adsense/siddhivinayak-3
https://ggmtechnologies.com/services/wordpress-development/dlf-city-phase-2-3
https://ggmtechnologies.com/services/lead-generation/sant-kabir-nagar-3
https://ggmtechnologies.com/services/lead-generation/rajarajeshwari-nagar-3
https://ggmtechnologies.com/services/lead-generation/indira-nagar-lucknow-3
https://ggmtechnologies.com/services/seo/aligarh-3
https://ggmtechnologies.com/services/mobile-app-development/aali
https://ggmtechnologies.com/services/e-commerce-Development/noida-sector-34-3
https://ggmtechnologies.com/services/mobile-app-development/ad-dhahirah
https://ggmtechnologies.com/services/lead-generation/akola-3
https://ggmtechnologies.com/services/mobile-app-development/hoodi-3
https://ggmtechnologies.com/services/e-commerce-Development/uttam-nagar-east-3
https://ggmtechnologies.com/services/seo/chandauli-3
https://ggmtechnologies.com/services/seo/delta-1-greater-noida-3
https://ggmtechnologies.com/services/website-development-services/jhil-mil-3
https://ggmtechnologies.com/services/website-development-services/azad-nagar-kanpur-3
https://ggmtechnologies.com/services/website-development-services/bidalur-devanahalli-3
https://ggmtechnologies.com/services/seo/vajarahalli-3
https://ggmtechnologies.com/services/website-development-services/defence-colony-3
https://ggmtechnologies.com/services/e-commerce-Development/kanhaiya-nagar-3
https://ggmtechnologies.com/services/website-development-services/mahakali-caves-3
https://ggmtechnologies.com/services/seo/marol-naka-3
https://ggmtechnologies.com/services/e-commerce-Development/panvel-3
https://ggmtechnologies.com/services/mobile-app-development/dahisar-3
https://ggmtechnologies.com/services/e-commerce-Development/azad-nagar-kanpur-3
https://ggmtechnologies.com/services/seo/jamnagar-3
https://ggmtechnologies.com/services/website-development-services/adarsh-nagar-3
https://ggmtechnologies.com/services/e-commerce-Development/sigra-3
https://ggmtechnologies.com/services/shopify-website-development/dwarka-sector-21-3
https://ggmtechnologies.com/services/seo/rithala-3
https://ggmtechnologies.com/services/mobile-app-development/gokulpuri-3
https://ggmtechnologies.com/services/mobile-app-development/shivaji-chowk-3
https://ggmtechnologies.com/services/website-development-services/kalkaji-mandir-3
https://ggmtechnologies.com/services/shopify-website-development/dwarka-sector-9-3
https://ggmtechnologies.com/services/seo/civil-lines-kanpur-3
https://ggmtechnologies.com/services/mobile-app-development/indraprastha-3
https://ggmtechnologies.com/services/e-commerce-Development/dangs-3
https://ggmtechnologies.com/services/mobile-app-development/delhi-3
https://oviz.ggmtechnologies.com/wp-content/uploads/*
http://ggmtechnologies.com/index.php/sample-page/
https://ggmtechnologies.com/wp-*.php
https://ggmtechnologies.com/wp-content/*
https://ggmtechnologies.com/*
https://ggmtechnologies.com/wp-content/themes/seosight-child/*
`;

async function main() {
  const lines = rawData.split('\n').map(l => l.trim()).filter(l => l.startsWith('http'));
  console.log('Total URLs parsed:', lines.length);

  require('dotenv').config({ path: path.join(__dirname, '../.env.local') });
  const conn = await mysql.createConnection({
    uri: process.env.DATABASE_URL
  });

  const categories = {
    wpOrJunk: [],
    serviceSlugWith2: [],
    blogSlugWith2: [],
    serviceLocation: [],
    other: []
  };

  for (const url of lines) {
    if (url.includes('wp-') || url.includes('sample-page') || url.includes('oviz.') || url.endsWith('/*')) {
      categories.wpOrJunk.push(url);
    } else if (url.includes('/services/seo-2') || url.includes('/services/wordpress-development-2') || url.includes('/services/shopify-website-development-2')) {
      categories.serviceSlugWith2.push(url);
    } else if (url.includes('/blog/')) {
      categories.blogSlugWith2.push(url);
    } else {
      const match = url.match(/https?:\/\/[^\/]+\/services\/([^\/]+)\/([^\/]+)/);
      if (match) {
        categories.serviceLocation.push({
          url,
          serviceSlug: match[1].toLowerCase(),
          locationSlug: match[2].toLowerCase()
        });
      } else {
        categories.other.push(url);
      }
    }
  }

  console.log('Categories summary:');
  console.log('- WP/Junk:', categories.wpOrJunk.length);
  console.log('- Service -2:', categories.serviceSlugWith2.length);
  console.log('- Blog -2:', categories.blogSlugWith2.length);
  console.log('- Service Location URLs:', categories.serviceLocation.length);
  console.log('- Other:', categories.other.length);

  // Check services in DB
  const [dbServices] = await conn.execute('SELECT * FROM Service');
  const serviceSlugMap = new Map();
  dbServices.forEach(s => serviceSlugMap.set(s.slug.toLowerCase(), s));

  // Check locations in DB
  const [locationCols] = await conn.execute('DESCRIBE Location');
  console.log('Location columns:', locationCols.map(c => c.Field));

  const [dbLocations] = await conn.execute('SELECT * FROM Location');
  const locationSlugMap = new Map();
  dbLocations.forEach(l => locationSlugMap.set(l.slug.toLowerCase(), l));

  // Check ServiceLocation links in DB
  const [slCols] = await conn.execute('DESCRIBE ServiceLocation');
  console.log('ServiceLocation columns:', slCols.map(c => c.Field));

  const [dbLinks] = await conn.execute('SELECT serviceId, locationId FROM ServiceLocation');
  const linkSet = new Set();
  dbLinks.forEach(l => {
    linkSet.add(`${l.serviceId}_${l.locationId}`);
  });

  console.log('\nDB Stats:');
  console.log(`- Services in DB: ${dbServices.length}`);
  console.log(`- Locations in DB: ${dbLocations.length}`);
  console.log(`- ServiceLocation links in DB: ${dbLinks.length}`);

  let missingServices = new Set();
  let missingLocations = new Set();
  let missingLinks = [];
  let existingActiveLinks = 0;

  for (const item of categories.serviceLocation) {
    let s = serviceSlugMap.get(item.serviceSlug);
    // handle case sensitivity or alternate e-commerce-development
    if (!s) {
      if (item.serviceSlug === 'e-commerce-development') {
        s = serviceSlugMap.get('ecommerce-development') || serviceSlugMap.get('e-commerce-development');
      }
    }
    if (!s) {
      missingServices.add(item.serviceSlug);
    }

    const l = locationSlugMap.get(item.locationSlug);
    if (!l) {
      missingLocations.add(item.locationSlug);
    }

    if (s && l) {
      const key = `${s.id}_${l.id}`;
      if (linkSet.has(key)) {
        existingActiveLinks++;
      } else {
        missingLinks.push({ service: s, location: l, item });
      }
    }
  }

  console.log('\nAudit Results:');
  console.log('- Missing Services in DB:', Array.from(missingServices));
  console.log('- Missing Locations in DB count:', missingLocations.size);
  console.log('- Missing Locations List:', Array.from(missingLocations));
  const [hasBihar] = await conn.execute("SELECT slug, name, region FROM Location WHERE slug LIKE '%bihar%'");
  console.log('Bihar matches in DB:', hasBihar);
  const [hasMahakali] = await conn.execute("SELECT slug, name, region FROM Location WHERE slug LIKE '%mahakali%'");
  console.log('Mahakali matches in DB:', hasMahakali);
  const [hasDelhi] = await conn.execute("SELECT slug, name, region FROM Location WHERE slug LIKE '%delhi%'");
  console.log('Delhi matches in DB:', hasDelhi);

  // Check how many of the missing slugs exist without '-3'
  let matchedWithout3 = 0;
  let stillMissing = [];
  for (const slug of missingLocations) {
    if (slug.endsWith('-3')) {
      const baseSlug = slug.slice(0, -2);
      if (locationSlugMap.has(baseSlug)) {
        matchedWithout3++;
      } else {
        stillMissing.push(slug);
      }
    } else {
      stillMissing.push(slug);
    }
  }
  console.log(`Of the ${missingLocations.size} missing location slugs:`);
  console.log(`- ${matchedWithout3} exist as base slug without '-3' in DB`);
  console.log(`- ${stillMissing.length} are completely missing from DB even without '-3'`);
  console.log('ALL still missing completely:\n', JSON.stringify(stillMissing, null, 2));

  await conn.end();
}

main().catch(console.error);

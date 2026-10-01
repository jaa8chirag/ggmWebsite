import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dump = fs.readFileSync(path.join(__dirname, '..', 'ggm_web_dump.sql'), 'utf8');

// Parse all locations from dump
const locMap = new Map();
const locRegex = /INSERT INTO `location` \(`id`, `slug`, `name`, `region`, `isActive`[^)]*\) VALUES \('([^']+)',\s*'([^']+)',\s*'([^']+)',\s*'([^']+)',\s*([01])/g;
let m;
while ((m = locRegex.exec(dump)) !== null) {
  locMap.set(m[2], { id: m[1], slug: m[2], name: m[3], region: m[4] });
}

// User pasted text
const rawText = `https://ggmtechnologies.com/blog/5-golden-rules-of-a-website
https://ggmtechnologies.com/blog/how-to-lower-cost-per-lead-in-google-ads-10-proven-tips
https://ggmtechnologies.com/blog/how-to-rank-on-ai-search-engines-proven-strategies
https://ggmtechnologies.com/services/e-commerce-Development/abu-dhabi
https://ggmtechnologies.com/services/e-commerce-Development/ahmedabad
https://ggmtechnologies.com/services/e-commerce-Development/akola
https://ggmtechnologies.com/services/e-commerce-Development/akshardham
https://ggmtechnologies.com/services/e-commerce-Development/alpha-1-greater-noida
https://ggmtechnologies.com/services/e-commerce-Development/amravati
https://ggmtechnologies.com/services/e-commerce-Development/amreli
https://ggmtechnologies.com/services/e-commerce-Development/anand
https://ggmtechnologies.com/services/e-commerce-Development/anand-vihar
https://ggmtechnologies.com/services/e-commerce-Development/andheri
https://ggmtechnologies.com/services/e-commerce-Development/arthala
https://ggmtechnologies.com/services/e-commerce-Development/aurangabad
https://ggmtechnologies.com/services/e-commerce-Development/ayodhya
https://ggmtechnologies.com/services/e-commerce-Development/badli-industrial-area
https://ggmtechnologies.com/services/e-commerce-Development/baghpat
https://ggmtechnologies.com/services/e-commerce-Development/ballia
https://ggmtechnologies.com/services/e-commerce-Development/balrampur
https://ggmtechnologies.com/services/e-commerce-Development/banas-kantha
https://ggmtechnologies.com/services/e-commerce-Development/bandra
https://ggmtechnologies.com/services/e-commerce-Development/bawana-industrial-area
https://ggmtechnologies.com/services/e-commerce-Development/bellandur
https://ggmtechnologies.com/services/e-commerce-Development/bengaluru
https://ggmtechnologies.com/services/e-commerce-Development/bettahalasuru
https://ggmtechnologies.com/services/e-commerce-Development/bhadohi
https://ggmtechnologies.com/services/e-commerce-Development/bhandara
https://ggmtechnologies.com/services/e-commerce-Development/bhavnagar
https://ggmtechnologies.com/services/e-commerce-Development/bhayandar
https://ggmtechnologies.com/services/e-commerce-Development/bijnor
https://ggmtechnologies.com/services/e-commerce-Development/borivali
https://ggmtechnologies.com/services/e-commerce-Development/botad
https://ggmtechnologies.com/services/e-commerce-Development/btm-layout
https://ggmtechnologies.com/services/e-commerce-Development/bur-dubai
https://ggmtechnologies.com/services/e-commerce-Development/cbd-belapur
https://ggmtechnologies.com/services/e-commerce-Development/central-ahmedabad
https://ggmtechnologies.com/services/e-commerce-Development/chandauli
https://ggmtechnologies.com/services/e-commerce-Development/chhatrapati-sambhaji-nagar
https://ggmtechnologies.com/services/e-commerce-Development/chhatrapati-shivaji-maharaj-terminus
https://ggmtechnologies.com/services/e-commerce-Development/chickpete
https://ggmtechnologies.com/services/e-commerce-Development/chirag-delhi
https://ggmtechnologies.com/services/e-commerce-Development/chunabhatti
https://ggmtechnologies.com/services/e-commerce-Development/churchgate
https://ggmtechnologies.com/services/e-commerce-Development/civil-lines
https://ggmtechnologies.com/services/e-commerce-Development/civil-lines-prayagraj
https://ggmtechnologies.com/services/e-commerce-Development/colonelganj
https://ggmtechnologies.com/services/e-commerce-Development/cubbon-park
https://ggmtechnologies.com/services/e-commerce-Development/dabri-mor
https://ggmtechnologies.com/services/e-commerce-Development/dangs
https://ggmtechnologies.com/services/e-commerce-Development/deepanjali-nagar
https://ggmtechnologies.com/services/e-commerce-Development/dehradun
https://ggmtechnologies.com/services/e-commerce-Development/deira
https://ggmtechnologies.com/services/e-commerce-Development/delhi-gate
https://ggmtechnologies.com/services/e-commerce-Development/devarabeesanahalli
https://ggmtechnologies.com/services/e-commerce-Development/dhule
https://ggmtechnologies.com/services/e-commerce-Development/dlf-city-phase-3
https://ggmtechnologies.com/services/e-commerce-Development/dlf-phase-3
https://ggmtechnologies.com/services/e-commerce-Development/dockyard-road
https://ggmtechnologies.com/services/e-commerce-Development/doddajala
https://ggmtechnologies.com/services/e-commerce-Development/doddakallasandra
https://ggmtechnologies.com/services/e-commerce-Development/dwarka-sector-11
https://ggmtechnologies.com/services/e-commerce-Development/dwarka-sector-14
https://ggmtechnologies.com/services/e-commerce-Development/dwarka-sector-9
https://ggmtechnologies.com/services/e-commerce-Development/esic
https://ggmtechnologies.com/services/e-commerce-Development/etah
https://ggmtechnologies.com/services/e-commerce-Development/faridabad
https://ggmtechnologies.com/services/e-commerce-Development/fujairah
https://ggmtechnologies.com/services/e-commerce-Development/gadchiroli
https://ggmtechnologies.com/services/e-commerce-Development/gautam-buddha-nagar
https://ggmtechnologies.com/services/e-commerce-Development/gaya
https://ggmtechnologies.com/services/e-commerce-Development/ghaziabad
https://ggmtechnologies.com/services/e-commerce-Development/golf-course-extension
https://ggmtechnologies.com/services/e-commerce-Development/golf-course-road
https://ggmtechnologies.com/services/e-commerce-Development/goraguntepalya
https://ggmtechnologies.com/services/e-commerce-Development/gorakhpur
https://ggmtechnologies.com/services/e-commerce-Development/grant-road
https://ggmtechnologies.com/services/e-commerce-Development/greater-noida
https://ggmtechnologies.com/services/e-commerce-Development/gurgaon-sector-57
https://ggmtechnologies.com/services/e-commerce-Development/gurgaon-sector-82
https://ggmtechnologies.com/services/e-commerce-Development/hadapsar
https://ggmtechnologies.com/services/e-commerce-Development/hardoi
https://ggmtechnologies.com/services/e-commerce-Development/hathras
https://ggmtechnologies.com/services/e-commerce-Development/hebbagodi
https://ggmtechnologies.com/services/e-commerce-Development/hongasandra
https://ggmtechnologies.com/services/e-commerce-Development/hoodi
https://ggmtechnologies.com/services/e-commerce-Development/hope-farm-circle
https://ggmtechnologies.com/services/e-commerce-Development/hosahalli-nelamangala
https://ggmtechnologies.com/services/e-commerce-Development/huda-city-centre
https://ggmtechnologies.com/services/e-commerce-Development/huskur
https://ggmtechnologies.com/services/e-commerce-Development/hutatma-chowk-mumbai
https://ggmtechnologies.com/services/e-commerce-Development/ic-colony
https://ggmtechnologies.com/services/e-commerce-Development/iit-bombay
https://ggmtechnologies.com/services/e-commerce-Development/indiranagar-kanpur
https://ggmtechnologies.com/services/e-commerce-Development/indraprastha
https://ggmtechnologies.com/services/e-commerce-Development/ito
https://ggmtechnologies.com/services/e-commerce-Development/jaffrabad
https://ggmtechnologies.com/services/e-commerce-Development/janakpuri
https://ggmtechnologies.com/services/e-commerce-Development/jaunpur
https://ggmtechnologies.com/services/e-commerce-Development/jayanagar
https://ggmtechnologies.com/services/e-commerce-Development/jhansi
https://ggmtechnologies.com/services/e-commerce-Development/jhil-mil
https://ggmtechnologies.com/services/e-commerce-Development/jogeshwari
https://ggmtechnologies.com/services/e-commerce-Development/kadugodi
https://ggmtechnologies.com/services/e-commerce-Development/kakadeo-kanpur
https://ggmtechnologies.com/services/e-commerce-Development/kalindi-kunj
https://ggmtechnologies.com/services/e-commerce-Development/kalkaji-mandir
https://ggmtechnologies.com/services/e-commerce-Development/kalyani-nagar
https://ggmtechnologies.com/services/e-commerce-Development/kannauj
https://ggmtechnologies.com/services/e-commerce-Development/kanpur-dehat
https://ggmtechnologies.com/services/e-commerce-Development/karkar-duma
https://ggmtechnologies.com/services/e-commerce-Development/karkardooma
https://ggmtechnologies.com/services/e-commerce-Development/kashmiri-gate
https://ggmtechnologies.com/services/e-commerce-Development/khandeshwar
https://ggmtechnologies.com/services/e-commerce-Development/khar-road
https://ggmtechnologies.com/services/e-commerce-Development/kheda
https://ggmtechnologies.com/services/e-commerce-Development/kheri
https://ggmtechnologies.com/services/e-commerce-Development/kings-circle
https://ggmtechnologies.com/services/e-commerce-Development/konanakunte
https://ggmtechnologies.com/services/e-commerce-Development/koregaonpark
https://ggmtechnologies.com/services/e-commerce-Development/krishna-nagar
https://ggmtechnologies.com/services/e-commerce-Development/kudlu-gate
https://ggmtechnologies.com/services/e-commerce-Development/kushinagar
https://ggmtechnologies.com/services/e-commerce-Development/lalbagh-road
https://ggmtechnologies.com/services/e-commerce-Development/lalitpur
https://ggmtechnologies.com/services/e-commerce-Development/lok-kalyan-marg
https://ggmtechnologies.com/services/e-commerce-Development/madavara
https://ggmtechnologies.com/services/e-commerce-Development/madinat-al-maktoum
https://ggmtechnologies.com/services/e-commerce-Development/madinat-al-qudra
https://ggmtechnologies.com/services/e-commerce-Development/mahanagar
https://ggmtechnologies.com/services/e-commerce-Development/mahavir-nagar
https://ggmtechnologies.com/services/e-commerce-Development/mahisagar
https://ggmtechnologies.com/services/e-commerce-Development/mahmoorganj
https://ggmtechnologies.com/services/e-commerce-Development/mahoba
https://ggmtechnologies.com/services/e-commerce-Development/mandala-mankhurd
https://ggmtechnologies.com/services/e-commerce-Development/manjunatha-nagar
https://ggmtechnologies.com/services/e-commerce-Development/mansarovar
https://ggmtechnologies.com/services/e-commerce-Development/mansarovar-park
https://ggmtechnologies.com/services/e-commerce-Development/maujpur
https://ggmtechnologies.com/services/e-commerce-Development/mayur-vihar-extension
https://ggmtechnologies.com/services/e-commerce-Development/mayur-vihar-phase-1
https://ggmtechnologies.com/services/e-commerce-Development/mohan-nagar
https://ggmtechnologies.com/services/e-commerce-Development/moti-nagar
https://ggmtechnologies.com/services/e-commerce-Development/mukherjee-nagar
https://ggmtechnologies.com/services/e-commerce-Development/mulund
https://ggmtechnologies.com/services/e-commerce-Development/mumbai-central
https://ggmtechnologies.com/services/e-commerce-Development/mumbai-city
https://ggmtechnologies.com/services/e-commerce-Development/mushrif
https://ggmtechnologies.com/services/e-commerce-Development/mysore-road
https://ggmtechnologies.com/services/e-commerce-Development/nagawara
https://ggmtechnologies.com/services/e-commerce-Development/nanavati-hospital
https://ggmtechnologies.com/services/e-commerce-Development/narela-industrial-area
https://ggmtechnologies.com/services/e-commerce-Development/narmada
https://ggmtechnologies.com/services/e-commerce-Development/nayandahalli
https://ggmtechnologies.com/services/e-commerce-Development/nehru-enclave
https://ggmtechnologies.com/services/e-commerce-Development/nerul
https://ggmtechnologies.com/services/e-commerce-Development/new-friends-colony-delhi
https://ggmtechnologies.com/services/e-commerce-Development/nibm-road
https://ggmtechnologies.com/services/e-commerce-Development/nirvana-country
https://ggmtechnologies.com/services/e-commerce-Development/nizamuddin-west
https://ggmtechnologies.com/services/e-commerce-Development/noida-electronic-city
https://ggmtechnologies.com/services/e-commerce-Development/noida-sector-147
https://ggmtechnologies.com/services/e-commerce-Development/noida-sector-15
https://ggmtechnologies.com/services/e-commerce-Development/north-delhi
https://ggmtechnologies.com/services/e-commerce-Development/nsez-noida
https://ggmtechnologies.com/services/e-commerce-Development/okhla-bird-sanctuary
https://ggmtechnologies.com/services/e-commerce-Development/okhla-vihar
https://ggmtechnologies.com/services/e-commerce-Development/old-delhi
https://ggmtechnologies.com/services/e-commerce-Development/old-faridabad
https://ggmtechnologies.com/services/e-commerce-Development/palam
https://ggmtechnologies.com/services/e-commerce-Development/panch-mahals
https://ggmtechnologies.com/services/e-commerce-Development/panvel
https://ggmtechnologies.com/services/e-commerce-Development/parbhani
https://ggmtechnologies.com/services/e-commerce-Development/paschim-vihar
https://ggmtechnologies.com/services/e-commerce-Development/patna
https://ggmtechnologies.com/services/e-commerce-Development/patparganj-industrial-area
https://ggmtechnologies.com/services/e-commerce-Development/pitam-pura
https://ggmtechnologies.com/services/e-commerce-Development/pitampura
https://ggmtechnologies.com/services/e-commerce-Development/pithoragarh
https://ggmtechnologies.com/services/e-commerce-Development/poland
https://ggmtechnologies.com/services/e-commerce-Development/prahlad-nagar
https://ggmtechnologies.com/services/e-commerce-Development/preet-vihar
https://ggmtechnologies.com/services/e-commerce-Development/prithviraj-road
https://ggmtechnologies.com/services/e-commerce-Development/pul-bangash
https://ggmtechnologies.com/services/e-commerce-Development/qutub-minar
https://ggmtechnologies.com/services/e-commerce-Development/raj-bagh
https://ggmtechnologies.com/services/e-commerce-Development/rajarajeshwari-nagar
https://ggmtechnologies.com/services/e-commerce-Development/rajouri-garden
https://ggmtechnologies.com/services/e-commerce-Development/ras-al-khor
https://ggmtechnologies.com/services/e-commerce-Development/ratnagiri
https://ggmtechnologies.com/services/e-commerce-Development/rithala
https://ggmtechnologies.com/services/e-commerce-Development/saket-nagar-kanpur
https://ggmtechnologies.com/services/e-commerce-Development/sampige-road
https://ggmtechnologies.com/services/e-commerce-Development/sandal-soap-factory
https://ggmtechnologies.com/services/e-commerce-Development/santa-cruz
https://ggmtechnologies.com/services/e-commerce-Development/santacruz
https://ggmtechnologies.com/services/e-commerce-Development/saraswat-nagar
https://ggmtechnologies.com/services/e-commerce-Development/sasaram
https://ggmtechnologies.com/services/e-commerce-Development/satara
https://ggmtechnologies.com/services/e-commerce-Development/science-city-road
https://ggmtechnologies.com/services/e-commerce-Development/sector-22-gurgaon
https://ggmtechnologies.com/services/e-commerce-Development/sector-54-chowk-gurgaon
https://ggmtechnologies.com/services/e-commerce-Development/sector-55-gurgaon
https://ggmtechnologies.com/services/e-commerce-Development/sg-highway
https://ggmtechnologies.com/services/e-commerce-Development/shadipur
https://ggmtechnologies.com/services/e-commerce-Development/shalimar-bagh
https://ggmtechnologies.com/services/e-commerce-Development/shanti-niketan
https://ggmtechnologies.com/services/e-commerce-Development/shastri-nagar
https://ggmtechnologies.com/services/e-commerce-Development/shastri-park
https://ggmtechnologies.com/services/e-commerce-Development/shivaji-chowk
https://ggmtechnologies.com/services/e-commerce-Development/shyam-park
https://ggmtechnologies.com/services/e-commerce-Development/siddharth-colony
https://ggmtechnologies.com/services/e-commerce-Development/sikanderpur
https://ggmtechnologies.com/services/e-commerce-Development/sindhudurg
https://ggmtechnologies.com/services/e-commerce-Development/singasandra
https://ggmtechnologies.com/services/e-commerce-Development/sohna-road-gurgaon
https://ggmtechnologies.com/services/e-commerce-Development/solapur
https://ggmtechnologies.com/services/e-commerce-Development/south-city-2-gurgaon
https://ggmtechnologies.com/services/e-commerce-Development/south-delhi
https://ggmtechnologies.com/services/e-commerce-Development/srirampuram
https://ggmtechnologies.com/services/e-commerce-Development/subhash-nagar
https://ggmtechnologies.com/services/e-commerce-Development/sundar-nagar
https://ggmtechnologies.com/services/e-commerce-Development/surat
https://ggmtechnologies.com/services/e-commerce-Development/surya-nagar
https://ggmtechnologies.com/services/e-commerce-Development/sushant-lok-1-gurgaon
https://ggmtechnologies.com/services/e-commerce-Development/swami-samarth-nagar
https://ggmtechnologies.com/services/e-commerce-Development/swami-vivekananda
https://ggmtechnologies.com/services/e-commerce-Development/tavarekere-main-road-btm-layout
https://ggmtechnologies.com/services/e-commerce-Development/thaltej
https://ggmtechnologies.com/services/e-commerce-Development/tilak-nagar
https://ggmtechnologies.com/services/e-commerce-Development/tis-hazari
https://ggmtechnologies.com/services/e-commerce-Development/trinity
https://ggmtechnologies.com/services/e-commerce-Development/vaishali
https://ggmtechnologies.com/services/e-commerce-Development/varanasi-cantonment
https://ggmtechnologies.com/services/e-commerce-Development/vav-tharad
https://ggmtechnologies.com/services/e-commerce-Development/vidhan-sabha
https://ggmtechnologies.com/services/e-commerce-Development/vidhana-soudha
https://ggmtechnologies.com/services/e-commerce-Development/vile-parle
https://ggmtechnologies.com/services/e-commerce-Development/vivekananda-nagar-banashankari-3rd-stage
https://ggmtechnologies.com/services/e-commerce-Development/wardha-road-nagpur
https://ggmtechnologies.com/services/e-commerce-Development/yavatmal
https://ggmtechnologies.com/services/e-commerce-Development/yelachenahalli
https://ggmtechnologies.com/services/e-commerce-Development/yeshwanthpur`;

const lines = rawText.split('\n').filter(l => l.startsWith('https://'));
let matched = 0;
let missing = [];

for (const url of lines) {
  const parts = url.replace('https://ggmtechnologies.com/services/', '').split('/');
  if (parts.length === 2) {
    const locSlug = parts[1];
    if (locMap.has(locSlug)) {
      matched++;
    } else {
      missing.push(locSlug);
    }
  }
}

console.log(`Checked ${lines.length} URLs: ${matched} matched in existing location table, ${missing.length} missing.`);
console.log('Missing locations:', missing);

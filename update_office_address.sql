-- Migration: Update GGM Technologies Office Address and Google Maps URL
-- Applied to: SiteSettings table

UPDATE `SiteSettings`
SET 
  `addressLine1` = '4th Floor, Suite C, 400-A, 12 Ajit Singh House',
  `addressLine2` = 'Yusuf Sarai Commercial Complex, Near Green Park Metro Station Exit Gate Number - 02',
  `addressLine3` = 'New Delhi - 110016, India',
  `googleBusinessUrl` = 'https://www.google.com/maps/search/?api=1&query=GGM+Technologies+4th+Floor+Suite+C+400-A+12+Ajit+Singh+House+Yusuf+Sarai+Commercial+Complex+Near+Green+Park+Metro+Station+Exit+Gate+Number+-+02+New+Delhi+-+110016'
WHERE `id` = 'settings_1001';

SELECT `id`, `name`, `addressLine1`, `addressLine2`, `addressLine3`, `googleBusinessUrl` 
FROM `SiteSettings` 
WHERE `id` = 'settings_1001';

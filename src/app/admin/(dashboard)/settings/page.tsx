import { getSettings } from "@/lib/queries";
import Button from "@/components/ui/Button";
import RepeatingText from "@/components/admin/RepeatingText";
import RepeatingPairs from "@/components/admin/RepeatingPairs";
import RepeatingMetrics from "@/components/admin/settings/RepeatingMetrics";
import RichTextEditor from "@/components/admin/RichTextEditor";
import { labelClass, inputClass, cardClass } from "@/components/admin/styles";
import { updateSettings } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const settings = await getSettings();

  return (
    <div className="max-w-4xl pb-16">
      <div>
        <h1 className="font-display text-2xl font-bold text-chalk">Site Settings &amp; Governance</h1>
        <p className="mt-1 font-body text-sm text-muted">
          Company contact info, trust registrations (MSME, IndiaMART, Justdial, GST), social media handles, and About Us hub.
        </p>
      </div>

      <form
        action={updateSettings.bind(null, settings.id)}
        className="mt-8 space-y-8"
      >
        {/* 1. Company Profile & Contact */}
        <div className={cardClass}>
          <p className="font-display text-lg font-bold text-chalk">1. Company Profile &amp; Contact</p>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass} htmlFor="name">
                Company Name
              </label>
              <input id="name" name="name" defaultValue={settings.name} className={inputClass} />
            </div>
            <div>
              <label className={labelClass} htmlFor="tagline">
                Tagline
              </label>
              <input id="tagline" name="tagline" defaultValue={settings.tagline} className={inputClass} />
            </div>
          </div>

          <div className="mt-4">
            <label className={labelClass} htmlFor="eyebrow">
              Eyebrow (Hero Label)
            </label>
            <input id="eyebrow" name="eyebrow" defaultValue={settings.eyebrow} className={inputClass} />
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass} htmlFor="phone">
                Phone (Display format)
              </label>
              <input id="phone" name="phone" defaultValue={settings.phone} className={inputClass} />
            </div>
            <div>
              <label className={labelClass} htmlFor="phoneHref">
                Phone (tel: link format)
              </label>
              <input id="phoneHref" name="phoneHref" defaultValue={settings.phoneHref} className={inputClass} />
            </div>
          </div>

          <div className="mt-4">
            <label className={labelClass} htmlFor="email">
              Primary Business Email
            </label>
            <input id="email" name="email" defaultValue={settings.email} className={inputClass} />
          </div>

          <div className="mt-4 space-y-3">
            <div>
              <label className={labelClass} htmlFor="addressLine1">
                Address Line 1
              </label>
              <input id="addressLine1" name="addressLine1" defaultValue={settings.addressLine1} className={inputClass} />
            </div>
            <div>
              <label className={labelClass} htmlFor="addressLine2">
                Address Line 2
              </label>
              <input id="addressLine2" name="addressLine2" defaultValue={settings.addressLine2} className={inputClass} />
            </div>
            <div>
              <label className={labelClass} htmlFor="addressLine3">
                Address Line 3 (City, State, PIN)
              </label>
              <input id="addressLine3" name="addressLine3" defaultValue={settings.addressLine3} className={inputClass} />
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass} htmlFor="gst">
                GST Number
              </label>
              <input id="gst" name="gst" defaultValue={settings.gst} className={inputClass} />
            </div>
            <div>
              <label className={labelClass} htmlFor="businessHours">
                Business Hours
              </label>
              <input id="businessHours" name="businessHours" defaultValue={settings.businessHours} className={inputClass} />
            </div>
          </div>
        </div>

        {/* 2. Official Registrations & Trust Badges */}
        <div className={cardClass}>
          <p className="font-display text-lg font-bold text-chalk">2. Official Registrations &amp; Trust Seals</p>
          <p className="mt-1 font-body text-xs text-muted">
            These trust seals and government credentials are displayed in the header ticker, certifications hub, and footer.
          </p>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass} htmlFor="msme">
                MSME Udyam Registration No.
              </label>
              <input
                id="msme"
                name="msme"
                defaultValue={settings.msme ?? "UDYAM-DL-08-0098741"}
                placeholder="UDYAM-DL-08-XXXXXXX"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="indiamartSeal">
                IndiaMART Trust Seal Info
              </label>
              <input
                id="indiamartSeal"
                name="indiamartSeal"
                defaultValue={settings.indiamartSeal ?? "Verified Trust Seal Member"}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="justdialSeal">
                Justdial Trust Seal Info
              </label>
              <input
                id="justdialSeal"
                name="justdialSeal"
                defaultValue={settings.justdialSeal ?? "Justdial Verified Enterprise"}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="googleBusinessUrl">
                Google My Business (GMB) URL
              </label>
              <input
                id="googleBusinessUrl"
                name="googleBusinessUrl"
                defaultValue={settings.googleBusinessUrl ?? "https://maps.google.com/?cid=ggmtechnologies"}
                className={inputClass}
              />
            </div>
          </div>
        </div>

        {/* 3. Social Media Hub */}
        <div className={cardClass}>
          <p className="font-display text-lg font-bold text-chalk">3. Social Media Links &amp; Instant Connect</p>
          <p className="mt-1 font-body text-xs text-muted">
            Displayed across the navigation top bar, contact page, floating chat actions, and footer.
          </p>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass} htmlFor="whatsapp">
                WhatsApp Number (with country code)
              </label>
              <input
                id="whatsapp"
                name="whatsapp"
                defaultValue={settings.whatsapp ?? "+919002600880"}
                placeholder="+919002600880"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="linkedin">
                LinkedIn URL
              </label>
              <input
                id="linkedin"
                name="linkedin"
                defaultValue={settings.linkedin ?? "https://linkedin.com/company/ggmtechnologies"}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="facebook">
                Facebook URL
              </label>
              <input
                id="facebook"
                name="facebook"
                defaultValue={settings.facebook ?? "https://facebook.com/ggmtechnologies"}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="instagram">
                Instagram URL
              </label>
              <input
                id="instagram"
                name="instagram"
                defaultValue={settings.instagram ?? "https://instagram.com/ggmtechnologies"}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="twitter">
                Twitter / X URL
              </label>
              <input
                id="twitter"
                name="twitter"
                defaultValue={settings.twitter ?? "https://x.com/ggmtechnologies"}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="youtube">
                YouTube Channel URL
              </label>
              <input
                id="youtube"
                name="youtube"
                defaultValue={settings.youtube ?? "https://youtube.com/@ggmtechnologies"}
                className={inputClass}
              />
            </div>
          </div>
        </div>

        {/* 4. About Us & Leadership Hub */}
        <div className={cardClass}>
          <p className="font-display text-lg font-bold text-chalk">4. About Us, Leadership &amp; Company Hub</p>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass} htmlFor="aboutEyebrow">
                About Eyebrow
              </label>
              <input id="aboutEyebrow" name="aboutEyebrow" defaultValue={settings.aboutEyebrow} className={inputClass} />
            </div>
            <div>
              <label className={labelClass} htmlFor="aboutTitle">
                About Title
              </label>
              <input id="aboutTitle" name="aboutTitle" defaultValue={settings.aboutTitle} className={inputClass} />
            </div>
          </div>

          <div className="mt-5">
            <RichTextEditor
              id="aboutIntro"
              name="aboutIntro"
              label="1. About Us (Overview Narrative)"
              defaultValue={settings.aboutIntro}
              rows={4}
              helpText="Primary agency overview on /about. Hyperlinks, bold, and formatting supported."
            />
          </div>

          <div className="mt-5">
            <RichTextEditor
              id="qualityCompliance"
              name="qualityCompliance"
              label="2. Quality &amp; Compliance Standards"
              defaultValue={settings.qualityCompliance}
              rows={4}
              helpText="Details on ISO compliance, white-hat ethical frameworks, and security benchmarks."
            />
          </div>

          <div className="mt-5 border-t border-chalk/15 pt-5">
            <p className="font-display text-base font-bold text-chalk mb-3">3. About CEO / Leadership</p>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className={labelClass} htmlFor="ceoName">
                  CEO / Founder Name
                </label>
                <input id="ceoName" name="ceoName" defaultValue={settings.ceoName ?? "Guru Govind Mahesh"} className={inputClass} />
              </div>
              <div>
                <label className={labelClass} htmlFor="ceoTitle">
                  Executive Designation
                </label>
                <input id="ceoTitle" name="ceoTitle" defaultValue={settings.ceoTitle ?? "Founder & Chief Executive Officer"} className={inputClass} />
              </div>
            </div>
            <RichTextEditor
              id="ceoBio"
              name="ceoBio"
              label="CEO Biography &amp; Vision"
              defaultValue={settings.ceoBio}
              rows={4}
              helpText="Executive background, years in digital marketing, and algorithmic philosophy."
            />
          </div>

          <div className="mt-5 border-t border-chalk/15 pt-5">
            <RichTextEditor
              id="companyStory"
              name="companyStory"
              label="4. About The Company (History &amp; Infrastructure)"
              defaultValue={settings.companyStory}
              rows={4}
              helpText="Story of GGM Technologies, New Delhi headquarters, and client milestones."
            />
          </div>

          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-5 border-t border-chalk/15 pt-5">
            <div>
              <RichTextEditor
                id="mission"
                name="mission"
                label="Mission Statement"
                defaultValue={settings.mission}
                rows={3}
              />
            </div>
            <div>
              <RichTextEditor
                id="vision"
                name="vision"
                label="Vision Statement"
                defaultValue={settings.vision}
                rows={3}
              />
            </div>
          </div>
        </div>

        {/* 5. Why Choose Us (Why Us) */}
        <div className={cardClass}>
          <RepeatingPairs
            name="why"
            label="5. Why Us (Why Choose GGM Technologies)"
            aLabel="Reason Title"
            bLabel="Value Proposition"
            initial={settings.whyChooseUs.map((w: any) => ({ a: w.title, b: w.description }))}
          />
        </div>

        {/* 6. Clients & Metrics */}
        <div className={cardClass}>
          <RepeatingText
            name="clients"
            label="Clients &amp; Brands We Have Scaled"
            initial={settings.clients}
          />
        </div>

        <div className={cardClass}>
          <RepeatingMetrics initial={settings.metricItems} />
        </div>

        <div className="sticky bottom-4 z-20 flex items-center justify-between rounded-2xl border border-chalk/20 bg-surface/95 p-4 shadow-2xl backdrop-blur-xl">
          <p className="font-mono text-xs text-muted">
            Remember to save your changes to publish them across all pages.
          </p>
          <Button type="submit" variant="signal">
            Save All Settings
          </Button>
        </div>
      </form>
    </div>
  );
}

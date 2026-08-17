import { getSettings } from "@/lib/queries";
import Button from "@/components/ui/Button";
import RepeatingText from "@/components/admin/RepeatingText";
import RepeatingPairs from "@/components/admin/RepeatingPairs";
import RepeatingMetrics from "@/components/admin/settings/RepeatingMetrics";
import { labelClass, inputClass, cardClass } from "@/components/admin/styles";
import { updateSettings } from "./actions";

export default async function AdminSettingsPage() {
  const settings = await getSettings();

  return (
    <div>
      <h1 className="font-display text-2xl text-chalk">Site settings</h1>
      <p className="mt-2 font-body text-sm text-muted">
        Company info, About page content, and homepage metrics.
      </p>

      <form
        action={updateSettings.bind(null, settings.id)}
        className="mt-8 max-w-2xl space-y-6"
      >
        <div className={cardClass}>
          <p className="font-display text-lg text-chalk">Company</p>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass} htmlFor="name">
                Name
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
              Eyebrow (hero label)
            </label>
            <input id="eyebrow" name="eyebrow" defaultValue={settings.eyebrow} className={inputClass} />
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass} htmlFor="phone">
                Phone (display)
              </label>
              <input id="phone" name="phone" defaultValue={settings.phone} className={inputClass} />
            </div>
            <div>
              <label className={labelClass} htmlFor="phoneHref">
                Phone (tel: link)
              </label>
              <input id="phoneHref" name="phoneHref" defaultValue={settings.phoneHref} className={inputClass} />
            </div>
          </div>

          <div className="mt-4">
            <label className={labelClass} htmlFor="email">
              Email
            </label>
            <input id="email" name="email" defaultValue={settings.email} className={inputClass} />
          </div>

          <div className="mt-4 space-y-3">
            <div>
              <label className={labelClass} htmlFor="addressLine1">
                Address line 1
              </label>
              <input id="addressLine1" name="addressLine1" defaultValue={settings.addressLine1} className={inputClass} />
            </div>
            <div>
              <label className={labelClass} htmlFor="addressLine2">
                Address line 2
              </label>
              <input id="addressLine2" name="addressLine2" defaultValue={settings.addressLine2} className={inputClass} />
            </div>
            <div>
              <label className={labelClass} htmlFor="addressLine3">
                Address line 3
              </label>
              <input id="addressLine3" name="addressLine3" defaultValue={settings.addressLine3} className={inputClass} />
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass} htmlFor="gst">
                GST number
              </label>
              <input id="gst" name="gst" defaultValue={settings.gst} className={inputClass} />
            </div>
            <div>
              <label className={labelClass} htmlFor="businessHours">
                Business hours
              </label>
              <input id="businessHours" name="businessHours" defaultValue={settings.businessHours} className={inputClass} />
            </div>
          </div>
        </div>

        <div className={cardClass}>
          <p className="font-display text-lg text-chalk">About page</p>
          <div className="mt-4">
            <label className={labelClass} htmlFor="aboutEyebrow">
              Eyebrow
            </label>
            <input id="aboutEyebrow" name="aboutEyebrow" defaultValue={settings.aboutEyebrow} className={inputClass} />
          </div>
          <div className="mt-4">
            <label className={labelClass} htmlFor="aboutTitle">
              Title
            </label>
            <input id="aboutTitle" name="aboutTitle" defaultValue={settings.aboutTitle} className={inputClass} />
          </div>
          <div className="mt-4">
            <label className={labelClass} htmlFor="aboutIntro">
              Intro
            </label>
            <textarea id="aboutIntro" name="aboutIntro" rows={3} defaultValue={settings.aboutIntro} className={inputClass} />
          </div>
          <div className="mt-4">
            <label className={labelClass} htmlFor="mission">
              Mission
            </label>
            <textarea id="mission" name="mission" rows={3} defaultValue={settings.mission} className={inputClass} />
          </div>
          <div className="mt-4">
            <label className={labelClass} htmlFor="vision">
              Vision
            </label>
            <textarea id="vision" name="vision" rows={3} defaultValue={settings.vision} className={inputClass} />
          </div>
        </div>

        <div className={cardClass}>
          <RepeatingPairs
            name="why"
            label="Why choose us"
            aLabel="Title"
            bLabel="Description"
            initial={settings.whyChooseUs.map((w: any) => ({ a: w.title, b: w.description }))}
          />
        </div>

        <div className={cardClass}>
          <RepeatingText
            name="clients"
            label="Clients we've worked with"
            initial={settings.clients}
          />
        </div>

        <div className={cardClass}>
          <RepeatingMetrics initial={settings.metricItems} />
        </div>

        <Button type="submit" variant="signal">
          Save settings
        </Button>
      </form>
    </div>
  );
}

import Hero from "@/components/home/Hero";
import Climb from "@/components/home/Climb";
import Services from "@/components/home/Services";
import TechStack from "@/components/home/TechStack";
import Process from "@/components/home/Process";
import Constellation from "@/components/home/Constellation";
import Metrics from "@/components/home/Metrics";
import Work from "@/components/home/Work";
import Testimonials from "@/components/home/Testimonials";
import Blog from "@/components/home/Blog";
import CtaBand from "@/components/home/CtaBand";
import {
  getServices,
  getWork,
  getTestimonials,
  getPublishedPosts,
  getSettings,
} from "@/lib/queries";

export default async function HomePage() {
  const [services, work, testimonials, posts, settings] = await Promise.all([
    getServices(),
    getWork(),
    getTestimonials(),
    getPublishedPosts(),
    getSettings(),
  ]);

  return (
    <>
      <Hero eyebrow={settings.eyebrow} />
      <Climb services={services} />
      <Services services={services} />
      <TechStack />
      <Process />
      <Constellation />
      <Metrics metrics={settings.metricItems} />
      <Work work={work} />
      <Testimonials testimonials={testimonials} />
      <Blog posts={posts.slice(0, 3)} />
      <CtaBand />
    </>
  );
}

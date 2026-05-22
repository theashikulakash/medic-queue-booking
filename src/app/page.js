import Footer from "@/components/footer";
import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import Stats from "@/components/stats";
import TopDoctors from "@/components/topdoctors";
import Service from "@/components/service";
import Newsletter from "@/components/newsletter";
import Testimonials from "@/components/testimonials";
import Contact from "@/components/contact";
export const dynamic = 'force-dynamic';

export const metadata = {
  title: "Medic Queue - Book Doctor Appointments Online",
  description: "Find and book appointments with certified doctors and specialists online. Fast, convenient, and reliable medical consultation booking platform.",
  keywords: ["doctor appointment", "medical consultation", "book doctor", "online appointments", "healthcare"],
  openGraph: {
    title: "Medic Queue - Book Doctor Appointments Online",
    description: "Find and book appointments with certified doctors and specialists online.",
    type: "website",
  },
};

export default function Home() {
  return (
    <section className="bg-white">
      <Navbar />
      <Hero />
      <Service />
      <Stats />
      <TopDoctors />
      <Newsletter />
      <Testimonials />
      <Contact />
      <Footer />
    </section>
  );
}

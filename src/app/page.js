import Footer from "@/components/footer";
import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import Stats from "@/components/stats";
import TopDoctors from "@/components/topdoctors";
import Service from "@/components/service";
import Newsletter from "@/components/newsletter";
import Testimonials from "@/components/testimonials";
export const dynamic = 'force-dynamic';
// import Image from "next/image";

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
      <Footer />
    </section>
  );
}

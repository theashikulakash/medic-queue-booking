import Footer from "@/components/footer";
import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import Image from "next/image";

export default function Home() {
  return (
    <section className="bg-white">
      <Navbar />
      <Hero />
      <Footer />
    </section>
  );
}

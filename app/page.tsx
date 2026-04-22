"use client";

import { LanguageProvider } from "./providers";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Demos from "@/components/Demos";
import Skills from "@/components/Skills";
import Experimental from "@/components/Experimental";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <LanguageProvider>
      <div className="min-h-screen">
        <Header />
        <main className="pt-16">
          {/* Hero section - full width with background image */}
          <section className="py-0">
            <Hero />
          </section>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* About section */}
            <section className="py-8 lg:py-12">
              <About />
            </section>

            {/* Projects section */}
            <section className="py-8 lg:py-12">
              <Projects />
            </section>

            {/* Demos section — concept / showcase work */}
            <section className="py-8 lg:py-12">
              <Demos />
            </section>

            {/* Other sections */}
            <section className="py-8 lg:py-12">
              <Skills />
            </section>

            {/* <section className="py-8 lg:py-12">
              <Experimental />
            </section> */}

            <section className="py-8 lg:py-12">
              <Contact />
            </section>
          </div>
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}

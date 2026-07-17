import { Nav } from "./components/layout/Nav";
import { Footer } from "./components/layout/Footer";
import { Hero } from "./components/sections/Hero";
import { CredibilityBar } from "./components/sections/CredibilityBar";
import { Approach } from "./components/sections/Approach";
import { Services } from "./components/sections/Services";
import { Team } from "./components/sections/Team";
import { Experience } from "./components/sections/Experience";
import { NetworkProof } from "./components/sections/NetworkProof";
import { Contact } from "./components/sections/Contact";

export default function App() {
  return (
    <div className="bg-brand-navy min-h-screen">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-brand-gold focus:text-brand-navy-deep focus:px-4 focus:py-2 focus:rounded-sm focus:text-sm focus:font-medium"
      >
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <CredibilityBar />
        <Approach />
        <Services />
        <Team />
        <Experience />
        <NetworkProof />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

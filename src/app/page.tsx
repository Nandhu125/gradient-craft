import { ALL_KEYFRAMES } from "@/data/gradients";
import { HomeShell } from "@/components/home/home-shell";
import { HowItWorks } from "@/components/home/how-it-works";
import { UseCases } from "@/components/home/use-cases";
import { About } from "@/components/home/about";
import { Footer } from "@/components/layout/footer";

export default function Home() {
  return (
    <>
      <style>{ALL_KEYFRAMES}</style>

      <HomeShell footer={<Footer />}>
        <HowItWorks />

        <section id="features">
          <UseCases />
        </section>

        <About />
      </HomeShell>
    </>
  );
}

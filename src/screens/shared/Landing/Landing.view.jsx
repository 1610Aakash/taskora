import Navbar from "@/components/layout/Navbar";
import Hero from "./components/Hero";

export default function LandingView() {
  return (
    <>
      <Navbar />
      <main className="relative flex min-h-[calc(100vh-73px)] items-center overflow-hidden bg-background px-5 py-14 md:px-10">
        <Hero />
      </main>
    </>
  );
}

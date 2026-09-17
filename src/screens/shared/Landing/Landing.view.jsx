import Navbar from "@/components/layout/Navbar";
import Hero from "./components/Hero";

export default function LandingView() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-[calc(100vh-73px)] items-center justify-center bg-background px-6">
        <Hero />
      </main>
    </>
  );
}

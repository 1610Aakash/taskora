export default function Home() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center">
      <div className="bg-card border border-border rounded-xl p-8">
        <h1 className="text-4xl font-bold text-foreground">
          Taskora
        </h1>

        <p className="mt-2 text-muted">
          Project & Task Management
        </p>

        <button className="mt-6 bg-primary hover:bg-primary-hover text-white px-5 py-2.5 rounded-lg">
          Get Started
        </button>
      </div>
    </main>
  );
}
export default function WelcomeHeader({ name }) {
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground">
        {greeting}, {name?.split(" ")[0]} 👋
      </h1>
      <p className="mt-1 text-sm text-muted">
        Here&apos;s what&apos;s happening across your projects.
      </p>
    </div>
  );
}

import ThemeToggle from "./_components/ThemeToggle";
import GoToPageButton from "./_components/GoToPageButton";

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-10">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <h1 className="text-4xl font-semibold">Page not found</h1>
      <p className="text-muted-foreground">
        The page you requested does not exist.
      </p>
      <GoToPageButton href="/auth/login" label="Return to home" />
    </div>
  );
}

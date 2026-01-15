import { Spinner } from "./_components/ui/spinner";

export default function Loading() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-10">
      <Spinner className="size-10" />
    </div>
  );
}

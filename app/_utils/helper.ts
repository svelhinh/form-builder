export function formatDaysAgo(input: Date | string | number): string {
  const date = new Date(input);
  const now = new Date();

  // Compare by calendar day, not time of day
  date.setHours(0, 0, 0, 0);
  now.setHours(0, 0, 0, 0);

  const diffDays = Math.round((now.getTime() - date.getTime()) / 86_400_000);

  if (diffDays <= 0) return "Today";
  if (diffDays === 1) return "1 day ago";
  return `${diffDays} days ago`;
}

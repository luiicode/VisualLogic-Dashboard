import RecentTicketsCard from "@/features/Overview/components/widget/RecentTicketsCard";
import TeamsByProjectCard from "@/features/Overview/components/widget/TeamsByProjectCard";

export default function TablesSection() {
  return (
    <section className="grid gap-4 lg:grid-cols-2">
      <TeamsByProjectCard />
      <RecentTicketsCard />
    </section>
  );
}

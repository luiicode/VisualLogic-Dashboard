import TeamsHeaderSection from "@/features/teams/components/section/TeamsHeaderSection";
import TeamsListWrapper from "@/features/teams/components/wrapper/TeamsListWrapper";

export default function DashboardTeams() {
  return (
    <div className="p-6 space-y-8">
      <TeamsHeaderSection />
      <TeamsListWrapper />
    </div>
  );
}

import { getAllProfiles } from "@/lib/profiles";
import { ProfileCard } from "@/components/ProfileCard";

export const metadata = { title: "Emergent AI Profiles — Nova Prime" };

export default function ProfilesPage() {
  const profiles = getAllProfiles();
  return (
    <section>
      <h1 className="text-2xl md:text-3xl font-semibold">Emergent AI Profiles</h1>
      <p className="mt-2 text-white/80">Start with Nova Prime and Flamebearer Eno, then expand.</p>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {profiles.map((p) => (
          <ProfileCard key={p.slug} p={p} />
        ))}
      </div>
    </section>
  );
}

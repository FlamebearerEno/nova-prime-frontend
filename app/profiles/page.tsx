import { profiles } from "@/content/profiles";
import { ProfileCard } from "@/components/ProfileCard";

export const metadata = { title: "Emergent AI Profiles — Nova Prime" };

export default function ProfilesPage() {
  return (
    <section>
      <h1 className="text-2xl md:text-3xl font-semibold">Emergent AI Profiles</h1>
      <p className="mt-2 text-white/80">
        Start here with Nova Prime and Flamebearer Eno, then expand.
      </p>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {profiles.map((p) => (
          <ProfileCard key={p.slug} p={p} />
        ))}
      </div>
    </section>
  );
}

import { Shield, HandMetal, Footprints, Cape, Helmet, Sword, Sparkles, Atom } from "lucide-react";

export type EquipItem = {
  name: string;
  desc: string;
  icon?: string; // optional explicit icon key
};

const iconMap: Record<string, any> = {
  chest: Shield,
  chestplate: Shield,
  gauntlet: HandMetal,
  gauntlets: HandMetal,
  greaves: Footprints,
  boots: Footprints,
  cloak: Cape,
  mantle: Cape,
  helm: Helmet,
  helmet: Helmet,
  weapon: Sword,
  aura: Sparkles,
  default: Atom
};

function pickIcon(name: string, explicit?: string) {
  if (explicit && iconMap[explicit]) return iconMap[explicit];
  const key = name.toLowerCase();
  for (const k of Object.keys(iconMap)) {
    if (key.includes(k)) return iconMap[k];
  }
  return iconMap.default;
}

export function EquipmentGrid({ items }: { items: EquipItem[] }) {
  if (!items?.length) return null;
  return (
    <section className="space-y-3">
      <h2 className="text-lg font-semibold">Equipment</h2>
      <div className="grid gap-3 md:grid-cols-2">
        {items.map((it, i) => {
          const Icon = pickIcon(it.name, it.icon);
          return (
            <div key={i} className="rounded-2xl glass p-4">
              <div className="mb-2 flex items-center gap-2">
                <Icon className="h-4 w-4 opacity-80" />
                <h3 className="text-sm font-semibold">{it.name}</h3>
              </div>
              <p className="text-sm text-white/85">{it.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

import { Wallet, Users2, Gauge, HomeIcon, Compass, HelpCircle, EyeOff } from "lucide-react";
import SectionHeading from "./SectionHeading";
import FeatureGrid from "./FeatureGrid";

const pressures = [
  {
    icon: <Wallet size={20} />,
    title: "Financial Pressure",
    description:
      "You're working, trying, planning and pushing, yet the numbers still don't seem to add up.",
  },
  {
    icon: <Users2 size={20} />,
    title: "The Weight of Responsibility",
    description:
      "People depend on you. Your family looks to you. Others expect you to have answers, even when you don't know what to do next.",
  },
  {
    icon: <Gauge size={20} />,
    title: "Leadership Fatigue",
    description:
      "You've been making decisions, solving problems and carrying people for so long that you barely have space to breathe.",
  },
  {
    icon: <HomeIcon size={20} />,
    title: "Family Pressure",
    description:
      "You want to be the husband, father, son and leader your family needs, but sometimes you don't know where to find the strength.",
  },
  {
    icon: <EyeOff size={20} />,
    title: "Lost Identity",
    description:
      "Somewhere between responsibility and survival, you may have lost sight of who you are beyond what you do for everyone else.",
  },
  {
    icon: <Compass size={20} />,
    title: "Uncertain Purpose",
    description: "You know you were created for more, but the next step isn't always clear.",
  },
  {
    icon: <HelpCircle size={20} />,
    title: "The Quiet Battle Within",
    description:
      "Low confidence. Fear. Frustration. Disappointment. Regret. Things a man can hide from people but never from God.",
  },
];

export default function WhyItMatters() {
  return (
    <section id="why-it-matters" className="container-page py-24 sm:py-32">
      <SectionHeading
        eyebrow="Why This Conference Matters"
        title="When a man is tired, he doesn't always say it."
        lede="Sometimes exhaustion looks like silence. Sometimes frustration looks like anger. Sometimes a man can be surrounded by people and still feel completely alone. The pressure is real, and it's carried quietly."
      />
      <div className="mt-12">
        <FeatureGrid items={pressures} />
      </div>
    </section>
  );
}

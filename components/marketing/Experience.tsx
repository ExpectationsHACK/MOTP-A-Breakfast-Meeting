import { Flame, HandHeart, BookText, Users, Compass, BatteryCharging } from "lucide-react";
import SectionHeading from "./SectionHeading";
import FeatureGrid from "./FeatureGrid";

const items = [
  {
    icon: <Flame size={20} />,
    title: "Spiritual Renewal",
    description: "Come weary. Leave strengthened. Reconnect with God and receive fresh grace for the journey ahead.",
  },
  {
    icon: <HandHeart size={20} />,
    title: "Intentional Prayer",
    description:
      "We will pray about the things that matter: our lives, families, finances, leadership, purpose and future.",
  },
  {
    icon: <BookText size={20} />,
    title: "Biblical Strength",
    description: "God's Word will remind us who we are, what we carry and where our strength truly comes from.",
  },
  {
    icon: <Users size={20} />,
    title: "Brotherhood",
    description:
      "You were never meant to walk alone. Meet other men navigating responsibility, leadership and purpose.",
  },
  {
    icon: <Compass size={20} />,
    title: "Fresh Direction",
    description: "Step away from the noise and create room to hear God concerning your next season.",
  },
  {
    icon: <BatteryCharging size={20} />,
    title: "Renewed Strength",
    description: "Return to your family, work, business and assignment with fresh spiritual capacity.",
  },
];

export default function Experience() {
  return (
    <section id="experience" className="container-page py-24 sm:py-32">
      <SectionHeading
        eyebrow="What Happens When You Attend The Breakfast Meeting"
        title="Expect a morning of..."
      />
      <div className="mt-12">
        <FeatureGrid items={items} />
      </div>
    </section>
  );
}

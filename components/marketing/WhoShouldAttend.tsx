import { BatteryLow, Signpost, Landmark, ClipboardList, BookOpen, Telescope, Sparkles } from "lucide-react";
import SectionHeading from "./SectionHeading";
import FeatureGrid from "./FeatureGrid";

const audience = [
  {
    icon: <BatteryLow size={20} />,
    title: "Is Tired of Carrying Everything Alone",
    description: "You've been strong for everyone else. Now it's time to let God strengthen you.",
  },
  {
    icon: <Signpost size={20} />,
    title: "Needs Direction",
    description:
      "You're at a crossroads and need wisdom for your career, business, family, ministry or next season.",
  },
  {
    icon: <Landmark size={20} />,
    title: "Is Fighting Financial Battles",
    description:
      "Debt, financial pressure, business uncertainty or lack of provision has become a burden you can't ignore.",
  },
  {
    icon: <ClipboardList size={20} />,
    title: "Is Carrying Leadership Responsibility",
    description:
      "You lead people, a business, a ministry, a family or a team, and you need fresh grace to carry the assignment.",
  },
  {
    icon: <BookOpen size={20} />,
    title: "Wants to Rebuild His Prayer Life",
    description: "You remember when you could pray with fire. You want that hunger again.",
  },
  {
    icon: <Telescope size={20} />,
    title: "Is Searching for Purpose",
    description:
      "You don't want to simply exist, work, pay bills and repeat. You want your life to count.",
  },
  {
    icon: <Sparkles size={20} />,
    title: "Wants to Become a Better Man",
    description: "A better husband. A better father. A better leader. A better steward.",
  },
];

export default function WhoShouldAttend() {
  return (
    <section id="who-should-attend" className="container-page py-24 sm:py-32">
      <SectionHeading
        eyebrow="Who Should Attend"
        title="This breakfast meeting is for the man who..."
      />
      <div className="mt-12">
        <FeatureGrid items={audience} />
      </div>
    </section>
  );
}

import {
  PenIcon,
  DownloadIcon,
  WandSparklesIcon,
  StarIcon,
  PaletteIcon,
  SparklesIcon,
} from "lucide-react";

const features = [
  {
    icon: <WandSparklesIcon className="h-6 w-6" />,
    title: "Text to Art Conversion",
    description:
      "Transform any text prompt into professional line art illustrations within seconds.",
  },
  {
    icon: <PenIcon className="h-6 w-6" />,
    title: "Clean Line Art",
    description:
      "Get crisp, printer-ready outlines perfect for coloring books and educational materials.",
  },
  {
    icon: <DownloadIcon className="h-6 w-6" />,
    title: "Instant Downloads",
    description:
      "Download your creations in high-resolution formats suitable for printing or digital distribution.",
  },
  {
    icon: <StarIcon className="h-6 w-6" />,
    title: "Custom Style Options",
    description:
      "Choose from various artistic styles from simple outlines to more detailed illustrations.",
  },
  {
    icon: <PaletteIcon className="h-6 w-6" />,
    title: "Educational Templates",
    description:
      "Access a library of educational templates designed specifically for classroom use.",
  },
  {
    icon: <SparklesIcon className="h-6 w-6" />,
    title: "Personalized Content",
    description:
      "Create illustrations that match specific themes, topics, or educational objectives.",
  },
];

const Features = () => {
  return (
    <section id="features" className="bg-secondary/50 py-20">
      <div className="container px-4 md:px-6">
        <div className="mx-auto mb-12 max-w-[800px] text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Effortless Creativity at Your Fingertips
          </h2>
          <p className="text-muted-foreground mt-4 text-lg">
            Our AI-powered platform makes creating professional coloring pages
            simple and accessible to everyone.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-background border-border/50 rounded-xl border p-6 shadow-sm"
            >
              <div className="bg-primary/10 text-primary mb-4 flex h-12 w-12 items-center justify-center rounded-lg">
                {feature.icon}
              </div>
              <h3 className="mb-2 text-xl font-bold">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
  {
    name: "Maria Silva",
    role: "Elementary School Teacher",
    content:
      "ColorVibe Studio has revolutionized my classroom activities. I can create custom coloring sheets that match our curriculum in seconds!",
    image: "/placeholder.svg",
    initials: "MS",
  },
  {
    name: "João Ferreira",
    role: "Children's Book Publisher",
    content:
      "The quality of the line art is exceptional. We've integrated ColorVibe into our production workflow and it's saved us countless hours of illustration work.",
    image: "/placeholder.svg",
    initials: "JF",
  },
  {
    name: "Sofia Martins",
    role: "Parent & Hobbyist",
    content:
      "My kids love the personalized coloring books I create. It's amazing how the platform can transform their ideas into beautiful illustrations.",
    image: "/placeholder.svg",
    initials: "SM",
  },
];

const Testimonials = () => {
  return (
    <section className="bg-muted/30 py-20">
      <div className="container px-4 md:px-6">
        <div className="mx-auto mb-12 max-w-[800px] text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            What Our Users Say
          </h2>
          <p className="text-muted-foreground mt-4 text-lg">
            Join hundreds of satisfied creators who use ColorVibe Studio daily.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, i) => (
            <Card key={i} className="bg-background border-border/50">
              <CardContent className="p-6">
                <div className="mb-4 flex items-start gap-4">
                  <Avatar>
                    <AvatarImage
                      src={testimonial.image}
                      alt={testimonial.name}
                    />
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {testimonial.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{testimonial.name}</p>
                    <p className="text-muted-foreground text-sm">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
                <p className="text-muted-foreground italic">
                  "{testimonial.content}"
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

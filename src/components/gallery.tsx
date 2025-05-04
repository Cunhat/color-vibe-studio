import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const exampleCategories = [
  "Educational",
  "Animals",
  "Fantasy",
  "Nature",
  "Characters",
];

const galleryItems = [
  {
    title: "Solar System",
    category: "Educational",
    image: "/placeholder.svg",
    prompt: "A detailed solar system with all planets",
  },
  {
    title: "Math Symbols",
    category: "Educational",
    image: "/placeholder.svg",
    prompt: "Math symbols and equations for children",
  },
  {
    title: "Friendly Lion",
    category: "Animals",
    image: "/placeholder.svg",
    prompt: "A friendly lion sitting in the grass",
  },
  {
    title: "Ocean Creatures",
    category: "Animals",
    image: "/placeholder.svg",
    prompt: "Various sea creatures swimming together",
  },
  {
    title: "Dragon Castle",
    category: "Fantasy",
    image: "/placeholder.svg",
    prompt: "A castle with a dragon perched on top",
  },
  {
    title: "Fairy Garden",
    category: "Fantasy",
    image: "/placeholder.svg",
    prompt: "A magical fairy garden with tiny houses",
  },
  {
    title: "Forest Scene",
    category: "Nature",
    image: "/placeholder.svg",
    prompt: "A peaceful forest with trees and wildlife",
  },
  {
    title: "Mountain Landscape",
    category: "Nature",
    image: "/placeholder.svg",
    prompt: "Mountains with clouds and a sunrise",
  },
  {
    title: "Superhero",
    category: "Characters",
    image: "/placeholder.svg",
    prompt: "A child-friendly superhero character",
  },
  {
    title: "Space Explorer",
    category: "Characters",
    image: "/placeholder.svg",
    prompt: "An astronaut exploring a new planet",
  },
];

const Gallery = () => {
  return (
    <section id="examples" className="py-20">
      <div className="container px-4 md:px-6">
        <div className="mx-auto mb-12 max-w-[800px] text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Gallery of Possibilities
          </h2>
          <p className="text-muted-foreground mt-4 text-lg">
            Explore the wide range of coloring illustrations our platform can
            create.
          </p>
        </div>

        <Tabs defaultValue="Educational" className="w-full">
          <div className="mb-8 flex justify-center">
            <TabsList>
              {exampleCategories.map((category) => (
                <TabsTrigger key={category} value={category}>
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {exampleCategories.map((category) => (
            <TabsContent key={category} value={category} className="mt-0">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {galleryItems
                  .filter((item) => item.category === category)
                  .map((item, index) => (
                    <div
                      key={index}
                      className="group bg-background rounded-lg border p-3 transition-all hover:shadow-md"
                    >
                      <div className="bg-muted aspect-square overflow-hidden rounded-md">
                        <img
                          src={item.image}
                          alt={item.title}
                          className={cn(
                            "h-full w-full object-cover transition-all",
                            "group-hover:scale-105",
                          )}
                        />
                      </div>
                      <div className="pt-3">
                        <h3 className="font-medium">{item.title}</h3>
                        <p className="text-muted-foreground mt-1 text-xs">
                          {item.prompt}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default Gallery;

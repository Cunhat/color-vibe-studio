import {
  PenIcon,
  TwitterIcon,
  InstagramIcon,
  LinkedinIcon,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary/80 border-border/40 border-t py-10">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:gap-12">
          <div className="md:col-span-2">
            <div className="mb-4 flex items-center gap-2">
              <PenIcon className="text-primary h-6 w-6" />
              <span className="text-xl font-bold">ColorVibe Studio</span>
            </div>
            <p className="text-muted-foreground mb-4 max-w-md">
              Transform text prompts into beautiful line art illustrations for
              coloring. Perfect for educators, publishers, and creative
              hobbyists.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-medium">Product</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="#features"
                  className="text-muted-foreground hover:text-primary"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#examples"
                  className="text-muted-foreground hover:text-primary"
                >
                  Gallery
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  className="text-muted-foreground hover:text-primary"
                >
                  Pricing
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-border mt-12 flex flex-col items-center justify-between border-t pt-6 md:flex-row">
          <p className="text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} ColorVibe Studio. All rights
            reserved.
          </p>
          <div className="text-muted-foreground mt-4 flex space-x-4 text-sm md:mt-0">
            <a href="#" className="hover:text-primary">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-primary">
              Terms of Service
            </a>
            <a href="#" className="hover:text-primary">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

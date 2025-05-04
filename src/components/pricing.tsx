"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckIcon } from "lucide-react";

const plans = [
  {
    name: "Free",
    description: "Perfect for trying out the platform",
    priceMonthly: "€0",
    priceYearly: "€0",
    features: [
      "5 generations per day",
      "Standard quality exports",
      "Basic line art styles",
      "Access to community templates",
      "PNG downloads",
    ],
    cta: "Start for Free",
    featured: false,
  },
  {
    name: "Creator",
    description: "For individuals and small businesses",
    priceMonthly: "€9.99",
    priceYearly: "€7.99",
    features: [
      "50 generations per day",
      "High-quality exports",
      "All line art styles",
      "Priority rendering",
      "PNG & SVG downloads",
      "Commercial usage rights",
    ],
    cta: "Start 7-Day Free Trial",
    featured: true,
  },
  {
    name: "Enterprise",
    description: "For educational institutions and publishers",
    priceMonthly: "€29.99",
    priceYearly: "€24.99",
    features: [
      "Unlimited generations",
      "Highest-quality exports",
      "All line art styles",
      "Instant priority rendering",
      "All file formats",
      "Commercial usage rights",
      "Dedicated support",
      "API access",
    ],
    cta: "Contact Sales",
    featured: false,
  },
];

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
    "monthly",
  );

  return (
    <section id="pricing" className="py-20">
      <div className="container px-4 md:px-6">
        <div className="mx-auto mb-12 max-w-[800px] text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Simple, Transparent Pricing
          </h2>
          <p className="text-muted-foreground mt-4 text-lg">
            Choose a plan that works for your creative needs.
          </p>
        </div>

        <div className="mb-8 flex justify-center">
          <Tabs
            defaultValue="monthly"
            value={billingCycle}
            onValueChange={(value) =>
              setBillingCycle(value as "monthly" | "yearly")
            }
            className="w-full max-w-md"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="yearly">
                Yearly
                <span className="bg-primary/10 text-primary ml-2 rounded-full px-2 py-0.5 text-xs font-medium">
                  Save 20%
                </span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`flex flex-col ${
                plan.featured
                  ? "border-primary shadow-primary/10 shadow-md"
                  : "border-border"
              }`}
            >
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="mb-6">
                  <p className="text-3xl font-bold">
                    {billingCycle === "monthly"
                      ? plan.priceMonthly
                      : plan.priceYearly}
                    <span className="text-muted-foreground text-sm font-normal">
                      /month
                    </span>
                  </p>
                  {billingCycle === "yearly" && (
                    <p className="text-muted-foreground text-sm">
                      Billed annually
                    </p>
                  )}
                </div>

                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckIcon className="text-primary h-4 w-4" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className={`w-full ${
                    plan.featured ? "bg-primary text-primary-foreground" : ""
                  }`}
                  variant={plan.featured ? "default" : "outline"}
                >
                  {plan.cta}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;

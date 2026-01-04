"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// Placeholder interface until we fetch from DB
interface Slide {
  id: string;
  title: string | null;
  description: string | null;
  imageUrl: string;
  linkUrl: string | null;
  buttonText?: string | null;
}

interface HeroCarouselProps {
  slides?: Slide[];
}

export function HeroCarousel({ slides = [] }: HeroCarouselProps) {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  // Fallback slides if none provided
  const displaySlides = slides.length > 0 ? slides : [
    {
      id: "1",
      title: "قطع غيار أصلية",
      description: "نوفر جميع قطع غيار الغسالات والثلاجات بأفضل الأسعار",
      imageUrl: "/hero-spare-parts.png",
      linkUrl: "/shop",
    },
    {
      id: "2",
      title: "صيانة احترافية",
      description: "فريق فني متخصص لإصلاح الأعطال في منزلك",
      imageUrl: "/hero-maintenance.png",
      linkUrl: "/book",
    },
    {
      id: "3",
      title: "أنظمة تنقية المياه",
      description: "تمتع بمياه نقية وصحية مع أفضل فلاتر المياه المنزلية",
      imageUrl: "/hero-water-filters.png",
      linkUrl: "/shop/filters",
    },
  ];

  return (
    <Carousel
      opts={{
        align: "start",
        direction: "rtl",
        loop: true,
      }}
      plugins={[plugin.current]}
      className="w-full relative"
      dir="rtl"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {displaySlides.map((slide) => (
          <CarouselItem key={slide.id}>
            <div className="relative h-[400px] md:h-[500px] w-full overflow-hidden rounded-lg">
              {/* Image Background */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={slide.imageUrl}
                  alt={slide.title || ""}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  priority
                />
              </div>

              {/* Enhanced Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent md:bg-gradient-to-r md:from-black/80 md:via-black/30 md:to-transparent z-10" />

              {/* Dynamic Particles/Texture Overlay (Optional CSS pattern) */}
              <div className="absolute inset-0 opacity-10 bg-[url('/noise.png')] z-10 mix-blend-overlay pointer-events-none" />

              {/* Content Overlay */}
              <div className="absolute inset-0 z-20 flex flex-col justify-center items-start px-8 md:px-24 text-white rtl:md:items-start ltr:md:items-end">
                <div className="max-w-2xl space-y-6 animate-in slide-in-from-bottom-5 fade-in duration-700">
                  <h2 className="text-4xl md:text-7xl font-bold font-cairo leading-tight drop-shadow-lg">
                    {slide.title}
                    <span className="text-primary block text-2xl md:text-4xl mt-2 font-medium opacity-90">المركز الهندسي</span>
                  </h2>
                  <p className="text-lg md:text-2xl text-gray-200 font-light leading-relaxed max-w-lg drop-shadow-md">
                    {slide.description}
                  </p>
                  {slide.linkUrl && (
                    <Button asChild size="lg" className="h-14 px-8 text-xl rounded-full bg-primary hover:bg-primary/90 shadow-[0_0_20px_rgba(59,130,246,0.5)] hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] transition-all duration-300 transform hover:-translate-y-1">
                      <Link href={slide.linkUrl}>{slide.buttonText || "تسوق الآن"}</Link>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-4 rtl:left-auto rtl:right-4" />
      <CarouselNext className="right-4 rtl:right-auto rtl:left-4" />
    </Carousel>
  );
}

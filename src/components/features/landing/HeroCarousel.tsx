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
              {/* Image Background */}
              <div className="absolute inset-0 z-0">
                <Image src={slide.imageUrl} alt={slide.title || ""} fill className="object-cover" priority />
                <div className="absolute inset-0 bg-black/20" />
              </div>

              {/* Content Overlay */}
              <div className="absolute inset-0 z-10 flex flex-col justify-center items-start px-8 md:px-16 bg-gradient-to-r from-black/60 to-transparent text-white">
                <h2 className="text-4xl md:text-6xl font-bold font-cairo mb-4">{slide.title}</h2>
                <p className="text-xl md:text-2xl mb-8 max-w-lg">{slide.description}</p>
                {slide.linkUrl && (
                  <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-lg">
                    <Link href={slide.linkUrl}>{slide.buttonText || "تسوق الآن"}</Link>
                  </Button>
                )}
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

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
            <div className="relative h-[500px] md:h-[650px] w-full overflow-hidden rounded-2xl">
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

              {/* Sophisticated Overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/80 via-slate-950/20 to-transparent z-10" />

              {/* Content Overlay with Glassmorphism */}
              <div className="absolute inset-0 z-20 flex flex-col justify-center items-start px-8 md:px-24">
                <div className="max-w-2xl space-y-8 animate-in slide-in-from-bottom-8 fade-in duration-1000">
                  <div className="inline-block px-4 py-1.5 rounded-full glass border-white/10 text-white text-sm font-medium tracking-wide uppercase mb-2">
                    المركز الهندسي
                  </div>

                  <h2 className="text-5xl md:text-8xl font-bold font-heading leading-tight text-white drop-shadow-2xl">
                    {slide.title}
                  </h2>

                  <p className="text-xl md:text-2xl text-slate-200 font-sans leading-relaxed max-w-lg drop-shadow-lg opacity-90">
                    {slide.description}
                  </p>

                  {slide.linkUrl && (
                    <div className="flex flex-wrap gap-4 pt-4">
                      <Button asChild size="lg" className="h-16 px-10 text-xl rounded-full bg-accent hover:bg-accent/90 text-white shadow-xl hover:shadow-accent/40 transition-all duration-300 transform hover:-translate-y-1 active:scale-95">
                        <Link href={slide.linkUrl}>{slide.buttonText || "تسوق الآن"}</Link>
                      </Button>
                      <Button variant="outline" size="lg" className="h-16 px-10 text-xl rounded-full glass border-white/20 text-white hover:bg-white/10 shadow-lg transition-all duration-300">
                        <Link href="/about">تعرف علينا</Link>
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Decorative Edge */}
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent z-20" />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-4 rtl:left-auto rtl:right-4" />
      <CarouselNext className="right-4 rtl:right-auto rtl:left-4" />
    </Carousel>
  );
}

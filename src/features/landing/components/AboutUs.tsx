"use client";

import dynamic from "next/dynamic";
import { Phone, MapPin, Mail, Facebook, Instagram, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";

// Dynamically import Map to avoid SSR issues with Leaflet
const LocationMap = dynamic(() => import("./LocationMap"), {
  ssr: false,
  loading: () => <div className="h-[300px] w-full bg-muted animate-pulse rounded-lg" />,
});

export function AboutUs() {
  // Coordinates for El-Mahalla El-Kubra (El-Manshia El-Jadida approx)
  const position: [number, number] = [30.976075, 31.166453]

  return (
    <section className="py-16 bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Company Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold font-cairo mb-4 text-primary">عن المركز الهندسي</h2>
              <div className="h-1 w-20 bg-primary rounded-full mb-6"></div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                نحن المركز الهندسي، متخصصون في بيع وصيانة قطع غيار الغسالات ومحطات الفلاتر.
                نقدم خدمات صيانة متميزة بأيدي مهندسين محترفين، ونوفر أجود قطع الغيار الأصلية.
                هدفنا هو راحتكم وتقديم حلول مستدامة لأجهزتكم المنزلية.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-full text-primary">
                  <MapPin className="w-5 h-5" />
                </div>
                <p className="font-medium">شارع ١٠، المنشية الجديدة، المحلة الكبرى، الغربية</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-full text-primary">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="flex flex-col" dir="ltr">
                  <a href="tel:+201228093434" className="hover:text-primary transition-colors text-right font-bold text-lg">012 2809 3434</a>
                  <a href="tel:+201024479427" className="hover:text-primary transition-colors text-right font-bold text-lg">010 2447 9427</a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-full text-primary">
                  <Mail className="w-5 h-5" />
                </div>
                <a href="mailto:info@almarkaz.com" className="hover:text-primary transition-colors">info@almarkaz.com</a>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <a href="https://www.facebook.com/almarkazalhandasiu/?locale=ar_AR" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="icon" className="hover:bg-blue-600 hover:text-white transition-colors">
                  <Facebook className="w-5 h-5" />
                </Button>
              </a>
              <Button variant="outline" size="icon" className="hover:bg-pink-600 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </Button>
              <Button variant="outline" size="icon" className="hover:bg-sky-500 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Map */}
          <div className="h-[400px] w-full bg-card p-2 rounded-xl shadow-sm border">
            <LocationMap position={position} />
          </div>

        </div>
      </div>
    </section>
  );
}

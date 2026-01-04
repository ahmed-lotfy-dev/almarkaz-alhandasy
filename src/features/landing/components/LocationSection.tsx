"use client";

import { Button } from "@/components/ui/button";
import { MapPin, Phone, Clock } from "lucide-react";
import Link from "next/link";

export function LocationSection() {
  // Coordinates provided by user
  const lat = 30.963102;
  const lng = 31.155943;
  // Google Maps url for iframe
  const mapSrc = `https://maps.google.com/maps?q=${lat},${lng}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  // Directions URLs
  // Universal Google Maps link (works on Android/iOS/Web)
  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">

        {/* Contact Info Text */}
        <div className="space-y-6 text-right">
          <h2 className="text-3xl font-bold font-cairo text-primary">زورنا في المركز</h2>
          <p className="text-muted-foreground text-lg">
            نحن بانتظارك لتقديم أفضل خدمات الصيانة وتوفير قطع الغيار الأصلية.
          </p>

          <div className="space-y-4">
            <div className="flex items-center justify-end gap-3 text-lg">
              <span>شارع ١٠، المنشية الجديدة، المحلة الكبرى، الغربية</span>
              <MapPin className="text-primary w-6 h-6" />
            </div>
            <div className="flex items-center justify-end gap-3 text-lg">
              <span dir="ltr">012 2809 3434 - 010 2447 9427</span>
              <Phone className="text-primary w-6 h-6" />
            </div>
            <div className="flex items-center justify-end gap-3 text-lg">
              <span>يومياً من 9 صباحاً حتى 10 مساءً</span>
              <Clock className="text-primary w-6 h-6" />
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <Button asChild size="lg" className="gap-2">
              <Link href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
                احصل على الاتجاهات
                <MapPin className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Map Embed */}
        <div className="h-[400px] w-full rounded-2xl overflow-hidden shadow-lg border relative group">
          {/* Click overlay for interactive feel */}
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0 z-10 bg-black/0 hover:bg-black/5 transition-colors cursor-pointer md:hidden"
            title="Open in Maps"
          >
            <span className="sr-only">Open in Maps</span>
          </a>

          <iframe
            src={mapSrc}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full"
          />
        </div>
      </div>
    </section>
  );
}

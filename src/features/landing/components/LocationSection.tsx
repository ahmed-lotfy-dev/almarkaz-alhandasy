"use client";

import { Button } from "@/components/ui/button";
import { MapPin, Phone, Clock } from "lucide-react";
import Link from "next/link";

export function LocationSection() {
  // Coordinates from the User's Google Maps Link
  const lat = 30.963104;
  const lng = 31.155557;
  const placeName = "المركز الهندسي لقطع غيار الغسالات والثلاجات";

  // Google Maps url for iframe
  // We use the query format with (Name) to show a label on the pin.
  // URL encoded Place Name
  const query = `${lat},${lng}+(${encodeURIComponent(placeName)})`;
  const mapSrc = `https://maps.google.com/maps?q=${query}&hl=ar&z=19&ie=UTF8&iwloc=&output=embed`;

  // Directions URLs
  // Universal Google Maps link pointing to the specific query
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;

  return (
    <section className="container mx-auto px-4 py-24 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent -z-10" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* Contact Info Text */}
        <div className="space-y-8 text-right lg:pr-12">
          <div>
            <span className="text-primary font-bold tracking-wider uppercase text-sm mb-2 block">موقعنا</span>
            <h2 className="text-4xl md:text-5xl font-bold font-cairo text-foreground leading-tight">
              تفضل بزيارتنا <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">في المركز الرئيسي</span>
            </h2>
          </div>

          <p className="text-muted-foreground text-xl leading-relaxed max-w-lg">
            نحن بانتظارك لتقديم أفضل خدمات الصيانة وتوفير قطع الغيار الأصلية. فريقنا جاهز لمساعدتك في أي وقت.
          </p>

          <div className="space-y-6 pt-4">
            <div className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border/50 hover:border-primary/30 transition-colors shadow-sm">
              <div className="bg-primary/10 p-3 rounded-full text-primary shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div className="text-right">
                <h4 className="font-bold text-foreground">العنوان</h4>
                <p className="text-muted-foreground">شارع ١٠، المنشية الجديدة، المحلة الكبرى، الغربية</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border/50 hover:border-primary/30 transition-colors shadow-sm">
              <div className="bg-primary/10 p-3 rounded-full text-primary shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div className="text-right">
                <h4 className="font-bold text-foreground">أرقام التواصل</h4>
                <p dir="ltr" className="text-muted-foreground font-mono text-right">012 2809 3434 - 010 2447 9427</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border/50 hover:border-primary/30 transition-colors shadow-sm">
              <div className="bg-primary/10 p-3 rounded-full text-primary shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div className="text-right">
                <h4 className="font-bold text-foreground">مواعيد العمل</h4>
                <p className="text-muted-foreground">يومياً من 9 صباحاً حتى 10 مساءً</p>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-6">
            <Button asChild size="lg" className="rounded-full px-8 h-12 text-lg shadow-lg shadow-primary/20 hover:shadow-primary/40 gap-3">
              <Link href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
                احصل على الاتجاهات
                <MapPin className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Map Embed */}
        <div className="h-[500px] w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-gray-800 relative group transform hover:scale-[1.01] transition-transform duration-500">
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
            className="w-full h-full grayscale-[20%] hover:grayscale-0 transition-all duration-700"
          />
        </div>
      </div>
    </section>
  );
}

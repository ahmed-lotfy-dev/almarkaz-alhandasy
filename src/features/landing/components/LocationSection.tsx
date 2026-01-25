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
  const query = `${lat},${lng}+(${encodeURIComponent(placeName)})`;
  const mapSrc = `https://maps.google.com/maps?q=${query}&hl=ar&z=19&ie=UTF8&iwloc=&output=embed`;

  // Directions URLs
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;

  return (
    <section className="container mx-auto px-4 py-24 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent -z-10" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* Contact Info Text */}
        <div className="space-y-10 text-right lg:pr-12">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold font-heading uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-accent" />
              تواصل معنا
            </div>
            <h2 className="text-4xl md:text-6xl font-bold font-heading text-primary leading-tight">
              تفضل بزيارتنا <br />
              <span className="text-accent">في المركز الرئيسي</span>
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed font-sans max-w-lg">
              نحن بانتظارك لتقديم أفضل خدمات الصيانة وتوفير قطع الغيار الأصلية. فريقنا جاهز لمساعدتك في أي وقت.
            </p>
          </div>

          <div className="space-y-6">
            {[
              { icon: MapPin, label: "العنوان", content: "شارع ١٠، المنشية الجديدة، المحلة الكبرى" },
              { icon: Phone, label: "أرقام التواصل", content: "012 2809 3434 - 010 2447 9427", dir: "ltr" },
              { icon: Clock, label: "مواعيد العمل", content: "يومياً من 9 صباحاً حتى 10 مساءً" },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-6 p-6 rounded-2xl glass-card group transition-all duration-300">
                <div className="bg-accent/10 p-4 rounded-xl text-accent shrink-0 group-hover:bg-accent group-hover:text-white transition-colors duration-500">
                  <item.icon className="w-6 h-6" />
                </div>
                <div className="text-right space-y-1">
                  <h4 className="font-bold font-heading text-primary">{item.label}</h4>
                  <p dir={item.dir} className="text-muted-foreground font-sans text-lg">{item.content}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end pt-4">
            <Button asChild size="lg" className="rounded-full px-10 h-16 text-xl bg-primary hover:bg-primary/90 shadow-2xl shadow-primary/20 hover:shadow-primary/40 gap-4 transition-all active:scale-95">
              <Link href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
                احصل على الاتجاهات
                <MapPin className="w-6 h-6" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Map Embed */}
        <div className="h-[500px] w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-gray-800 relative group transform hover:scale-[1.01] transition-transform duration-500">
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

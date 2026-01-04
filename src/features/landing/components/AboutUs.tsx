"use client";

import { Phone, MapPin, Mail, Facebook, Instagram, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AboutUs() {
  return (
    <section className="py-16 bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-8 text-center">
          <div>
            <h2 className="text-3xl font-bold font-cairo mb-4 text-primary">عن المركز الهندسي</h2>
            <div className="h-1 w-20 bg-primary rounded-full mb-6 mx-auto"></div>
            <p className="text-lg text-muted-foreground leading-relaxed">
              نحن المركز الهندسي، متخصصون في بيع وصيانة قطع غيار الغسالات ومحطات الفلاتر.
              نقدم خدمات صيانة متميزة بأيدي مهندسين محترفين، ونوفر أجود قطع الغيار الأصلية.
              هدفنا هو راحتكم وتقديم حلول مستدامة لأجهزتكم المنزلية.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-right md:text-center">
            <div className="flex flex-col items-center gap-3 p-4 bg-background rounded-xl shadow-sm">
              <div className="p-3 bg-primary/10 rounded-full text-primary">
                <MapPin className="w-6 h-6" />
              </div>
              <p className="font-medium">شارع ١٠، المنشية الجديدة، المحلة الكبرى، الغربية</p>
            </div>

            <div className="flex flex-col items-center gap-3 p-4 bg-background rounded-xl shadow-sm">
              <div className="p-3 bg-primary/10 rounded-full text-primary">
                <Phone className="w-6 h-6" />
              </div>
              <div className="flex flex-col" dir="ltr">
                <a href="tel:+201228093434" className="hover:text-primary transition-colors font-bold">012 2809 3434</a>
                <a href="tel:+201024479427" className="hover:text-primary transition-colors font-bold">010 2447 9427</a>
              </div>
            </div>

            <div className="flex flex-col items-center gap-3 p-4 bg-background rounded-xl shadow-sm">
              <div className="p-3 bg-primary/10 rounded-full text-primary">
                <Mail className="w-6 h-6" />
              </div>
              <a href="mailto:info@almarkaz-alhandasy.com" className="hover:text-primary transition-colors">info@almarkaz-alhandasy.com</a>
            </div>
          </div>

          <div className="flex justify-center gap-4 pt-4">
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
      </div>
    </section>
  );
}

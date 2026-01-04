import { AppointmentForm } from "@/features/appointments/components/AppointmentForm";
import { Wrench } from "lucide-react";

export default function BookPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full text-primary font-medium">
              <Wrench className="w-5 h-5" />
              <span>خدمة صيانة احترافية</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold font-cairo text-foreground">
              احجز موعد صيانة
              <span className="block text-primary mt-2">في منزلك الآن</span>
            </h1>

            <p className="text-xl text-muted-foreground leading-relaxed">
              فريقنا الفني المتخصص جاهز لخدمتك. احجز موعداً مناسباً وسنصل إليك في الوقت المحدد
            </p>
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <AppointmentForm />
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-12 bg-accent/5">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold font-cairo mb-4">تحتاج مساعدة؟</h3>
          <p className="text-muted-foreground mb-6">تواصل معنا مباشرة عبر الهاتف</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-lg font-mono">
            <a href="tel:01224809343" className="text-primary hover:underline">012 2809 3434</a>
            <span className="hidden sm:inline text-muted-foreground">|</span>
            <a href="tel:01024479427" className="text-primary hover:underline">010 2447 9427</a>
          </div>
        </div>
      </section>
    </main>
  );
}

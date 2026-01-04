import { AppointmentForm } from "@/features/appointments/components/AppointmentForm";

export default function BookingPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold font-cairo text-center mb-8">حجز موعد صيانة</h1>
      <p className="text-center text-muted-foreground mb-8">
        قم بملء النموذج أدناه وسنقوم بالتواصل معك لتأكيد الموعد في أقرب وقت.
      </p>
      <div className="bg-card border rounded-lg p-6 md:p-8 max-w-2xl mx-auto shadow-sm">
        <AppointmentForm />
      </div>
    </div>
  );
}

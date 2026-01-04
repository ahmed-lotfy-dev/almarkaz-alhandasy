import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getAppointments } from "@/server/actions/appointments";
import { Calendar, User, Phone, MapPin, Wrench, Clock } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { ar } from "date-fns/locale";

export default async function AppointmentsAdminPage() {
  const result = await getAppointments();
  const appointments = result.success ? result.data : [];

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
    confirmed: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    completed: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    cancelled: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  };

  const statusLabels = {
    pending: "قيد الانتظار",
    confirmed: "مؤكد",
    completed: "مكتمل",
    cancelled: "ملغي",
  };

  const machineTypeLabels = {
    washing_machine: "غسالة",
    refrigerator: "ثلاجة",
    water_filter: "فلتر مياه",
    other: "أخرى",
  };

  const serviceTypeLabels = {
    repair: "إصلاح",
    installation: "تركيب",
    maintenance: "صيانة دورية",
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between border-b pb-6">
        <div>
          <h1 className="text-3xl font-bold font-cairo text-primary tracking-wide">إدارة المواعيد</h1>
          <p className="text-muted-foreground mt-1">عرض وإدارة طلبات الصيانة</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-sm text-muted-foreground">
            إجمالي المواعيد: <span className="font-bold text-foreground">{appointments?.length || 0}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {appointments && appointments.length > 0 ? (
          appointments.map((appointment: any) => (
            <Card key={appointment.id} className="overflow-hidden hover:shadow-xl hover:border-primary/50 transition-all duration-300">
              <CardContent className="p-0">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
                  {/* Customer Info */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2 rounded-lg">
                        <User className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">العميل</p>
                        <p className="font-bold">{appointment.guestName || "مستخدم مسجل"}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2 rounded-lg">
                        <Phone className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">الهاتف</p>
                        <p className="font-mono" dir="ltr">{appointment.guestPhone || "غير متوفر"}</p>
                      </div>
                    </div>

                    {appointment.guestEmail && (
                      <div className="flex items-center gap-3">
                        <div className="bg-primary/10 p-2 rounded-lg">
                          <User className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">البريد</p>
                          <p className="text-sm font-mono" dir="ltr">{appointment.guestEmail}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Appointment Details */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2 rounded-lg">
                        <Wrench className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">نوع الجهاز</p>
                        <p className="font-bold">{machineTypeLabels[appointment.machineType as keyof typeof machineTypeLabels]}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2 rounded-lg">
                        <Clock className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">نوع الخدمة</p>
                        <p className="font-bold">{serviceTypeLabels[appointment.serviceType as keyof typeof serviceTypeLabels]}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2 rounded-lg">
                        <Calendar className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">التاريخ المفضل</p>
                        <p className="font-bold">
                          {format(new Date(appointment.date), "PPP", { locale: ar })}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Address & Status */}
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-primary/10 p-2 rounded-lg">
                        <MapPin className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-muted-foreground">العنوان</p>
                        <p className="text-sm leading-relaxed">{appointment.address}</p>
                      </div>
                    </div>

                    {appointment.notes && (
                      <div className="bg-muted/50 p-3 rounded-lg">
                        <p className="text-sm text-muted-foreground mb-1">ملاحظات</p>
                        <p className="text-sm">{appointment.notes}</p>
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-4 border-t">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[appointment.status as keyof typeof statusColors]}`}>
                        {statusLabels[appointment.status as keyof typeof statusLabels]}
                      </span>
                      <Button variant="outline" size="sm">
                        تحديث الحالة
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-16 text-center text-muted-foreground bg-accent/5 rounded-3xl border-2 border-dashed border-border/50">
            <div className="bg-muted p-4 rounded-full mb-4">
              <Calendar className="w-8 h-8 opacity-50" />
            </div>
            <p className="text-lg font-medium">لا توجد مواعيد حالياً</p>
            <p className="text-sm opacity-70 mt-1">ستظهر طلبات الصيانة هنا</p>
          </div>
        )}
      </div>
    </div>
  );
}

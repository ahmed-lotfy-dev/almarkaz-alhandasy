import { db } from "@/db";
import { appointments, user } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ar } from "date-fns/locale";

export default async function AppointmentsAdminPage() {
  const allAppointments = await db
    .select({
      id: appointments.id,
      date: appointments.date,
      status: appointments.status,
      serviceType: appointments.serviceType,
      machineType: appointments.machineType,
      notes: appointments.notes,
      address: appointments.address,
      userName: user.name,
      userEmail: user.email,
    })
    .from(appointments)
    .leftJoin(user, eq(appointments.userId, user.id))
    .orderBy(desc(appointments.date));

  const getStatusBadge = (status: string | null) => {
    switch (status) {
      case "pending":
        return <Badge variant="secondary">قيد الانتظار</Badge>;
      case "confirmed":
        return <Badge className="bg-green-500 hover:bg-green-600">مؤكد</Badge>;
      case "completed":
        return <Badge className="bg-blue-500 hover:bg-blue-600">مكتمل</Badge>;
      case "cancelled":
        return <Badge variant="destructive">ملغي</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getMachineLabel = (type: string | null) => {
    switch (type) {
      case "washing_machine": return "غسالة";
      case "water_filter": return "فلتر مياه";
      default: return type;
    }
  }

  const getServiceLabel = (type: string | null) => {
    switch (type) {
      case "maintenance": return "صيانة";
      case "installation": return "تركيب";
      case "consultation": return "استشارة";
      default: return type;
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold font-cairo text-primary">إدارة المواعيد</h1>
      </div>

      <div className="bg-card rounded-lg border shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-right">التاريخ</TableHead>
              <TableHead className="text-right">العميل</TableHead>
              <TableHead className="text-right">نوع الجهاز</TableHead>
              <TableHead className="text-right">نوع الخدمة</TableHead>
              <TableHead className="text-right">العنوان</TableHead>
              <TableHead className="text-right">الحالة</TableHead>
              {/* <TableHead className="text-right">ملاحظات</TableHead> */}
            </TableRow>
          </TableHeader>
          <TableBody>
            {allAppointments.length > 0 ? (
              allAppointments.map((apt) => (
                <TableRow key={apt.id}>
                  <TableCell className="font-medium">
                    {format(apt.date, "PPP", { locale: ar })}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span>{apt.userName || "زائر"}</span>
                      <span className="text-xs text-muted-foreground">{apt.userEmail}</span>
                    </div>
                  </TableCell>
                  <TableCell>{getMachineLabel(apt.machineType)}</TableCell>
                  <TableCell>{getServiceLabel(apt.serviceType)}</TableCell>
                  <TableCell className="max-w-xs truncate" title={apt.address || ""}>{apt.address || "-"}</TableCell>
                  <TableCell>{getStatusBadge(apt.status)}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  لا توجد طلبات صيانة حتى الآن.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

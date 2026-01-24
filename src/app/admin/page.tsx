export const dynamic = "force-dynamic";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, CalendarDays, Users, DollarSign } from "lucide-react";
import { productQueries } from "@/db/queries/products";
import { appointmentQueries } from "@/db/queries/appointments";
import { userQueries } from "@/db/queries/users";

export default async function AdminDashboard() {
  // These would be fetched from DB in a real server component
  // Fetch real data
  const [products, appointments, users] = await Promise.all([
    productQueries.findAll(),
    appointmentQueries.findAll(),
    userQueries.findAll(),
  ]);

  const activeProducts = products.length; // Assuming all are active for now, or filter if 'isActive' exists
  // const maintenanceRequests = appointments.length;

  const pendingAppointments = appointments.filter(
    (a) => a.status === "pending"
  );
  const newRequestsCount = pendingAppointments.length;

  const usersCount = users.length;

  const stats = [
    {
      title: "إجمالي المنتجات",
      value: activeProducts.toString(),
      icon: Package,
      description: `${activeProducts} منتج في المتجر`,
    },
    {
      title: "طلبات الصيانة",
      value: appointments.length.toString(),
      icon: CalendarDays,
      description: `${newRequestsCount} طلب جديد`,
    },
    {
      title: "المستخدمين",
      value: usersCount.toString(),
      icon: Users,
      description: `${usersCount} مستخدم مسجل`,
    },
    {
      title: "المبيعات",
      value: "0 ج.م",
      icon: DollarSign,
      description: "إجمالي مبيعات الشهر",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-cairo text-primary">
          لوحة التحكم
        </h1>
        <p className="text-muted-foreground mt-2">نظرة عامة على أداء المتجر</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-sans">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity or Tables Placeholder */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="h-75 flex items-center justify-center border-dashed">
          <span className="text-muted-foreground">
            رسم بياني للمبيعات (قريباً)
          </span>
        </Card>
        <Card className="h-75 flex items-center justify-center border-dashed">
          <span className="text-muted-foreground">آخر الطلبات (قريباً)</span>
        </Card>
      </div>
    </div>
  );
}

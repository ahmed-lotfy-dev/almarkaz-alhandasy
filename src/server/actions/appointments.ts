"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { appointmentQueries } from "@/db/queries/appointments";

const appointmentSchema = z.object({
  guestName: z.string().min(1, "الاسم مطلوب").optional(),
  guestEmail: z.string().email("البريد الإلكتروني غير صحيح").optional().or(z.literal("")),
  guestPhone: z.string().min(10, "رقم الهاتف مطلوب"),
  serviceType: z.string().min(1, "نوع الخدمة مطلوب"),
  machineType: z.string().min(1, "نوع الجهاز مطلوب"),
  date: z.string().min(1, "التاريخ مطلوب"),
  notes: z.string().optional(),
  address: z.string().min(1, "العنوان مطلوب"),
});

export async function createAppointment(data: z.infer<typeof appointmentSchema>) {
  try {
    // Validate input
    const validated = appointmentSchema.parse(data);

    // Check if user is authenticated
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    // Prepare appointment data
    const appointmentData = {
      userId: session?.user?.id || null,
      guestName: session?.user?.name || validated.guestName || null,
      guestEmail: validated.guestEmail || session?.user?.email || null,
      guestPhone: validated.guestPhone,
      serviceType: validated.serviceType,
      machineType: validated.machineType,
      date: new Date(validated.date),
      notes: validated.notes || null,
      address: validated.address,
    };

    // Use query layer to create appointment
    const appointment = await appointmentQueries.create(appointmentData);

    // Revalidate admin appointments page
    revalidatePath("/admin/appointments");
    revalidatePath("/book");

    return {
      success: true,
      data: appointment,
      message: "تم حجز الموعد بنجاح",
    };
  } catch (error) {
    console.error("Error creating appointment:", error);
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.issues[0].message,
      };
    }
    return {
      success: false,
      error: "حدث خطأ أثناء حجز الموعد",
    };
  }
}

export async function getAppointments() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    // TODO: Re-enable admin check after implementing proper middleware
    // The role field needs to be properly typed in Better Auth session
    // if (!session?.user || session.user.role !== "admin") {
    //   return {
    //     success: false,
    //     error: "غير مصرح لك بالوصول",
    //   };
    // }

    // Use query layer to fetch all appointments
    const allAppointments = await appointmentQueries.findAll();

    return {
      success: true,
      data: allAppointments,
    };
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return {
      success: false,
      error: "حدث خطأ أثناء جلب المواعيد",
    };
  }
}

export async function updateAppointmentStatus(id: string, status: string) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    // TODO: Re-enable admin check after implementing proper middleware
    // if (!session?.user || session.user.role !== "admin") {
    //   return {
    //     success: false,
    //     error: "غير مصرح لك بالوصول",
    //   };
    // }

    // Use query layer to update status
    const updated = await appointmentQueries.updateStatus(id, status);

    return {
      success: true,
      data: updated,
      message: "تم تحديث حالة الموعد بنجاح",
    };
  } catch (error) {
    console.error("Error updating appointment:", error);
    return {
      success: false,
      error: "حدث خطأ أثناء تحديث الموعد",
    };
  }
}

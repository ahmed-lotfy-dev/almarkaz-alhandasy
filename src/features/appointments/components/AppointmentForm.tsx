"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, CalendarIcon, Wrench } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { format } from "date-fns";
import { ar } from "date-fns/locale";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { createAppointment } from "@/server/actions/appointments";
import { authClient } from "@/lib/auth-client";

const formSchema = z.object({
  guestName: z.string().min(1, "الاسم مطلوب"),
  guestEmail: z.string().email("البريد الإلكتروني غير صحيح").optional().or(z.literal("")),
  guestPhone: z.string().min(10, "رقم الهاتف مطلوب"),
  serviceType: z.string().min(1, "نوع الخدمة مطلوب"),
  machineType: z.string().min(1, "نوع الجهاز مطلوب"),
  date: z.date(),
  notes: z.string().optional(),
  address: z.string().min(1, "العنوان مطلوب"),
});

type FormValues = z.infer<typeof formSchema>;

export function AppointmentForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: session } = authClient.useSession();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      guestName: session?.user?.name || "",
      guestEmail: session?.user?.email || "",
      guestPhone: "",
      serviceType: "",
      machineType: "",
      notes: "",
      address: "",
    },
  });

  async function onSubmit(values: FormValues) {
    setIsSubmitting(true);
    try {
      // Convert date to ISO string for server action
      const result = await createAppointment({
        ...values,
        date: values.date.toISOString(),
      });

      if (result.success) {
        toast.success(result.message || "تم حجز الموعد بنجاح");
        form.reset();
        router.refresh();
      } else {
        toast.error(result.error || "حدث خطأ أثناء حجز الموعد");
      }
    } catch (error) {
      toast.error("حدث خطأ غير متوقع");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 bg-card p-8 rounded-2xl border shadow-lg">
        <div className="space-y-2">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-primary/10 p-3 rounded-xl">
              <Wrench className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold font-cairo">احجز موعد صيانة</h2>
              <p className="text-muted-foreground">املأ البيانات التالية وسنتواصل معك قريباً</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="guestName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>الاسم الكامل *</FormLabel>
                <FormControl>
                  <Input placeholder="أحمد محمد" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="guestPhone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>رقم الهاتف *</FormLabel>
                <FormControl>
                  <Input placeholder="01234567890" dir="ltr" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="guestEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>البريد الإلكتروني (اختياري)</FormLabel>
              <FormControl>
                <Input placeholder="example@email.com" type="email" dir="ltr" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="machineType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>نوع الجهاز *</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر نوع الجهاز" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="washing_machine">غسالة</SelectItem>
                    <SelectItem value="refrigerator">ثلاجة</SelectItem>
                    <SelectItem value="water_filter">فلتر مياه</SelectItem>
                    <SelectItem value="other">أخرى</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="serviceType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>نوع الخدمة *</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر نوع الخدمة" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="repair">إصلاح</SelectItem>
                    <SelectItem value="installation">تركيب</SelectItem>
                    <SelectItem value="maintenance">صيانة دورية</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>تاريخ الموعد المفضل *</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-right font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP", { locale: ar })
                      ) : (
                        <span>اختر تاريخاً</span>
                      )}
                      <CalendarIcon className="mr-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date < new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                    locale={ar}
                    dir="rtl"
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                سنحاول الالتزام بهذا الموعد أو التواصل معك لتنسيق موعد بديل.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>العنوان *</FormLabel>
              <FormControl>
                <Textarea placeholder="المنطقة، الشارع، رقم المبنى..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ملاحظات إضافية (اختياري)</FormLabel>
              <FormControl>
                <Textarea placeholder="أي تفاصيل إضافية عن المشكلة..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-start pt-4">
          <Button type="submit" disabled={isSubmitting} size="lg" className="gap-2">
            {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
            تأكيد الحجز
          </Button>
        </div>
      </form>
    </Form>
  );
}

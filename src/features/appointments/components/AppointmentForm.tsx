"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
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
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { toast } from "sonner"; // Assuming toast is installed, otherwise alert
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

const formSchema = z.object({
  serviceType: z.enum(["repair", "installation", "maintenance"]),
  machineType: z.enum(["washing_machine", "water_filter"]),
  date: z.date(),
  address: z.string().min(5, {
    message: "العنوان يجب أن يكون 5 أحرف على الأقل",
  }),
  notes: z.string().optional(),
});

export function AppointmentForm() {
  const { data: session } = authClient.useSession();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: "",
      notes: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!session) {
      alert("يجب تسجيل الدخول أولاً لحجز موعد");
      window.location.href = "/sign-in";
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        alert("تم حجز الموعد بنجاح! سنتواصل معك قريباً لتأكيد الموعد.");
        form.reset();
      } else {
        const error = await response.text();
        alert(`حدث خطأ: ${error}`);
      }
    } catch (error) {
      alert("حدث خطأ أثناء الاتصال بالخادم");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-2xl mx-auto py-10">
        <FormField
          control={form.control}
          name="machineType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>نوع الجهاز</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="text-right">
                    <SelectValue placeholder="اختر الجهاز" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent dir="rtl">
                  <SelectItem value="washing_machine">غسالة</SelectItem>
                  <SelectItem value="water_filter">فلتر مياه</SelectItem>
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
              <FormLabel>نوع الخدمة</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="text-right">
                    <SelectValue placeholder="اختر الخدمة" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent dir="rtl">
                  <SelectItem value="repair">صيانة / إصلاح</SelectItem>
                  <SelectItem value="installation">تركيب</SelectItem>
                  <SelectItem value="maintenance">صيانة دورية</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>تاريخ الموعد المفضل</FormLabel>
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
              <FormLabel>العنوان بالتفصيل</FormLabel>
              <FormControl>
                <Input placeholder="المدينة، الحي، اسم الشارع، رقم العمارة" {...field} className="text-right" />
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
                <Textarea
                  placeholder="اوصف المشكلة باختصار..."
                  className="resize-none text-right"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" size="lg" disabled={loading}>
          {loading ? "جاري الحجز..." : "تأكيد الحجز"}
        </Button>
      </form>
    </Form>
  );
}

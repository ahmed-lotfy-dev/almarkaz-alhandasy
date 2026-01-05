import "dotenv/config";
import { db } from "./index.js";
import { heroSlides, categories, products, appointments } from "./schema.js";

const main = async () => {
  console.log("Seeding database...");

  // Helper to safely delete from a table (skip if table doesn't exist)
  async function safeDelete(table: any, name: string) {
    try {
      await db.delete(table);
      console.log(`Cleared ${name}`);
    } catch (err: any) {
      // Drizzle wraps PG errors; if table doesn't exist, skip
      const msg = err?.message || String(err);
      if (msg.includes('does not exist') || msg.includes('42P01')) {
        console.warn(`Skipping delete ${name}: table does not exist`);
      } else {
        console.error(`Error deleting ${name}:`, err);
        throw err;
      }
    }
  }

  // Clear existing data (order matters for foreign keys)
  await safeDelete(appointments, 'appointments');
  await safeDelete(products, 'products');
  await safeDelete(heroSlides, 'hero_slides');
  await safeDelete(categories, 'categories');

  // Seed Categories
  const categoryData = [
    {
      name: "غسالات",
      slug: "washing-machines",
      description: "أحدث موديلات الغسالات الأوتوماتيك والفوق أوتوماتيك",
      isActive: true,
    },
    {
      name: "فلاتر",
      slug: "water-filters",
      description: "فلاتر مياه منزلية ومحطات تنقية متكاملة",
      isActive: true,
    },
    {
      name: "قطع غيار غسالات",
      slug: "washing-machine-parts",
      description: "قطع غيار أصلية لجميع أنواع الغسالات",
      isActive: true,
    },
    {
      name: "قطع غيار فلاتر",
      slug: "water-filter-parts",
      description: "شمعات وقطع غيار فلاتر المياه",
      isActive: true,
    },
  ];

  const insertedCategories = await db.insert(categories).values(categoryData).returning();
  console.log("Categories seeded!");

  const catMap = Object.fromEntries(insertedCategories.map((c: any) => [c.slug, c.id]));

  // Seed Products (10)
  const productData = [
    { name: "غسالة أوتوماتيك 8 كجم", description: "غسالة موفرة للطاقة، سعة 8 كجم", price: "7999.00", stock: 10, categoryId: catMap['washing-machines'], image: "/products/w1.png", images: ["/products/w1.png"], sku: "WM-8001", discount: "0", isActive: true },
    { name: "فلتر مياه منزلي 5 مراحل", description: "فلتر منزلي لتنقية المياه", price: "1299.00", stock: 25, categoryId: catMap['water-filters'], image: "/products/f1.png", images: ["/products/f1.png"], sku: "WF-5001", discount: "0", isActive: true },
    { name: "طقم قطع غيار غسالة (حزام)", description: "حزام ومحامل أصلية", price: "299.00", stock: 50, categoryId: catMap['washing-machine-parts'], image: "/products/part1.png", images: ["/products/part1.png"], sku: "WP-1001", discount: "0", isActive: true },
    { name: "شمع فلتر مياه", description: "شمع فلتر بديل", price: "89.00", stock: 100, categoryId: catMap['water-filter-parts'], image: "/products/part2.png", images: ["/products/part2.png"], sku: "FP-2001", discount: "0", isActive: true },
    { name: "غسالة فوق أوتوماتيك 10 كجم", description: "اداء عالي وسعة 10 كجم", price: "9999.00", stock: 5, categoryId: catMap['washing-machines'], image: "/products/w2.png", images: ["/products/w2.png"], sku: "WM-1001", discount: "0", isActive: true },
    { name: "فلتر حوض مياه أرضي", description: "فلتر للاستخدام الشاق", price: "2499.00", stock: 12, categoryId: catMap['water-filters'], image: "/products/f2.png", images: ["/products/f2.png"], sku: "WF-6001", discount: "0", isActive: true },
    { name: "مجموعة صيانة غسالة", description: "ادوات صيانة أساسية", price: "159.00", stock: 40, categoryId: catMap['washing-machine-parts'], image: "/products/part3.png", images: ["/products/part3.png"], sku: "WP-1002", discount: "0", isActive: true },
    { name: "فلتر ما قبل الكربون", description: "فلتر للكربون النشط", price: "199.00", stock: 60, categoryId: catMap['water-filter-parts'], image: "/products/part4.png", images: ["/products/part4.png"], sku: "FP-2002", discount: "0", isActive: true },
    { name: "محرّك غسالة بقدرة 200 واط", description: "محرّك بديل لغسالات متعددة", price: "499.00", stock: 15, categoryId: catMap['washing-machine-parts'], image: "/products/part5.png", images: ["/products/part5.png"], sku: "WP-1003", discount: "0", isActive: true },
    { name: "فلتر خزّان مياه", description: "فلتر لخزّان المياه المنزلي", price: "349.00", stock: 30, categoryId: catMap['water-filter-parts'], image: "/products/part6.png", images: ["/products/part6.png"], sku: "FP-2003", discount: "0", isActive: true },
  ];

  await db.insert(products).values(productData);
  console.log('Products seeded!');

  const slides = [
    {
      title: "قطع غيار أصلية",
      description: "نوفر جميع قطع غيار الغسالات والثلاجات بأفضل الأسعار",
      imageUrl: "/hero-spare-parts.png",
      linkUrl: "/shop",
      buttonText: "تسوق الآن",
      order: 1,
      isActive: true,
    },
    {
      title: "صيانة احترافية",
      description: "فريق فني متخصص لإصلاح الأعطال في منزلك",
      imageUrl: "/hero-maintenance.png",
      linkUrl: "/book",
      buttonText: "احجز صيانتك",
      order: 2,
      isActive: true,
    },
    {
      title: "أنظمة تنقية المياه",
      description: "تمتع بمياه نقية وصحية مع أفضل فلاتر المياه المنزلية",
      imageUrl: "/hero-water-filters.png",
      linkUrl: "/shop",
      buttonText: "تسوق الآن",
      order: 3,
      isActive: true,
    },
  ];

  await db.insert(heroSlides).values(slides);

  // Seed 2 maintenance appointments
  const appts = [
    {
      guestName: 'أحمد محمد',
      guestPhone: '01001234567',
      guestEmail: 'ahmed@example.com',
      serviceType: 'غسالة - صيانة دورية',
      machineType: 'washing_machine',
      date: new Date(Date.now() + 86400000), // +1 day
      address: 'القاهرة، منطقة المهندسين',
      status: 'pending',
    },
    {
      guestName: 'سارة علي',
      guestPhone: '01007654321',
      guestEmail: 'sara@example.com',
      serviceType: 'فلتر مياه - تركيب',
      machineType: 'water_filter',
      date: new Date(Date.now() + 172800000), // +2 days
      address: 'الجيزة، مدينة نصر',
      status: 'pending',
    },
  ];

  await db.insert(appointments).values(appts);

  console.log("Database seeded successfully!");
  process.exit(0);
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

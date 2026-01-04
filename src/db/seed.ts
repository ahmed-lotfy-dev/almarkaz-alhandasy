import { db } from "./index";
import { heroSlides } from "./schema";

const main = async () => {
  console.log("Seeding database...");

  // Clear existing slides to avoid clutter/duplication
  await db.delete(heroSlides);

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
      linkUrl: "/shop", // Reverted to shop since filters page is deleted
      buttonText: "تسوق الآن",
      order: 3,
      isActive: true,
    },
  ];

  await db.insert(heroSlides).values(slides);

  console.log("Database seeded successfully!");
  process.exit(0);
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

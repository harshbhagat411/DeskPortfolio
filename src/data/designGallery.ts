import img002 from "../assets/design-gallery/002.png";
import imgBCTLogo from "../assets/design-gallery/BCTLogo.png";
import imgCozyCenter from "../assets/design-gallery/CozyCenter.png";
import imgFinnaceApp from "../assets/design-gallery/FinnaceApp.png";
import imgUICARD from "../assets/design-gallery/UICARD.png";
import imgNotification from "../assets/design-gallery/notification.jpg";
import imgShoesApp from "../assets/design-gallery/shoesapp.jpg";

export interface DesignItem {
  id: string;
  title: string;
  category: string;
  image: string;
}

export const designGallery: DesignItem[] = [
  {
    id: "cozy-center",
    title: "Cozy Center Web Concept",
    category: "Web Design",
    image: imgCozyCenter,
  },
  {
    id: "ecommerce-app",
    title: "E-Commerce App Interface",
    category: "Mobile Design",
    image: img002,
  },
  {
    id: "finance-app",
    title: "Finance Dashboard App",
    category: "Mobile Design",
    image: imgFinnaceApp,
  },
  {
    id: "ui-card-system",
    title: "Glassmorphic UI Card System",
    category: "UI Design",
    image: imgUICARD,
  },
  {
    id: "bct-logo",
    title: "BCT Logo Concept",
    category: "Branding",
    image: imgBCTLogo,
  },
  {
    id: "shoes-app",
    title: "Sneaker Store App Design",
    category: "Mobile Design",
    image: imgShoesApp,
  },
  {
    id: "notification-ux",
    title: "Push Notification UX Flow",
    category: "UX Design",
    image: imgNotification,
  },
];

import {
  Star,
  Sparkles,
  ShoppingBag,
  BuildingIcon,
  Globe,
  ShieldCheck,
  MailCheck,
  Smartphone,
  SearchCheck,
  BarChart4,
  CheckCircle,
  Users,
  Award,
} from "lucide-react";
import { CgSmartphone } from "react-icons/cg";
import { LucideIcon } from "lucide-react";
import { IconType } from "react-icons";

type IconComponent = LucideIcon | IconType;

export const iconMap: Record<string, IconComponent> = {
  // Pricing Icons
  Star,
  Sparkles,
  ShoppingBag,
  BuildingIcon,
  CgSmartphone,

  // Service Icons
  Globe,
  ShieldCheck,
  MailCheck,
  Smartphone,
  SearchCheck,
  BarChart4,

  // About Icons
  CheckCircle,
  Users,
  Award,
};

export function getIcon(name: string): IconComponent {
  return iconMap[name] || Star;
}

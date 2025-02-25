import {
  ChevronRight,
  Contact2Icon,
  DollarSign,
  HelpCircle,
  LayoutDashboard,
  PackageSearch,
  TicketPercent,
} from "lucide-react";

export const dashboardSidebar = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/",
  },
  {
    name: "Analytics",
    icon: PackageSearch,
    path: "/analytics",
  },
  {
    name: "Customers",
    icon: Contact2Icon,
    path: "/panel",
  },
  {
    name: "Earnings",
    icon: DollarSign,
    path: "/panel",
  },
  {
    name: "Offers",
    icon: TicketPercent,
    path: "/panel",
  },
  {
    name: "Help",
    icon: HelpCircle,
    path: "/panel",
  },
];

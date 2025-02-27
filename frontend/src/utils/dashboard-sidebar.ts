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
    path: "/admin-panel",
  },
  {
    name: "Analytics",
    icon: PackageSearch,
    path: "/analytics",
  },
  {
    name: "Customers",
    icon: Contact2Icon,
    path: "/admin-panel",
  },
  {
    name: "Earnings",
    icon: DollarSign,
    path: "/admin-panel",
  },
  {
    name: "Offers",
    icon: TicketPercent,
    path: "/admin-panel",
  },
  {
    name: "Help",
    icon: HelpCircle,
    path: "/admin-panel",
  },
];

import {
  ChartLineIcon,
  ContactIcon,
  FrameIcon,
  HelpCircleIcon,
  HomeIcon,
  PieChartIcon,
  Smartphone,
  StoreIcon,
  TicketIcon,
} from "lucide-react";

export const data = {
  navMain: [
    {
      title: "Overview",
      url: "/",
      icon: <HomeIcon />,
      isActive: true,
    },
    {
      title: "Tickets",
      url: "/tickets",
      icon: <TicketIcon />,
    },
    {
      title: "Sales",
      url: "/sales",
      icon: <StoreIcon />,
    },
    {
      title: "Analytics",
      url: "/analytics",
      icon: <ChartLineIcon />,
    },
    {
      title: "Teams",
      url: "/teams",
      icon: <ContactIcon />,
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "/support",
      icon: <HelpCircleIcon />,
    },
  ],
};

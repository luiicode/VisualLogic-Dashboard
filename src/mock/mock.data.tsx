import {
  ChartLineIcon,
  ContactIcon,
  DatabaseIcon,
  FrameIcon,
  HelpCircleIcon,
  HomeIcon,
  MapIcon,
  PieChartIcon,
  StoreIcon,
  TicketIcon,
} from "lucide-react";

export const data = {
  user: {
    name: "Luis Cortes",
    email: "luiscorte@visualogic.com",
    avatar: "https://github.com/shadcn.png",
  },
  navMain: [
    {
      title: "Overview",
      url: "/",
      icon: <HomeIcon />,
      isActive: true,
    },
    {
      title: "Data Explorer",
      url: "/data-explorer",
      icon: <DatabaseIcon />,
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
      title: "Users",
      url: "/users",
      icon: <ContactIcon />,
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: <HelpCircleIcon />,
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: <FrameIcon />,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: <PieChartIcon />,
    },
    {
      name: "Travel",
      url: "#",
      icon: <MapIcon />,
    },
  ],
};

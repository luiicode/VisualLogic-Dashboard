"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarMenuButton, useSidebar } from "@/components/ui/sidebar";
import { LogoIcon } from "@/components/ui/svg/LogoIcon";
import {
  AlignStartVerticalIcon,
  AstroidIcon,
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  DatabaseIcon,
  HelpCircleIcon,
  HomeIcon,
  LogOut,
  StoreIcon,
  TicketsIcon,
  UsersIcon,
} from "lucide-react";

interface UserProps {
  userName: string;
  userEmail: string;
  avatarUrl?: string;
}

export const SideBarMenu = ({ userName, userEmail, avatarUrl }: UserProps) => {
  const { isMobile } = useSidebar();
  return (
    <>
      <aside className="w-64 h-screen p-4 border-r flex flex-col gap-6">
        <section className="flex items-center gap-4 mb-8">
          <LogoIcon className="w-12 h-12" />
          <article className="space-y-1">
            <h3 className="font-bold">Visual Logic</h3>
            <p className="text-sm text-muted-foreground">
              Enterprise AI Solutions
            </p>
          </article>
        </section>
        <section className="flex flex-col gap-8">
          <nav className="flex-1">
            <ul className="space-y-4 list-none">
              <li className="text-primary font-medium flex flex-row items-center gap-2 hover:bg-slate-300 rounded-lg px-2 py-1">
                <HomeIcon className="w-5 h-5" />
                Overview
              </li>
              <li className="text-primary font-medium flex flex-row items-center gap-2 hover:bg-slate-300 rounded-lg px-2 py-1">
                <AstroidIcon className="w-5 h-5" />
                AI Workspace
              </li>
              <li className="text-primary font-medium flex flex-row items-center gap-2 hover:bg-slate-300 rounded-lg px-2 py-1">
                <DatabaseIcon className="w-5 h-5" />
                Data Explorer
              </li>
              <li className="text-primary font-medium flex flex-row items-center gap-2 hover:bg-slate-300 rounded-lg px-2 py-1">
                <TicketsIcon className="w-5 h-5" />
                Tickets
              </li>
              <li className="text-primary font-medium flex flex-row items-center gap-2 hover:bg-slate-300 rounded-lg px-2 py-1">
                <StoreIcon className="w-5 h-5" />
                Sales
              </li>
              <li className="text-primary font-medium flex flex-row items-center gap-2 hover:bg-slate-300 rounded-lg px-2 py-1">
                <AlignStartVerticalIcon className="w-5 h-5" />
                Analytics
              </li>
              <li className="text-primary font-medium flex flex-row items-center gap-2 hover:bg-slate-300 rounded-lg px-2 py-1">
                <UsersIcon className="w-5 h-5" />
                Users
              </li>
            </ul>
          </nav>
        </section>
        <section className="flex flex-col gap-4 mt-auto">
          <li className="text-primary font-medium list-none flex flex-row items-center gap-2 hover:bg-slate-300 rounded-lg px-2 py-1">
            <HelpCircleIcon className="w-5 h-5" />
            Help Center
          </li>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src={avatarUrl || "https://github.com/shadcn.png"}
                    alt={userName}
                    className="grayscale"
                  />
                  <AvatarFallback className="rounded-lg">User</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{userName}</span>
                  <span className="truncate text-xs">{userEmail}</span>
                </div>
                <ChevronsUpDown className="ml-auto size-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
              side={isMobile ? "bottom" : "right"}
              align="end"
              sideOffset={4}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage
                      src={avatarUrl || "https://github.com/shadcn.png"}
                      alt={userName}
                      className="grayscale"
                    />
                    <AvatarFallback className="rounded-lg">User</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">{userName}</span>
                    <span className="truncate text-xs">{userEmail}</span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <BadgeCheck />
                  Account
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Bell />
                  Notifications
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </section>
      </aside>
    </>
  );
};

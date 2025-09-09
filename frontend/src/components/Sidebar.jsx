"use client";

import { Calendar, Home, Inbox, ListOrdered, LogOut, Search, Settings, ShoppingBasket } from "lucide-react";
import { AuthContext } from "../app/context/AuthContext";
import { useContext } from "react";
import { useRouter } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { faProductHunt } from "@fortawesome/free-brands-svg-icons";
import { M_PLUS_Rounded_1c } from "next/font/google";

export function AppSidebar() {
  const { user, logout } = useContext(AuthContext);
  const router = useRouter();

  // Menu items.
  const items = [
    { title: "Home", url: "/admin", icon: Home },
    { title: "Product Management", url: "/admin/products", icon: ShoppingBasket },
    { title: "Order Management", url: "/admin/orders", icon: ListOrdered },
    {
      title: "Logout",
      icon: LogOut,
      onClick: async (e) => {
        e.preventDefault();        // prevent page reload
        await logout();            // call your context logout function
        router.push("/");     // redirect to login page
      },
    },
  ];

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className={'text-2xl font-bold text-black border-b-6 border-black mb-4'}>Admin Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    {/* Use a button for logout, link for others */}
                    {item.onClick ? (
                      <button onClick={item.onClick} className="flex items-center gap-2 w-full text-left text-2xl">
                        <item.icon />
                        <span>{item.title}</span>
                      </button>
                    ) : (
                      <Link href={item.url} className="flex items-center gap-2 text-3xl">
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

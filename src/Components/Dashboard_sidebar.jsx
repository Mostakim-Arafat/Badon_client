'use client'

import {Bars, Bell, Envelope, Gear, House, Magnifier, Person} from "@gravity-ui/icons";
import {Button, Drawer} from "@heroui/react";
import { userData } from "@/lib/allget";
import Link from "next/link";

export default function Sidebar( ) {
    const userinfo = userData()
    console.log(userinfo)
    let navItems = []
    const Donormenu = [
    {icon: Person, label: "Profile",href:'/dashboard/Profile'},
    {icon: House, label: "My Donation Request",href:'/dashboard/my-donation-request'},
    {icon: Bell, label: "Create Request",href:'/dashboard/create-request'},
  ];
    const Volunteer_menu = [
    {icon: Person, label: "Profile",href:'/dashboard/Profile'},
    {icon: Bell, label: "All blood donation Requests",href:'/dashboard/all-blood-donation-request'},
  ];
    const Admin_menu = [
    {icon: Person, label: "Profile",href:'/dashboard/Profile'},
    {icon: House, label: "All users",href:'/dashboard/all-users'},
    {icon: Bell, label: "All blood donation Requests",href:'/dashboard/all-blood-donation-request'},
  ];
    if(userinfo?.role === 'donor'){
       navItems = Donormenu
    }
    if(userinfo?.role === 'volunteer'){
       navItems = Volunteer_menu
    }
    if(userinfo?.role === 'admin'){
       navItems = Admin_menu
    }

  return (
    <Drawer>
      <Button variant="secondary">
        <Bars />
        Menu
      </Button>
      <Drawer.Backdrop>
        <Drawer.Content placement="left">
          <Drawer.Dialog>
            <Drawer.CloseTrigger />
            <Drawer.Header>
              <Drawer.Heading>Dashboard</Drawer.Heading>
            </Drawer.Header>
            <Drawer.Body>
              <nav className="flex flex-col gap-1">
                {navItems.map((item) => ( 
                    <Link
                    href={item.href}
                    key={item.label}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
                    type="button"
                  >
                    <item.icon className="size-5 text-muted" />
                    {item.label}
                  </Link> 
                ))}
              </nav>
            </Drawer.Body>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </Drawer>
  );
}
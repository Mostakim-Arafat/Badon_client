'use client'

import { Bars, Bell, House, Person } from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import { userData } from "@/lib/allget";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

export default function Sidebar() {
  const {data:session,ispending} = authClient.useSession()
  const userinfo = session?.user
  let navItems = []
  const Donormenu = [
    { icon: Person, label: "Profile", href: '/dashboard/Profile' },
    { icon: House, label: "My Donation Request", href: '/dashboard/my-donation-request' },
    { icon: Bell, label: "Create Request", href: '/dashboard/create-request' },
  ];
  const Volunteer_menu = [
    { icon: Person, label: "Profile", href: '/dashboard/Profile' },
    { icon: Bell, label: "All blood donation Requests", href: '/dashboard/all-blood-donation-request' },
  ];
  const Admin_menu = [
    { icon: Person, label: "Profile", href: '/dashboard/Profile' },
    { icon: House, label: "All users", href: '/dashboard/all-users' },
    { icon: Bell, label: "All blood donation Requests", href: '/dashboard/all-blood-donation-request' },
  ];
  if (userinfo?.role === 'donor') {
    navItems = Donormenu
  }

  else if (userinfo?.role === 'volunteer') {
    navItems = Volunteer_menu
  }
  else if (userinfo?.role === 'admin') {
    navItems = Admin_menu
  }
  else {
    return (
      <div className="flex h-screen items-center justify-center bg-white border-r border-red-50 p-6 lg:w-72">
        <div className="flex flex-col items-center gap-2">
          <span className="loading loading-ring loading-lg text-red-600"></span>
          <p className="text-xs text-rose-400 font-bold tracking-wider uppercase animate-pulse">Initializing Session</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className=" hidden lg:flex flex-col h-screen w-72 bg-white border-r border-red-100 shadow-lg p-6 justify-between text-slate-800">
        <div className="space-y-8">
          <div className="flex items-center gap-3 border-b border-rose-50 pb-5">
            <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center text-white font-bold shadow-md shadow-red-200">
              🩸
            </div>
            <div>
              <span className="text-xs bg-red-50 text-red-600 border border-red-100 font-extrabold uppercase px-2.5 py-1 rounded-md tracking-wider inline-block">
                {userinfo?.role}
              </span>
            </div>
          </div>

          <nav className="flex flex-col gap-1.5">
            {navItems.map((item) => (
              <Link
                href={item.href}
                key={item.label}
                className="flex items-center gap-3.5 rounded-xl px-4 py-3 text-sm font-bold tracking-wide text-slate-600 transition-all duration-200 hover:bg-rose-50/70 hover:text-red-600 group border border-transparent hover:border-rose-100/50"
                type="button"
              >
                <item.icon className="size-5 text-slate-400 group-hover:text-red-500 transition-colors" />
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="border-t border-slate-100 pt-4 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center text-red-500 text-sm font-bold uppercase">
            {userinfo?.name ? userinfo.name.substring(0, 2) : "US"}
          </div>
          <div className="overflow-hidden">
            <p className="text-xs font-black text-slate-700 truncate">{userinfo?.name || "System User"}</p>
            <p className="text-[11px] text-slate-400 truncate">{userinfo?.email}</p>
          </div>
        </div>
      </div>

      <div className=" lg:hidden p-4 bg-white border-b border-red-50 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center text-white text-md shadow-sm">
            🩸
          </div>
          <span className="text-[10px] bg-red-50 text-red-600 border border-red-100 font-extrabold uppercase px-2 py-0.5 rounded tracking-wider">
            {userinfo?.role}
          </span>
        </div>
        <Drawer>
          <Button variant="secondary" className="font-bold border border-slate-200 bg-slate-50 text-slate-700 rounded-xl px-4 py-2 transition-all hover:bg-slate-100 cursor-pointer flex items-center gap-2 text-sm shadow-sm">
            <Bars className="size-4 text-slate-500" />
            Menu
          </Button>
          <Drawer.Backdrop className="bg-slate-900/40 backdrop-blur-sm z-50">
            <Drawer.Content placement="left" className="h-full bg-white max-w-xs w-80 shadow-2xl border-r border-red-50 flex flex-col focus:outline-none">
              <Drawer.Dialog className="h-full flex flex-col justify-between p-6 focus:outline-none">
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-rose-50 pb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-9 h-9 rounded-xl bg-red-600 flex items-center justify-center text-white text-md shadow-md">
                        🩸
                      </div>
                      <div>
                        <span className="text-[10px] bg-red-50 text-red-600 border border-red-100 font-extrabold uppercase px-2 py-0.5 rounded tracking-wider">
                          {userinfo?.role}
                        </span>
                      </div>
                    </div>
                    <Drawer.CloseTrigger className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer" />
                  </div>
                  <Drawer.Body className="p-0">
                    <nav className="flex flex-col gap-1.5">
                      {navItems.map((item) => (
                        <Link
                          href={item.href}
                          key={item.label}
                          className="flex items-center gap-3.5 rounded-xl px-4 py-3 text-sm font-bold tracking-wide text-slate-600 transition-all duration-200 hover:bg-rose-50/70 hover:text-red-600 group border border-transparent hover:border-rose-100/50"
                          type="button"
                        >
                          <item.icon className="size-5 text-slate-400 group-hover:text-red-500 transition-colors" />
                          {item.label}
                        </Link>
                      ))}
                    </nav>
                  </Drawer.Body>
                </div>

                <div className="border-t border-slate-100 pt-4 flex items-center gap-3 bg-white">
                  <div className="w-9 h-9 rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center text-red-500 text-sm font-bold uppercase">
                    {userinfo?.name ? userinfo.name.substring(0, 2) : "US"}
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-xs font-black text-slate-700 truncate">{userinfo?.name || "System User"}</p>
                    <p className="text-[11px] text-slate-400 truncate">{userinfo?.email}</p>
                  </div>
                </div>
              </Drawer.Dialog>
            </Drawer.Content>
          </Drawer.Backdrop>
        </Drawer>
      </div>
    </div>
  );
}
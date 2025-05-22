"use client"
import { Button } from "@/components/ui/button"
import Image from 'next/image'
import Link from 'next/link'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem, 
} from "@/components/ui/sidebar"
import { SideBarOptions } from "@/services/Constants"
import { Plus } from "lucide-react"

export function AppSidebar() {
  const path=usePathname();
  return (
    <Sidebar>
      <SidebarHeader className='flex items-center mt-5'>
        <Image src={"data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=="} alt="" width={100} height={100} className=""/>
        <Button className='w-full mt-5'>
          <Plus />Create New Interview
        </Button>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarContent>
            <SidebarMenu>
              {SideBarOptions.map((option,index)=>(
                <SidebarMenuItem key={index} className='p-1'>
                  <SidebarMenuButton asChild className='p-5'>
                    <Link href={option.path}>
                    <option.icon />
                    <span>{option.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}

"use client"

import { type Popover } from '@headlessui/react'
import {Bars3Icon, XMarkIcon} from "@heroicons/react/24/outline";
import {ArrowTopRightIcon} from "@radix-ui/react-icons";
import {clsx} from "clsx";
import { motion } from "framer-motion";
import Link from "next/link";
import {usePathname} from "next/navigation";
import React, {Fragment, useState} from "react";

import {DocsSidebarNav} from "@/components/DocsSideNav";
import {ThemeToggle} from "@/components/ThemeToggle";
import {Button} from "@/components/ui/button";
import {transitionLg} from "@/lib/animations";
import {navigation} from "@/lib/docs-navigation";
import TinyMusic from "@/components/TinyMusic";


const headerLinks = [
  {
    name: "Docs",
    href: "/docs",
  },
  {
    name: "GitHub",
    href: "https://github.com/hamster1963/Next-Tiny-Music",
    target: "_blank",
  },
  {
    name: "Hamster1963",
    href: "https://buycoffee.top",
    target: "_blank",
  },
]

interface HeaderLinkProps {
  name: string
  href: string
  target?: string
  onClick?: () => void
}


function MobileNavItem(props: HeaderLinkProps) {
  return (
    <li>
      <Link href={props.href} target={props.target} onClick={props.onClick} className="py-1 font-bold text-xl flex items-center">
        {props.name}{props.target && <ArrowTopRightIcon className="w-5 h-5 ml-2"/>}
      </Link>
    </li>
  )
}

function MobileNavigation(
  props: React.ComponentPropsWithoutRef<typeof Popover>,
) {
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <>
      <div
        className={clsx(
          "fixed z-20 w-full bg-background h-14 flex md:hidden items-center justify-between px-6 _lg:px-12 break-words",
          props.className,
        )}
      >
        <Link href="/" className="p-2 -m-2" onClick={() => setMenuOpen(false)}>
          <picture><img src={"/icon.avif"} className="dark:hidden block h-8 " alt="tiny-music"></img><img
              src={"/icon-dark.avif"} className=" hidden dark:block h-8 " alt="tiny-music"/></picture>
        </Link>
        <div className="flex items-center">
          <TinyMusic trackTitle={"Easy"} artworkUrl={"/assets/slow-down-small.jpeg"} playerStatus={true} playPercent={55} />
          <Button variant="ghost" size="icon" onClick={() => setMenuOpen(!menuOpen)}>
            {!menuOpen ? (
              <Bars3Icon className="h-6 w-6 stroke-foreground"/>
            ) : (
              <XMarkIcon className="h-6 w-6 text-foreground"/>
            )}
          </Button>
        </div>
        <div className="absolute bottom-0 left-0 h-[1px] w-full bg-foreground/10 translate-y-[1px]"/>
      </div>
      <div className="lg:hidden">
        <motion.div
          className={clsx(
            "fixed z-10 w-full top-0 left-0 bg-background overflow-hidden",
            menuOpen ? "block" : "hidden"
          )}
          animate={{
            height: menuOpen ? "100%" : 56,
            opacity: menuOpen ? 1 : 0,
          }}
          transition={transitionLg}
        >
          <div
            className={clsx(
              "w-full h-screen top-0 left-0 flex flex-col",
            )}
          >
            <HeaderPadding/>
            <motion.div
              className="grow relative"
              animate={{
                y: menuOpen ? 0 : -20,
                // opacity: menuOpen ? 1 : 0,
              }}
              transition={transitionLg}
            >

              <div className="absolute w-full h-full top-0 left-0 overflow-y-auto px-6 lg:px-12 py-6">
                <nav className="">
                  <ul className="_-my-2 text-base text-zinc-800 dark:text-zinc-200">
                    {headerLinks.map((item, index) => (
                      <MobileNavItem key={index} {...item} onClick={() => setMenuOpen(false)}></MobileNavItem>
                    ))}
                  </ul>
                </nav>
                <div className="h-6"/>
                <DocsSidebarNav items={navigation} onClick={() => setMenuOpen(false)}/>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </>
  )
}

function NavItem(props: HeaderLinkProps) {
  const isActive = usePathname() === props.href

  return (
    <li>
      <Link
        href={props.href}
        target={props.target}
        className={clsx(
          'relative flex items-center px-3 py-2 transition',
          isActive
            ? 'text-black dark:text-white'
            : 'text-zinc-600 dark:text-zinc-400',
        )}
      >
        {props.name}{props.target && <ArrowTopRightIcon className="w-4 h-4 ml-1"/>}
      </Link>
    </li>
  )
}

function DesktopNavigation(props: React.ComponentPropsWithoutRef<'nav'>) {
  return (
    <div
      className={clsx(
        "fixed z-20 w-full bg-background h-14 hidden md:flex items-center justify-between px-6 _lg:px-12 break-words",
        props.className
      )}
    >
      <Link href="/" className="p-2 -m-2 -mb-4">
        <picture><img src={"/icon.avif"} className="dark:hidden block h-8 " alt="tiny-music"></img><img
            src={"/icon-dark.avif"} className=" hidden dark:block h-8 " alt="tiny-music"/></picture>
      </Link>
      <div className="flex items-center">
        <TinyMusic trackTitle={"Easy"} artworkUrl={"/assets/slow-down-small.jpeg"} playerStatus={true} playPercent={55} />
        <nav>
          <ul className="flex text-sm _font-medium text-zinc-800 dark:text-zinc-200 items-center">
            {headerLinks.map((item, index) => (
              <NavItem key={index} {...item}></NavItem>
            ))}
            <li className="ml-4">
              <ThemeToggle/>
            </li>
          </ul>
        </nav>
      </div>
      <div className="absolute bottom-0 left-0 h-[1px] w-full bg-foreground/10 translate-y-[1px]"/>
    </div>
  )
}


export function Header() {
  return (
    <>
      <MobileNavigation />
      <DesktopNavigation />
    </>
  )
}

export function HeaderPadding() {
  return (
    <div className="h-14" />
  )
}

import Link from "next/link";

import {GitHubButton} from "@/app/(common)/GitHubButton";
import SectionBgStack, {Glow} from "@/app/SectionBgStack";
import {HeaderPadding} from "@/components/Header";
import {Button} from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex  flex-col">
      <div className="relative w-full">
        <HeaderPadding />
        <div className="flex flex-col items-center px-12 pt-16 gap-6">
          <picture><img src={"/icon.avif"} className="dark:hidden block h-20 md:h-24 " alt="tiny-music"></img><img
              src={"/icon-dark.avif"} className=" hidden dark:block h-20 md:h-24 " alt="tiny-music"/></picture>
          <h1 className="hidden">UVCanvas</h1>
          <p className="text-lg text-foreground/70 leading-7 max-w-[500px] w-full text-center break-words">
            A fresh, minimalist, and visually appealing music status display component, featuring a ready-to-use copy-paste mode, brought to you by{" "}
            <Link href="https://buycoffee.top" target="_blank" className="text-foreground underline font-semibold hover:text-yellow-500">
              Hamster
            </Link>.
          </p>
          <div className="flex gap-4">
            <Link href="/docs">
              <Button>Get Started</Button>
            </Link>
            <Link href="https://github.com/hamster1963/Next-Tiny-Music" target="_blank">
              <GitHubButton />
            </Link>
          </div>
        </div>
        <SectionBgStack/>
        <Glow/>
      </div>
    </main>
  );
}

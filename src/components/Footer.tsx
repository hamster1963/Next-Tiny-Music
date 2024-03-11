import Link from "next/link";

import {Container} from "@/components/Containers";


export function Footer() {
  return (
    <div className="py-9 lg:py-12">
      <Container>
        <p className="text-sm text-zinc-400 dark:text-zinc-500">
          &copy; {new Date().getFullYear()} {" "}
          <Link href="https://buycoffee.top" target="_blank" className="border-b">
            Hamster
          </Link>
          {" "}. All rights
          reserved.
        </p>
      </Container>
    </div>
  )
}

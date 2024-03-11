"use client"

import {StarIcon} from "@heroicons/react/20/solid";
import {AnimatePresence, motion } from "framer-motion";
import {useEffect, useState} from "react";

import {GitHubIcon} from "@/components/LogosBrand";
import {Button} from "@/components/ui/button";
import {transitionLg} from "@/lib/animations";

export function GitHubButton() {

  const [starCount, setStarCount] = useState(0)

  useEffect(() => {
    fetch("/api/stars").then(async res => {
      const data = await res.json()
      console.log(data)
      if (data.hasOwnProperty("star_count")) {
        setStarCount(data["star_count"])
      } else {
        console.log("[API Error]")
      }
    })
  }, []);

  return (
    <Button variant="secondary" className="overflow-hidden">
      <motion.div
        className="flex items-center"
        layout
        layoutRoot
      >
        <GitHubIcon className="h-4 mr-2"/>
        <span>GitHub</span>

        <AnimatePresence>
          {!!starCount && (
            <motion.div
              key="stars"
              className="flex items-center"
              layout="position"
              initial={{
                opacity: 0,
                width: 0,
              }}
              animate={{
                opacity: 1,
                width: "auto",
              }}
              transition={transitionLg}
            >
              <div
                className="flex items-center pb-0.5 pl-2 opacity-50"
              >
                <StarIcon className="w-4 h-4 _mr-0.5"/><div className={"pt-0.5"}>{starCount}</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </Button>
  )
}

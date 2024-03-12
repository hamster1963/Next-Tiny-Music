"use client"

import {clsx} from "clsx";
import {motion} from "framer-motion"
import {useEffect, useId, useState} from "react";

import {AspectRatio} from "@/components/ui/aspect-ratio";
import {transitionXl} from "@/lib/animations";



export function Glow() {
  const id = useId()

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden _bg-gray-50 _dark:bg-gray-950 dark:bg-black">
      <svg
        className="absolute -bottom-48 left-[-40%] h-[80rem] w-[180%]"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id={`${id}-mobile`} cy="100%">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.3)" />
            <stop offset="53.95%" stopColor="rgba(255, 255, 255, 0.1)" />
            <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
          </radialGradient>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill={`url(#${id}-mobile)`}
        />
      </svg>
      <div className="absolute inset-x-0 bottom-0 right-0 h-px bg-white mix-blend-overlay" />
    </div>
  )
}

const genParam = (index: number) => {
  const start = 10
  const k = (1 / (start + index)) * start
  const offsetY = 600
  return {
    y: -offsetY + k * (offsetY - 120),
    scale: 0.4 * k * (1 - index * 0.05),
  }
}

const bgList = [
  {
    image: "/assets/hero/4.avif",
    ...genParam(3)
  },
  {
    image: "/assets/hero/3.avif",
    ...genParam(2)
  },
  {
    image: "/assets/hero/2.avif",
    ...genParam(1)
  },
  {
    image: "/assets/hero/1.avif",
    ...genParam(0)
  },
]

const bgListDark = [
  {
    image: "/assets/hero/4-dark.avif",
    ...genParam(3)
  },
  {
    image: "/assets/hero/3-dark.avif",
    ...genParam(2)
  },
  {
    image: "/assets/hero/2-dark.avif",
    ...genParam(1)
  },
  {
    image: "/assets/hero/1-dark.avif",
    ...genParam(0)
  },
]


export default function SectionBgStack() {
  const [activeIndex, setActiveIndex] = useState(0); // 当前激活的图片索引

  useEffect(() => {
    const interval = setInterval(() => {
      // 更新激活的图片索引，实现轮播
      setActiveIndex((prevIndex) => (prevIndex + 1) % bgList.length);
    }, 5000); // 每3秒切换一张图片

    return () => clearInterval(interval);
  }, []);

  const genNewIndex = (index: number, activeIndex: number) => {
    let newIndex = index - activeIndex;
    if (newIndex < 0) newIndex += bgList.length;
    return newIndex;
  }

  const genParamAdjusted = (index: number, activeIndex: number) => {
    const newIndex = genNewIndex(index, activeIndex);
    return genParam(newIndex);
  };

  const calculateZIndex = (index: number) => {
    // 计算距离当前激活图片的距离（考虑轮播为一个环）
    const distance = (index - activeIndex + bgList.length) % bgList.length;
    // 为当前激活的图片分配最高的z-index，其他图片根据距离递减
    return bgList.length - distance;
  };

  const calculateBlur = (index: number, activeIndex: number) => {
    const newIndex = genNewIndex(index, activeIndex);
    return Math.abs(Math.max(0, newIndex) * 10);
  }

  return (
    <div className="relative h-72 w-full overflow-hidden px-6 pb-5 lg:px-12 flex flex-col items-center ">
      <div className="relative  h-full w-[640px]">
        <div className="absolute bottom-0  dark:hidden translate-y-full w-full">
          {bgList.map((item, index) => (
              <motion.div
                  key={index}
                  className={clsx(
                      "absolute w-full  origin-top overflow-hidden",
                  )}
                  animate={{
                    ...genParamAdjusted(index, activeIndex),
                    zIndex: calculateZIndex(index),
                    filter: `blur(${calculateBlur(index,activeIndex)}px)`,
                  }}
                  transition={transitionXl}
              >
                <div
                    className="absolute w-fit  top-0 left-0 bg-transparent"
                >
                  <img src={item.image} alt="" className="w-full h-full object-cover"/>
                </div>
                <AspectRatio ratio={16 / 9}/>
              </motion.div>
          ))}
        </div>
        <div className="absolute bottom-0 hidden dark:block translate-y-full w-full">
          {bgListDark.map((item, index) => (
              <motion.div
                  key={index}
                  className={clsx(
                      "absolute w-full  origin-top overflow-hidden",
                  )}
                  animate={{
                    ...genParamAdjusted(index, activeIndex),
                    zIndex: calculateZIndex(index),
                    filter: `blur(${calculateBlur(index,activeIndex)}px)`,
                  }}
                  transition={transitionXl}
              >
                <div
                    className="absolute w-fit  top-0 left-0 bg-transparent"
                >
                  <img src={item.image} alt="" className="w-full h-full object-cover"/>
                </div>
                <AspectRatio ratio={16 / 9}/>
              </motion.div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 h-[1px] w-full bg-foreground/10"/>
    </div>
  )
}

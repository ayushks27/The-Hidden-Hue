"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  useLayoutEffect,
  useRef,
  useState,
  useCallback,
} from "react";

import Navbar from "../components/navbar/navbar";
import Strips from "../components/hero/strips";
import Preloader from "../components/preloader/preloader";
import Hero from "../components/hero/hero";
import About from "@/components/about/about";
import ArtWork from "@/components/art-work/art-work";
import AIArt from "@/components/ai-art/aiart";
import Painting from "@/components/painting/painting";
import Pictures from "@/components/pictures/pictures";
import RentRow from "@/components/rent-row/rent-row";
import Footer from "@/components/footer/footer";

import {
  forwardAnimation,
  reverseAnimation,
} from "@/utils/gsap-utils";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  // Refs
  const stripsRef = useRef<HTMLDivElement[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);
  const loaderOverlayRef = useRef<HTMLDivElement>(null);
  const heroHead1Ref = useRef<HTMLDivElement>(null);
  const heroHead2Ref = useRef<HTMLDivElement>(null);
  const heroHead3Ref = useRef<HTMLDivElement>(null);

  // State
  const [isAnimating, setIsAnimating] = useState(false);

  // Navbar toggle animation
  const handleButtonClick = () => {
    if (isAnimating) {
      gsap.to(".nav__container", {
        height: 0,
        duration: 1.5,
        opacity: 0,
        ease: "power4.inOut",
      });

      gsap.to("body", { overflow: "auto" });
      reverseAnimation(stripsRef, contentRef);
    } else {
      gsap.to(".nav__container", {
        height: "100vh",
        delay: 0.5,
        opacity: 1,
        duration: 1.5,
        ease: "power4.inOut",
      });

      gsap.to("body", { overflow: "hidden" });
      forwardAnimation(stripsRef, contentRef);
    }

    setIsAnimating(!isAnimating);
  };

  // Animate hero after loader
  const animateAfterLoader = useCallback(() => {
    document.body.style.overflow = "";
    document.body.setAttribute("data-lenis-prevent", "false");

    gsap.to(loaderOverlayRef.current, {
      height: 0,
      duration: 1.5,
      ease: "power3.inOut",
    });

    gsap.to(contentRef.current, {
      y: 0,
      duration: 1.5,
      ease: "power3.inOut",
    });

    if (
      !heroHead1Ref.current ||
      !heroHead2Ref.current ||
      !heroHead3Ref.current
    )
      return;

    const tl = gsap.timeline();

    tl.fromTo(
      heroHead1Ref.current.children,
      { y: "100%" },
      {
        y: 0,
        duration: 0.7,
        delay: 1,
        stagger: 0.05,
        ease: "power3.out",
      }
    )
      .fromTo(
        heroHead2Ref.current.children,
        { y: "100%" },
        {
          y: 0,
          duration: 0.7,
          stagger: 0.05,
          ease: "power3.out",
        },
        "-=0.5"
      )
      .fromTo(
        heroHead3Ref.current.children,
        { y: "100%" },
        {
          y: 0,
          duration: 0.7,
          stagger: 0.05,
          ease: "power3.out",
        },
        "-=0.5"
      )
      .fromTo(
        ".hero-para",
        { opacity: 0 },
        { opacity: 1, duration: 0.7, ease: "power1" },
        "-=0.5"
      )
      .to(".split_text_wrapper", {
        overflow: "visible",
      });
  }, []);

  // Loader logic
  const startLoader = useCallback(() => {
    let currentValue = 0;

    const updateCounter = () => {
      if (currentValue === 100) {
        animateAfterLoader();
        return;
      }

      currentValue += Math.floor(Math.random() * 10) + 1;
      if (currentValue > 100) currentValue = 100;

      if (loaderRef.current) {
        loaderRef.current.textContent = currentValue.toString();
      }

      if (currentValue > 20) {
        gsap.to(loaderRef.current, {
          bottom: `calc(${currentValue}% - 7.25rem)`,
        });
      }

      const delay = Math.floor(Math.random() * 200) + 50;
      setTimeout(updateCounter, delay);
    };

    updateCounter();
  }, [animateAfterLoader]);

  // Run loader once
  useLayoutEffect(() => {
    document.body.style.overflow = "hidden";
    document.body.setAttribute("data-lenis-prevent", "true");

    startLoader();
  }, [startLoader]);

  return (
    <div className="w-full">
      {/* Preloader */}
      <Preloader
        loaderOverlayRef={loaderOverlayRef}
        loaderRef={loaderRef}
      />

      {/* Navbar */}
      <Navbar onClick={handleButtonClick} />

      {/* Navbar overlay */}
      <div className="h-0 relative z-50 nav__container flex justify-center items-center overflow-hidden opacity-0">
        <h1 className="text-8xl" style={{ fontFamily: "SaolDisplay" }}>
          MENU ITEMS
        </h1>
      </div>

      <Strips stripsRef={stripsRef} />

      {/* Hero */}
      <div className="content-wrapper">
        <Hero
          contentRef={contentRef}
          heroHead1Ref={heroHead1Ref}
          heroHead2Ref={heroHead2Ref}
          heroHead3Ref={heroHead3Ref}
        />
      </div>

      {/* Sections */}
      <About />
      <ArtWork />
      <AIArt />
      <Painting />
      <Pictures />
      <RentRow />
      <Footer />
    </div>
  );
}

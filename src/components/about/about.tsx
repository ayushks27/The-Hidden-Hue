import {
    aboutSectionParallaxImage,
    aboutSectionTextReveal,
} from "@/utils/gsap-utils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    const aboutImageRef = useRef<HTMLDivElement | null>(null);
    const aboutWrapperRef = useRef<HTMLDivElement | null>(null);

    useLayoutEffect(() => {
        if (typeof window === 'undefined') return;

    const text = SplitType.create(".reveal_text");

    aboutSectionParallaxImage(aboutWrapperRef, aboutImageRef);
    aboutSectionTextReveal(text, aboutWrapperRef);

    return () => {
        // Clean up SplitType to prevent duplicates on fast navigation
        text.revert?.();
    };
}, []);

    return (
        <div ref={aboutWrapperRef}>
            <div className="grid grid-cols-2 py-10 text-white">
                <div
                ref={aboutImageRef}
                className="w-[40vw] relative aspect-[1/1.2]"
                style={{
                    transform: "translateY(30%)",
                }}
            >
                <Image
                    src="/2.jpeg"
                    alt="About Image"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 40vw"
                />
                </div>
                <div className="uppercase text-[max(1.146vw,22px)] my-auto">
                    <div className="reveal_text max-w-[31rem] overflow-hidden 2xl:max-w-[50rem]">
                        I&apos;m an artist known for my surreal and 
                        sensual
                        artworks, combining photography and oil painting. 
                        My art explores beauty, emotion, and the tension between reality and imagination, 
                        using both traditional and AI-enhanced techniques to create timeless visuals.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;

'use client';

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";

const HeroSection = () => {

    const imageRef = useRef()

    useEffect(() => {
        const imageElement = imageRef.current;
    
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const scrollThreshold = 100;
    
            if (scrollPosition > scrollThreshold) {
            imageElement.classList.add("scrolled");
            } else {
            imageElement.classList.remove("scrolled");
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
    <div className="pb-20 px-4">
        <div className="container mx-auto text-center">
            <h1 className="text-5xl md:text-8xl lg:text-[105px] pb-6 gradient-title">
                Управляйте Финансами <br /> с Интеллектом
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Платформа финансового менеджмента на базе ИИ, помогающая отслеживать,
                анализировать и оптимизировать траты с учётом данных в реальном времени.
            </p>
            <div className="flex justify-center space-x-4">
                <Link href='/dashboard'>
                    <Button size="lg" className="px-8">
                        Начать
                    </Button>
                </Link>
                <Link href=''>
                    <Button size="lg" variant='outline' className="px-8">
                        Документация
                    </Button>
                </Link>
            </div>
            <div className="hero-image-wrapper mt-5 md:mt-0">
                <div ref={imageRef} className="hero-image">
                    <Image
                        src='/banner.png'
                        width={1280}
                        height={720}
                        alt="Превью панели управления"
                        className="rounded-lg shadow-2xl border mx-auto"
                        priority
                    />
                </div>
            </div>
        </div>
    </div>
    )
}

export default HeroSection
"use client";

import { useEffect, useState } from "react";
import { useScrollPosition } from "../../hooks/useScrollPosition";

export default function BackToTop() {

    const scrollPosition = useScrollPosition();
    const showButton    = scrollPosition > 400;

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    return (
        <>
            {showButton && (
                 <button onClick={scrollToTop} className="
                                               fixed
                                               bottom-8
                                               right-8
                                               w-14
                                               h-14
                                               rounded-full
                                               bg-blue-600
                                               hover:bg-blue-700
                                               hover:scale-110
                                               active:scale-95
                                               text-white
                                               text-2xl
                                               shadow-lg
                                               transition-all
                                               duration-300
                                               z-50
                                               ">
                     ↑
                 </button>
              )}
        </>
    );

}
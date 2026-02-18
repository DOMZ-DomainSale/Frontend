"use client";
import React from "react";
import Image from "next/image";
import { checkAuth } from "../utils/checkAuth";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Hero = () => {
  const router = useRouter();

  const handleAuthRedirect = async () => {
    const status = await checkAuth();
    router.push(status === "authenticated" ? "/dashboard" : "/login");
  };

  return (
    <header className="w-full px-4 sm:px-6 lg:px-10 pt-6">
      {/* Background Container */}
      <div
        className="relative max-w-7xl mx-auto rounded-3xl overflow-hidden
                   bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/hero-bg.png')" }}
      >
        {/* Dot Overlay */}
        <div
          className="absolute inset-0 pointer-events-none
                     bg-[radial-gradient(circle_at_1px_1px,#ffffff80_1px,transparent_0)]
                     bg-size-[16px_16px] opacity-30"
        />

        {/* Content */}
        <div className="relative z-10 m-4 sm:m-6 lg:m-8 rounded-[28px]">
          <div
            className="
              flex flex-col items-center
              px-6 sm:px-10 lg:px-16
              py-12 sm:py-16 lg:py-20
              text-center
              gap-8
            "
          >
            {/* Badge */}
            <span
              className="
                inline-block bg-white rounded-full px-5 py-1.5
                text-gray-600 font-medium shadow
              "
            >
              TRANSPARENT BY DESIGN
            </span>

            {/* Logo */}
            <div
              className="
                font-extrabold text-gray-900
                text-5xl sm:text-6xl lg:text-7xl
              "
            >
              DOM<span className="text-blue-600">Z</span>
            </div>

            {/* Headline */}
            <h1
              className="
                text-3xl sm:text-4xl lg:text-5xl
                font-semibold text-gray-900
              "
            >
              List. Connect. Close.
            </h1>

            {/* Subtitle */}
            <p
              className="
                text-base sm:text-lg
                text-gray-700 font-medium
                max-w-2xl
              "
            >
              The Decentralized Future of Domain Discovery
            </p>

            {/* CTA Buttons */}
            <div className="flex gap-4 justify-center">
              <Link
                href="/domainbuy"
                className="
                  bg-blue-600 text-white px-8 py-3 rounded-full
                  font-medium shadow hover:bg-blue-700 transition
                "
              >
                Buy
              </Link>

              <button
                onClick={handleAuthRedirect}
                className="
                  border border-blue-600 text-blue-600 px-8 py-3
                  rounded-full font-medium hover:bg-blue-100 transition
                "
              >
                Sell
              </button>
            </div>

            {/* Hero Image */}
            {/* <div className="mt-10 w-full flex justify-center">
              <Image
                src="/assets/heroAnimation.png"
                alt="Globe and Server Illustration"
                width={600}
                height={600}
                priority
                className="
                  w-full
                  max-w-xs sm:max-w-md lg:max-w-lg
                  h-auto object-contain
                "
              />
            </div> */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Hero;

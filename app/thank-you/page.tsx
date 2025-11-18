"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ThankYouPage() {
  const [confetti, setConfetti] = useState<Array<{ id: number; x: number; delay: number }>>([]);

  useEffect(() => {
    // Generate confetti particles
    const particles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 2,
    }));
    setConfetti(particles);
  }, []);

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden py-8 sm:py-12">
      {/* Full Background Image */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/images/img_2.jpg"
          alt="Beautiful Tobago beach"
          fill
          className="object-cover object-center"
          sizes="100vw"
          quality={85}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-tobago-blue/70 via-tobago-teal/60 to-tobago-blue/70" />
      </div>
      {/* Confetti Effect */}
      {confetti.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-2 h-2 sm:w-3 sm:h-3 bg-tobago-coral rounded-full"
          style={{ left: `${particle.x}%`, top: "-10px" }}
          animate={{
            y: ["0vh", "110vh"],
            rotate: [0, 360],
            opacity: [1, 0.8, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            delay: particle.delay,
            repeat: Infinity,
          }}
        />
      ))}

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.8 }}
          className="mb-6 sm:mb-8"
        >
          <div className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl mb-3 sm:mb-4">🎉</div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 sm:mb-6 drop-shadow-lg"
        >
          Thank You!
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="space-y-3 sm:space-y-4 mb-8 sm:mb-12 px-2"
        >
          <p className="text-xl sm:text-2xl text-white drop-shadow-md">
            Your feedback has been successfully submitted.
          </p>
          <p className="text-base sm:text-lg text-white/95 drop-shadow-md">
            We truly appreciate you taking the time to share your experience with us. Your valuable insights will help us ensure that Tobago remains <span className="font-bold text-tobago-sand">Beyond Ordinary</span> for all our visitors.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 mb-8 sm:mb-12"
        >
          <div className="relative h-48 sm:h-56 md:h-64 lg:h-72 mb-6 rounded-xl overflow-hidden">
            <Image
              src="/images/img_2.jpg"
              alt="Beautiful Tobago"
              fill
              className="object-cover object-center"
              sizes="(max-width: 640px) 90vw, (max-width: 1024px) 70vw, 50vw"
              quality={90}
              priority
            />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-tobago-blue mb-2 sm:mb-3">
            We hope to see you again soon!
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
            Tobago, the Greatest Little Island on the Planet, is always here to welcome you with open arms and pristine beaches.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link
              href="/"
              className="inline-block bg-tobago-blue hover:bg-tobago-teal text-white font-semibold text-sm sm:text-base px-6 sm:px-8 py-2.5 sm:py-3 rounded-full transition-all duration-300 shadow-lg"
            >
              Return to Home
            </Link>
            <Link
              href="/survey"
              className="inline-block bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold text-sm sm:text-base px-6 sm:px-8 py-2.5 sm:py-3 rounded-full transition-all duration-300"
            >
              Submit Another Response
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="text-white/80 text-sm drop-shadow"
        >
          <p>Division of Tourism, Culture, Antiquities and Transportation</p>
          <p>Tobago House of Assembly</p>
        </motion.div>
      </div>
    </div>
  );
}


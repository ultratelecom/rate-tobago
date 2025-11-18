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
    <div className="min-h-screen bg-gradient-to-b from-tobago-sky/30 via-tobago-sand/20 to-white flex items-center justify-center relative overflow-hidden">
      {/* Confetti Effect */}
      {confetti.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-3 h-3 bg-tobago-coral rounded-full"
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

      <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.8 }}
          className="mb-8"
        >
          <div className="text-9xl mb-4">🎉</div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-5xl md:text-6xl font-bold text-tobago-blue mb-6"
        >
          Thank You!
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="space-y-4 mb-12"
        >
          <p className="text-2xl text-gray-700">
            Your feedback has been successfully submitted.
          </p>
          <p className="text-lg text-gray-600">
            We truly appreciate you taking the time to share your experience with us. Your valuable insights will help us ensure that Tobago remains <span className="font-bold text-tobago-teal">Beyond Ordinary</span> for all our visitors.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="bg-white rounded-2xl shadow-2xl p-8 mb-12"
        >
          <div className="relative h-64 mb-6 rounded-xl overflow-hidden">
            <Image
              src="/images/img_2.jpg"
              alt="Beautiful Tobago"
              fill
              className="object-cover"
            />
          </div>
          <h2 className="text-2xl font-bold text-tobago-blue mb-3">
            We hope to see you again soon!
          </h2>
          <p className="text-gray-600 mb-6">
            Tobago, the Greatest Little Island on the Planet, is always here to welcome you with open arms and pristine beaches.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-block bg-tobago-blue hover:bg-tobago-teal text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 shadow-lg"
            >
              Return to Home
            </Link>
            <Link
              href="/survey"
              className="inline-block bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-8 py-3 rounded-full transition-all duration-300"
            >
              Submit Another Response
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="text-gray-500 text-sm"
        >
          <p>Division of Tourism, Culture, Antiquities and Transportation</p>
          <p>Tobago House of Assembly</p>
        </motion.div>
      </div>

      {/* Background decoration */}
      <div className="fixed bottom-0 left-0 w-full h-1/3 opacity-5 pointer-events-none">
        <Image
          src="/images/img_3.jpg"
          alt="Tobago background"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
}


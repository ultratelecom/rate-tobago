"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/Boat on the Sandy Beach under the Palm Trees.jpg"
            alt="Beautiful Tobago Beach"
            fill
            className="object-cover brightness-75"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-tobago-blue/30 via-transparent to-tobago-blue/50" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-2xl">
              Tobago Visitor Experience Survey
            </h1>
            <p className="text-xl md:text-2xl text-white/95 mb-4 drop-shadow-lg">
              Thank you for visiting Tobago
            </p>
            <p className="text-2xl md:text-3xl font-semibold text-tobago-sand mb-8 drop-shadow-lg">
              The Greatest Little Island on the Planet!
            </p>
            <p className="text-lg md:text-xl text-white/90 mb-12 max-w-3xl mx-auto drop-shadow-lg">
              Please take a moment to complete this short survey. The information you provide will help us ensure that your experience in Tobago remains <span className="font-bold text-tobago-sand">Beyond Ordinary</span>.
            </p>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/survey"
                className="inline-block bg-tobago-teal hover:bg-tobago-blue text-white font-bold text-lg px-12 py-4 rounded-full shadow-2xl transition-all duration-300 transform hover:shadow-tobago-coral/50"
              >
                Start Survey
              </Link>
            </motion.div>

            <p className="text-white/80 mt-6 text-sm drop-shadow">
              ⏱️ This survey will take approximately 3 minutes to complete
            </p>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-white rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* Info Section */}
      <section className="bg-gradient-to-b from-white to-tobago-sand/20 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-tobago-blue mb-6">
              Your Feedback Matters
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              The Division of Tourism, Culture, Antiquities and Transportation values your input. 
              Your answers are strictly confidential and will be used solely for statistical purposes 
              to enhance the visitor experience.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="text-5xl mb-4">🏖️</div>
              <h3 className="text-2xl font-bold text-tobago-blue mb-3">
                Share Your Experience
              </h3>
              <p className="text-gray-600">
                Tell us about your visit to Tobago&apos;s beautiful beaches, attractions, and local experiences.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="text-5xl mb-4">💡</div>
              <h3 className="text-2xl font-bold text-tobago-blue mb-3">
                Help Us Improve
              </h3>
              <p className="text-gray-600">
                Your suggestions help us enhance services and ensure every visitor has an exceptional experience.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="text-5xl mb-4">🎁</div>
              <h3 className="text-2xl font-bold text-tobago-blue mb-3">
                Stay Connected
              </h3>
              <p className="text-gray-600">
                Receive exclusive promotional offers and updates about destination Tobago (optional).
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-16"
          >
            <Link
              href="/survey"
              className="inline-block bg-tobago-blue hover:bg-tobago-teal text-white font-bold text-lg px-10 py-3 rounded-full shadow-lg transition-all duration-300"
            >
              Begin Survey →
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-tobago-blue text-white py-8">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-lg font-semibold mb-2">
            Division of Tourism, Culture, Antiquities and Transportation
          </p>
          <p className="text-white/80">
            Tobago House of Assembly
          </p>
          <p className="text-white/60 mt-4 text-sm">
            &copy; {new Date().getFullYear()} All rights reserved
          </p>
        </div>
      </footer>
    </main>
  );
}



import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function ContactCTA() {
  return (
    <section className="bg-indigo-700 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2
          className="text-3xl font-extrabold text-white sm:text-4xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Ready to Join Our Community?
        </motion.h2>
        <motion.p
          className="mt-4 text-xl text-red-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Contact us to learn more about our programs and admission process.
        </motion.p>
        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Button asChild size="lg" className="bg-white text-red-700 hover:bg-red-100">
            <Link href="/contact">Contact Us</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}


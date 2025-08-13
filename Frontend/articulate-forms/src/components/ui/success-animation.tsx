import { CheckCircle } from "lucide-react"
import { motion } from "framer-motion"

export const SubmissionSuccess = () => {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20
      }}
      className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
    >
      <motion.div 
        className="bg-white rounded-lg p-8 flex flex-col items-center gap-4"
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          <CheckCircle className="w-16 h-16 text-green-500" />
        </motion.div>
        <motion.h2 
          className="text-2xl font-bold text-gray-800"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Test Submitted Successfully!
        </motion.h2>
        <motion.p
          className="text-gray-600 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Thank you for completing the test.
        </motion.p>
      </motion.div>
    </motion.div>
  )
}

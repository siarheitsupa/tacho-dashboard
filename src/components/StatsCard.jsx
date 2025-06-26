import React from 'react'
import { motion } from 'framer-motion'

const StatsCard = ({ icon, title, value, color, delay }) => {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600 border-blue-100',
    green: 'bg-green-50 text-green-600 border-green-100',
    red: 'bg-red-50 text-red-600 border-red-100',
    yellow: 'bg-yellow-50 text-yellow-600 border-yellow-100'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -2 }}
      className="bg-white p-4 lg:p-6 rounded-xl border border-slate-200 hover:shadow-md transition-all duration-200"
    >
      <div className={`w-10 h-10 lg:w-12 lg:h-12 rounded-lg ${colorClasses[color]} flex items-center justify-center mb-3 lg:mb-4`}>
        {icon}
      </div>
      <h3 className="text-slate-500 text-xs lg:text-sm mb-1 lg:mb-2 font-medium">{title}</h3>
      <p className="text-xl lg:text-2xl font-bold text-slate-800">{value}</p>
    </motion.div>
  )
}

export default StatsCard

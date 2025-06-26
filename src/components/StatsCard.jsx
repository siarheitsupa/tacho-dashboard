import React from 'react'
import { motion } from 'framer-motion'

const StatsCard = ({ icon, title, value, color, delay }) => {
  const colorClasses = {
    blue: 'text-blue-600',
    green: 'text-green-600', 
    red: 'text-red-600',
    yellow: 'text-yellow-600'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
    >
      <div className="text-center">
        <div className={`mx-auto mb-3 ${colorClasses[color]}`}>
          {icon}
        </div>
        <h3 className="text-gray-600 text-sm font-medium mb-2">{title}</h3>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
      </div>
    </motion.div>
  )
}

export default StatsCard

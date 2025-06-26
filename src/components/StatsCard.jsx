import React from 'react'
import { motion } from 'framer-motion'

const StatsCard = ({ icon, title, value, color, delay }) => {
  const colorClasses = {
    blue: 'text-blue-400',
    green: 'text-green-400',
    red: 'text-red-400',
    yellow: 'text-yellow-400'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="bg-slate-800 p-6 rounded-xl border border-slate-700"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="text-2xl">{icon}</div>
        <div className="text-slate-500">⋯</div>
      </div>
      <div className="text-3xl font-bold text-white mb-2">{value}</div>
      <div className="text-slate-400 text-sm">{title}</div>
    </motion.div>
  )
}

export default StatsCard

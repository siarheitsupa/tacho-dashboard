import React from 'react'
import { motion } from 'framer-motion'
import { Edit, Trash2 } from 'lucide-react'

const TripsList = ({ trips }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-400'
      case 'in_progress': return 'text-blue-400'
      default: return 'text-slate-400'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'completed': return 'Завершено'
      case 'in_progress': return 'В процессе'
      default: return 'Неизвестно'
    }
  }

  return (
    <div className="overflow-x-auto">
      {/* Заголовки таблицы */}
      <div className="grid grid-cols-6 gap-4 px-6 py-4 text-xs font-medium text-slate-400 uppercase tracking-wider border-b border-slate-700">
        <div>МАРШРУТ</div>
        <div>ДАТА</div>
        <div>РАССТОЯНИЕ</div>
        <div>ВРЕМЯ</div>
        <div>СТАТУС</div>
        <div>ДЕЙСТВИЯ</div>
      </div>

      {/* Строки таблицы */}
      <div>
        {trips.map((trip, index) => (
          <motion.div
            key={trip.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="grid grid-cols-6 gap-4 px-6 py-4 items-center border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors"
          >
            <div className="text-white font-medium">{trip.route}</div>
            <div className="text-slate-300">{trip.date}</div>
            <div className="text-slate-300">{trip.distance}</div>
            <div className="text-slate-300">{trip.time}</div>
            <div className={`font-medium ${getStatusColor(trip.status)}`}>
              {getStatusText(trip.status)}
            </div>
            <div className="flex items-center gap-2">
              <button className="p-1 text-slate-400 hover:text-blue-400 transition-colors">
                <Edit className="w-4 h-4" />
              </button>
              <button className="p-1 text-slate-400 hover:text-red-400 transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default TripsList

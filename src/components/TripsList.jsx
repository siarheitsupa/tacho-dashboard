import React from 'react'
import { motion } from 'framer-motion'
import { supabase } from '../lib/supabase'
import { Edit, Trash2, MapPin, Clock, Fuel } from 'lucide-react'

const TripsList = ({ trips, onUpdate }) => {
  const deleteTrip = async (id) => {
    try {
      const { error } = await supabase
        .from('trips')
        .delete()
        .eq('id', id)

      if (error) throw error
      onUpdate()
    } catch (error) {
      console.error('Ошибка удаления поездки:', error)
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-500/20 text-green-400'
      case 'in_progress': return 'bg-blue-500/20 text-blue-400'
      case 'planned': return 'bg-yellow-500/20 text-yellow-400'
      default: return 'bg-gray-500/20 text-gray-400'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'completed': return 'Завершено'
      case 'in_progress': return 'В процессе'
      case 'planned': return 'В пути'
      default: return 'Неизвестно'
    }
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-6 gap-4 text-sm text-slate-400 font-medium pb-2 border-b border-slate-700">
        <div>МАРШРУТ</div>
        <div>ДАТА</div>
        <div>РАССТОЯНИЕ</div>
        <div>ВРЕМЯ</div>
        <div>СТАТУС</div>
        <div>ДЕЙСТВИЯ</div>
      </div>

      {trips.map((trip, index) => (
        <motion.div
          key={trip.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="grid grid-cols-6 gap-4 items-center py-4 border-b border-slate-700/50 hover:bg-slate-700/30 rounded-lg px-2"
        >
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-slate-400" />
            <span className="font-medium">{trip.route}</span>
          </div>
          
          <div className="text-slate-300">
            {new Date(trip.date).toLocaleDateString('ru-RU')}
          </div>
          
          <div className="flex items-center gap-1">
            <span>{trip.distance} км</span>
          </div>
          
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4 text-slate-400" />
            <span>{Math.floor(trip.duration / 60)} ч {trip.duration % 60} мин</span>
          </div>
          
          <div>
            <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(trip.status)}`}>
              {getStatusText(trip.status)}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-1 text-slate-400 hover:text-blue-400"
            >
              <Edit className="w-4 h-4" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => deleteTrip(trip.id)}
              className="p-1 text-slate-400 hover:text-red-400"
            >
              <Trash2 className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default TripsList

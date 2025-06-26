import React from 'react'
import { motion } from 'framer-motion'
import { supabase } from '../lib/supabase'
import { Edit, Trash2, MapPin, Clock, Calendar } from 'lucide-react'

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
      case 'completed': return 'bg-green-100 text-green-700'
      case 'in_progress': return 'bg-blue-100 text-blue-700'
      case 'planned': return 'bg-yellow-100 text-yellow-700'
      default: return 'bg-gray-100 text-gray-700'
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
    <div className="min-w-full">
      {/* Заголовки для десктопа */}
      <div className="hidden lg:grid lg:grid-cols-6 gap-4 text-xs font-medium text-slate-500 uppercase tracking-wider px-6 py-3 bg-slate-50 border-b border-slate-200">
        <div>Маршрут</div>
        <div>Дата</div>
        <div>Расстояние</div>
        <div>Время</div>
        <div>Статус</div>
        <div>Действия</div>
      </div>

      {/* Список поездок */}
      <div className="divide-y divide-slate-200">
        {trips.map((trip, index) => (
          <motion.div
            key={trip.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-4 lg:p-6 hover:bg-slate-50 transition-colors"
          >
            {/* Мобильная версия */}
            <div className="lg:hidden space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                  <span className="font-medium text-slate-800">{trip.route}</span>
                </div>
                <div className="flex items-center gap-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-1 text-slate-400 hover:text-blue-500"
                  >
                    <Edit className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => deleteTrip(trip.id)}
                    className="p-1 text-slate-400 hover:text-red-500"
                  >
                    <Trash2 className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-600">
                    {new Date(trip.date).toLocaleDateString('ru-RU')}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-600">
                    {Math.floor(trip.duration / 60)} ч {trip.duration % 60} мин
                  </span>
                </div>
                <div className="text-slate-600">
                  {trip.distance} км
                </div>
                <div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(trip.status)}`}>
                    {getStatusText(trip.status)}
                  </span>
                </div>
              </div>
            </div>

            {/* Десктопная версия */}
            <div className="hidden lg:grid lg:grid-cols-6 gap-4 items-center">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-slate-400" />
                <span className="font-medium text-slate-800">{trip.route}</span>
              </div>
              
              <div className="text-slate-600">
                {new Date(trip.date).toLocaleDateString('ru-RU')}
              </div>
              
              <div className="text-slate-600">
                {trip.distance} км
              </div>
              
              <div className="flex items-center gap-1 text-slate-600">
                <Clock className="w-4 h-4 text-slate-400" />
                <span>{Math.floor(trip.duration / 60)} ч {trip.duration % 60} мин</span>
              </div>
              
              <div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(trip.status)}`}>
                  {getStatusText(trip.status)}
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Edit className="w-4 h-4" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => deleteTrip(trip.id)}
                  className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default TripsList

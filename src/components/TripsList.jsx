import React from 'react'
import { motion } from 'framer-motion'
import { MapPin, Calendar, Clock, Edit, Trash2 } from 'lucide-react'

const TripsList = ({ trips }) => {
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
      case 'planned': return 'Запланировано'
      default: return 'Неизвестно'
    }
  }

  return (
    <div className="overflow-x-auto">
      {/* Заголовки таблицы */}
      <div className="hidden md:grid md:grid-cols-6 gap-4 px-6 py-3 bg-gray-50 text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
        <div>Маршрут</div>
        <div>Дата</div>
        <div>Расстояние</div>
        <div>Время</div>
        <div>Статус</div>
        <div>Действия</div>
      </div>

      {/* Список поездок */}
      <div className="divide-y divide-gray-200">
        {trips.map((trip, index) => (
          <motion.div
            key={trip.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-6 hover:bg-gray-50 transition-colors"
          >
            {/* Мобильная версия */}
            <div className="md:hidden space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                  <span className="font-medium text-gray-800">{trip.route}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-1 text-gray-400 hover:text-blue-500">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-1 text-gray-400 hover:text-red-500">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">
                    {new Date(trip.date).toLocaleDateString('ru-RU')}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">
                    {Math.floor(trip.duration / 60)} ч {trip.duration % 60} мин
                  </span>
                </div>
                <div className="text-gray-600">
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
            <div className="hidden md:grid md:grid-cols-6 gap-4 items-center">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="font-medium text-gray-800">{trip.route}</span>
              </div>
              
              <div className="text-gray-600">
                {new Date(trip.date).toLocaleDateString('ru-RU')}
              </div>
              
              <div className="text-gray-600">
                {trip.distance} км
              </div>
              
              <div className="flex items-center gap-1 text-gray-600">
                <Clock className="w-4 h-4 text-gray-400" />
                <span>{Math.floor(trip.duration / 60)} ч {trip.duration % 60} мин</span>
              </div>
              
              <div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(trip.status)}`}>
                  {getStatusText(trip.status)}
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <button className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default TripsList

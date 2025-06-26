import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  BarChart3, 
  Home,
  MapPin,
  Clock,
  Fuel,
  Wrench,
  FileText,
  Settings,
  Plus,
  Edit,
  Trash2
} from 'lucide-react'

const Dashboard = () => {
  const [trips, setTrips] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    // Данные точно как на скриншоте
    setTrips([
      {
        id: 1,
        route: 'Москва → Санкт-Петербург',
        date: '29.06.2025',
        distance: '712 км',
        time: '11 ч 24 мин',
        status: 'Завершено'
      },
      {
        id: 2,
        route: 'Санкт-Петербург → Минск',
        date: '27.06.2025', 
        distance: '792 км',
        time: '13 ч 15 мин',
        status: 'Завершено'
      },
      {
        id: 3,
        route: 'Варшава-Леон',
        date: '26.06.2025',
        distance: '250 км', 
        time: '8 ч 36 мин',
        status: 'Завершено'
      },
      {
        id: 4,
        route: 'Минск → Киев',
        date: '25.06.2025',
        distance: '568 км',
        time: '9 ч 42 мин', 
        status: 'В процессе'
      }
    ])
  }, [])

  return (
    <div className="min-h-screen bg-slate-900 text-white flex">
      {/* Боковая панель */}
      <div className="w-64 bg-slate-800 min-h-screen">
        {/* Логотип */}
        <div className="p-6 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-semibold">TachoApp</span>
          </div>
        </div>
        
        {/* Меню */}
        <div className="p-4">
          <div className="text-xs text-slate-400 mb-4 uppercase tracking-wider font-medium">МЕНЮ</div>
          <nav className="space-y-1">
            <div className="bg-blue-600 text-white px-4 py-3 rounded-lg flex items-center gap-3 font-medium">
              <Home className="w-4 h-4" />
              <span>Главная</span>
            </div>
            <div className="text-slate-300 px-4 py-3 hover:bg-slate-700 rounded-lg cursor-pointer flex items-center gap-3 transition-colors">
              <MapPin className="w-4 h-4" />
              <span>Поездки</span>
            </div>
            <div className="text-slate-300 px-4 py-3 hover:bg-slate-700 rounded-lg cursor-pointer flex items-center gap-3 transition-colors">
              <Clock className="w-4 h-4" />
              <span>Рабочее время</span>
            </div>
            <div className="text-slate-300 px-4 py-3 hover:bg-slate-700 rounded-lg cursor-pointer flex items-center gap-3 transition-colors">
              <Fuel className="w-4 h-4" />
              <span>Заправки</span>
            </div>
            <div className="text-slate-300 px-4 py-3 hover:bg-slate-700 rounded-lg cursor-pointer flex items-center gap-3 transition-colors">
              <Wrench className="w-4 h-4" />
              <span>Техобслуживание</span>
            </div>
            <div className="text-slate-300 px-4 py-3 hover:bg-slate-700 rounded-lg cursor-pointer flex items-center gap-3 transition-colors">
              <FileText className="w-4 h-4" />
              <span>Отчеты</span>
            </div>
            <div className="text-slate-300 px-4 py-3 hover:bg-slate-700 rounded-lg cursor-pointer flex items-center gap-3 transition-colors">
              <Settings className="w-4 h-4" />
              <span>Настройки</span>
            </div>
          </nav>
        </div>
      </div>

      {/* Основной контент */}
      <div className="flex-1 bg-slate-900">
        {/* Верхняя панель */}
        <header className="p-6 border-b border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-1">Обзор деятельности</h1>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <span>📅</span>
                <span>01.05.2025 - 30.06.2025</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-sm text-slate-300 font-medium">ИП</div>
                  <div className="text-sm text-slate-300">Иван Петров</div>
                  <div className="text-xs text-slate-400">• В пути</div>
                </div>
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-sm text-white font-medium">
                  ИП
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Контент */}
        <main className="p-6">
          {/* Карточки статистики */}
          <div className="grid grid-cols-4 gap-6 mb-8">
            {/* Карточка 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-slate-800 p-6 rounded-xl border border-slate-700"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="text-2xl">📍</div>
                <div className="text-slate-500 text-lg">⋯</div>
              </div>
              <div className="text-3xl font-bold text-white mb-2">2322 км</div>
              <div className="text-slate-400 text-sm">Пробег за период</div>
            </motion.div>

            {/* Карточка 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-slate-800 p-6 rounded-xl border border-slate-700"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="text-2xl">⏱️</div>
                <div className="text-slate-500 text-lg">⋯</div>
              </div>
              <div className="text-3xl font-bold text-white mb-2">42 ч 57 мин</div>
              <div className="text-slate-400 text-sm">Время за рулем</div>
            </motion.div>

            {/* Карточка 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-slate-800 p-6 rounded-xl border border-slate-700"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="text-2xl">⏰</div>
                <div className="text-slate-500 text-lg">⋯</div>
              </div>
              <div className="text-3xl font-bold text-white mb-2">32 ч</div>
              <div className="text-slate-400 text-sm">Время отдыха</div>
            </motion.div>

            {/* Карточка 4 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-slate-800 p-6 rounded-xl border border-slate-700"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="text-2xl">⛽</div>
                <div className="text-slate-500 text-lg">⋯</div>
              </div>
              <div className="text-3xl font-bold text-white mb-2">256 л</div>
              <div className="text-slate-400 text-sm">Расход топлива</div>
            </motion.div>
          </div>

          {/* Таблица поездок */}
          <div className="bg-slate-800 rounded-xl border border-slate-700">
            <div className="p-6 border-b border-slate-700">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-white">Последние поездки</h2>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsModalOpen(true)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Новая поездка</span>
                </motion.button>
              </div>
            </div>
            
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
                  <div className={`font-medium ${trip.status === 'Завершено' ? 'text-green-400' : 'text-blue-400'}`}>
                    {trip.status}
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
        </main>
      </div>
    </div>
  )
}

export default Dashboard

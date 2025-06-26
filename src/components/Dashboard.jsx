import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '../lib/supabase'
import StatsCard from './StatsCard'
import TripsList from './TripsList'
import AddTripModal from './AddTripModal'
import { 
  Route, 
  Clock, 
  Fuel, 
  BarChart3, 
  Plus, 
  Home,
  MapPin,
  Timer,
  Settings,
  FileText,
  Wrench
} from 'lucide-react'

const Dashboard = () => {
  const [trips, setTrips] = useState([])
  const [stats, setStats] = useState({
    totalDistance: 2322,
    totalTime: 42,
    totalMinutes: 57,
    restTime: 32,
    fuelConsumption: 256
  })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Данные как на скриншоте
    setTrips([
      {
        id: 1,
        route: 'Москва → Санкт-Петербург',
        date: '29.06.2025',
        distance: '712 км',
        time: '11 ч 24 мин',
        status: 'completed'
      },
      {
        id: 2,
        route: 'Санкт-Петербург → Минск',
        date: '27.06.2025',
        distance: '792 км',
        time: '13 ч 15 мин',
        status: 'completed'
      },
      {
        id: 3,
        route: 'Варшава-Леон',
        date: '26.06.2025',
        distance: '250 км',
        time: '8 ч 36 мин',
        status: 'completed'
      },
      {
        id: 4,
        route: 'Минск → Киев',
        date: '25.06.2025',
        distance: '568 км',
        time: '9 ч 42 мин',
        status: 'in_progress'
      }
    ])
  }, [])

  const addTrip = (tripData) => {
    const newTrip = {
      ...tripData,
      id: Date.now()
    }
    setTrips([newTrip, ...trips])
    setIsModalOpen(false)
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="flex">
        {/* Боковая панель - точно как на скриншоте */}
        <motion.div 
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          className="w-64 bg-slate-800 min-h-screen"
        >
          {/* Логотип */}
          <div className="p-6 border-b border-slate-700">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-white">TachoApp</span>
            </div>
          </div>
          
          {/* Меню */}
          <div className="p-4">
            <div className="text-xs text-slate-400 mb-4 uppercase tracking-wider">МЕНЮ</div>
            <nav className="space-y-1">
              <div className="bg-blue-600 text-white px-4 py-3 rounded-lg flex items-center gap-3">
                <Home className="w-4 h-4" />
                <span>Главная</span>
              </div>
              <div className="text-slate-300 px-4 py-3 hover:bg-slate-700 rounded-lg cursor-pointer flex items-center gap-3">
                <MapPin className="w-4 h-4" />
                <span>Поездки</span>
              </div>
              <div className="text-slate-300 px-4 py-3 hover:bg-slate-700 rounded-lg cursor-pointer flex items-center gap-3">
                <Timer className="w-4 h-4" />
                <span>Рабочее время</span>
              </div>
              <div className="text-slate-300 px-4 py-3 hover:bg-slate-700 rounded-lg cursor-pointer flex items-center gap-3">
                <Fuel className="w-4 h-4" />
                <span>Заправки</span>
              </div>
              <div className="text-slate-300 px-4 py-3 hover:bg-slate-700 rounded-lg cursor-pointer flex items-center gap-3">
                <Wrench className="w-4 h-4" />
                <span>Техобслуживание</span>
              </div>
              <div className="text-slate-300 px-4 py-3 hover:bg-slate-700 rounded-lg cursor-pointer flex items-center gap-3">
                <FileText className="w-4 h-4" />
                <span>Отчеты</span>
              </div>
              <div className="text-slate-300 px-4 py-3 hover:bg-slate-700 rounded-lg cursor-pointer flex items-center gap-3">
                <Settings className="w-4 h-4" />
                <span>Настройки</span>
              </div>
            </nav>
          </div>
        </motion.div>

        {/* Основной контент */}
        <div className="flex-1 bg-slate-900">
          {/* Верхняя панель */}
          <header className="p-6 border-b border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-white mb-1">Обзор деятельности</h1>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-sm text-slate-400">📅 01.05.2025 - 30.06.2025</div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-sm text-white font-medium">
                    ИП
                  </div>
                  <div className="text-sm">
                    <div className="text-white font-medium">Иван Петров</div>
                    <div className="text-slate-400 text-xs">• В пути</div>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Контент */}
          <main className="p-6">
            {/* Карточки статистики - точно как на скриншоте */}
            <div className="grid grid-cols-4 gap-6 mb-8">
              <StatsCard
                icon="📍"
                title="Пробег за период"
                value={`${stats.totalDistance} км`}
                color="blue"
                delay={0.1}
              />
              <StatsCard
                icon="⏱️"
                title="Время за рулем"
                value={`${stats.totalTime} ч ${stats.totalMinutes} мин`}
                color="green"
                delay={0.2}
              />
              <StatsCard
                icon="⏰"
                title="Время отдыха"
                value={`${stats.restTime} ч`}
                color="red"
                delay={0.3}
              />
              <StatsCard
                icon="⛽"
                title="Расход топлива"
                value={`${stats.fuelConsumption} л`}
                color="yellow"
                delay={0.4}
              />
            </div>

            {/* Таблица поездок */}
            <div className="bg-slate-800 rounded-xl">
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
              <TripsList trips={trips} />
            </div>
          </main>
        </div>
      </div>

      {/* Модальное окно */}
      <AddTripModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={addTrip}
      />
    </div>
  )
}

export default Dashboard

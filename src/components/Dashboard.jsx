import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '../lib/supabase'
import StatsCard from './StatsCard'
import TripsList from './TripsList'
import AddTripModal from './AddTripModal'
import { Route, Clock, Fuel, BarChart3, Plus, Menu, X, User } from 'lucide-react'

const Dashboard = () => {
  const [trips, setTrips] = useState([])
  const [stats, setStats] = useState({
    totalDistance: 1280,
    totalTime: 21,
    restTime: 8,
    fuelConsumption: 154
  })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Временно используем статические данные
    setTrips([
      {
        id: 1,
        route: 'Москва → Санкт-Петербург',
        distance: 712,
        duration: 684,
        fuel_consumption: 85.5,
        status: 'completed',
        date: '2025-06-29'
      },
      {
        id: 2,
        route: 'Санкт-Петербург → Минск',
        distance: 568,
        duration: 582,
        fuel_consumption: 68.4,
        status: 'in_progress',
        date: '2025-06-27'
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
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Боковая панель */}
        <motion.div 
          initial={{ x: -300 }}
          animate={{ x: isSidebarOpen ? 0 : -300 }}
          transition={{ duration: 0.3 }}
          className="fixed lg:relative lg:translate-x-0 w-64 h-screen bg-white shadow-lg z-50 lg:z-auto"
        >
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-800">TachoApp</span>
              </div>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="lg:hidden text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <nav className="p-4 space-y-2">
            <div className="bg-blue-50 text-blue-600 px-4 py-3 rounded-lg font-medium">
              Главная
            </div>
            <div className="text-gray-600 px-4 py-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
              Поездки
            </div>
            <div className="text-gray-600 px-4 py-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
              Рабочее время
            </div>
            <div className="text-gray-600 px-4 py-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
              Заправки
            </div>
            <div className="text-gray-600 px-4 py-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
              Техобслуживание
            </div>
            <div className="text-gray-600 px-4 py-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
              Отчеты
            </div>
            <div className="text-gray-600 px-4 py-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
              Настройки
            </div>
          </nav>
        </motion.div>

        {/* Основной контент */}
        <div className="flex-1 lg:ml-0">
          {/* Верхняя панель */}
          <header className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsSidebarOpen(true)}
                  className="lg:hidden text-gray-500 hover:text-gray-700"
                >
                  <Menu className="w-6 h-6" />
                </button>
                <div className="text-center lg:text-left">
                  <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">Обзор деятельности</h1>
                  <p className="text-gray-500 text-sm">24 июня - 30 июня 2025</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-800">Иван Петров</p>
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-sm text-white font-medium mx-auto mt-1">
                    ИП
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Контент */}
          <main className="p-6">
            {/* Карточки статистики в сетке */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatsCard
                icon={<Route className="w-6 h-6" />}
                title="Пройдено за неделю"
                value={`${stats.totalDistance} км`}
                color="blue"
                delay={0.1}
              />
              <StatsCard
                icon={<Clock className="w-6 h-6" />}
                title="Время за рулем"
                value={`${stats.totalTime} ч`}
                color="green"
                delay={0.2}
              />
              <StatsCard
                icon={<Clock className="w-6 h-6" />}
                title="Время отдыха"
                value={`${stats.restTime} ч`}
                color="red"
                delay={0.3}
              />
              <StatsCard
                icon={<Fuel className="w-6 h-6" />}
                title="Расход топлива"
                value={`${stats.fuelConsumption} л`}
                color="yellow"
                delay={0.4}
              />
            </div>

            {/* Список поездок */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <h2 className="text-xl font-semibold text-gray-800">Последние поездки</h2>
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

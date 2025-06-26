import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '../lib/supabase'
import StatsCard from './StatsCard'
import TripsList from './TripsList'
import AddTripModal from './AddTripModal'
import { Route, Clock, Fuel, BarChart3, Plus, Menu, X } from 'lucide-react'

const Dashboard = () => {
  const [trips, setTrips] = useState([])
  const [stats, setStats] = useState({
    totalDistance: 0,
    totalTime: 0,
    restTime: 0,
    fuelConsumption: 0
  })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTrips()
  }, [])

  const fetchTrips = async () => {
    try {
      const { data, error } = await supabase
        .from('trips')
        .select('*')
        .order('date', { ascending: false })

      if (error) throw error

      setTrips(data)
      calculateStats(data)
    } catch (error) {
      console.error('Ошибка загрузки поездок:', error)
    } finally {
      setLoading(false)
    }
  }

  const calculateStats = (tripsData) => {
    const totalDistance = tripsData.reduce((sum, trip) => sum + parseFloat(trip.distance), 0)
    const totalTime = tripsData.reduce((sum, trip) => sum + trip.duration, 0)
    const fuelConsumption = tripsData.reduce((sum, trip) => sum + parseFloat(trip.fuel_consumption), 0)
    
    setStats({
      totalDistance: Math.round(totalDistance),
      totalTime: Math.round(totalTime / 60),
      restTime: Math.round(totalTime * 0.37 / 60),
      fuelConsumption: Math.round(fuelConsumption)
    })
  }

  const addTrip = async (tripData) => {
    try {
      const { data, error } = await supabase
        .from('trips')
        .insert([tripData])
        .select()

      if (error) throw error

      setTrips([data[0], ...trips])
      calculateStats([data[0], ...trips])
      setIsModalOpen(false)
    } catch (error) {
      console.error('Ошибка добавления поездки:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex h-screen">
        {/* Мобильное меню overlay */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Боковая панель */}
        <motion.div 
          initial={{ x: -300 }}
          animate={{ x: isSidebarOpen ? 0 : -300 }}
          transition={{ duration: 0.3 }}
          className="fixed lg:relative lg:translate-x-0 w-64 h-full bg-white shadow-lg z-50 lg:z-auto"
        >
          <div className="p-6 border-b border-slate-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold text-slate-800">TachoApp</span>
              </div>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="lg:hidden text-slate-500 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <nav className="p-4 space-y-2">
            <div className="bg-blue-50 text-blue-600 px-4 py-3 rounded-lg font-medium">
              Главная
            </div>
            <div className="text-slate-600 px-4 py-3 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors">
              Поездки
            </div>
            <div className="text-slate-600 px-4 py-3 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors">
              Рабочее время
            </div>
            <div className="text-slate-600 px-4 py-3 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors">
              Заправки
            </div>
            <div className="text-slate-600 px-4 py-3 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors">
              Техобслуживание
            </div>
            <div className="text-slate-600 px-4 py-3 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors">
              Отчеты
            </div>
            <div className="text-slate-600 px-4 py-3 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors">
              Настройки
            </div>
          </nav>
        </motion.div>

        {/* Основной контент */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Верхняя панель */}
          <header className="bg-white border-b border-slate-200 px-4 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsSidebarOpen(true)}
                  className="lg:hidden text-slate-500 hover:text-slate-700"
                >
                  <Menu className="w-6 h-6" />
                </button>
                <div>
                  <h1 className="text-2xl lg:text-3xl font-bold text-slate-800">Обзор деятельности</h1>
                  <p className="text-slate-500 text-sm lg:text-base">24 июня - 30 июня 2025</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="hidden sm:block text-sm text-slate-600">Иван Петров</span>
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-sm text-white font-medium">
                  ИП
                </div>
              </div>
            </div>
          </header>

          {/* Контент с прокруткой */}
          <main className="flex-1 overflow-y-auto p-4 lg:p-8">
            {/* Карточки статистики */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
              <StatsCard
                icon={<Route className="w-5 h-5 lg:w-6 lg:h-6" />}
                title="Пройдено за неделю"
                value={`${stats.totalDistance} км`}
                color="blue"
                delay={0.1}
              />
              <StatsCard
                icon={<Clock className="w-5 h-5 lg:w-6 lg:h-6" />}
                title="Время за рулем"
                value={`${stats.totalTime} ч`}
                color="green"
                delay={0.2}
              />
              <StatsCard
                icon={<Clock className="w-5 h-5 lg:w-6 lg:h-6" />}
                title="Время отдыха"
                value={`${stats.restTime} ч`}
                color="red"
                delay={0.3}
              />
              <StatsCard
                icon={<Fuel className="w-5 h-5 lg:w-6 lg:h-6" />}
                title="Расход топлива"
                value={`${stats.fuelConsumption} л`}
                color="yellow"
                delay={0.4}
              />
            </div>

            {/* Список поездок */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-4 lg:p-6 border-b border-slate-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <h2 className="text-xl font-semibold text-slate-800">Последние поездки</h2>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsModalOpen(true)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span className="hidden sm:inline">Новая поездка</span>
                    <span className="sm:hidden">Добавить</span>
                  </motion.button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <TripsList trips={trips} onUpdate={fetchTrips} />
              </div>
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

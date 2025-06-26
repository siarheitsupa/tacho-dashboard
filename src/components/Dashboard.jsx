import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '../lib/supabase'
import StatsCard from './StatsCard'
import TripsList from './TripsList'
import AddTripModal from './AddTripModal'
import { Route, Clock, Fuel, BarChart3, Plus } from 'lucide-react'

const Dashboard = () => {
  const [trips, setTrips] = useState([])
  const [stats, setStats] = useState({
    totalDistance: 0,
    totalTime: 0,
    restTime: 0,
    fuelConsumption: 0
  })
  const [isModalOpen, setIsModalOpen] = useState(false)
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
      totalTime: Math.round(totalTime / 60), // конвертация в часы
      restTime: Math.round(totalTime * 0.37 / 60), // примерно 37% от времени в пути
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
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="flex">
        {/* Боковая панель */}
        <motion.div 
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          className="w-64 bg-slate-800 min-h-screen p-6"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6" />
            </div>
            <span className="text-xl font-bold">TachoApp</span>
          </div>
          
          <nav className="space-y-2">
            <div className="bg-blue-500 text-white px-4 py-3 rounded-lg">
              Главная
            </div>
            <div className="text-slate-400 px-4 py-3 hover:bg-slate-700 rounded-lg cursor-pointer">
              Поездки
            </div>
            <div className="text-slate-400 px-4 py-3 hover:bg-slate-700 rounded-lg cursor-pointer">
              Рабочее время
            </div>
            <div className="text-slate-400 px-4 py-3 hover:bg-slate-700 rounded-lg cursor-pointer">
              Заправки
            </div>
            <div className="text-slate-400 px-4 py-3 hover:bg-slate-700 rounded-lg cursor-pointer">
              Техобслуживание
            </div>
            <div className="text-slate-400 px-4 py-3 hover:bg-slate-700 rounded-lg cursor-pointer">
              Отчеты
            </div>
            <div className="text-slate-400 px-4 py-3 hover:bg-slate-700 rounded-lg cursor-pointer">
              Настройки
            </div>
          </nav>
        </motion.div>

        {/* Основной контент */}
        <div className="flex-1 p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Обзор деятельности</h1>
              <p className="text-slate-400">24 июня - 30 июня 2025</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-slate-400">Иван Петров</span>
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-sm">
                ИП
              </div>
            </div>
          </div>

          {/* Карточки статистики */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
          <div className="bg-slate-800 rounded-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Последние поездки</h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsModalOpen(true)}
                className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Новая поездка
              </motion.button>
            </div>
            <TripsList trips={trips} onUpdate={fetchTrips} />
          </div>
        </div>
      </div>

      {/* Модальное окно добавления поездки */}
      <AddTripModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={addTrip}
      />
    </div>
  )
}

export default Dashboard

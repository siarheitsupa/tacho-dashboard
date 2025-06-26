import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

const AddTripModal = ({ isOpen, onClose, onAdd, editingTrip }) => {
  const [formData, setFormData] = useState({
    route: '',
    distance: '',
    time: '',
    status: 'В процессе'
  })

  useEffect(() => {
    if (editingTrip) {
      setFormData({
        route: editingTrip.route,
        distance: editingTrip.distance.replace(' км', ''),
        time: editingTrip.time,
        status: editingTrip.status
      })
    } else {
      setFormData({
        route: '',
        distance: '',
        time: '',
        status: 'В процессе'
      })
    }
  }, [editingTrip])

  const handleSubmit = (e) => {
    e.preventDefault()
    onAdd({
      ...formData,
      distance: `${formData.distance} км`
    })
    setFormData({
      route: '',
      distance: '',
      time: '',
      status: 'В процессе'
    })
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-slate-800 rounded-xl p-6 w-full max-w-md border border-slate-700"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-white">
                {editingTrip ? 'Редактировать поездку' : 'Новая поездка'}
              </h2>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Маршрут
                </label>
                <input
                  type="text"
                  value={formData.route}
                  onChange={(e) => setFormData({...formData, route: e.target.value})}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="Москва → Санкт-Петербург"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Расстояние (км)
                  </label>
                  <input
                    type="number"
                    value={formData.distance}
                    onChange={(e) => setFormData({...formData, distance: e.target.value})}
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="712"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Время
                  </label>
                  <input
                    type="text"
                    value={formData.time}
                    onChange={(e) => setFormData({...formData, time: e.target.value})}
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="11 ч 24 мин"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Статус
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors"
                >
                  <option value="В процессе">В процессе</option>
                  <option value="Завершено">Завершено</option>
                  <option value="Запланировано">Запланировано</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onClose}
                  className="flex-1 bg-slate-600 hover:bg-slate-500 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Отмена
                </motion.button>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  {editingTrip ? 'Сохранить' : 'Добавить'}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default AddTripModal

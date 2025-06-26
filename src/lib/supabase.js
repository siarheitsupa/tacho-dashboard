import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Key:', supabaseAnonKey ? 'Установлен' : 'Отсутствует');

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Отсутствуют переменные окружения Supabase');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Тест подключения
supabase.from('trips').select('count', { count: 'exact' }).then(({ count, error }) => {
  if (error) {
    console.error('Ошибка подключения к Supabase:', error);
  } else {
    console.log('Подключение к Supabase успешно. Количество записей:', count);
  }
});

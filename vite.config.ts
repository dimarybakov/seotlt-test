import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({
      // Рекомендуемые настройки для иконок
      svgrOptions: {
        icon: true, // Автоматически проставит width="1em" height="1em"
        ref: true, // Позволит использовать forwardRef
        svgProps: {
          // Заставляем иконку наследовать цвет текста родителя
          fill: 'currentColor',
          stroke: 'currentColor',
        },
      },
    }),
  ],
});

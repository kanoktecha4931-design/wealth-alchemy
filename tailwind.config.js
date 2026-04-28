/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // <--- บรรทัดนี้ต้องครอบคลุมไฟล์ .jsx ทั้งหมด
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

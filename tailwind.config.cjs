/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './resources/views/index.blade.php',
        './resources/js/**/*.{vue,js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {},
    },
    plugins: [require('@tailwindcss/forms')],
}

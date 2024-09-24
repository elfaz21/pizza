/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          BlueBlackColor:"#1E0176",
          GrayColor:"#ECECEC",
          DarkGray:"#D3D3D3"
        },
        screens:{
          '3xs':{'max':'359px'},
          '2xs':{'max':'400px'},
          'xs':{'max':'426px'},
          'xls':{'min':'427px', 'max':'630px'},
        }
      },
    },
    plugins: [],
  }
  
  
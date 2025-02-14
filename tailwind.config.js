module.exports = {
    // ... الإعدادات الأخرى
    theme: {
      extend: {
        animation: {
          'fade-in-up': 'fadeInUp 0.5s ease-out',
          'bounce-short': 'bounce 0.5s ease-in-out 2',
          'shake': 'shake 0.5s ease-in-out',
        },
        keyframes: {
          fadeInUp: {
            '0%': { opacity: '0', transform: 'translateY(20px)' },
            '100%': { opacity: '1', transform: 'translateY(0)' },
          },
          bounce: {
            '0%, 100%': { transform: 'translateY(0)' },
            '50%': { transform: 'translateY(-10px)' },
          },
          shake: {
            '0%, 100%': { transform: 'translateX(0)' },
            '25%': { transform: 'translateX(-5px)' },
            '75%': { transform: 'translateX(5px)' },
          }
        }
      }
    }
  }
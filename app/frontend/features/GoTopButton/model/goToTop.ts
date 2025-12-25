import { useCallback } from 'react'

const useGoToTop = () => {
  const goToTop = useCallback((behavior: 'auto' | 'instant' | 'smooth' = 'smooth') => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior,
    })
  }, [])

  return { goToTop }
}

export default useGoToTop

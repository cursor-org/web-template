import { useEffect, useRef } from 'react'

export const useOnComponentDidMount = <T, R>(effect: (...args: T[]) => R) => {
  const componentDidMount = useRef(false)

  useEffect(() => {
    if (!componentDidMount.current) {
      effect()
    }
  }, [effect])

  useEffect(() => {
    componentDidMount.current = true
  }, [])
}

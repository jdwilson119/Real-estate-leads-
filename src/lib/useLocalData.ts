import { useEffect, useState } from 'react'

const PREFIX = 'leasing-dashboard:'

export function useLocalData<T>(key: string, seed: T): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = window.localStorage.getItem(PREFIX + key)
      return raw ? (JSON.parse(raw) as T) : seed
    } catch {
      return seed
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(PREFIX + key, JSON.stringify(value))
    } catch {
      // ignore write failures (private mode, quota, etc.)
    }
  }, [key, value])

  return [value, setValue]
}

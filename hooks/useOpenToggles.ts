import { useEffect } from 'react'

export function useOpenToggles(dep?: any) {
  useEffect(() => {
    // Coba beberapa kali karena NotionRenderer render async
    const attempts = [100, 300, 600, 1000]

    const timers = attempts.map((delay) =>
      setTimeout(() => {
        // Coba kedua selector — pastikan salah satunya cocok
        const toggles = document.querySelectorAll<HTMLDetailsElement>(
          '.notion-toggle > details, details.notion-toggle'
        )
        // console.log(`[${delay}ms] Toggle ditemukan:`, toggles.length)
        for (const detail of toggles) {
          detail.open = true
        }
        // toggles.forEach((detail) => {
        //   detail.open = true
        // })
      }, delay)
    )

    return () => {
      for (const timer of timers) {
        clearTimeout(timer)
      }
    }
  }, [dep])
}

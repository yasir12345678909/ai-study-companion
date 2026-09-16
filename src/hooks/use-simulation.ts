import { useState, useEffect } from 'react'

/** Simulates typing/streaming text generation */
export function useStreamText(text: string, speed: number = 20) {
  const [displayed, setDisplayed] = useState('')
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    setDisplayed('')
    setIsComplete(false)
    let i = 0

    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1))
        i++
      } else {
        setIsComplete(true)
        clearInterval(interval)
      }
    }, speed)

    return () => clearInterval(interval)
  }, [text, speed])

  return { displayed, isComplete }
}

/** Simulates upload progress stages */
export function useSimulatedProgress() {
  const [stage, setStage] = useState<string>('idle')
  const [progress, setProgress] = useState(0)
  const [message, setMessage] = useState('')

  const stages = [
    { key: 'uploading', progress: 28, message: 'Uploading file...', delay: 1200 },
    { key: 'reading', progress: 45, message: 'Reading pages...', delay: 1000 },
    { key: 'extracting', progress: 62, message: 'Extracting concepts...', delay: 1500 },
    { key: 'organizing', progress: 78, message: 'Organizing content...', delay: 1200 },
    { key: 'building', progress: 92, message: 'Building questions...', delay: 1000 },
    { key: 'ready', progress: 100, message: 'Ready to study!', delay: 0 },
  ]

  const start = () => {
    let i = 0
    const runStage = () => {
      if (i < stages.length) {
        const s = stages[i]
        setStage(s.key)
        setProgress(s.progress)
        setMessage(s.message)
        i++
        if (s.delay > 0) {
          setTimeout(runStage, s.delay)
        }
      }
    }
    runStage()
  }

  const reset = () => {
    setStage('idle')
    setProgress(0)
    setMessage('')
  }

  return { stage, progress, message, start, reset }
}

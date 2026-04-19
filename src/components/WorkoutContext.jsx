import { createContext, useContext, useState } from 'react'

const WorkoutContext = createContext()

export function WorkoutProvider({ children }) {
  const [workouts, setWorkouts] = useState(() => {
    const saved = localStorage.getItem('workouts')
    return saved ? JSON.parse(saved) : []
  })

  const [unit, setUnit] = useState(() => {
    return localStorage.getItem('unit') || 'lbs'
  })

  const toggleUnit = () => {
    const newUnit = unit === 'lbs' ? 'kg' : 'lbs'
    localStorage.setItem('unit', newUnit)
    setUnit(newUnit)
  }

  const addWorkout = (workout) => {
    const newWorkouts = [...workouts, workout]
    localStorage.setItem('workouts', JSON.stringify(newWorkouts))
    setWorkouts(newWorkouts)
  }

  const deleteWorkout = (id) => {
    const newWorkouts = workouts.filter(w => w.id !== id)
    localStorage.setItem('workouts', JSON.stringify(newWorkouts))
    setWorkouts(newWorkouts)
  }

  const convertWeight = (weightInLbs) => {
    if (unit === 'kg') {
      return (weightInLbs / 2.2046).toFixed(1)
    }
    return weightInLbs
  }

  return (
    <WorkoutContext.Provider value={{
      workouts,
      unit,
      toggleUnit,
      addWorkout,
      deleteWorkout,
      convertWeight
    }}>
      {children}
    </WorkoutContext.Provider>
  )
}

export function useWorkout() {
  return useContext(WorkoutContext)
}
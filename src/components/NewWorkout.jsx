import { useState } from 'react'
import { useWorkout } from './WorkoutContext'

function NewWorkout({ onNavigate }) {
  const { addWorkout, unit, convertWeight } = useWorkout()

  const [workoutName, setWorkoutName] = useState('')
  const [exercises, setExercises] = useState([])

  const addExercise = () => {
    const newExercise = {
      id: Date.now().toString(),
      name: '',
      sets: []
    }
    setExercises([...exercises, newExercise])
  }

  const removeExercise = (exerciseId) => {
    setExercises(exercises.filter(e => e.id !== exerciseId))
  }

  const updateExerciseName = (exerciseId, name) => {
    setExercises(exercises.map(e =>
      e.id === exerciseId ? { ...e, name } : e
    ))
  }

  const addSet = (exerciseId) => {
    const newSet = {
      id: Date.now().toString(),
      reps: '',
      weight: '',
      rpe: ''
    }
    setExercises(exercises.map(e =>
      e.id === exerciseId
        ? { ...e, sets: [...e.sets, newSet] }
        : e
    ))
  }

  const removeSet = (exerciseId, setId) => {
    setExercises(exercises.map(e =>
      e.id === exerciseId
        ? { ...e, sets: e.sets.filter(s => s.id !== setId) }
        : e
    ))
  }

  const updateSet = (exerciseId, setId, field, value) => {
    setExercises(exercises.map(e =>
      e.id === exerciseId
        ? {
            ...e, sets: e.sets.map(s =>
              s.id === setId ? { ...s, [field]: value } : s
            )
          }
        : e
    ))
  }

  const saveWorkout = () => {
    if (!workoutName.trim()) {
      alert('Please enter a workout name')
      return
    }
    if (exercises.length === 0) {
      alert('Please add at least one exercise')
      return
    }

    const validExercises = exercises.filter(e => e.name.trim() && e.sets.length > 0)

    if (validExercises.length === 0) {
      alert('Please add at least one exercise with a name and sets')
      return
    }

    const workout = {
      id: Date.now().toString(),
      name: workoutName,
      datetime: new Date().toISOString(),
      exercises: validExercises.map(e => ({
        ...e,
        sets: e.sets.map(s => ({
          ...s,
          weight: unit === 'kg'
            ? (parseFloat(s.weight) * 2.2046).toFixed(1)
            : s.weight
        }))
      }))
    }

    addWorkout(workout)
    onNavigate('history')
  }

  return (
    <div className="new-workout">
      <h1>New Workout</h1>

      <div className="workout-name">
        <input
          type="text"
          placeholder="Workout Name"
          value={workoutName}
          onChange={e => setWorkoutName(e.target.value)}
        />
      </div>

      <div className="exercises">
        {exercises.map(exercise => (
          <div key={exercise.id} className="exercise">
            <div className="exercise-header">
              <input
                type="text"
                placeholder="Exercise Name"
                value={exercise.name}
                onChange={e => updateExerciseName(exercise.id, e.target.value)}
              />
              <button onClick={() => removeExercise(exercise.id)}>
                Remove Exercise
              </button>
            </div>

            <div className="sets">
              <table>
                <thead>
                  <tr>
                    <th>Set</th>
                    <th>Reps</th>
                    <th>Weight ({unit})</th>
                    <th>RPE</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {exercise.sets.map((set, index) => (
                    <tr key={set.id}>
                      <td>{index + 1}</td>
                      <td>
                        <input
                          type="number"
                          value={set.reps}
                          onChange={e => updateSet(exercise.id, set.id, 'reps', e.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          value={set.weight}
                          onChange={e => updateSet(exercise.id, set.id, 'weight', e.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          min="1"
                          max="10"
                          value={set.rpe}
                          onChange={e => updateSet(exercise.id, set.id, 'rpe', e.target.value)}
                        />
                      </td>
                      <td>
                        <button onClick={() => removeSet(exercise.id, set.id)}>
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button onClick={() => addSet(exercise.id)}>
                Add Set
              </button>
            </div>
          </div>
        ))}
      </div>

      <button onClick={addExercise}>Add Exercise</button>
      <button onClick={saveWorkout}>Save Workout</button>
    </div>
  )
}

export default NewWorkout
import { useState } from 'react'
import { useWorkout } from './WorkoutContext'

function NewWorkout({ onNavigate }) {
  const { addWorkout, unit, convertWeight } = useWorkout()
  const [workoutName, setWorkoutName] = useState('')
  const [exercises, setExercises] = useState([])

  const addExercise = () => {
    setExercises([...exercises, {
      id: Date.now().toString(),
      name: '',
      sets: []
    }])
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
    setExercises(exercises.map(e =>
      e.id === exerciseId
        ? { ...e, sets: [...e.sets, { id: Date.now().toString(), reps: '', weight: '', rpe: '' }] }
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
        ? { ...e, sets: e.sets.map(s =>
            s.id === setId ? { ...s, [field]: value } : s
          )}
        : e
    ))
  }

  const saveWorkout = () => {
    if (!workoutName.trim()) return alert('Please enter a workout name')
    if (exercises.length === 0) return alert('Please add at least one exercise')
    const validExercises = exercises.filter(e => e.name.trim() && e.sets.length > 0)
    if (validExercises.length === 0) return alert('Please add at least one exercise with a name and sets')

    addWorkout({
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
    })
    onNavigate('history')
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">New Workout</h1>

      <input
        type="text"
        placeholder="Workout Name"
        value={workoutName}
        onChange={e => setWorkoutName(e.target.value)}
        className="w-full bg-gray-800 text-white placeholder-gray-500 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="space-y-4">
        {exercises.map(exercise => (
          <div key={exercise.id} className="bg-gray-800 rounded-xl p-4 space-y-3">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Exercise Name"
                value={exercise.name}
                onChange={e => updateExerciseName(exercise.id, e.target.value)}
                className="flex-1 bg-gray-700 text-white placeholder-gray-500 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={() => removeExercise(exercise.id)}
                className="text-red-400 text-sm px-3 py-2 rounded-lg bg-gray-700 hover:bg-gray-600"
              >
                Remove
              </button>
            </div>

            {exercise.sets.length > 0 && (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-gray-400 text-xs">
                      <th className="text-left pb-2">Set</th>
                      <th className="text-left pb-2">Reps</th>
                      <th className="text-left pb-2">Weight ({unit})</th>
                      <th className="text-left pb-2">RPE</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody className="space-y-2">
                    {exercise.sets.map((set, index) => (
                      <tr key={set.id}>
                        <td className="pr-2 text-gray-400">{index + 1}</td>
                        <td className="pr-2">
                          <input
                            type="number"
                            value={set.reps}
                            onChange={e => updateSet(exercise.id, set.id, 'reps', e.target.value)}
                            className="w-16 bg-gray-700 text-white rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                          />
                        </td>
                        <td className="pr-2">
                          <input
                            type="number"
                            value={set.weight}
                            onChange={e => updateSet(exercise.id, set.id, 'weight', e.target.value)}
                            className="w-20 bg-gray-700 text-white rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                          />
                        </td>
                        <td className="pr-2">
                          <input
                            type="number"
                            min="1"
                            max="10"
                            value={set.rpe}
                            onChange={e => updateSet(exercise.id, set.id, 'rpe', e.target.value)}
                            className="w-16 bg-gray-700 text-white rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                          />
                        </td>
                        <td>
                          <button
                            onClick={() => removeSet(exercise.id, set.id)}
                            className="text-red-400 text-xs hover:text-red-300"
                          >
                            ✕
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <button
              onClick={() => addSet(exercise.id)}
              className="text-blue-400 text-sm hover:text-blue-300"
            >
              + Add Set
            </button>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        <button
          onClick={addExercise}
          className="w-full py-3 rounded-xl border border-gray-700 text-gray-300 text-sm hover:bg-gray-800 transition-colors"
        >
          + Add Exercise
        </button>
        <button
          onClick={saveWorkout}
          className="w-full py-3 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-500 transition-colors"
        >
          Save Workout
        </button>
      </div>
    </div>
  )
}

export default NewWorkout
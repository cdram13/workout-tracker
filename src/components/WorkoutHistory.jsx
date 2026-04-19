import { useState } from 'react'
import { useWorkout } from './WorkoutContext'

function WorkoutHistory() {
  const { workouts, deleteWorkout, unit, toggleUnit, convertWeight } = useWorkout()
  const [expanded, setExpanded] = useState(null)

  const toggleExpand = (id) => {
    setExpanded(expanded === id ? null : id)
  }

  const formatDate = (isoString) => {
    const date = new Date(isoString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">History</h1>
        <button
          onClick={toggleUnit}
          className="text-sm bg-gray-800 px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-700"
        >
          {unit === 'lbs' ? 'Switch to kg' : 'Switch to lbs'}
        </button>
      </div>

      {workouts.length === 0 && (
        <div className="text-center py-16 text-gray-500">
          <p className="text-lg">No workouts yet</p>
          <p className="text-sm mt-1">Log your first workout to get started</p>
        </div>
      )}

      <div className="space-y-3">
        {[...workouts].reverse().map(workout => (
          <div key={workout.id} className="bg-gray-800 rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3">
              <button
                onClick={() => toggleExpand(workout.id)}
                className="flex-1 text-left"
              >
                <p className="font-medium text-white">{workout.name}</p>
                <p className="text-xs text-gray-400 mt-0.5">{formatDate(workout.datetime)}</p>
              </button>
              <div className="flex gap-2 ml-3">
                <button
                  onClick={() => toggleExpand(workout.id)}
                  className="text-gray-400 text-xs px-2 py-1 rounded bg-gray-700 hover:bg-gray-600"
                >
                  {expanded === workout.id ? '▲' : '▼'}
                </button>
                <button
                  onClick={() => deleteWorkout(workout.id)}
                  className="text-red-400 text-xs px-2 py-1 rounded bg-gray-700 hover:bg-gray-600"
                >
                  Delete
                </button>
              </div>
            </div>

            {expanded === workout.id && (
              <div className="border-t border-gray-700 px-4 py-3 space-y-4">
                {workout.exercises.map(exercise => (
                  <div key={exercise.id}>
                    <h3 className="text-sm font-medium text-blue-400 mb-2">{exercise.name}</h3>
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-gray-500 text-xs">
                          <th className="text-left pb-1">Set</th>
                          <th className="text-left pb-1">Reps</th>
                          <th className="text-left pb-1">Weight ({unit})</th>
                          <th className="text-left pb-1">RPE</th>
                        </tr>
                      </thead>
                      <tbody>
                        {exercise.sets.map((set, index) => (
                          <tr key={set.id} className="text-gray-300">
                            <td className="py-0.5">{index + 1}</td>
                            <td>{set.reps}</td>
                            <td>{convertWeight(set.weight)}</td>
                            <td>{set.rpe}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default WorkoutHistory
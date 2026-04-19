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
    <div className="workout-history">
      <div className="history-header">
        <h1>Workout History</h1>
        <button onClick={toggleUnit}>
          Switch to {unit === 'lbs' ? 'kg' : 'lbs'}
        </button>
      </div>

      {workouts.length === 0 && (
        <p>No workouts yet. Go log one!</p>
      )}

      <div className="workout-list">
        {workouts.map(workout => (
          <div key={workout.id} className="workout-card">
            <div className="workout-card-header">
              <span onClick={() => toggleExpand(workout.id)}>
                {workout.name} — {formatDate(workout.datetime)}
              </span>
              <div className="workout-card-actions">
                <button onClick={() => toggleExpand(workout.id)}>
                  {expanded === workout.id ? 'Collapse' : 'Expand'}
                </button>
                <button onClick={() => deleteWorkout(workout.id)}>
                  Delete
                </button>
              </div>
            </div>

            {expanded === workout.id && (
              <div className="workout-detail">
                {workout.exercises.map(exercise => (
                  <div key={exercise.id} className="exercise-detail">
                    <h3>{exercise.name}</h3>
                    <table>
                      <thead>
                        <tr>
                          <th>Set</th>
                          <th>Reps</th>
                          <th>Weight ({unit})</th>
                          <th>RPE</th>
                        </tr>
                      </thead>
                      <tbody>
                        {exercise.sets.map((set, index) => (
                          <tr key={set.id}>
                            <td>{index + 1}</td>
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
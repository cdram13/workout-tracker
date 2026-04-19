import { useState } from 'react'
import { WorkoutProvider } from './components/WorkoutContext'
import NewWorkout from './components/NewWorkout'
import WorkoutHistory from './components/WorkoutHistory'
import './App.css'

function App() {
  const [page, setPage] = useState('new-workout')

  return (
    <WorkoutProvider>
      <div className="app">
        <nav>
          <button onClick={() => setPage('new-workout')}>New Workout</button>
          <button onClick={() => setPage('history')}>History</button>
        </nav>
        <main>
          {page === 'new-workout' && <NewWorkout onNavigate={setPage} />}
          {page === 'history' && <WorkoutHistory />}
        </main>
      </div>
    </WorkoutProvider>
  )
}

export default App
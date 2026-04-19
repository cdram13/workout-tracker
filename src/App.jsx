import { useState } from 'react'
import { WorkoutProvider } from './components/WorkoutContext'
import NewWorkout from './components/NewWorkout'
import WorkoutHistory from './components/WorkoutHistory'
import './App.css'

function App() {
  const [page, setPage] = useState('new-workout')

  return (
    <WorkoutProvider>
      <div className="bg-gray-900 min-h-screen text-white">
        <nav className="bg-gray-800 px-4 py-3 flex gap-3 sticky top-0 z-10">
          <button
            onClick={() => setPage('new-workout')}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
              page === 'new-workout'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300'
            }`}
          >
            New Workout
          </button>
          <button
            onClick={() => setPage('history')}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
              page === 'history'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300'
            }`}
          >
            History
          </button>
        </nav>
        <main className="max-w-lg mx-auto px-4 py-6">
          {page === 'new-workout' && <NewWorkout onNavigate={setPage} />}
          {page === 'history' && <WorkoutHistory />}
        </main>
      </div>
    </WorkoutProvider>
  )
}

export default App
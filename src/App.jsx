import { useEffect, useMemo, useState } from 'react'
import TaskForm from './components/TaskForm'
import FilterBar from './components/FilterBar'
import TaskList from './components/TaskList'
import TaskStats from './components/TaskStats'

const STORAGE_KEY = 'task-manager-tasks'

function App() {
  const [tasks, setTasks] = useState(() => {
    try {
      const savedTasks = localStorage.getItem(STORAGE_KEY)
      return savedTasks ? JSON.parse(savedTasks) : []
    } catch (error) {
      console.error('Could not load tasks:', error)
      return []
    }
  })

  const [filter, setFilter] = useState('all')
  const [searchText, setSearchText] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editingText, setEditingText] = useState('')

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  }, [tasks])

  function addTask(text) {
    const trimmedText = text.trim()

    if (!trimmedText) return

    const newTask = {
      id: crypto.randomUUID(),
      text: trimmedText,
      completed: false,
      createdAt: new Date().toISOString(),
    }

    setTasks((currentTasks) => [newTask, ...currentTasks])
  }

  function deleteTask(taskId) {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== taskId)
    )

    if (editingId === taskId) {
      cancelEditing()
    }
  }

  function toggleTask(taskId) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId
          ? { ...task, completed: !task.completed }
          : task
      )
    )
  }

  function startEditing(task) {
    setEditingId(task.id)
    setEditingText(task.text)
  }

  function cancelEditing() {
    setEditingId(null)
    setEditingText('')
  }

  function saveEdit(taskId) {
    const trimmedText = editingText.trim()

    if (!trimmedText) return

    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId
          ? { ...task, text: trimmedText }
          : task
      )
    )

    cancelEditing()
  }

  function clearCompleted() {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => !task.completed)
    )
  }

  const totalTasks = tasks.length

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length

  const activeTasks = totalTasks - completedTasks

  const visibleTasks = useMemo(() => {
    let result = tasks

    if (filter === 'active') {
      result = result.filter((task) => !task.completed)
    }

    if (filter === 'completed') {
      result = result.filter((task) => task.completed)
    }

    const search = searchText.trim().toLowerCase()

    if (search) {
      result = result.filter((task) =>
        task.text.toLowerCase().includes(search)
      )
    }

    return result
  }, [tasks, filter, searchText])

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1>Task Manager</h1>
          <p>Organize your work and stay productive.</p>
        </header>

        <main>
          <TaskForm onAddTask={addTask} />

          <TaskStats
            totalTasks={totalTasks}
            activeTasks={activeTasks}
            completedTasks={completedTasks}
          />

          <section className="task-controls">
            <div className="search-wrapper">
              <label htmlFor="search">Search tasks</label>

              <input
                id="search"
                type="text"
                placeholder="Search your tasks..."
                value={searchText}
                onChange={(event) =>
                  setSearchText(event.target.value)
                }
              />
            </div>

            <FilterBar
              filter={filter}
              onFilterChange={setFilter}
            />
          </section>

          <TaskList
            tasks={visibleTasks}
            editingId={editingId}
            editingText={editingText}
            onEditingTextChange={setEditingText}
            onToggleTask={toggleTask}
            onDeleteTask={deleteTask}
            onStartEditing={startEditing}
            onSaveEdit={saveEdit}
            onCancelEditing={cancelEditing}
          />

          {completedTasks > 0 && (
            <button
              className="clear-completed"
              onClick={clearCompleted}
            >
              Clear Completed Tasks
            </button>
          )}
        </main>
      </div>
    </div>
  )
}

export default App
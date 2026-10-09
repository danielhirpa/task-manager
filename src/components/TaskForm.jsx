import { useState } from 'react'

function TaskForm({ onAddTask }) {
  const [text, setText] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(event) {
    event.preventDefault()

    const trimmedText = text.trim()

    if (!trimmedText) {
      setError('Please enter a task.')
      return
    }

    onAddTask(trimmedText)

    setText('')
    setError('')
  }

  function handleChange(event) {
    setText(event.target.value)

    if (error) {
      setError('')
    }
  }

  return (
    <section className="task-form-section">
      <form className="task-form" onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <label htmlFor="task">New Task</label>

          <input
            id="task"
            type="text"
            placeholder="What needs to be done?"
            value={text}
            onChange={handleChange}
            maxLength={150}
          />

          {error && <p className="error-message">{error}</p>}
        </div>

        <button type="submit" className="add-button">
          Add Task
        </button>
      </form>
    </section>
  )
}

export default TaskForm
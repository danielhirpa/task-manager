function TaskItem({
  task,
  isEditing,
  editingText,
  onEditingTextChange,
  onToggleTask,
  onDeleteTask,
  onStartEditing,
  onSaveEdit,
  onCancelEditing,
}) {
  function handleEditSubmit(event) {
    event.preventDefault()
    onSaveEdit(task.id)
  }

  if (isEditing) {
    return (
      <li className="task-item editing">
        <form
          className="edit-form"
          onSubmit={handleEditSubmit}
        >
          <input
            type="text"
            value={editingText}
            onChange={(event) =>
              onEditingTextChange(event.target.value)
            }
            autoFocus
            maxLength={150}
          />

          <div className="task-actions">
            <button type="submit" className="save-button">
              Save
            </button>

            <button
              type="button"
              className="cancel-button"
              onClick={onCancelEditing}
            >
              Cancel
            </button>
          </div>
        </form>
      </li>
    )
  }

  return (
    <li className="task-item">
      <div className="task-content">
        <button
          className={`complete-button ${
            task.completed ? 'completed' : ''
          }`}
          onClick={() => onToggleTask(task.id)}
        >
          {task.completed ? '✓' : ''}
        </button>

        <span
          className={`task-text ${
            task.completed ? 'completed-text' : ''
          }`}
        >
          {task.text}
        </span>
      </div>

      <div className="task-actions">
        <button
          className="edit-button"
          onClick={() => onStartEditing(task)}
        >
          Edit
        </button>

        <button
          className="delete-button"
          onClick={() => onDeleteTask(task.id)}
        >
          Delete
        </button>
      </div>
    </li>
  )
}

export default TaskItem
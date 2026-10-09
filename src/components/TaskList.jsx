import TaskItem from './TaskItem'

function TaskList({
  tasks,
  editingId,
  editingText,
  onEditingTextChange,
  onToggleTask,
  onDeleteTask,
  onStartEditing,
  onSaveEdit,
  onCancelEditing,
}) {
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">✓</div>

        <h3>No tasks found</h3>

        <p>Add a task above to start organizing your day.</p>
      </div>
    )
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          isEditing={editingId === task.id}
          editingText={editingText}
          onEditingTextChange={onEditingTextChange}
          onToggleTask={onToggleTask}
          onDeleteTask={onDeleteTask}
          onStartEditing={onStartEditing}
          onSaveEdit={onSaveEdit}
          onCancelEditing={onCancelEditing}
        />
      ))}
    </ul>
  )
}

export default TaskList
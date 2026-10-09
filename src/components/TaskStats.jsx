function TaskStats({
  totalTasks,
  activeTasks,
  completedTasks,
}) {
  return (
    <section className="stats">
      <div className="stat-card">
        <span className="stat-label">Total</span>
        <strong>{totalTasks}</strong>
      </div>

      <div className="stat-card">
        <span className="stat-label">Active</span>
        <strong>{activeTasks}</strong>
      </div>

      <div className="stat-card">
        <span className="stat-label">Completed</span>
        <strong>{completedTasks}</strong>
      </div>
    </section>
  )
}

export default TaskStats
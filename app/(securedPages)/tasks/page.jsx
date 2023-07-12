import TaskListsModal from '@/components/tasks/TaskListsModal'

const Tasks = () => {


  return (
    <div className=''>
      <div className="taskModalContainer flex">
        <TaskListsModal duration="daily" />
        <TaskListsModal duration="monthly" />
      </div>


    </div>
  )
}

export default Tasks

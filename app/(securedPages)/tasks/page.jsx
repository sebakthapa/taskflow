import TaskListsModal from '@/components/TaskListsModal'

const Tasks = () => {


  return (
    <div className=''>
      <h1 className='font-bold text-3xl ml-10 mt-10'>TASKS</h1>
      <div className="taskModalContainer flex">
        <TaskListsModal duration="daily" />
        <TaskListsModal duration="monthly" />
      </div>


    </div>
  )
}

export default Tasks

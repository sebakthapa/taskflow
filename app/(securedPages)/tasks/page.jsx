import { getDate, getDateth, getDayName, getMonthName } from '@/lib/date'
import React from 'react'
import { BsPlus } from 'react-icons/bs'

const page = () => {
  return (
    <div>
      <h1>TASKS</h1>
      <div className="title">
        <h2>Today's Tasks</h2>
        <p>{`${getDayName()}, ${getDateth()} ${getMonthName()} `}</p>
      </div>
      <div className="add-task text-">
        <div className="icon">
          <BsPlus />
        </div>
        <p className="text">
          New Task
        </p>
      </div>
      
    </div>
  )
}

export default page

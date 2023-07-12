import React from 'react'

const page = () => {
  return (
    <div>
      <div className="p-10">
        <div className="header">
          <h1 className="font-bold text-xl">This page is under development.</h1>
          <h2 className="font-bold text-sm">will be completed soon.</h2>
        </div>
        <ul className="mt-10 pl-3">
          <h2 className="pl-3 font-semibold mb-3">
            The page would have following features/components.
          </h2>
          <li className="list-disc ml-12 mt-2">List of your weekly workout plan and option to modify it.</li>
          <li className="list-disc ml-12 mt-2">Form to enter your daily workout progress</li>
          <li className="list-disc ml-12 mt-2">Visual representation of progress in your training goals.</li>
          <li className="list-disc ml-12 mt-2">Visual representation of your calories burnt and your workouts</li>


        </ul>
      </div>
      
    </div>
  )
}

export default page

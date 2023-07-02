import Image from 'next/image'
import Darkmode from "darkmode-js"

export default function Home() {


  return (
    <div className='p-10'>
      <h1>TASKFLOW</h1>
      <Image src="/taskflow-logo.png" width={100} height={50} />
      <button className='cyan_gradient _hover capitalize rounded py-3 px-5 text-gray-200 font-semibold'> Submit </button>
    </div>
  )
}

import BoxLoader from "@/components/BoxLoader"




const page = () => {
  
  return (
    <div className="p-10">
      <div className="header">
        <h1 className="font-bold text-xl">This page is under development.</h1>
        <h2 className="font-bold text-sm">will be completed soon.</h2>
      </div>
      <ul className="mt-10 pl-3">
        <h2 className="pl-3 font-semibold mb-3">
          The page would have following features/components.
        </h2>
        <li className="list-disc ml-12 mt-2">Graphical representation of personal and team budget with comparsion to past average data</li>
        <li className="list-disc ml-12 mt-2">Non interactive list of daily task and very close monthly task</li>
        <li className="list-disc ml-12 mt-2">Time date with a sweet message and an inspiring quote</li>

      </ul>
    </div>
  )
}

export default page

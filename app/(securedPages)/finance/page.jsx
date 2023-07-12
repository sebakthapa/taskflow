import FinanceListsModal from "@/components/finance/FinanceListsModal"

const page = () => {
  return (
    <div>
      <div className="financeModalContainer flex">
        {/* <FinanceListsModal type="personal" /> */}
        <div className="p-10">
        <div className="header">
          <h1 className="font-bold text-xl">This page is under development.</h1>
          <h2 className="font-bold text-sm">will be completed soon.</h2>
        </div>
        <ul className="mt-10 pl-3">
          <h2 className="pl-3 font-semibold mb-3">
            The page would have following features/components.
          </h2>
          <li className="list-disc ml-12 mt-2">List of your and your teams expenses and form to add, delete or modify it.</li>
          <li className="list-disc ml-12 mt-2">Visual representation of your expense and a contrast with your average expenses</li>
        </ul>
      </div>
      </div>
    </div>
  )
}

export default page

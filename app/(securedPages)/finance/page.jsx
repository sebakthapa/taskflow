import FinanceListsModal from "@/components/finance/FinanceListsModal"

const page = () => {
  return (
    <div>
      <div className="financeModalContainer flex">
        <FinanceListsModal type="personal" />
        
      </div>
    </div>
  )
}

export default page

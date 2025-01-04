import { useSelector, useDispatch } from "react-redux";
import { removeBill } from "../features/bills/billsSlice";
import AddBillModal from "./AddBillModal";
import FilterDropdown from "./FilterDropdown";
import { useState } from "react";
import EditBillModal from "./EditBillModal";
import TimeSeriesChart from "./TimeSeriesChart";

const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

function BillDashboard() {
  const dispatch = useDispatch();
  const allBills = useSelector((state) => state.bills.bills);
  const selectedCategory = useSelector((state) => state.bills.selectedCategory);

  const [editingBill, setEditingBill] = useState(null);

  const filteredBills =
    selectedCategory === "all"
      ? allBills
      : allBills.filter(
          (bill) =>
            bill.category.toLowerCase() === selectedCategory.toLowerCase()
        );

  const handleRemove = (id) => {
    dispatch(removeBill(id));
  };

  const handleEdit = (bill) => {
    setEditingBill(bill);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow p-4 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">
            Bills Dashboard
          </h2>
          <div className="flex gap-4">
            <FilterDropdown />
            <AddBillModal />
          </div>
        </div>
        <div className="hidden md:block">
          <table className="min-w-full bg-gray-100 rounded-lg overflow-hidden shadow-sm">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-3 px-4 text-left text-sm font-bold text-gray-700">
                  Description
                </th>
                <th className="py-3 px-4 text-left text-sm font-bold text-gray-700">
                  Category
                </th>
                <th className="py-3 px-4 text-left text-sm font-bold text-gray-700">
                  Amount
                </th>
                <th className="py-3 px-4 text-left text-sm font-bold text-gray-700">
                  Date
                </th>
                <th className="py-3 px-4 text-left text-sm font-bold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredBills.map((bill, index) => (
                <tr
                  key={bill.id}
                  className={`${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-gray-100`}
                >
                  <td className="py-3 px-4 text-sm text-gray-800">
                    {bill.description}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-800">
                    {bill.category}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-800">
                    ${bill.amount}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-800">
                    {formatDate(bill.date)}
                  </td>
                  <td className="py-3 px-4 text-sm flex gap-2">
                    <button
                      className="text-blue-500 hover:text-blue-600 font-semibold"
                      onClick={() => handleEdit(bill)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-500 hover:text-red-600 font-semibold"
                      onClick={() => handleRemove(bill.id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="md:hidden space-y-4">
          {filteredBills.map((bill) => (
            <div
              key={bill.id}
              className="bg-gray-100 rounded-lg shadow p-4 flex flex-col"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">
                  {bill.description}
                </h3>
                <div className="flex gap-2">
                  <button
                    className="text-blue-500 hover:text-blue-600 font-semibold text-sm"
                    onClick={() => handleEdit(bill)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-500 hover:text-red-600 font-semibold text-sm"
                    onClick={() => handleRemove(bill.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Category: {bill.category}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Amount: ${bill.amount}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Date: {formatDate(bill.date)}
              </p>
            </div>
          ))}
        </div>

        {editingBill && (
          <EditBillModal
            initialData={editingBill}
            onClose={() => setEditingBill(null)}
          />
        )}

        {filteredBills.length === 0 && (
          <div className="p-6 text-center text-gray-800">
            <p className="text-lg font-semibold">No bills found</p>
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow p-4 max-w-7xl mx-auto mt-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">
          Expense Overview
        </h3>
        <TimeSeriesChart />
      </div>
    </>
  );
}

export default BillDashboard;

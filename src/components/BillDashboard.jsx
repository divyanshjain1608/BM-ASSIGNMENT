import { useSelector, useDispatch } from "react-redux";
import { removeBill, setHighlightedBills } from "../features/bills/billsSlice";
import AddBillModal from "./AddBillModal";
import FilterDropdown from "./FilterDropdown";
import { useState, useEffect } from "react";
import EditBillModal from "./EditBillModal";
import TimeSeriesChart from "./TimeSeriesChart";
import { findMinimalSubset } from "../utils/SubsetCalc";

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
  const highlightedBills = useSelector((state) => state.bills.highlightedBills);
  const monthlyBudget = useSelector((state) => state.bills.monthlyBudget);
  const isBudgetExceeded = useSelector((state) => state.bills.isBudgetExceeded); // Add this line

  useEffect(() => {
    if (allBills.length > 0) {
      const subset = findMinimalSubset(allBills, monthlyBudget);
      dispatch(setHighlightedBills(subset));
    }
  }, [allBills, monthlyBudget, dispatch]);

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
      {/* Budget Alert Notification */}
      {isBudgetExceeded && (
        <div className="fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2 z-50">
          <span>⚠️</span>
          <span>Your expenses have exceeded the monthly budget!</span>
        </div>
      )}

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

        {/* Monthly Budget Display */}
        <div className="text-gray-800 mb-6">
          <p className="text-lg font-semibold">
            Monthly Budget: ₹{monthlyBudget}
          </p>
        </div>

        {/* Highlighted Bills Section */}
        <div className="bg-green-100 p-4 rounded-lg mb-6">
          <h3 className="text-lg font-bold text-green-700 mb-2">
            Bills to be Paid (Covered in Budget)
          </h3>
          {highlightedBills?.length > 0 ? (
            <ul className="list-disc pl-5 text-green-800">
              {allBills
                .filter((bill) => highlightedBills?.includes(bill.id))
                .map((bill) => (
                  <li key={bill.id}>
                    {bill.description}: ₹{bill.amount}
                  </li>
                ))}
            </ul>
          ) : (
            <p className="text-red-500">No bills fit within your budget.</p>
          )}
        </div>

        {/* Bills Table */}
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
                  Highlighted
                </th>
                <th className="py-3 px-4 text-left text-sm font-bold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredBills.map((bill, index) => {
                const isHighlighted = highlightedBills?.includes(bill.id);
                return (
                  <tr
                    key={bill.id}
                    className={`${
                      isHighlighted
                        ? "bg-green-200"
                        : index % 2 === 0
                        ? "bg-gray-50"
                        : "bg-white"
                    } hover:bg-gray-100`}
                  >
                    <td className="py-3 px-4 text-sm text-gray-800">
                      {bill.description}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-800">
                      {bill.category}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-800">
                      ₹{bill.amount}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-800">
                      {formatDate(bill.date)}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-800">
                      {isHighlighted ? "YES" : "NO"}
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
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile View */}
        <div className="md:hidden space-y-4">
          {filteredBills.map((bill) => {
            const isHighlighted = highlightedBills?.includes(bill.id);
            return (
              <div
                key={bill.id}
                className={`p-4 flex flex-col ${
                  isHighlighted ? "bg-green-200" : "bg-gray-100"
                } rounded-lg shadow`}
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
                  Amount: ₹{bill.amount}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Date: {formatDate(bill.date)}
                </p>
                <p className="text-sm font-bold mt-1">
                  Highlighted: {isHighlighted ? "YES" : "NO"}
                </p>
              </div>
            );
          })}
        </div>

        {editingBill && (
          <EditBillModal
            initialData={editingBill}
            onClose={() => setEditingBill(null)}
          />
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
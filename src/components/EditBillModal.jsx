import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { editBill } from "../features/bills/billsSlice";
import { CATEGORIES } from "../utils/constants";

function EditBillModal({ initialData = null, onClose }) {
  const dispatch = useDispatch();
  const [bill, setBill] = useState({
    description: "",
    category: CATEGORIES.slice(1)[0].value,
    amount: "",
    date: new Date().toISOString().split("T")[0],
  });

  const handleInputChange = (e) => {
    setBill({ ...bill, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log(bill);
    dispatch(editBill(bill));
    setBill({ description: "", category: "", amount: "", date: "" });
    onClose();
  };

  useEffect(() => {
    if (initialData) {
      setBill({
        ...initialData,
        date: new Date(initialData.date).toISOString().split("T")[0],
      });
    }
  }, [initialData]);

  return (
    <div>
      <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white w-full max-w-lg mx-4 md:mx-0 p-6 rounded-lg shadow-lg relative">
          <button
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            ✖
          </button>
          <h3 className="text-xl font-semibold text-gray-800 mb-6">Add Bill</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            className="space-y-4"
          >
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <input
                type="text"
                id="description"
                name="description"
                placeholder="Enter description"
                value={bill.description}
                onChange={handleInputChange}
                className="mt-1 block w-full border rounded-md px-3 py-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700"
              >
                Category
              </label>
              <select
                name="category"
                value={bill.category}
                onChange={handleInputChange}
                className="mt-1 block w-full border rounded-md px-3 py-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              >
                {CATEGORIES.slice(1).map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="amount"
                className="block text-sm font-medium text-gray-700"
              >
                Amount
              </label>
              <input
                type="number"
                id="amount"
                name="amount"
                placeholder="Enter amount"
                value={bill.amount}
                onChange={handleInputChange}
                className="mt-1 block w-full border rounded-md px-3 py-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="date"
                className="block text-sm font-medium text-gray-700"
              >
                Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={bill.date}
                onChange={handleInputChange}
                className="mt-1 block w-full border rounded-md px-3 py-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <button
                type="button"
                className="bg-gray-400 text-white px-4 py-2 rounded-lg shadow hover:bg-gray-500 transition"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 transition"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditBillModal;

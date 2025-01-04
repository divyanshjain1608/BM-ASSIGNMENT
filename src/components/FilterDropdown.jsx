import { useDispatch, useSelector } from "react-redux";
import { setCategory } from "../features/bills/billsSlice";
import { CATEGORIES } from "../utils/constants";

function FilterDropdown() {
  const dispatch = useDispatch();
  const selectedCategory = useSelector((state) => state.bills.selectedCategory);

  const handleCategoryChange = (e) => {
    dispatch(setCategory(e.target.value));
  };

  return (
    <div className="mb-4">
      <label
        htmlFor="category-filter"
        className="block mb-2 text-sm font-semibold text-gray-700"
      >
        Filter by Category:
      </label>
      <select
        id="category-filter"
        value={selectedCategory}
        onChange={handleCategoryChange}
        className="w-full md:w-64 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 bg-white text-gray-700"
      >
        {CATEGORIES.map((category, index) => (
          <option key={index} value={category.value}>
            {category.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default FilterDropdown;

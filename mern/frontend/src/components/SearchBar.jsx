import { FaSearch } from "react-icons/fa";

function SearchBar() {
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="flex items-center flex-grow bg-white border border-gray-300 rounded-full overflow-hidden shadow-sm"
    >
      {/* Category Dropdown */}
      <select
        className="px-4 py-4 text-l text-gray-700 bg-transparent focus:outline-none"
        defaultValue=""
      >
        <option value="" disabled>
          Search by Category
        </option>
        <option value="fashion">Fashion</option>
        <option value="electronics">Electronics & Accessories</option>
        <option value="digital">Digital Subscriptions</option>
      </select>

      {/* Divider */}
      <div className="h-6 border-l border-gray-300 mx-2"></div>

      {/* Input */}
      <input
        type="text"
        placeholder="What are you looking for?"
        className="flex-1 bg-transparent px-2 py-2 text-l placeholder-gray-600 focus:outline-none"
      />

      {/* Button */}
      <button
        type="submit"
        className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-5 h-7 rounded-full text-l font-semibold flex items-center gap-1 mr-2"
      >
        <FaSearch className="h-4 w-4" />
        Search
      </button>
    </form>
  );
}

export default SearchBar;

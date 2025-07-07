function SortDropdown() {
  return (
    <div className="relative">
      <select
        defaultValue="default"
        className="mx-2 px-4 py-4 border border-gray-300 rounded-full text-l focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option value="default" disabled>
          Sort by
        </option>
        <option value="priceLowToHigh">Price: Low to High</option>
        <option value="priceHighToLow">Price: High to Low</option>
      </select>
    </div>
  );
}

export default SortDropdown;

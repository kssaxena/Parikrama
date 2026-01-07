import Input from "../common/Input";

const LocationSearch = ({ onSearch }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4">
      <Input
        placeholder="Search starting location..."
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onSearch(e.target.value);
          }
        }}
      />
    </div>
  );
};

export default LocationSearch;

import { useState } from "react";
import PackageCard from "../../components/ui/PackageCard";
import mockPackages from "../../constants/Constants";
import InputBox from "../../components/InputBox";
import { CiSearch } from "react-icons/ci";

export default function PackagesListing() {
  const [searchQuery, setSearchQuery] = useState("");

  // Later replace this with API response
  const packages = mockPackages;

  // Function to filter packages based on search query
  const filterPackages = (data) => {
    if (!searchQuery) return data;
    return data.filter(
      (pkg) =>
        pkg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pkg.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pkg.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase()),
        ),
    );
  };

  return (
    <div className="md:py-12  px-6">
      <div className="max-w-7xl mx-auto space-y-14">
        {/* Search Bar */}
        <div className="flex justify-center items-center w-full relative">
          <InputBox
            Type="text"
            Placeholder="Search packages by title, location, or tags..."
            Value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <CiSearch className="absolute right-3 text-gray-500 text-xl hidden md:block" />
        </div>

        <Section
          title="🔥 Hot Deals"
          data={filterPackages(packages.hotDeals)}
        />
        <Section
          title="📈 Trending Deals"
          data={filterPackages(packages.trendingDeals)}
        />
        <Section
          title="⭐ Exclusive Deals"
          data={filterPackages(packages.exclusiveDeals)}
        />
      </div>
    </div>
  );
}

/* ---------- Section Wrapper ---------- */

function Section({ title, data }) {
  if (!data?.length) return null;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 border-l-4 border-[#FFC20E] pl-3">
        {title}
      </h2>
      {console.log(data)}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {data.map((pkg) => (
          <PackageCard key={pkg.id} data={pkg} />
        ))}
      </div>
    </div>
  );
}

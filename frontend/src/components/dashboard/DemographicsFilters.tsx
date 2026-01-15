import type { DemographicsFiltersProps } from "../../types/dashboard";

const DemographicsFilters = ({
  ageGroup,
  gender,
  onFilterChange,
}: DemographicsFiltersProps) => {
  return (
    <div className="space-y-4">
      <select
        className="w-full bg-zinc-900 p-2 rounded border border-zinc-800 text-sm"
        value={ageGroup}
        onChange={(e) => onFilterChange("ageGroup", e.target.value)}
      >
        <option value="">Select Age Group</option>
        <option value="<18">&lt; 18</option>
        <option value="18-40">18 - 40</option>
        <option value=">40">&gt; 40</option>
      </select>

      <select
        className="w-full bg-zinc-900 p-2 rounded border border-zinc-800 text-sm"
        value={gender}
        onChange={(e) => onFilterChange("gender", e.target.value)}
      >
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
    </div>
  );
};

export default DemographicsFilters;

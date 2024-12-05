function convertToSlug(str: string) {
  return String(str)
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}
const FilterComponent = ({
  title,
  arrayFilterItem,
}: {
  title: string;
  arrayFilterItem: string[];
}) => {
  const listFilter: {
    category: string[];
  } = {
    category: [],
  };

  const handleFilterCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valueChecked = e.target.value;
    if (e.target.checked) {
      listFilter.category = [...listFilter.category, valueChecked];
    } else {
    }
  };
  return (
    <div className="w-full flex flex-col">
      <h6 className="text-normal font-semibold capitalize ">{title}</h6>
      <div className="filter_component">
        {arrayFilterItem.map((item, index) => (
          <div key={index} className="filter_item">
            <div className="py-2 text-small font-normal">
              <input
                type="checkbox"
                id={convertToSlug(item)}
                value={convertToSlug(item)}
                onChange={handleFilterCategory}
                className="hover:cursor-pointer"
              />
              <label
                htmlFor={convertToSlug(item)}
                className="ml-2 select-none font-light lg:font-normal capitalize cursor-pointer transition-all duration-300 hover:cursor-pointer"
              >
                {item}
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default FilterComponent;

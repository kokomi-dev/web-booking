import { useState, useCallback } from "react";

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
  const [listFilter, setListFilter] = useState<string[]>([]);

  const handleFilterCategory = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const valueChecked = e.target.value;
      setListFilter((prev) =>
        e.target.checked
          ? [...prev, valueChecked]
          : prev.filter((item) => item !== valueChecked)
      );
    },
    []
  );

  return (
    <div className="w-full flex flex-col">
      <h6 className="text-small font-medium capitalize">{title}</h6>
      <div className="filter_component">
        {arrayFilterItem.map((item) => {
          const slug = convertToSlug(item);
          return (
            <div key={slug} className="filter_item">
              <div className="py-2 text-small font-normal">
                <input
                  type="checkbox"
                  id={slug}
                  value={slug}
                  onChange={handleFilterCategory}
                  className="hover:cursor-pointer"
                />
                <label
                  htmlFor={slug}
                  className="ml-2 select-none font-light lg:font-normal capitalize cursor-pointer transition-all duration-300 hover:cursor-pointer"
                >
                  {item}
                </label>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FilterComponent;

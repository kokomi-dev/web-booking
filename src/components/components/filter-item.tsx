type FilterItem = {
  label: string;
  value: string;
};

type Filter = Record<string, string | undefined>;

type FilterComponentProps = {
  title: string;
  arrayFilterItem: FilterItem[];
  filter: any;
  filterKey: string; // Đảm bảo key luôn là string
  setFilter: any;
};

const FilterComponent: React.FC<FilterComponentProps> = ({
  title,
  arrayFilterItem,
  setFilter,
  filter,
  filterKey,
}) => {
  return (
    <div className="w-full flex flex-col">
      <h6 className="text-small font-medium capitalize mb-2">{title}</h6>

      <div className="filter_component space-y-2">
        {arrayFilterItem.map((item, index) => {
          const inputId = `filter-${filterKey}-${index}`;
          const isChecked = filter[filterKey] === item.value;

          return (
            <div key={index} className="flex items-center space-x-3">
              <input
                type="radio"
                id={inputId}
                name={filterKey}
                value={item.value}
                checked={isChecked}
                onChange={() =>
                  setFilter((prev: any) => ({
                    ...prev,
                    [filterKey]: item.value,
                  }))
                }
                className="hidden"
              />
              <label
                htmlFor={inputId}
                className={`w-5 h-5 border-1 rounded-md cursor-pointer ${
                  isChecked
                    ? "bg-bg_primary_main border-blue_main"
                    : "border-blue_main"
                }`}
              />
              <label
                htmlFor={inputId}
                className="text-small font-normal text-black_main_blur cursor-pointer first-letter:uppercase"
              >
                {item.label}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FilterComponent;

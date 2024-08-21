// "use client";
// import React from "react";
// import { Button } from "@/components/ui/button";
// import ItemSearchResult from "@/components/components/item-search-result";
// function convertToSlug(str: string) {
//   return String(str)
//     .normalize("NFKD") // split accented characters into their base characters and diacritical marks
//     .replace(/[\u0300-\u036f]/g, "") // remove all the accents, which happen to be all in the \u03xx UNICODE block.
//     .trim() // trim leading or trailing whitespace
//     .toLowerCase() // convert to lowercase
//     .replace(/[^a-z0-9 -]/g, "") // remove non-alphanumeric characters
//     .replace(/\s+/g, "-") // replace spaces with hyphens
//     .replace(/-+/g, "-"); // remove consecutive hyphens
// }

// const FilterComponent = ({
//   title,
//   arrayFilterItem,
// }: {
//   title: string;
//   arrayFilterItem: string[];
// }) => {
//   // get  list filter tour
//   const listFilter: {
//     category: string[];
//   } = {
//     category: [],
//   };

//   const handleFilterCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const valueChecked = e.target.value;
//     if (e.target.checked) {
//       listFilter.category = [...listFilter.category, valueChecked];
//       console.log(listFilter);
//     } else {
//       console.log(listFilter.category.includes(valueChecked));
//     }
//   };
//   return (
//     <>
//       <h6 className=" title_small ">{title}</h6>
//       <div className="filter_component">
//         {arrayFilterItem.map((item, index) => (
//           <div key={index} className="filter_item">
//             <Button variant="ghost">
//               <input
//                 type="checkbox"
//                 id={convertToSlug(item)}
//                 value={convertToSlug(item)}
//                 onChange={handleFilterCategory}
//               />
//               <label
//                 htmlFor={convertToSlug(item)}
//                 className="ml-2 capitalize cursor-pointer transition-all duration-300"
//               >
//                 {item}
//               </label>
//             </Button>
//           </div>
//         ))}
//       </div>
//     </>
//   );
// };

// const filter1 = [
//   "tour",
//   "thiên nhiên và ngoài trời",
//   "bảo tàng nghệ thuật văn hóa",
//   "hoạt động giải trí, vé",
//   "ăn uống",
//   "dịch vụ & cho thuê",
// ];
// const filter2 = [
//   "0 - 400.000",
//   "400.000 - 1.000.000",
//   "1.000.000 - 3.000.000",
//   " trên 3 triệu",
// ];
// const filter3 = [
//   "từ 4.5 trở lên",
//   "từ 4 trở lên",
//   "từ 3.5 trở lên",
//   "từ 3 trở lên",
// ];

// const ShowResult = async () => {
//   const searchParams = useSearchParams();
//   const search = searchParams.get("address");
//   const data = await fechData(search);
//   return (
//     <div className="main_result px-20 mt-5">
//       {/* head */}
//       <h3 className="title_large">Địa điểm tham quan ở {search}</h3>
//       <h6 className="title_small">Có {data.length} kết quả</h6>
//       {/* main */}
//       <div className="main_result_filter grid grid-cols-1 md:grid-cols-layout-3 gap-5">
//         {/* filter tour */}
//         <div className="filter_component border_div_card">
//           <h3 className="title_medium border-b-[0.8px] border-[#c3c2c2]">
//             Lọc theo
//           </h3>
//           <FilterComponent title="hạng mục" arrayFilterItem={filter1} />
//           <FilterComponent title="giá" arrayFilterItem={filter2} />
//           <FilterComponent title="điểm đánh giá" arrayFilterItem={filter3} />
//         </div>
//         {/* show result */}
//         <div className="show_result_component w-full h-full flex  flex-col items-center justify-start gap-y-3">
//           {data?.map((tour, index) => {
//             return (
//               <ItemSearchResult
//                 slug={tour.slug}
//                 name={tour.name}
//                 images={tour.images[0]}
//                 price={tour.price[0]}
//                 route="tours"
//                 location={tour.location}
//                 description={tour.description}
//                 ratingsQuantity={tour.ratingsQuantity}
//               />
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ShowResult;

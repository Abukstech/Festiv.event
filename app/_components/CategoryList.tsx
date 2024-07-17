// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import React from "react";

// const categories = [
//   "All Categories",
//   "Music Concert",
//   "Tech/Technology",
//   "NGO",
// ];

// const CategoryFilter = ({ category, setCategory, date, setDate }: any) => {
//   return (

//       <div className="flex flex-row gap-4 w-full items-center border-b pb-4 justify-center my-4">
//         <div className="relative ">
//           <input
//             placeholder="Search"
//             className="w-[532px] py-2 px-4 rounded-full border  bg-secondary "
//           />
//         </div>
//         <div className="flex justify-between gap-3">
//           {categories.map((cat) => (
//             <Button
//             variant={category === cat? "default" : "secondary"
//             }
//               key={cat}
//               onClick={() => setCategory(cat)}
//               className={`px-4 py-2 mr-2 rounded-[99px] `}
//             >
//               {cat}
//             </Button>
//           ))}
//         </div>
//       </div>
// );
// };

// export default CategoryFilter;

// {/* <div className="relative mt-4 ]">
//   <input
//     type="date"
//     value={date}
//     onChange={(e) => setDate(e.target.value)}
//     className="bg-[#F5F4F4] py-3 px-4 rounded-[99px] border w-[95%] ml-5"
//   />
// </div> */}
import { Button } from "@/components/ui/button";
import React from "react";

const categories = [
  "All Categories",
  "Music Concert",
  "Tech/Technology",
  "NGO",
];

const CategoryFilter = ({
  category,
  setCategory,
  date,
  setDate,
  searchQuery,
  setSearchQuery,
}: any) => {
  return (
    <div className="flex flex-col md:flex-row items-center my-4 w-full justify-center">
      <div className="relative w-full md:w-auto flex justify-center md:justify-start">
      <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by Event Name"
          className="w-full md:w-[532px] py-2 px-4 rounded-full border bg-secondary"
        />
      </div>
      <div className="flex gap-3 mt-4 md:mt-0 overflow-x-auto w-full md:w-auto md:ml-4">
        {categories.map((cat) => (
          <Button
            variant={category === cat ? "default" : "secondary"}
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-2 rounded-[99px] whitespace-nowrap`}
          >
            {cat}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;

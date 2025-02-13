import React, { useState } from "react";

interface TableProps {
  data: { [key: string]: string | number }[];
}

const Table: React.FC<TableProps> = ({ data }) => {
  const [page, setPage] = useState(1);
  const perPage = 10;

  // Data show for page
  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;
  const pagedData = data.slice(startIndex, endIndex);

  const headers = data.length > 0 ? Object.keys(data[0]) : [];

  const totalPages = Math.ceil(data.length / perPage);

  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  return (
    <div className="w-full overflow-hidden">
      <table className="border-collapse border w-full table-auto text-center text-xs sm:text-sm md:text-base">
        <thead>
          <tr className="bg-blue-700 text-white">
            {headers.map((header, index) => (
              <th
                key={header}
                className={`border p-1 sm:p-2 ${index === 0 ? "w-1/6" : "w-1/5"
                  }`} // กำหนดขนาดคอลัมน์
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {pagedData.map((row, index) => (
            <tr key={index} className="bg-transparent text-white">
              {headers.map((header, colIndex) => (
                <td
                  key={header}
                  className={`border p-1 sm:p-2 ${colIndex === 0 ? "w-1/6" : "w-1/5"
                    }`} // กำหนดขนาดคอลัมน์
                >
                  {row[header]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* pages */}
      <div className="flex justify-end mt-1">
        <button
          onClick={handlePrevPage}
          disabled={page === 1}
          className="px-4 py-2 text-white rounded disabled:bg-transparent"
        >
          Back
        </button>
        <span className="flex items-center">
          {page} / {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={page === totalPages}
          className="px-4 py-2  text-white rounded disabled:bg-transparent"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Table;

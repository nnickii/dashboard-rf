import React from "react";

interface TableProps {
  data: { [key: string]: string | number }[];
}

const Table: React.FC<TableProps> = ({ data }) => {
  const headers = data.length > 0 ? Object.keys(data[0]) : [];

  return (
    <div className="w-full overflow-hidden">
      <table className="border-collapse border w-full table-auto text-center text-xs sm:text-sm md:text-base">
        <thead>
          <tr className="bg-blue-700 text-white">
            {headers.map((header, index) => (
              <th
                key={header}
                className={`border p-1 sm:p-2 ${
                  index === 0 ? "w-1/6" : "w-1/5"
                }`} // กำหนดขนาดคอลัมน์
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} className="bg-transparent text-white">
              {headers.map((header, colIndex) => (
                <td
                  key={header}
                  className={`border p-1 sm:p-2 ${
                    colIndex === 0 ? "w-1/6" : "w-1/5"
                  }`} // กำหนดขนาดคอลัมน์
                >
                  {row[header]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;

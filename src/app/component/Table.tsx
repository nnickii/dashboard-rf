import React from "react";

interface TableProps {
  data: { [key: string]: string | number }[];
}

const Table: React.FC<TableProps> = ({ data }) => {
  const headers = data.length > 0 ? Object.keys(data[0]) : [];

  return (
    <table className="border-collapse border w-full text-center">
      <thead>
        <tr className="bg-blue-700 text-white">
          {headers.map((header) => (
            <th key={header} className="border p-2">{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index} className="bg-transparent text-white">
            {headers.map((header) => (
              <td key={header} className="border p-2">{row[header]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;

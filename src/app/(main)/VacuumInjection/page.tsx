"use client";

import React, { useState, useEffect } from "react";
import Title from "@/app/component/Title";
import Table from "@/app/component/Table";
import tempData from "@/config/tempData2.json";

export default function Home() {
  const [data, setData] = useState<{ [key: string]: string | number }[]>([]);

  useEffect(() => {
    const totalRow: { [key: string]: string | number } = { No: "Total" };
    const keys = Object.keys(tempData[0]).filter(key => key !== "No");

    keys.forEach(key => {
      totalRow[key] = tempData.reduce((sum, row) => sum + row[key], 0);
    });

    setData([totalRow, ...tempData]);
  }, []);

  return (
    <main>
      <div className="p-10 min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/assets/images/mainbg.png')" }}>
        <Title title="Vacuum, Injection" />
        <div className="flex mt-4">
          <div className="w-full overflow-x-auto">
            {data.length > 0 ? <Table data={data} /> : <p>Loading...</p>}
          </div>
        </div>
      </div>
    </main>
  );
}

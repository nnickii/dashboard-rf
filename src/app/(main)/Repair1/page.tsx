"use client";

import React, { useState, useEffect } from "react";
import Title from "@/app/component/Title";
import Table from "@/app/component/Table";
import Chart from "@/app/component/Chart";
import tempData from "@/config/tempData1.json";

export default function Home() {
  const [data, setData] = useState<{ [key: string]: string | number }[]>([]);
  const [chartData, setChartData] = useState<{ name: string; value: number }[]>([]);

  useEffect(() => {
    if (tempData.length === 0) return;

    const totalRow: { [key: string]: string | number } = { No: "Total" };
    const keys = Object.keys(tempData[0]).filter((key) => key !== "No");

    keys.forEach((key) => {
      totalRow[key] = tempData.reduce((sum, row) => sum + Number(row[key] || 0), 0);
    });

    setData([totalRow, ...tempData]);

    setChartData([
      { name: "Failure 1", value: 40 },
      { name: "Failure 2", value: 30 },
      { name: "Failure 3", value: 15 },
      { name: "Failure 4", value: 10 },
      { name: "Failure 5", value: 5 },
    ]);
  }, []);

  return (
    <main>
      <div
        className="p-10 min-h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/images/mainbg.png')" }}
      >
        <Title title="Repair 1: System" />
        <div className="flex flex-col lg:flex-row mt-6 gap-4">
          <div className="lg:w-3/4 w-full overflow-x-auto bg-white p-4 rounded-lg shadow-lg">
            {data.length > 0 ? <Table data={data} /> : <p>Loading...</p>}
          </div>
          <div className="lg:w-1/4 w-full flex justify-center items-center bg-white p-4 rounded-lg shadow-lg">
            <Chart title="Failure Breakdown" data={chartData} />
          </div>
        </div>
      </div>
    </main>
  );
}

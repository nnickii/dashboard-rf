"use client";

import React, { useState, useEffect } from "react";
import Title from "@/app/component/Title";
import Table from "@/app/component/Table";
import dynamic from "next/dynamic";
import tempData from "@/config/tempData1.json";

const Chart = dynamic(() => import("@/app/component/Chart"), { ssr: false });

export default function Home() {
  const [data, setData] = useState<{ [key: string]: string | number }[]>([]);
  const [chartData, setChartData] = useState<{ name: string; value: number }[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); 

    if (tempData.length === 0) return;

    const totalQuantity = tempData.reduce((acc, row) => acc + (Number(row["Defective Quantity"]) || 0), 0);

    const chartDataFromTable = tempData.map((row) => {
      const defectiveQuantity = Number(row["Defective Quantity"]) || 0;
      const percentage = totalQuantity > 0 ? (defectiveQuantity / totalQuantity) * 100 : 0;

      return {
        name: row.No.toString(),
        value: percentage,
      };
    });

    setChartData(chartDataFromTable);
    setData(tempData);
  }, []); 

  return (
    <main>
      <div
        className="p-4 md:p-5 min-h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/images/mainbg.png')" }}
      >
        <Title title="Repair 1: System" />
        <div className="flex flex-col lg:flex-row mt-4 gap-4">
          <div className="lg:w-4/5 w-full overflow-x-auto p-4 rounded-lg shadow-lg ">
            {data.length > 0 ? <Table data={data} /> : <p className="text-gray-500">Loading...</p>}
          </div>
          <div className="lg:w-1/3 w-full flex justify-center items-center p-0 rounded-lg shadow-lg">
            {isClient && <Chart title="" data={chartData} />}
          </div>
        </div>
      </div>
    </main>
  );
}

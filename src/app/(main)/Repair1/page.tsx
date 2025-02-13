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

    const allKeys = Object.keys(tempData[0]);
    const malfunctionKeys = allKeys.filter((key) => key.startsWith("Failure or Malfunction n"));

    const totalRow: Record<string, number | string> = { No: "Total" };
    allKeys.forEach((key) => {
      if (key !== "No") {
        totalRow[key] = tempData.reduce((sum, row) => {
          if (typeof row[key] === "number") {
            return sum + row[key];
          }
          return sum;
        }, 0);
      }
    });


    const tableData = [totalRow, ...tempData];
    setData(tableData);


    const repairQuantity = totalRow["Repair Quantity"] as number || 0;
    const calculatedChartData = malfunctionKeys.map((key) => ({
      name: key,
      value: totalRow[key] && repairQuantity > 0 
        ? parseFloat(((repairQuantity / (totalRow[key] as number)) * 100).toFixed(2))
        : 0,
    }));

    setChartData(calculatedChartData);
  }, []);

  return (
    <main>
      <div
        className="p-4 md:p-5 min-h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/images/mainbg.png')" }}
      >
        <Title title="Repair 1: System" />
        <div className="flex flex-col lg:flex-row mt-4 gap-4">
          <div className="lg:w-4/5 w-full overflow-x-auto p-4 rounded-lg shadow-lg">
            {data.length > 0 ? <Table data={data} /> : <p className="text-gray-500">Loading...</p>}
          </div>
          <div className="lg:w-1/3 w-full flex justify-center items-center p-4 rounded-lg shadow-lg">
            {isClient && (
              <Chart
                title=""
                data={chartData}
                tooltipFormatter={(value) => `${value.toFixed(2)}%`} 
              />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

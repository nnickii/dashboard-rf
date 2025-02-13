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

    // คำนวณ total row
    const totalRow: any = { No: "Total" };
    const keys = Object.keys(tempData[0]).filter(key => key !== "No");

    keys.forEach(key => {
      totalRow[key] = tempData.reduce((sum, row) => {
        if (typeof row[key] === "number") {
          return sum + (row[key] as number);
        }
        return sum;
      }, 0);
    });

    // เตรียมข้อมูลตาราง
    const tableData = [totalRow, ...tempData];
    setData(tableData);

    // ใช้ totalRow เป็นข้อมูลของ Chart
    const chartDataFromTotal = keys.slice(1).map((key) => ({
      name: key, // ใช้ชื่อ Header ของแต่ละคอลัมน์
      value: Number(totalRow[key]) || 0, // แสดงค่าผลรวมจริง
    }));

    setChartData(chartDataFromTotal);
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
            {isClient && <Chart title="Total Breakdown" data={chartData} />}
          </div>
        </div>
      </div>
    </main>
  );
}

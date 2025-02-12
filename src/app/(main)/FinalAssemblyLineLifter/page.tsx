"use client";

import React, { useState, useEffect } from "react";
import Title from "@/app/component/Title";
import Table from "@/app/component/Table";
import Card from "@/app/component/Card";
import tempData from "@/config/tempData.json";

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
      <div
        className="p-4 md:p-10 min-h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/images/mainbg.png')" }}
      >
        <Title title="Final Assembly Line Lifter: Cabinet Post-foaming Storage" />
        <div className="flex flex-col md:flex-row mt-6 gap-4">
          {/* ตาราง */}
          <div className="w-full md:w-3/4">
            {data.length > 0 ? <Table data={data} /> : <p>Loading...</p>}
          </div>
          {/* การ์ด */}
          <div className="w-full md:w-2/5 flex justify-center md:justify-end items-center">
            <Card title="Warehouse Outbound SortingDynamicStorage Location InformationCCTV for video monitoring" />
          </div>
        </div>
      </div>
    </main>
  );
}

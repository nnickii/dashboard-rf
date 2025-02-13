"use client";

import React, { useState, useEffect } from "react";
import Title from "@/app/component/Title";
import Table from "@/app/component/Table";
import Card from "@/app/component/Card";
import tempData from "@/config/tempData.json";

interface DataRow {
  No: string;
  [key: string]: string | number;
}

export default function Home() {
  const [data, setData] = useState<DataRow[]>([]);

  useEffect(() => {
    if (tempData.length === 0) return;

    const totalRow: DataRow = { No: "Total" };
    const keys = Object.keys(tempData[0]).filter(
      key => key !== "No"
    ) as (keyof typeof tempData[number])[];

    keys.forEach(key => {
      totalRow[key] = tempData.reduce((sum, row) => {
        if (typeof row[key] === "number") {
          return sum + (row[key] as number);
        }
        return sum;
      }, 0).toString();
    });

    setData([totalRow, ...tempData]);
  }, []);


  return (
    <main>
      <div
        className="p-4 md:p-5 min-h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/images/mainbg.png')" }}
      >
        <Title title="Final Assembly Line Lifter: Cabinet Post-foaming Storage" />
        <div className="flex flex-col md:flex-row mt-4 gap-4">
          {/* Table*/}
          <div className="w-full md:w-3/4">
            {data.length > 0 ? <Table data={data} /> : <p>Loading...</p>}
          </div>
          {/* Card */}
          <div className="w-full md:w-2/5 flex justify-center md:justify-end items-center">
            <Card title="Warehouse Outbound SortingDynamicStorage Location InformationCCTV for video monitoring" />
          </div>
        </div>
      </div>
    </main>
  );
}

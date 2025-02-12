'use client';

import Link from 'next/link';

type linkListType = {
  url: string;
  name: string;
};

export default function Home() {
  const defaultStartDate = new Date();
  defaultStartDate.setDate(defaultStartDate.getDate() - 30);
  const linkList: linkListType[] = [
    { url: "/InnerLinerPre-assembly", name: "Inner Liner Pre-assembly" },
    { url: "/BufferStorageofBeforeFoaming", name: "Buffer Storage of Before Foaming" },
    { url: "/FinalAssemblyLineScanning", name: "Final Assembly Line Scanning" },
    { url: "/FinalAssemblyLineLifter", name: "Final Assembly Line Lifter" },
    { url: "/VacuumInjection", name: "Vacuum、Injection" },
    { url: "/Repair1", name: "Repair 1 System" },
    { url: "/FirstPassYield", name: "First Pass Yield" },
    
  ];
  return (
    <main className="bg-[url('/assets/images/mainbg.png')] bg-cover aspect-auto w-full h-screen text-white">
      <ul className="flex flex-col space-x-1 font-bold block">
        {linkList.map(({ url, name }) => (
          <LinkItem url={url} name={name} key={url} />
        ))}
      </ul>
    </main>
  );
}

function LinkItem({ url, name }: linkListType) {
  return (
    <li>
      <Link href={url}>{name}</Link>
    </li>
  );
}

"use client";

import { Employee, WorkRecord } from "@/types";

interface Props {
  records: WorkRecord[];
  employees: Employee[];
  year: number;
  month: number;
  onDelete: (id: string) => void;
}

export default function WorkRecordList({
  records,
  employees,
  year,
  month,
  onDelete,
}: Props) {
  const filtered = records
    .filter((r) => {
      const d = new Date(r.date + "T00:00:00");
      return d.getFullYear() === year && d.getMonth() + 1 === month;
    })
    .sort((a, b) => {
      const dateCompare = a.date.localeCompare(b.date);
      if (dateCompare !== 0) return dateCompare;
      return a.startTime.localeCompare(b.startTime);
    });

  const getEmployeeName = (id: string) =>
    employees.find((e) => e.id === id)?.name ?? "알 수 없음";

  if (filtered.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-4 mb-6 text-center text-gray-400 text-sm">
        이번 달 근무 기록이 없습니다.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      <h2 className="text-lg font-semibold mb-3">
        근무 기록 ({year}년 {month}월)
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 text-left text-gray-500">
              <th className="pb-2 pr-4">날짜</th>
              <th className="pb-2 pr-4">직원</th>
              <th className="pb-2 pr-4">출근</th>
              <th className="pb-2 pr-4">퇴근</th>
              <th className="pb-2 pr-4">시간</th>
              <th className="pb-2"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
              <tr key={r.id} className="border-b border-gray-100">
                <td className="py-2 pr-4">{r.date}</td>
                <td className="py-2 pr-4 font-medium">
                  {getEmployeeName(r.employeeId)}
                </td>
                <td className="py-2 pr-4">{r.startTime}</td>
                <td className="py-2 pr-4">{r.endTime}</td>
                <td className="py-2 pr-4">{r.hoursWorked}h</td>
                <td className="py-2 text-right">
                  <button
                    onClick={() => onDelete(r.id)}
                    className="text-red-500 hover:text-red-700 text-xs"
                  >
                    삭제
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

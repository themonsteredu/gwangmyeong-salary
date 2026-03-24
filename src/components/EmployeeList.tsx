"use client";

import { Employee } from "@/types";

interface Props {
  employees: Employee[];
  onDelete: (id: string) => void;
}

export default function EmployeeList({ employees, onDelete }: Props) {
  if (employees.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-4 mb-6 text-center text-gray-400 text-sm">
        등록된 직원이 없습니다.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      <h2 className="text-lg font-semibold mb-3">직원 목록</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 text-left text-gray-500">
              <th className="pb-2 pr-4">이름</th>
              <th className="pb-2 pr-4">근무 형태</th>
              <th className="pb-2 pr-4">시급/일급</th>
              <th className="pb-2"></th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id} className="border-b border-gray-100">
                <td className="py-2 pr-4 font-medium">{emp.name}</td>
                <td className="py-2 pr-4">
                  <span
                    className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
                      emp.payType === "hourly"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {emp.payType === "hourly" ? "시급제" : "일급제"}
                  </span>
                </td>
                <td className="py-2 pr-4">
                  {emp.hourlyWage.toLocaleString()}원
                </td>
                <td className="py-2 text-right">
                  <button
                    onClick={() => onDelete(emp.id)}
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

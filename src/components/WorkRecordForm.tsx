"use client";

import { useState } from "react";
import { Employee } from "@/types";

interface Props {
  employees: Employee[];
  onAdd: (record: {
    employeeId: string;
    date: string;
    hoursWorked: number;
  }) => void;
}

const HOUR_OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export default function WorkRecordForm({ employees, onAdd }: Props) {
  const today = new Date().toISOString().split("T")[0];
  const [employeeId, setEmployeeId] = useState("");
  const [date, setDate] = useState(today);
  const [hoursWorked, setHoursWorked] = useState(8);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!employeeId || !date) return;
    onAdd({ employeeId, date, hoursWorked });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-4 mb-6">
      <h2 className="text-lg font-semibold mb-3">근무 기록 입력</h2>
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        <select
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">직원 선택</option>
          {employees.map((emp) => (
            <option key={emp.id} value={emp.id}>
              {emp.name}
            </option>
          ))}
        </select>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <select
          value={hoursWorked}
          onChange={(e) => setHoursWorked(Number(e.target.value))}
          className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {HOUR_OPTIONS.map((h) => (
            <option key={h} value={h}>
              {h}시간
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="bg-green-600 text-white rounded-md px-4 py-2 text-sm font-medium hover:bg-green-700 transition"
        >
          기록 추가
        </button>
      </div>
    </form>
  );
}

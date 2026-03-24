"use client";

import { useState } from "react";
import { Employee } from "@/types";
import { calculateHoursWorked } from "@/lib/salary";

interface Props {
  employees: Employee[];
  onAdd: (record: {
    employeeId: string;
    date: string;
    startTime: string;
    endTime: string;
    hoursWorked: number;
  }) => void;
}

export default function WorkRecordForm({ employees, onAdd }: Props) {
  const today = new Date().toISOString().split("T")[0];
  const [employeeId, setEmployeeId] = useState("");
  const [date, setDate] = useState(today);
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("18:00");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!employeeId || !date || !startTime || !endTime) return;
    const hoursWorked = calculateHoursWorked(startTime, endTime);
    onAdd({ employeeId, date, startTime, endTime, hoursWorked });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-4 mb-6">
      <h2 className="text-lg font-semibold mb-3">근무 기록 입력</h2>
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
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
        <input
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button
          type="submit"
          className="bg-green-600 text-white rounded-md px-4 py-2 text-sm font-medium hover:bg-green-700 transition"
        >
          기록 추가
        </button>
      </div>
      {startTime && endTime && (
        <p className="text-xs text-gray-400 mt-2">
          근무 시간: {calculateHoursWorked(startTime, endTime)}시간
        </p>
      )}
    </form>
  );
}

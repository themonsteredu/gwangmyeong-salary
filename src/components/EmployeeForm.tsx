"use client";

import { useState } from "react";
import { Employee } from "@/types";

interface Props {
  onAdd: (employee: Omit<Employee, "id">) => void;
}

export default function EmployeeForm({ onAdd }: Props) {
  const [name, setName] = useState("");
  const [wage, setWage] = useState("");
  const [payType, setPayType] = useState<"hourly" | "daily">("hourly");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !wage) return;
    onAdd({
      name: name.trim(),
      hourlyWage: Number(wage),
      payType,
    });
    setName("");
    setWage("");
    setPayType("hourly");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-4 mb-6">
      <h2 className="text-lg font-semibold mb-3">직원 등록</h2>
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        <input
          type="text"
          placeholder="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <select
          value={payType}
          onChange={(e) => setPayType(e.target.value as "hourly" | "daily")}
          className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="hourly">시급제</option>
          <option value="daily">일급제</option>
        </select>
        <input
          type="number"
          placeholder={payType === "hourly" ? "시급 (원)" : "일급 (원)"}
          value={wage}
          onChange={(e) => setWage(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          min="0"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white rounded-md px-4 py-2 text-sm font-medium hover:bg-blue-700 transition"
        >
          등록
        </button>
      </div>
    </form>
  );
}

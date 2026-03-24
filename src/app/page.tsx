"use client";

import { useState, useEffect } from "react";
import { Employee, WorkRecord } from "@/types";
import {
  getEmployees,
  saveEmployees,
  getWorkRecords,
  saveWorkRecords,
} from "@/lib/storage";
import EmployeeForm from "@/components/EmployeeForm";
import EmployeeList from "@/components/EmployeeList";
import WorkRecordForm from "@/components/WorkRecordForm";
import WorkRecordList from "@/components/WorkRecordList";
import MonthlySummaryView from "@/components/MonthlySummaryView";

export default function Home() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [records, setRecords] = useState<WorkRecord[]>([]);
  const [loaded, setLoaded] = useState(false);

  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth() + 1);

  useEffect(() => {
    setEmployees(getEmployees());
    setRecords(getWorkRecords());
    setLoaded(true);
  }, []);

  const addEmployee = (emp: Omit<Employee, "id">) => {
    const newEmp: Employee = { ...emp, id: crypto.randomUUID() };
    const updated = [...employees, newEmp];
    setEmployees(updated);
    saveEmployees(updated);
  };

  const deleteEmployee = (id: string) => {
    const updated = employees.filter((e) => e.id !== id);
    setEmployees(updated);
    saveEmployees(updated);
    // 해당 직원의 근무 기록도 삭제
    const updatedRecords = records.filter((r) => r.employeeId !== id);
    setRecords(updatedRecords);
    saveWorkRecords(updatedRecords);
  };

  const addWorkRecord = (record: Omit<WorkRecord, "id">) => {
    const newRecord: WorkRecord = { ...record, id: crypto.randomUUID() };
    const updated = [...records, newRecord];
    setRecords(updated);
    saveWorkRecords(updated);
  };

  const deleteWorkRecord = (id: string) => {
    const updated = records.filter((r) => r.id !== id);
    setRecords(updated);
    saveWorkRecords(updated);
  };

  const changeMonth = (delta: number) => {
    let newMonth = month + delta;
    let newYear = year;
    if (newMonth < 1) {
      newMonth = 12;
      newYear--;
    } else if (newMonth > 12) {
      newMonth = 1;
      newYear++;
    }
    setYear(newYear);
    setMonth(newMonth);
  };

  if (!loaded) {
    return (
      <div className="text-center text-gray-400 py-20">불러오는 중...</div>
    );
  }

  return (
    <div>
      <EmployeeForm onAdd={addEmployee} />
      <EmployeeList employees={employees} onDelete={deleteEmployee} />

      {employees.length > 0 && (
        <>
          <WorkRecordForm employees={employees} onAdd={addWorkRecord} />

          {/* 월 선택 */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <button
              onClick={() => changeMonth(-1)}
              className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 text-sm"
            >
              ◀ 이전 달
            </button>
            <span className="font-semibold text-lg">
              {year}년 {month}월
            </span>
            <button
              onClick={() => changeMonth(1)}
              className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 text-sm"
            >
              다음 달 ▶
            </button>
          </div>

          <WorkRecordList
            records={records}
            employees={employees}
            year={year}
            month={month}
            onDelete={deleteWorkRecord}
          />

          <MonthlySummaryView
            employees={employees}
            records={records}
            year={year}
            month={month}
          />
        </>
      )}
    </div>
  );
}

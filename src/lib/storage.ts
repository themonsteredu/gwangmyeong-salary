import { Employee, WorkRecord } from "@/types";

const EMPLOYEES_KEY = "gwangmyeong_employees";
const WORK_RECORDS_KEY = "gwangmyeong_work_records";

export function getEmployees(): Employee[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(EMPLOYEES_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveEmployees(employees: Employee[]) {
  localStorage.setItem(EMPLOYEES_KEY, JSON.stringify(employees));
}

export function getWorkRecords(): WorkRecord[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(WORK_RECORDS_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveWorkRecords(records: WorkRecord[]) {
  localStorage.setItem(WORK_RECORDS_KEY, JSON.stringify(records));
}

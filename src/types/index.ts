export interface Employee {
  id: string;
  name: string;
  hourlyWage: number; // 시급 또는 일급
  payType: "hourly" | "daily"; // 시급제 / 일급제
}

export interface WorkRecord {
  id: string;
  employeeId: string;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  hoursWorked: number;
}

export interface MonthlySummary {
  employeeId: string;
  employeeName: string;
  payType: "hourly" | "daily";
  totalHours: number;
  totalDays: number;
  basePay: number;
  weeklyHolidayPay: number; // 주휴수당
  totalPay: number;
}

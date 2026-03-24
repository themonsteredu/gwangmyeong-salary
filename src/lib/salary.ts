import { Employee, WorkRecord, MonthlySummary } from "@/types";

// 주휴수당 계산: 1주 15시간 이상 근무 시 주휴수당 발생
// 주휴수당 = (1주 총 근무시간 / 40) × 8 × 시급
export function calculateWeeklyHolidayPay(
  weeklyHours: number,
  hourlyWage: number
): number {
  if (weeklyHours < 15) return 0;
  const cappedHours = Math.min(weeklyHours, 40);
  return Math.round((cappedHours / 40) * 8 * hourlyWage);
}

// 날짜가 속한 주의 월요일 날짜를 구함 (ISO week)
function getWeekStart(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  const day = date.getDay();
  const diff = day === 0 ? -6 : 1 - day; // 월요일 기준
  const monday = new Date(date);
  monday.setDate(date.getDate() + diff);
  return monday.toISOString().split("T")[0];
}

export function calculateMonthlySummary(
  employee: Employee,
  records: WorkRecord[],
  year: number,
  month: number
): MonthlySummary {
  const monthRecords = records.filter((r) => {
    const d = new Date(r.date + "T00:00:00");
    return (
      r.employeeId === employee.id &&
      d.getFullYear() === year &&
      d.getMonth() + 1 === month
    );
  });

  const totalHours = monthRecords.reduce((sum, r) => sum + r.hoursWorked, 0);
  const totalDays = monthRecords.length;

  let basePay = 0;
  if (employee.payType === "hourly") {
    basePay = Math.round(totalHours * employee.hourlyWage);
  } else {
    basePay = totalDays * employee.hourlyWage; // 일급제: 일급 × 일수
  }

  // 주휴수당 계산 (시급제만)
  let weeklyHolidayPay = 0;
  if (employee.payType === "hourly") {
    // 주 단위로 그룹화
    const weeklyGroups: Record<string, number> = {};
    for (const r of monthRecords) {
      const weekStart = getWeekStart(r.date);
      weeklyGroups[weekStart] = (weeklyGroups[weekStart] || 0) + r.hoursWorked;
    }
    for (const weekHours of Object.values(weeklyGroups)) {
      weeklyHolidayPay += calculateWeeklyHolidayPay(
        weekHours,
        employee.hourlyWage
      );
    }
  }

  return {
    employeeId: employee.id,
    employeeName: employee.name,
    payType: employee.payType,
    totalHours: Math.round(totalHours * 100) / 100,
    totalDays,
    basePay,
    weeklyHolidayPay,
    totalPay: basePay + weeklyHolidayPay,
  };
}

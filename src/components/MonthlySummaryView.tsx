"use client";

import { Employee, WorkRecord } from "@/types";
import { calculateMonthlySummary } from "@/lib/salary";

interface Props {
  employees: Employee[];
  records: WorkRecord[];
  year: number;
  month: number;
}

export default function MonthlySummaryView({
  employees,
  records,
  year,
  month,
}: Props) {
  const summaries = employees.map((emp) =>
    calculateMonthlySummary(emp, records, year, month)
  );

  const grandTotal = summaries.reduce((sum, s) => sum + s.totalPay, 0);

  if (employees.length === 0) return null;

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      <h2 className="text-lg font-semibold mb-3">
        월별 급여 합계 ({year}년 {month}월)
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 text-left text-gray-500">
              <th className="pb-2 pr-4">직원</th>
              <th className="pb-2 pr-4">형태</th>
              <th className="pb-2 pr-4">근무</th>
              <th className="pb-2 pr-4">기본급</th>
              <th className="pb-2 pr-4">주휴수당</th>
              <th className="pb-2 font-bold">총 급여</th>
            </tr>
          </thead>
          <tbody>
            {summaries.map((s) => (
              <tr key={s.employeeId} className="border-b border-gray-100">
                <td className="py-2 pr-4 font-medium">{s.employeeName}</td>
                <td className="py-2 pr-4">
                  {s.payType === "hourly" ? "시급제" : "일급제"}
                </td>
                <td className="py-2 pr-4">
                  {s.payType === "hourly"
                    ? `${s.totalHours}시간`
                    : `${s.totalDays}일`}
                </td>
                <td className="py-2 pr-4">
                  {s.basePay.toLocaleString()}원
                </td>
                <td className="py-2 pr-4">
                  {s.weeklyHolidayPay > 0 ? (
                    <span className="text-blue-600">
                      {s.weeklyHolidayPay.toLocaleString()}원
                    </span>
                  ) : (
                    <span className="text-gray-300">-</span>
                  )}
                </td>
                <td className="py-2 font-bold text-blue-700">
                  {s.totalPay.toLocaleString()}원
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t-2 border-gray-300">
              <td
                colSpan={5}
                className="pt-3 pr-4 text-right font-semibold text-gray-600"
              >
                합계
              </td>
              <td className="pt-3 font-bold text-lg text-blue-700">
                {grandTotal.toLocaleString()}원
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

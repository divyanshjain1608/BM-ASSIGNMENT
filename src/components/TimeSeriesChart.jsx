import { useMemo } from "react";
import { useSelector } from "react-redux";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { FiBarChart } from "react-icons/fi";

const TimeSeriesChart = () => {
  const bills = useSelector((state) => state.bills.bills);

  const chartData = useMemo(() => {
    return bills
      .map((bill) => ({
        date: new Date(bill.date).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
        }),
        amount: parseFloat(bill.amount),
      }))
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [bills]);

  return (
    <div className="bg-gray-900 border border-gray-700 shadow-lg rounded-lg">
      <div className="p-6 space-y-6">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
          <div>
            <h2 className="text-2xl font-bold text-teal-400 flex items-center gap-2">
              <FiBarChart /> Expense Tracker
            </h2>
          </div>
        </div>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 10, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" />
              <XAxis
                dataKey="date"
                stroke="#a0aec0"
                tick={{ fill: "#cbd5e0", fontSize: 12 }}
                tickLine={{ stroke: "#2d3748" }}
              />
              <YAxis
                stroke="#a0aec0"
                tick={{ fill: "#cbd5e0", fontSize: 12 }}
                tickLine={{ stroke: "#2d3748" }}
                width={80}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1a202c",
                  border: "1px solid #2d3748",
                  borderRadius: "8px",
                  padding: "10px",
                }}
                itemStyle={{ color: "#cbd5e0", fontSize: 12 }}
                labelStyle={{ color: "#a0aec0", marginBottom: 6, fontSize: 12 }}
                formatter={(value) => [`${value}`, "Amount"]}
              />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="#4fd1c5"
                strokeWidth={2}
                dot={{ fill: "#4fd1c5", r: 4 }}
                activeDot={{
                  r: 6,
                  fill: "#4fd1c5",
                  stroke: "#2c7a7b",
                  strokeWidth: 2,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        {chartData.length === 0 && (
          <div className="flex items-center justify-center h-full text-gray-400">
            <div className="text-center">
              <p className="text-lg font-medium">No Data Available</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TimeSeriesChart;

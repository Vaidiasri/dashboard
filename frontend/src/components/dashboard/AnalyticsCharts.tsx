import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { AnalyticsChartsProps } from "../../types/dashboard";

const AnalyticsCharts = ({
  data,
  processedLineData,
  selectedFeature,
  onBarClick,
}: AnalyticsChartsProps) => {
  // Empty State for New Users
  if (!data.barData || data.barData.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[600px] bg-zinc-900/50 rounded-xl border border-zinc-800 p-8 text-center space-y-6">
        <div className="bg-zinc-800/50 p-6 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-blue-500"
          >
            <line x1="12" y1="20" x2="12" y2="10"></line>
            <line x1="18" y1="20" x2="18" y2="4"></line>
            <line x1="6" y1="20" x2="6" y2="16"></line>
          </svg>
        </div>
        <div className="max-w-md space-y-2">
          <h3 className="text-2xl font-bold text-white">
            Welcome to your Dashboard! 👋
          </h3>
          <p className="text-zinc-400 text-lg">
            It looks like we don't have any data yet. Interact with the
            application to generate your first analytics!
          </p>
          <div className="pt-4 flex justify-center gap-2 text-sm text-zinc-500 bg-zinc-900/30 p-4 rounded-lg">
            <span>🚀</span>
            <span>
              Try clicking propertys, changing themes, or adding items.
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Bar Chart */}
      <div className="h-80 bg-zinc-900/50 rounded-xl border border-zinc-800 p-4 flex flex-col">
        <h3 className="text-lg font-semibold mb-4 text-zinc-300">
          User Activity (Bar)
        </h3>
        <div className="flex-1 min-h-0 w-full" style={{ minHeight: "200px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.barData} className="cursor-pointer">
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="feature" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#18181b",
                  borderColor: "#27272a",
                }}
                itemStyle={{ color: "#e4e4e7" }}
                cursor={{ fill: "rgba(37, 99, 235, 0.1)" }}
              />
              <Legend />
              <Bar
                dataKey="clicks"
                fill="#2563eb"
                name="Users"
                onClick={onBarClick}
                cursor="pointer"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Line Chart */}
      <div className="h-80 bg-zinc-900/50 rounded-xl border border-zinc-800 p-4 flex flex-col">
        <h3 className="text-lg font-semibold mb-4 text-zinc-300">
          {selectedFeature
            ? `Trend: ${selectedFeature}`
            : "Growth Trends (Line)"}
        </h3>
        <div className="flex-1 min-h-0 w-full" style={{ minHeight: "200px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={processedLineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="name" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#18181b",
                  borderColor: "#27272a",
                }}
                itemStyle={{ color: "#e4e4e7" }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#10b981"
                strokeWidth={2}
                name="Growth"
                dot={{ r: 4, fill: "#10b981" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsCharts;

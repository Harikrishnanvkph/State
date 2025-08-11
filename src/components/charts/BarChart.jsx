import React, { useContext, useMemo } from "react";
import ReactECharts from "echarts-for-react";
import { ThemeContext } from "../ThemeContext.jsx";

export default function BarChart({ series, categories, stacked = false, horizontal = false, height = 320 }) {
  const { echartsTheme } = useContext(ThemeContext);

  const option = useMemo(() => {
    const isHorizontal = horizontal;
    return {
      tooltip: { trigger: "axis", axisPointer: { type: "shadow" } },
      legend: { top: 0 },
      grid: { left: 8, right: 12, bottom: 8, top: 28, containLabel: true },
      xAxis: isHorizontal ? { type: "value" } : { type: "category", data: categories },
      yAxis: isHorizontal ? { type: "category", data: categories } : { type: "value" },
      series: series.map((s) => ({
        type: "bar",
        name: s.name,
        stack: stacked ? "total" : undefined,
        emphasis: { focus: "series" },
        data: s.data,
      })),
    };
  }, [series, categories, stacked, horizontal]);

  return <ReactECharts option={option} theme={echartsTheme} notMerge={true} lazyUpdate={true} style={{ height, width: "100%" }} />;
}
import React, { useContext, useMemo } from "react";
import ReactECharts from "echarts-for-react";
import { ThemeContext } from "../ThemeContext.jsx";

export default function ScatterChart({ series, categories, height = 320 }) {
  const { echartsTheme } = useContext(ThemeContext);

  const option = useMemo(() => {
    return {
      tooltip: { trigger: "item" },
      grid: { left: 8, right: 12, bottom: 8, top: 24, containLabel: true },
      xAxis: { type: "category", data: categories },
      yAxis: { type: "value" },
      series: series.map((s) => ({ type: "scatter", name: s.name, symbolSize: 10, data: s.data })),
    };
  }, [series, categories]);

  return <ReactECharts option={option} theme={echartsTheme} notMerge={true} lazyUpdate={true} style={{ height, width: "100%" }} />;
}
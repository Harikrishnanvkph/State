import React, { useContext, useMemo } from "react";
import ReactECharts from "echarts-for-react";
import { ThemeContext } from "../ThemeContext.jsx";

export default function LineChart({ series, categories, height = 320, smooth = true, area = true }) {
  const { echartsTheme } = useContext(ThemeContext);

  const option = useMemo(() => {
    const seriesOption = series.map((s) => ({
      type: "line",
      name: s.name,
      smooth,
      showSymbol: false,
      emphasis: { focus: "series" },
      areaStyle: area ? { opacity: 0.15 } : undefined,
      data: s.data,
    }));
    return {
      tooltip: { trigger: "axis" },
      grid: { left: 8, right: 12, bottom: 8, top: 24, containLabel: true },
      xAxis: { type: "category", data: categories, boundaryGap: false },
      yAxis: { type: "value" },
      series: seriesOption,
    };
  }, [series, categories, smooth, area]);

  return (
    <ReactECharts
      option={option}
      theme={echartsTheme}
      notMerge={true}
      lazyUpdate={true}
      style={{ height, width: "100%" }}
    />
  );
}
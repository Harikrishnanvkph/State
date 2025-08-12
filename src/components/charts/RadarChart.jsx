import React, { useContext, useMemo } from "react";
import ReactECharts from "echarts-for-react";
import { ThemeContext } from "../ThemeContext.jsx";

export default function RadarChart({ indicators, series, height = 320 }) {
  const { echartsTheme } = useContext(ThemeContext);

  const option = useMemo(() => {
    return {
      tooltip: {},
      legend: { top: 0 },
      radar: { indicator: indicators, radius: "60%" },
      series: [
        {
          type: "radar",
          data: series.map((s) => ({ name: s.name, value: s.value })),
          areaStyle: { opacity: 0.15 },
        },
      ],
    };
  }, [indicators, series]);

  return <ReactECharts option={option} theme={echartsTheme} notMerge={true} lazyUpdate={true} style={{ height, width: "100%" }} />;
}
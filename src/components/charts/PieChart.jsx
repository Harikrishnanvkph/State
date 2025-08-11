import React, { useContext, useMemo } from "react";
import ReactECharts from "echarts-for-react";
import { ThemeContext } from "../ThemeContext.jsx";

export default function PieChart({ data, donut = true, height = 320, rose = false }) {
  const { echartsTheme } = useContext(ThemeContext);

  const option = useMemo(() => {
    return {
      tooltip: { trigger: "item" },
      legend: { bottom: 0, type: "scroll" },
      series: [
        {
          type: "pie",
          radius: donut ? ["35%", "65%"] : [0, "65%"],
          roseType: rose ? "radius" : undefined,
          itemStyle: { borderRadius: 6, borderColor: "#fff", borderWidth: 1 },
          label: { show: false },
          labelLine: { show: false },
          data,
        },
      ],
    };
  }, [data, donut, rose]);

  return <ReactECharts option={option} theme={echartsTheme} notMerge={true} lazyUpdate={true} style={{ height, width: "100%" }} />;
}
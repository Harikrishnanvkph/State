import React, { useContext, useMemo, useState } from "react";
import ChartCard from "./components/ChartCard.jsx";
import LineChart from "./components/charts/LineChart.jsx";
import BarChart from "./components/charts/BarChart.jsx";
import PieChart from "./components/charts/PieChart.jsx";
import ScatterChart from "./components/charts/ScatterChart.jsx";
import RadarChart from "./components/charts/RadarChart.jsx";
import { ThemeContext } from "./components/ThemeContext.jsx";

function seededRandom(seed) {
  let x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function generateSeries(seed, points) {
  const categories = [];
  const valuesA = [];
  const valuesB = [];
  for (let i = 0; i < points; i += 1) {
    categories.push(`Day ${i + 1}`);
    const base = 50 + Math.round(seededRandom(seed + i) * 50);
    valuesA.push(base + Math.round(seededRandom(seed * 3 + i) * 20) - 10);
    valuesB.push(base - Math.round(seededRandom(seed * 5 + i) * 20) + 10);
  }
  return { categories, valuesA, valuesB };
}

function useDemoData(sizeKey) {
  const sizeToPoints = { small: 12, medium: 24, large: 48 };
  const points = sizeToPoints[sizeKey] ?? 24;
  const data = useMemo(() => generateSeries(42, points), [points]);

  const pie = useMemo(() => {
    const total = 5;
    return new Array(total).fill(0).map((_, i) => ({
      value: 100 + Math.round(seededRandom(100 + i) * 200),
      name: `Segment ${i + 1}`,
    }));
  }, []);

  const scatter = useMemo(() => {
    const { categories } = data;
    const seriesA = categories.map((_, i) => [i, 40 + Math.round(seededRandom(12 + i) * 60)]);
    const seriesB = categories.map((_, i) => [i, 30 + Math.round(seededRandom(24 + i) * 70)]);
    return { categories: categories.map((_, i) => `#${i + 1}`), seriesA, seriesB };
  }, [data]);

  const radar = useMemo(() => {
    const indicators = [
      { name: "Quality", max: 100 },
      { name: "Speed", max: 100 },
      { name: "Cost", max: 100 },
      { name: "Reliability", max: 100 },
      { name: "Satisfaction", max: 100 },
    ];
    const s1 = indicators.map((_, i) => 40 + Math.round(seededRandom(7 + i) * 60));
    const s2 = indicators.map((_, i) => 30 + Math.round(seededRandom(11 + i) * 70));
    return { indicators, s1, s2 };
  }, []);

  return { data, pie, scatter, radar };
}

export default function Dashboard() {
  const { themeName, toggleTheme, textColor, cardBg, pageBg } = useContext(ThemeContext);
  const [sizeKey, setSizeKey] = useState("medium");
  const { data, pie, scatter, radar } = useDemoData(sizeKey);

  const lineSeries = useMemo(
    () => [
      { name: "Revenue", data: data.valuesA },
      { name: "Cost", data: data.valuesB },
    ],
    [data]
  );

  const barSeries = useMemo(
    () => [
      { name: "North", data: data.valuesA.map((v) => Math.round(v * 0.6)) },
      { name: "South", data: data.valuesB.map((v) => Math.round(v * 0.4)) },
    ],
    [data]
  );

  const scatterSeries = useMemo(
    () => [
      { name: "Group A", data: scatter.seriesA },
      { name: "Group B", data: scatter.seriesB },
    ],
    [scatter]
  );

  // Inline CSS variables for theme to keep it framework-agnostic
  const pageStyle = {
    "--card-bg": cardBg,
    "--muted-text": themeName === "dark" ? "#9ca3af" : "#6b7280",
    minHeight: "100vh",
    background: pageBg,
    color: textColor,
  };

  return (
    <div style={pageStyle}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: 16, gap: 12 }}>
        <div>
          <div style={{ fontSize: 20, fontWeight: 700 }}>Analytics Dashboard</div>
          <div style={{ fontSize: 12, color: "var(--muted-text)" }}>ECharts + React, responsive and theme-aware</div>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <select
            value={sizeKey}
            onChange={(e) => setSizeKey(e.target.value)}
            style={{ padding: "6px 10px", borderRadius: 8, border: "1px solid rgba(0,0,0,0.1)" }}
          >
            <option value="small">Small dataset</option>
            <option value="medium">Medium dataset</option>
            <option value="large">Large dataset</option>
          </select>
          <button
            onClick={toggleTheme}
            style={{ padding: "6px 10px", borderRadius: 8, border: "1px solid rgba(0,0,0,0.1)", background: "transparent", color: "inherit" }}
            aria-label="Toggle theme"
          >
            {themeName === "dark" ? "Switch to Light" : "Switch to Dark"}
          </button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(12, minmax(0, 1fr))", gap: 16, padding: 16 }}>
        <div style={{ gridColumn: "span 8" }}>
          <ChartCard title="Revenue vs Cost" subtitle="Smoothed line with area">
            <LineChart series={lineSeries} categories={data.categories} height={340} />
          </ChartCard>
        </div>
        <div style={{ gridColumn: "span 4" }}>
          <ChartCard title="Sales Breakdown" subtitle="Donut pie">
            <PieChart data={pie} height={340} />
          </ChartCard>
        </div>

        <div style={{ gridColumn: "span 6" }}>
          <ChartCard title="Regional Performance" subtitle="Stacked bars">
            <BarChart series={barSeries} categories={data.categories} stacked height={320} />
          </ChartCard>
        </div>
        <div style={{ gridColumn: "span 6" }}>
          <ChartCard title="Distribution" subtitle="Scatter plot">
            <ScatterChart series={scatterSeries} categories={scatter.categories} height={320} />
          </ChartCard>
        </div>

        <div style={{ gridColumn: "span 12" }}>
          <ChartCard title="KPIs Radar" subtitle="Multi-metric comparison">
            <RadarChart
              indicators={radar.indicators}
              series={[
                { name: "Plan", value: radar.s1 },
                { name: "Actual", value: radar.s2 },
              ]}
              height={320}
            />
          </ChartCard>
        </div>
      </div>
    </div>
  );
}
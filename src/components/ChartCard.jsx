import React from "react";

export default function ChartCard({ title, subtitle, actions, children, style }) {
  return (
    <div
      style={{
        background: "var(--card-bg, #ffffff)",
        borderRadius: 12,
        padding: 16,
        boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
        border: "1px solid rgba(0,0,0,0.06)",
        ...style,
      }}
    >
      {(title || actions || subtitle) && (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <div>
            {title && (
              <div style={{ fontSize: 16, fontWeight: 600, lineHeight: 1.2 }}>{title}</div>
            )}
            {subtitle && (
              <div style={{ fontSize: 12, color: "var(--muted-text, #6b7280)", marginTop: 2 }}>{subtitle}</div>
            )}
          </div>
          {actions && <div>{actions}</div>}
        </div>
      )}
      <div style={{ width: "100%" }}>{children}</div>
    </div>
  );
}
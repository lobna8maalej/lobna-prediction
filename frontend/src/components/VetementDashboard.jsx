import React, { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ZAxis
} from "recharts";

import "./VetementDashboard.css";

function VetementDashboard() {
  const [items, setItems] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/vetement", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        Prix_C1: 150,
        Prix_C2: 180,
        numbers: 15,
        Target: 1
      })
    })
      .then(res => res.json())
      .then(data => setItems(data))
      .catch(err => console.error("Erreur:", err));
  }, []);

  const scatterData = items?.data
    ? [
        {
          x: items.data.Prix_C1,
          y: items.data.Prix_C2,
          z: items.data.numbers
        }
      ]
    : [];

  return (
    <div className="vetement-container">

      <h1 className="vetement-title">
        Vetement ML Dashboard (POST)
      </h1>

      {/* ================= IFRAME ================= */}
      <div className="vetement-iframe-wrapper">
        <iframe
          className="vetement-iframe"
          title="lobna@vetement"
          src="https://app.powerbi.com/view?r=eyJrIjoiM2ExNDA4YzEtNTZkNi00ZmM1LWExYWItZmQxNGVhZjVlZTNiIiwidCI6ImRiZDY2NjRkLTRlYjktNDZlYi05OWQ4LTVjNDNiYTE1M2M2MSIsImMiOjl9"
          allowFullScreen
        />
      </div>

      {!items && <p className="vetement-loading">⏳ Waiting for scatter data...</p>}

      {items && (
        <>
          <p className="vetement-message">
            {items.message}
          </p>

          <h2>📈 Scatter Plot Prix_C1 vs Prix_C2</h2>

          <div className="vetement-chart">
            <ResponsiveContainer width="100%" height={350}>
              <ScatterChart>
                <CartesianGrid />
                <XAxis dataKey="x" />
                <YAxis dataKey="y" />
                <ZAxis dataKey="z" range={[60, 400]} />
                <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                <Scatter data={scatterData} fill="#6366f1" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </>
      )}

    </div>
  );
}

export default VetementDashboard;
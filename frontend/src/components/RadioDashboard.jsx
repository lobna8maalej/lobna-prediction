import { fetchRadio } from "../redux/radioSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import "./RadioDashboard.css";
function RadioDashboard() {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.radio);

  useEffect(() => {
    dispatch(fetchRadio());
  }, [dispatch]);

  const chartData = data
    ? [
        { reputation_ranking: 120, tuition_fee: 18000, Target: "A" },
        { reputation_ranking: 200, tuition_fee: 22000, Target: "B" },
      ]
    : [];

  return (
    <div className="radio-container">

      <h1 className="radio-title">📡 Radio Analytics Dashboard</h1>

      {/* ================= IFRAME ================= */}
      <div
        className="radio-iframe-wrapper"
        style={{
          width: "85%",
          maxWidth: "950px",
          margin: "20px auto",
        }}
      >
        <iframe
          className="radio-iframe"
          title="RADIO"
          src="https://app.powerbi.com/view?r=eyJrIjoiMzMwYTFkZDQtODI4ZC00NTQzLWI3NmMtZjA4MTFiYWE4ODFkIiwidCI6ImRiZDY2NjRkLTRlYjktNDZlYi05OWQ4LTVjNDNiYTE1M2M2MSIsImMiOjl9"
          style={{
            width: "100%",
            height: "600px",
            border: "none",
          }}
          allowFullScreen
        />
      </div>

      {/* ================= STATUS ================= */}
      {loading && <p className="radio-loading">Chargement...</p>}
      {error && <p className="radio-error">{error}</p>}

      {/* ================= DATA ================= */}
      {data && (
        <div className="radio-info">
          <p><strong>Message :</strong> {data.message}</p>
          <p><strong>Colonnes :</strong> {data.columns.join(", ")}</p>
          <p><strong>Count :</strong> {data.count}</p>
        </div>
      )}

      {/* ================= CHART ================= */}
      {chartData.length > 0 && (
        <div className="radio-chart">
          <h2>📈 Scatter Plot</h2>

          <ResponsiveContainer width="100%" height={350}>
            <ScatterChart>
              <CartesianGrid />
              <XAxis type="number" dataKey="reputation_ranking" />
              <YAxis type="number" dataKey="tuition_fee" />
              <Tooltip cursor={{ strokeDasharray: "3 3" }} />
              <Scatter data={chartData} fill="#6366f1" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      )}

    </div>
  );
}

export default RadioDashboard;
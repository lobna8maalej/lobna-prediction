import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchParapharma } from "../redux/parapharmaSlice";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

import "./ParapharmaDashboard.css";

export default function ParapharmaDashboard() {

  const dispatch = useDispatch();

  const {
    loading,
    error,
    message,
    rowsInserted,
    items
  } = useSelector((state) => state.parapharma);

  useEffect(() => {
    dispatch(fetchParapharma());
  }, [dispatch]);

  const chartData = items.map((item, index) => ({
    name: `Data ${index + 1}`,
    Reel: item.real,
    Prediction: item.prediction
  }));

  return (
    <div className="para-container">

      <h1 className="para-title">
        💊 Parapharma Dashboard
      </h1>

      {/* ================= IFRAME ================= */}
      <div className="iframe-wrapper">
        <iframe
          className="para-iframe"
          title="PARAPHARMACIE"
          src="https://app.powerbi.com/view?r=eyJrIjoiZDEzNTIyZGItNWNiNS00YTk4LWI3NmUtMWYwODE1Mjg5OGIxIiwidCI6ImRiZDY2NjRkLTRlYjktNDZlYi05OWQ4LTVjNDNiYTE1M2M2MSIsImMiOjl9"
          allowFullScreen
        />
      </div>

      {/* ================= STATUS ================= */}
      {loading && <p className="loading">Loading prediction...</p>}

      {error && <p className="error">{error}</p>}

      {/* ================= CONTENT ================= */}
      {!loading && !error && (
        <>
          <div className="info-card">
            <h2>{message}</h2>
            <p>Rows inserted: {rowsInserted}</p>
          </div>

          <ul className="list-box">
            {items.map((t, i) => (
              <li key={i}>
                Réel: {t.real} | Prediction: {t.prediction}
              </li>
            ))}
          </ul>

          {/* ================= CHART ================= */}
          {chartData.length > 0 && (
            <>
              <h2 className="subtitle">📈 Réel vs Prediction</h2>

              <div className="chart-box">
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Reel" fill="#22c55e" />
                    <Bar dataKey="Prediction" fill="#ef4444" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </>
          )}
        </>
      )}

    </div>
  );
}
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createWebPrediction } from "../redux/webSlice";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from "recharts";

import "./WebDashboard.css";

function WebDashboard() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.web);

  useEffect(() => {
    dispatch(createWebPrediction({ x1: 10, x2: 2 }));
  }, [dispatch]);

  const predictionData = items?.data || null;

  const chartData =
    predictionData?.prediction !== undefined
      ? [
          {
            name: "Web",
            Reel: 10,
            Prediction: predictionData.prediction,
          },
        ]
      : [];

  return (
    <div className="web-container">

      <h1 className="web-title">Web ML Dashboard</h1>

      {/* ================= IFRAME ================= */}
      <div className="web-iframe-wrapper">
        <iframe
          className="web-iframe"
          title="WEB"
          src="https://app.powerbi.com/view?r=eyJrIjoiZTE3NWI1MWYtOWNiYy00ODVmLTkzODEtOGNmMDgxYzVhMDNiIiwidCI6ImRiZDY2NjRkLTRlYjktNDZlYi05OWQ4LTVjNDNiYTE1M2M2MSIsImMiOjl9"
          allowFullScreen
        />
      </div>

      {/* ================= LOADING ================= */}
      {loading && <p className="web-loading">Loading prediction...</p>}
      {error && <p className="web-error">{error}</p>}
      {!loading && !error && !predictionData && (
        <p className="web-waiting">⏳ Waiting for prediction result...</p>
      )}

      {/* ================= RESULT ================= */}
      {predictionData && (
        <div className="web-card">

          <h2>📌 Résultat</h2>

          <h1 className="web-value">
            {predictionData.prediction?.toFixed(2)}
          </h1>

          <p className="web-status">
            Status : {items.message}
          </p>

          {/* ================= CHART ================= */}
          <h2>Comparaison Réel vs Prédiction</h2>

          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Reel" fill="#4CAF50" />
              <Bar dataKey="Prediction" fill="#FF4D4D" />
            </BarChart>
          </ResponsiveContainer>

        </div>
      )}

    </div>
  );
}

export default WebDashboard;

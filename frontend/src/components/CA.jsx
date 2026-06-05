import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPrediction } from "../redux/caSlice";
import "./CA.css";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";

function CA() {
  const dispatch = useDispatch();

  const predictionData = useSelector((state) => state.ca?.predictionData);
  const loading = useSelector((state) => state.ca?.loading);
  const error = useSelector((state) => state.ca?.error);

  useEffect(() => {
    dispatch(
      createPrediction({
        mode: "export",
        ca_tnd: 50000,
        ca_eur: 10000,
      })
    );
  }, [dispatch]);

  const chartData = predictionData
    ? [
        {
          name: "CA",
          Reel: predictionData.ca_tnd || 0,
          Prediction: predictionData.prediction || 0,
        },
      ]
    : [];

  return (
    <div className="ca-container">

      <h2 className="ca-title">📊 Dashboard Power BI</h2>

      <div className="ca-iframe-wrapper">
        <iframe
          className="ca-iframe"
          title="Power BI"
          src="https://app.powerbi.com/view?r=eyJrIjoiZmI5NTY2MDItNzc4OC00MzU3LWI4YzgtZmQ3ZDliOGM0ODYxIiwidCI6ImRiZDY2NjRkLTRlYjktNDZlYi05OWQ4LTVjNDNiYTE1M2M2MSIsImMiOjl9"
          frameBorder="0"
          allowFullScreen
        />
      </div>

      {loading && <p className="ca-loading">Loading prediction...</p>}
      {error && <p className="ca-error">{error}</p>}

      {!loading && !error && !predictionData && (
        <p className="ca-waiting">⏳ Waiting for prediction result...</p>
      )}

      {predictionData && (
        <>
          <div className="ca-card">
            <h2 className="ca-subtitle">📌 Résultat</h2>

            <div className="ca-value">
              {predictionData.prediction?.toFixed(2)}
            </div>
          </div>

          <div className="ca-chart">
            <h2>📈 Comparaison Réel vs Prédiction</h2>

            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />

                <Bar dataKey="Reel" fill="#22c55e" name="Réel" />
                <Bar dataKey="Prediction" fill="#ef4444" name="Prédiction" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
}

export default CA;
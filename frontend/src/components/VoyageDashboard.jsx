import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createVoyagePrediction } from "../redux/voyageSlice";

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

import "./VoyageDashboard.css";

function VoyageDashboard() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.voyage);

  useEffect(() => {
    dispatch(
      createVoyagePrediction({
        prix_concurrent_2: 1900,
        prix_concurrent_agence2: 2000,
        prix_extra: 50,
      })
    );
  }, [dispatch]);

  const predictionData = items?.data || null;

  const chartData =
    predictionData?.prediction !== undefined
      ? [
          {
            name: "Voyage",
            Reel: 2000,
            Prediction: predictionData.prediction,
          },
        ]
      : [];

  return (
    <div className="voyage-container">

      <h1 className="voyage-title">
        Voyage ML Dashboard
      </h1>

      {/* ================= IFRAME ================= */}
      <div className="voyage-iframe-wrapper">
        <iframe
          className="voyage-iframe"
          title="LOBNA@VOYAGE"
          src="https://app.powerbi.com/view?r=eyJrIjoiZWU5OTJmY2EtZDdmMC00NGU3LTg2NDUtZjg5YjdmMzRiOWI1IiwidCI6ImRiZDY2NjRkLTRlYjktNDZlYi05OWQ4LTVjNDNiYTE1M2M2MSIsImMiOjl9"
          allowFullScreen
        />
      </div>

      {loading && <p className="voyage-loading">Loading prediction...</p>}
      {error && <p className="voyage-error">{error}</p>}

      {!loading && !error && !predictionData && (
        <p className="voyage-wait">⏳ Waiting for prediction result...</p>
      )}

      {predictionData && (
        <>
          <h2>📌 Résultat</h2>

          <h1 className="voyage-result">
            {predictionData.prediction?.toFixed(2)}
          </h1>

          <p><b>Status:</b> {items.message}</p>

          <div className="voyage-chart">
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

    </div>
  );
}

export default VoyageDashboard;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSanitaireData } from "../redux/sanitaireSlice";
import "./CasaDashboard.css";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer
} from "recharts";

export default function CasaDashboard() {
  const dispatch = useDispatch();

  const { data, loading, error } = useSelector(
    (state) => state.sanitaire
  );

  useEffect(() => {
    dispatch(fetchSanitaireData());
  }, [dispatch]);

  const chartData = data
    ? [
        { name: "Value 1", value: data.values?.[0] || 0 },
        { name: "Value 2", value: data.values?.[1] || 0 },
        { name: "Prediction", value: data.prediction || 0 }
      ]
    : [];

  return (
    <div className="sanitaire-container">

      <h1 className="sanitaire-title">
        🏥 SANITAIRE Dashboard
      </h1>

      {/* MAGIC IFRAME */}
      <div className="iframe-wrapper">
        <iframe
          className="magic-iframe"
          title="SANITAIRE"
          src="https://app.powerbi.com/view?r=eyJrIjoiM2YyMDk1YjItODg3OC00ZjJhLWFjYjgtYWI1MzUxY2EwMGY3IiwidCI6ImRiZDY2NjRkLTRlYjktNDZlYi05OWQ4LTVjNDNiYTE1M2M2MSIsImMiOjl9"
          frameBorder="0"
          allowFullScreen
        />
      </div>

      {loading && <p className="loading">Loading...</p>}

      {error && <p className="error">{error}</p>}

      {data && (
        <div className="prediction-card">
          <p><strong>Model:</strong> {data.model}</p>
          <p>
            <strong>Prediction:</strong>{" "}
            <span className="prediction-value">
              {data.prediction}
            </span>
          </p>
        </div>
      )}

      <h2 className="chart-title">📊 Comparison</h2>

      <div className="chart-box">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />

            <Bar dataKey="value" fill="#4f46e5" />
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}
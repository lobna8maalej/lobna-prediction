import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchInfoData } from "../redux/infoSlice";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

import "./InfoDashboard.css";

export default function InfoDashboard() {

  const dispatch = useDispatch();

  const { data, loading, error } = useSelector(
    (state) => state.info
  );

  useEffect(() => {
    dispatch(fetchInfoData());
  }, [dispatch]);

  const chartData = data
    ? [
        {
          name: "GOMYCODE",
          prediction: data.gomycode_pred
        }
      ]
    : [];

  return (
    <div className="info-container">

      <h1 className="info-title">
        📊 GOMYCODE AI Dashboard
      </h1>

      {/* ================= IFRAME ================= */}
      <div className="iframe-wrapper">
        <iframe
          className="info-iframe"
          title="gomycode"
          src="https://app.powerbi.com/view?r=eyJrIjoiMjM3NjJkZDEtMDMzZC00YTUzLTk0ZDEtOTdkN2Y3NGY1YmE3IiwidCI6ImRiZDY2NjRkLTRlYjktNDZlYi05OWQ4LTVjNDNiYTE1M2M2MSIsImMiOjl9"
          allowFullScreen
        />
      </div>

      {/* ================= STATUS ================= */}
      {loading && <p className="loading">Loading prediction...</p>}

      {error && (
        <p className="error">
          {JSON.stringify(error)}
        </p>
      )}

      {/* ================= PREDICTION CARD ================= */}
      {data && (
        <div className="prediction-card">

          <h3>GOMYCODE Prediction</h3>

          <h1 className="prediction-value">
            {Number(data.gomycode_pred).toFixed(2)}
          </h1>

        </div>
      )}

      {/* ================= CHART ================= */}
      <h2 className="subtitle">📈 Prediction Analysis</h2>

      <div className="chart-box">
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="prediction" fill="#6366f1" />
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}
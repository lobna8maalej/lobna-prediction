import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEtudeData } from "../redux/etudeSlice";

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

import "./EtudeDashboard.css"; // ✅ CSS séparé

export default function EtudeDashboard() {

  const dispatch = useDispatch();
  const { items, loading, error } = useSelector(state => state.etude);

  useEffect(() => {
    dispatch(fetchEtudeData());
  }, [dispatch]);

  const chartData = items.map(item => ({
    name: item.mode,
    Value: item.value,
    Prediction: item.prediction ?? 0
  }));

  return (
    <div className="etude-container">

      <h1 className="etude-title">
        📊 Etude Dashboard
      </h1>

      {/* IFRAME */}
      <div className="etude-iframe-wrapper">
        <iframe
          className="etude-iframe"
          title="etude A L'Etranger"
          src="https://app.powerbi.com/view?r=eyJrIjoiY2MwYjg2ZWYtNDhlYi00NzgxLWIzYmQtNjNhYjU1YmUzZDUxIiwidCI6ImRiZDY2NjRkLTRlYjktNDZlYi05OWQ4LTVjNDNiYTE1M2M2MSIsImMiOjl9"
          allowFullScreen
        />
      </div>

      {/* STATUS */}
      {loading && <p className="etude-loading">Loading...</p>}
      {error && <p className="etude-error">{error}</p>}

      {/* LIST */}
      <ul className="etude-list">
        {items.map((item, i) => (
          <li key={i}>
            Mode: {item.mode} | Value: {item.value} | Prediction: {item.prediction ?? "N/A"}
          </li>
        ))}
      </ul>

      {/* CHART */}
      <h2 className="etude-subtitle">
        📈 Comparison
      </h2>

      <div className="etude-chart">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Prediction" fill="#6366f1" />
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}
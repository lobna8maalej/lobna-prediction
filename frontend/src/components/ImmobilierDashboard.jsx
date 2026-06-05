import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { insertImmobilier } from "../redux/immobilierSlice";
import { Bar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import "./ImmobilierDashboard.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function ImmobilierDashboard() {
  const dispatch = useDispatch();

  const { status, message, rows, loading, error } = useSelector(
    (state) => state.immobilier
  );

  const handleInsert = () => {
    const data = [
      { idImmobilier: 1, Type: "Maison", Surface: 120, Prix: 200000, Source: "AROUS" },
      { idImmobilier: 2, Type: "Appartement", Surface: 80, Prix: 150000, Source: "GEMMA" },
    ];
    dispatch(insertImmobilier(data));
  };

  const chartData = {
    labels: ["Maison", "Appartement"],
    datasets: [
      {
        label: "Prix Immobilier",
        data: [200000, 150000],
        backgroundColor: ["#4CAF50", "#2196F3"],
      },
    ],
  };

  return (
    <div className="immobilier-container">

      <h2 className="immobilier-title">
        🏠 Immobilier Dashboard
      </h2>

      {/* ================= IFRAME ================= */}
      <div className="iframe-wrapper">
        <iframe
          className="iframe-card"
          title="IMMOBILIER"
          src="https://app.powerbi.com/view?r=eyJrIjoiNzE1YzUzYWMtMjFmMC00YWVmLWFjMTEtYTU3YjQ5ODI1MWJkIiwidCI6ImRiZDY2NjRkLTRlYjktNDZlYi05OWQ4LTVjNDNiYTE1M2M2MSIsImMiOjl9"
          allowFullScreen
        />
      </div>

      {/* ================= CHART ================= */}
      <div className="chart-box">
        <Bar data={chartData} />
      </div>

      {/* ================= PREDICTION BOX ================= */}
      <div className="prediction-card">

        <h3>Résultats de prédiction</h3>

        <button
          className="btn-primary"
          onClick={handleInsert}
          disabled={loading}
        >
          {loading ? "Insertion..." : "Insérer données"}
        </button>

        {status && (
          <p className="success">
            {message} ({rows} rows)
          </p>
        )}

        {error && (
          <p className="error">
            {error}
          </p>
        )}
      </div>

    </div>
  );
}

export default ImmobilierDashboard;
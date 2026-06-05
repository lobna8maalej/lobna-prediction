import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTransaction } from "../redux/transactionSlice";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

import "./TransactionDashboard.css";

function TransactionDashboard() {
  const dispatch = useDispatch();

  const { items, loading, error } = useSelector(
    (state) => state.transaction
  );

  useEffect(() => {
    dispatch(
      createTransaction({
        mode: "facture",
        value: 18175,
      })
    );
  }, [dispatch]);

  const lastTransaction =
    items.length > 0 ? items[items.length - 1] : null;

  const chartData = lastTransaction
    ? [
        {
          name: "Numéro Facture",
          Valeur: Number(lastTransaction.prediction),
        },
        {
          name: "Compte Global (NCG)",
          Valeur: 611002,
        },
      ]
    : [];

  return (
    <div className="transaction-container">

      <h1 className="transaction-title">
        Transaction ML Dashboard
      </h1>

      {/* ================= IFRAME ================= */}
      <div className="transaction-iframe-wrapper">
        <iframe
          className="transaction-iframe"
          title="lobna@powerbi"
          src="https://app.powerbi.com/view?r=eyJrIjoiNDQ0MDRiMjMtZjYwOC00ZWIzLWE3YTEtODI1NDRhYjJlMDY1IiwidCI6ImRiZDY2NjRkLTRlYjktNDZlYi05OWQ4LTVjNDNiYTE1M2M2MSIsImMiOjl9"
          allowFullScreen
        />
      </div>

      {/* ================= LOADING / ERROR ================= */}
      {loading && <p className="transaction-loading">Loading prediction...</p>}
      {error && <p className="transaction-error">{error}</p>}

      {/* ================= KPI CARD ================= */}
      {lastTransaction && (
        <div className="transaction-card">
          <h3>Prédiction Transaction</h3>

          <p><b>Type :</b> Facture</p>

          <p>
            <b>Valeur :</b>{" "}
            {Number(lastTransaction.value).toLocaleString()} TND
          </p>

          <h2 className="transaction-value">
            {Number(lastTransaction.prediction).toFixed(2)} TND
          </h2>

          <span>Chiffre d'affaires prédit</span>
        </div>
      )}

      {/* ================= CHART ================= */}
      {chartData.length > 0 && (
        <div className="transaction-chart">
          <h2>📊 Numéro Facture vs NCG</h2>

          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />

              <Bar dataKey="Valeur" fill="#4f46e5" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

    </div>
  );
}

export default TransactionDashboard;
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPrediction } from "../redux/kantraSlice";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import "./kantra.css";

const PredictionForm = () => {
  const dispatch = useDispatch();
  const { history, loading, error } = useSelector((s) => s.kantra);

  const [a, setA] = useState("");
  const [b, setB] = useState("");

  const handlePredict = () => {
    if (!a || !b) return;
    dispatch(fetchPrediction({ a: Number(a), b: Number(b) }));
  };

  const last = history[0];

  const chartData = history.slice(0, 10).map((h, i) => ({
    name: `P${i + 1}`,
    prediction: h.prediction,
  }));

  return (
    <div className="kantra-container">

      <h1 className="kantra-title">📊 ML Dashboard (Kantra)</h1>

      {/* IFRAME */}
      <div className="kantra-iframe-wrapper">
        <iframe
          className="kantra-iframe"
          title="9antra.tn"
          src="https://app.powerbi.com/view?r=eyJrIjoiM2I3OGVmMjMtYmQ1MS00ZjMzLTljOWMtNzQ4MzM5ZjIzZGMxIiwidCI6ImRiZDY2NjRkLTRlYjktNDZlYi05OWQ4LTVjNDNiYTE1M2M2MSIsImMiOjl9"
          allowFullScreen
        />
      </div>

      {/* INPUTS */}
      <div className="kantra-inputs">
        <input placeholder="A" onChange={(e) => setA(e.target.value)} />
        <input placeholder="B" onChange={(e) => setB(e.target.value)} />

        <button onClick={handlePredict}>
          {loading ? "Running..." : "Predict"}
        </button>
      </div>

      {error && <p className="kantra-error">{error}</p>}

      {/* KPI CARDS */}
      {last && (
        <div className="kantra-cards">
          <div className="kantra-card">
            A <br /> <b>{last.a}</b>
          </div>

          <div className="kantra-card">
            B <br /> <b>{last.b}</b>
          </div>

          <div className="kantra-card highlight">
            Prediction <br />
            <b>{Number(last.prediction).toFixed(2)}</b>
          </div>
        </div>
      )}

      {/* CHART */}
      {history.length > 0 && (
        <div className="kantra-box">
          <h3>📈 History</h3>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="prediction" fill="#7c3aed" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

    </div>
  );
};

export default PredictionForm;
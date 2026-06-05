import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchServerPrediction } from "../redux/serverSlice";
import "./ServerDashboard.css";

const ServerDashboard = () => {
  const dispatch = useDispatch();
  const { result, loading, error, history } = useSelector(
    (state) => state.server
  );

  const [model, setModel] = useState("aziza");
  const [x1, setX1] = useState("");
  const [x2, setX2] = useState("");

  const handlePredict = () => {
    dispatch(
      fetchServerPrediction({
        model,
        x1: Number(x1),
        x2: Number(x2)
      })
    );
  };

  return (
    <div className="server-container">

      {/* ================= TITLE ================= */}
      <h2>📊 ML Server Dashboard</h2>

      {/* ================= POWER BI ================= */}
      <div className="server-iframe-wrapper">
        <iframe
          className="server-iframe"
          title="AZIZA"
          src="https://app.powerbi.com/view?r=eyJrIjoiY2M4NDAyMWEtYjk3Yi00ZWJlLTgzMWMtMzY2NGVlYzBlNTQxIiwidCI6ImRiZDY2NjRkLTRlYjktNDZlYi05OWQ4LTVjNDNiYTE1M2M2MSIsImMiOjl9"
          allowFullScreen
        />
      </div>

      {/* ================= INPUTS ================= */}
      <div className="server-inputs">

        <select
          value={model}
          onChange={(e) => setModel(e.target.value)}
        >
          <option value="carrefour">Carrefour</option>
          <option value="aziza">Aziza</option>
        </select>

        <input
          placeholder="x1"
          value={x1}
          onChange={(e) => setX1(e.target.value)}
        />

        <input
          placeholder="x2"
          value={x2}
          onChange={(e) => setX2(e.target.value)}
        />

        <button onClick={handlePredict}>
          {loading ? "Predicting..." : "Run AI"}
        </button>
      </div>

      {/* ================= ERROR ================= */}
      {error && (
        <p className="server-error">
          {JSON.stringify(error)}
        </p>
      )}

      {/* ================= RESULT ================= */}
      {result && (
        <div className="server-card">
          <h3>📈 Prediction</h3>

          <p><b>Model:</b> {result.model}</p>

          <h1 className="server-result">
            {Number(result.prediction).toFixed(2)}
          </h1>
        </div>
      )}

      {/* ================= HISTORY ================= */}
      {history.length > 0 && (
        <div className="server-history">
          <h3>History</h3>

          <ul>
            {history.map((h, i) => (
              <li key={i}>
                {h.model} → {Number(h.prediction).toFixed(2)}
              </li>
            ))}
          </ul>
        </div>
      )}

    </div>
  );
};

export default ServerDashboard;
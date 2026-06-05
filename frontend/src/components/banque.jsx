import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBanquePrediction } from "../redux/banqueSlice";
import "./Banque.css";

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

function Banque() {
  const dispatch = useDispatch();

  const predictionData = useSelector(
    (state) => state.banque?.predictionData
  );
  const loading = useSelector(
    (state) => state.banque?.loading
  );
  const error = useSelector(
    (state) => state.banque?.error
  );

  useEffect(() => {
    dispatch(
      createBanquePrediction({
        x1: 10,
        x2: 2,
      })
    );
  }, [dispatch]);

  const chartData = predictionData
    ? [
        {
          name: "Banque",
          X1: predictionData.x1 || 0,
          X2: predictionData.x2 || 0,
          Prediction:
            predictionData.prediction || 0,
        },
      ]
    : [];

  return (
    <div className="banque-container">
      <h2 className="banque-title">
        🏦 Dashboard Banque
      </h2>

      <div className="powerbi-container">
        <iframe
          className="powerbi-frame"
          title="BANQUE"
          src="https://app.powerbi.com/view?r=eyJrIjoiNzU0YTRlZDMtYTlhMS00ZjEzLWI0MmMtMjZhMDJkZDYyYzg5IiwidCI6ImRiZDY2NjRkLTRlYjktNDZlYi05OWQ4LTVjNDNiYTE1M2M2MSIsImMiOjl9"
          frameBorder="0"
          allowFullScreen
        />
      </div>

      {loading && (
        <p className="loading">
          Loading prediction...
        </p>
      )}

      {error && (
        <p className="error">{error}</p>
      )}

      {!loading &&
        !error &&
        !predictionData && (
          <p className="waiting">
            ⏳ Waiting for prediction result...
          </p>
        )}

      {predictionData && (
        <>
          <div className="prediction-card">
            <h2 className="prediction-title">
              📌 Résultat
            </h2>

            <div className="prediction-value">
              {predictionData.prediction?.toFixed(
                2
              )}
            </div>
          </div>

          <div className="chart-container">
            <h2>
              📈 Comparaison X1, X2 vs
              Prédiction
            </h2>

            <ResponsiveContainer
              width="100%"
              height={350}
            >
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />

                <Bar
                  dataKey="X1"
                  fill="#2196F3"
                  name="X1"
                />

                <Bar
                  dataKey="X2"
                  fill="#FFC107"
                  name="X2"
                />

                <Bar
                  dataKey="Prediction"
                  fill="#FF4D4D"
                  name="Prédiction"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
}

export default Banque;
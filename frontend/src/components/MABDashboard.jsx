import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { predictData } from "../redux/predictSlice";
import "./Dashboard.css";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

const MABDashboard = () => {
  const dispatch = useDispatch();

  const { loading, result, error } = useSelector(
    (state) => state.predict
  );

  const handlePredict = () => {
    dispatch(
      predictData([
        1,2,3,4,5,
        6,7,8,9,10,
        11,12,13,14,15,
        16,17,18,19,20,
      ])
    );
  };

  const chartData = result
    ? [
        { name: "Confidence", value: result.percentage },
        { name: "Remaining", value: 100 - result.percentage },
      ]
    : [];

  return (
    <div className="ml-container">

      <h1 className="ml-title">
         Machine Learning Dashboard
      </h1>

      {/* POWER BI */}
      <div className="iframe-wrapper">
        <iframe
          className="ml-iframe"
          title="aliminuim"
          src="https://app.powerbi.com/view?r=eyJrIjoiNWI1M2RkMjctZWM3Mi00ODUyLThlZjgtMDYyMGI0YTI0MzIwIiwidCI6ImRiZDY2NjRkLTRlYjktNDZlYi05OWQ4LTVjNDNiYTE1M2M2MSIsImMiOjl9"
          frameBorder="0"
          allowFullScreen
        />
      </div>

      {/* BUTTON */}
      <div className="btn-wrapper">
        <button className="ml-button" onClick={handlePredict}>
           Predict
        </button>
      </div>

      {loading && <p className="loading">Chargement...</p>}

      {error && <p className="error">{JSON.stringify(error)}</p>}

      {result && (
        <>
          {/* PREDICTION CARD */}
          <div className="card">
            <h2>Résultat IA</h2>

            <p><strong>Prediction:</strong> {result.prediction}</p>
            <p><strong>Confidence:</strong> {result.confidence}</p>

            <div className="percentage">
              {result.percentage}%
            </div>
          </div>

          {/* PIE CHART */}
          <div className="chart-box">
            <PieChart width={380} height={300}>
              <Pie
                data={chartData}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={110}
                label
              >
                <Cell fill="#6366f1" />
                <Cell fill="#e5e7eb" />
              </Pie>

              <Tooltip />
              <Legend />
            </PieChart>
          </div>
        </>
      )}

    </div>
  );
};

export default MABDashboard
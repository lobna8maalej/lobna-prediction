import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlotData } from "../redux/plotSlice";

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

import "./plot.css";

export default function PlotDashboard() {

  const dispatch = useDispatch();

  const { loading, error, message, rows } = useSelector(state => state.plot);

  useEffect(() => {
    dispatch(fetchPlotData());
  }, [dispatch]);

  const chartData = rows.map((item) => ({
    name: `X${item.x}`,
    X: item.x,
    Y: item.y
  }));

  return (
    <div className="plot-container">

      {/* TITLE */}
      <h2 className="plot-title">📊 Power BI Dashboard</h2>

      {/* IFRAME */}
      <div className="plot-iframe-wrapper">
        <iframe
          className="plot-iframe"
          title="lobna@education"
          src="https://app.powerbi.com/view?r=eyJrIjoiNTlmODVhOTItODA3OC00MjZiLTg0MDktYzYwN2ZlNGYxMmMzIiwidCI6ImRiZDY2NjRkLTRlYjktNDZlYi05OWQ4LTVjNDNiYTE1M2M2MSIsImMiOjl9"
          allowFullScreen
        />
      </div>

      {/* STATUS */}
      {loading && <p className="plot-loading">Loading...</p>}
      {error && <p className="plot-error">{error}</p>}

      {!loading && !error && (
        <>
          <h3 className="plot-message">{message}</h3>

          {/* LIST */}
          <ul className="plot-list">
            {rows.map((item, index) => (
              <li key={index}>
                X: {item.x} | Y: {item.y}
              </li>
            ))}
          </ul>

          {/* CHART */}
          <h2 className="plot-subtitle">📈 Plot Graph</h2>

          <div className="plot-chart">
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="X" fill="#4f46e5" />
                <Bar dataKey="Y" fill="#ef4444" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
}
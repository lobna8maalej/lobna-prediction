import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCommerce } from "../redux/commerceSlice";
import "./Commerce.css";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

export default function Commerce() {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.commerce);

  const [filter, setFilter] = useState("Jumia");

  useEffect(() => {
    dispatch(fetchCommerce());
  }, [dispatch]);

  const filteredData = data
    ? data.filter((item) => item.commerce === filter)
    : [];

  return (
    <div className="commerce-container">

      {/* TITLE */}
      <h2 className="commerce-title">
        🛒 Commerce Dashboard
      </h2>

      {/* POWER BI */}
      <div className="iframe-wrapper">
        <iframe
          className="commerce-iframe"
          title="PRIX"
          src="https://app.powerbi.com/view?r=eyJrIjoiMzZkYWQwMTItNTU1ZC00YjMzLWFhNjAtMGM3MGNmNjRjYzJhIiwidCI6ImRiZDY2NjRkLTRlYjktNDZlYi05OWQ4LTVjNDNiYTE1M2M2MSIsImMiOjl9"
          frameBorder="0"
          allowFullScreen
        />
      </div>

      {/* FILTER */}
      <div className="filter-box">
        <h3>Filter Commerce</h3>

        <select
          className="filter-select"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="Jumia">Jumia</option>
          <option value="MG">MG</option>
        </select>
      </div>

      {/* CHART */}
      <div className="chart-box">
        <h2>📊 Commerce Chart</h2>

        {loading ? (
          <p className="loading">Loading...</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={filteredData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="commerce" />
              <YAxis />
              <Tooltip />

              <Bar dataKey="target" fill="#6366f1" />
              <Bar dataKey="prix" fill="#22c55e" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* LIST */}
      <div className="list-box">
        <h2>📌 Details</h2>

        <ul>
          {filteredData.map((item) => (
            <li key={item.id} className="list-item">
              {item.commerce} → Target: {item.target} | Prix: {item.prix}
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
}
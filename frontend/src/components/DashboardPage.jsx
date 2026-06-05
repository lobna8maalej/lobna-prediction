import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import DashboardNavbar from "./DashboardNavbar";

import MABDashboard from "./MABDashboard";
import Banque from "./Banque";
import CA from "./CA";
import PredictionForm from "./PredictionForm";
import Commerce from "./Commerce";
import TransactionDashboard from "./TransactionDashboard";
import VoyageDashboard from "./VoyageDashboard";
import WebDashboard from "./WebDashboard";
import VetementDashboard from "./VetementDashboard";
import ImmobilierDashboard from "./ImmobilierDashboard";
import RadioDashboard from "./RadioDashboard";
import ParapharmaDashboard from "./ParapharmaDashboard";
import ServerDashboard from "./ServerDashboard";
import PlotDashboard from "./PlotDashboard";
import EtudeDashboard from "./EtudeDashboard";
import CasaDashboard from "./CasaDashboard";
import InfoDashboard from "./InfoDashboard";

import Footer from "./Footer";
import "./DashboardPage.css";

const DashboardPage = () => {
  return (
    <div className="dashboard-page">

      <DashboardNavbar />

      <h1>Power BI & Prediction</h1>

      {/* CONTENT */}
      <div className="dashboard-content">

        <Routes>

          <Route path="/" element={<Commerce />} />

          <Route path="commerce" element={<Commerce />} />
          <Route path="mab" element={<MABDashboard />} />
          <Route path="banque" element={<Banque />} />
          <Route path="ca" element={<CA />} />
          <Route path="prediction" element={<PredictionForm />} />
          <Route path="transaction" element={<TransactionDashboard />} />
          <Route path="voyage" element={<VoyageDashboard />} />
          <Route path="web" element={<WebDashboard />} />
          <Route path="vetement" element={<VetementDashboard />} />
          <Route path="immobilier" element={<ImmobilierDashboard />} />
          <Route path="radio" element={<RadioDashboard />} />
          <Route path="parapharma" element={<ParapharmaDashboard />} />
          <Route path="server" element={<ServerDashboard />} />
          <Route path="plot" element={<PlotDashboard />} />
          <Route path="etude" element={<EtudeDashboard />} />
          <Route path="casa" element={<CasaDashboard />} />
          <Route path="info" element={<InfoDashboard />} />

          <Route path="*" element={<Navigate to="/dashboard/commerce" />} />

        </Routes>

      </div>

      {/* ✅ FOOTER ICI (CORRECT) */}
      <Footer />

    </div>
  );
};

export default DashboardPage;
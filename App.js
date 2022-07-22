import "./App.css";
import React from "react";
import DownloadInvoice from "./components/downloadInvoice";
import AppHeader from "./components/header";
import SubmitInvoice from "./components/submitInvoice";
import { Route, Routes } from "react-router-dom";
import Login from "./components/login";
import AuthProvider from "./auth/auth";
import ProtectedRoute from "./auth/protectedRoute";

function App() {
  return (
    <div>
      <AuthProvider>
        <AppHeader />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <SubmitInvoice />
              </ProtectedRoute>
            }
          />
          <Route
            path="submit"
            element={
              <ProtectedRoute>
                <SubmitInvoice />
              </ProtectedRoute>
            }
          />
          <Route
            path="download"
            element={
              <ProtectedRoute>
                <DownloadInvoice />
              </ProtectedRoute>
            }
          />
          <Route path="login" element={<Login />} />
          <Route
            path="*"
            element={
              <ProtectedRoute>
                <SubmitInvoice />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;

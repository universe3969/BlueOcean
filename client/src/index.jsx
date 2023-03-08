import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from "./components/App/App.jsx";
import { Auth0Provider } from "@auth0/auth0-react";


const root = createRoot(document.querySelector("#root"));
root.render(
<React.StrictMode>
  <BrowserRouter>
    <Routes>
      <Route
        path="/*"
        element={
          <Auth0Provider
          domain= {process.env.domain}
          clientId={process.env.clientId}
            authorizationParams={{
              redirect_uri: 'http://localhost:8080/home',
              audience: process.env.audience,
              scope: process.env.scope
            }}
           >
            <App />
          </Auth0Provider>}
      />
    </Routes>
  </BrowserRouter>
</React.StrictMode>
);



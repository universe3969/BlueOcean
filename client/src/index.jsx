import React from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App/App.jsx";
import { Auth0Provider } from "@auth0/auth0-react";


const root = createRoot(document.querySelector("#root"));
root.render(
  <Auth0Provider
    //required props for Auth0provider from Auth0 website
    domain= {process.env.domain}
    clientId={process.env.clientId}
    authorizationParams={{
      redirect_uri: window.location.origin,
      audience: process.env.audience,
      scope: process.env.scope
    }}
  >
    <App />
  </Auth0Provider>
);

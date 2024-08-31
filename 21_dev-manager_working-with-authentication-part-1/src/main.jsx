import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";
import "react-toastify/dist/ReactToastify.min.css";
import { ContactProvider } from "./context/Contact.context.jsx";
import { AuthProvider } from "./context/Auth.Context.jsx";
//== Dev Manager ==//
//1.CRUD
//2.Form Handling
//3.Remote API server connection and Handling
//4.Routing
//5.Context API
//6.Authentication(Registration, Login, Logout)
//7.Advance login - forgot password, password reset, email sending
//8.Image upload, pagination
//9.Search functionality
//10.Securely Identify the user(authorization)

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <ContactProvider>
        <App />
      </ContactProvider>
    </AuthProvider>
  </StrictMode>
);

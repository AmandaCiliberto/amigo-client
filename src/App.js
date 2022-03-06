import "./css/App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import RecommendationListPage from "./pages/RecommendationListPage";
import RecommendationDetailsPage from "./pages/RecommendationDetailsPage";
import EditRecommendationPage from "./pages/EditRecommendationPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import IsPrivate from "./components/IsPrivate"; // <== IMPORT
import IsAnon from "./components/IsAnon";
import Widgets from "./components/Widgets";

function App() {
  return (
    //following BEM convention
    <div className="app">
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <IsPrivate>
              <RecommendationListPage />
              <Widgets />
            </IsPrivate>
          }
        />

        <Route
          path="/recommendations"
          element={
            <IsPrivate>
              <RecommendationListPage />
              <Widgets />
            </IsPrivate>
          }
        />

        <Route
          path="/recommendations/:id"
          element={
            <IsPrivate>
              <RecommendationDetailsPage />
              <Widgets />
            </IsPrivate>
          }
        />

        <Route
          path="/recommendations/edit/:id"
          element={
            <IsPrivate>
              {" "}
              <EditRecommendationPage />{" "}
            </IsPrivate>
          }
        />

        <Route
          path="/signup"
          element={
            <IsAnon>
              {" "}
              <SignupPage />{" "}
            </IsAnon>
          }
        />
        <Route
          path="/login"
          element={
            <IsAnon>
              <LoginPage />
            </IsAnon>
          }
        />
      </Routes>
    </div>
  );
}

export default App;

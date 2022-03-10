import "./css/App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import RecommendationListPage from "./pages/RecommendationListPage";
import RecommendationDetailsPage from "./pages/RecommendationDetailsPage";
import EditRecommendationPage from "./pages/EditRecommendationPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import Profile from "./pages/Profile";
import IsPrivate from "./components/IsPrivate"; 
import IsAnon from "./components/IsAnon";
import Widgets from "./components/Widgets";

function App() {
  return (
    <div className="app">
      <Routes>

        <Route path="/" element={<HomePage />} />

        <Route
          path="/recommendations"
          element={
            <IsPrivate>
              <Navbar />
              <RecommendationListPage />
              <Widgets />
            </IsPrivate>
          }
        />

        <Route
          path="/recommendations/:id"
          element={
            <IsPrivate>
              <Navbar />
              <RecommendationDetailsPage />
              <Widgets />
            </IsPrivate>
          }
        />
        <Route
          path="/recommendations/edit/:id"
          element={
            <IsPrivate>
              <Navbar />
              <EditRecommendationPage />
            </IsPrivate>
          }
        />
        <Route
          path="/signup"
          element={
            <IsAnon>
              <SignupPage />
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

        <Route
          path="/profile"
          element={
            <IsPrivate>
              <Navbar />
              <Profile />
            </IsPrivate>
          }
        />
      </Routes>
    </div>
  );
}

export default App;

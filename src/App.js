import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import RecommendationListPage from "./pages/RecommendationListPage";
import RecommendationDetailsPage from "./pages/RecommendationDetailsPage";
import EditRecommendationPage from "./pages/EditRecommendationPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import IsPrivate from "./components/IsPrivate";  // <== IMPORT
import IsAnon from "./components/IsAnon"; 

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>      
        <Route path="/" element={ <HomePage /> } />
 
        {/*   UPDATE THE BELOW ROUTES   */}
        <Route
          path="/recommendations"
          element={ <IsPrivate> <RecommendationListPage /> </IsPrivate> } 
        />
 
        <Route
          path="/recommendations/:id"
          element={ <IsPrivate> <RecommendationDetailsPage /> </IsPrivate> }
        />
 
        <Route
          path="/recommendations/edit/:id"
          element={ <IsPrivate> <EditRecommendationPage /> </IsPrivate> } 
        />
        
        <Route path="/signup" element={<IsAnon> <SignupPage /> </IsAnon>} />
        <Route path="/login" element={<IsAnon> <LoginPage /> </IsAnon>} />
 
      </Routes>
    </div>
  );
}

export default App;

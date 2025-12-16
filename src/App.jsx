import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import NavBar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PageTransition from "./animations/PageTransition";
import BackToTopIcon from "./components/BacktoTopIcon";
import DentalChatbot from "./components/DentalChatbot";

function App() {
  const location = useLocation();

  return (
    <>
      <NavBar />

      {/* Page transition wrapper */}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <PageTransition>
                <Home />
              </PageTransition>
            }
          />

          <Route
            path="/about"
            element={
              <PageTransition>
                <About />
              </PageTransition>
            }
          />

          <Route
            path="/contact"
            element={
              <PageTransition>
                <Contact />
              </PageTransition>
            }
          />
        </Routes>
      </AnimatePresence>
      <BackToTopIcon />
      <DentalChatbot />
      <Footer />
    </>
  );
}

export default App;

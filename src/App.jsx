// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Requests from "./pages/Requests";
import Resources from "./pages/Resources";
import ScheduleBoard from "./pages/ScheduleBoard";
import Bookings from "./pages/Bookings";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Requests />} />
          <Route path="resources" element={<Resources />} />
          <Route path="schedule-board" element={<ScheduleBoard />} />
          <Route path="bookings" element={<Bookings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;


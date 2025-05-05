import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import Chatbot from './components/Chatbot';
import { OwnedSpaces } from './OwnedSpaces';
import SubscribedSpaces from './SubscribedSpaces';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/chat" element={<Chatbot />} />
        <Route path="/myspaces" element={<OwnedSpaces />} />
        <Route path="/mysubscriptions" element={<SubscribedSpaces />} />
      </Routes>
    </Router>
  );
};

export default AppRouter; 
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import TestAutomationShowcase from './components/TestAutomationShowcase';
import { ExplorerProvider } from './context/ExplorerContext';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <ExplorerProvider>
            <Layout />
          </ExplorerProvider>
        } />
        <Route path="/test-showcase" element={<TestAutomationShowcase />} />
      </Routes>
    </Router>
  );
}

export default App;

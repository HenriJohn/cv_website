import Layout from './components/Layout';
import { ExplorerProvider } from './context/ExplorerContext';

function App() {
  return (
    <ExplorerProvider>
      <Layout />
    </ExplorerProvider>
  );
}

export default App;

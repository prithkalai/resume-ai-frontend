import Dashboard from "./components/Dashboard";
import Layout from "./Layout";

function App() {
  return <Layout child={<Dashboard />} />;
}

export default App;

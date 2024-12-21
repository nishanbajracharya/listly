import { Router } from 'wouter';

import Shell from './components/Shell';

function App() {
  return (
    <Router base="/listly">
      <Shell />
    </Router>
  );
}

export default App;

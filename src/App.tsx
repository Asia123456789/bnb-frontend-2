// src/App.tsx
import { Outlet, Link } from 'react-router-dom';

function App() {
  return (
    <div>
      <nav>
        <Link to="/">Properties</Link> | <Link to="/login">Login</Link>
      </nav>
      <hr />
      <Outlet />
    </div>
  );
}

export default App;

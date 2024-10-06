import { Routes, Route } from 'react-router';
import { Toaster } from 'react-hot-toast';
import Username from './pages/Username';
import Register from './pages/Register';
import Password from './pages/Password';
import Profile from './pages/Profile';
import Recovery from './pages/Recovery';
import Reset from './pages/Reset';
import PageNotFound from './pages/PageNotFound';

function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Username />} />
        <Route path="/register" element={<Register />} />
        <Route path="/password" element={<Password />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/recovery" element={<Recovery />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Toaster position="top-center" reverseOrder={false} />
    </main>
  );
}

export default App;

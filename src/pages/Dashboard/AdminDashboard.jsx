import { useAuth } from '../../context/AuthContext';

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  
  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif' }}>
      <h1>Admin Dashboard</h1>
      <p>Welcome, {user?.firstName} {user?.lastName}!</p>
      <button onClick={logout} style={{ padding: '8px 16px', background: '#e11d48', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
        Logout
      </button>
    </div>
  );
}

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../utils/axios';

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await API.post('/auth/login', form);

    const { token, ...user } = res.data;
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);

    // ✅ Redirect based on user role
    if (user.role === 'admin') {
      navigate('/admin', { state: { message: 'Welcome Admin!' } });
    } else {
      navigate('/', { state: { message: 'Logged in successfully!' } });
    }
  } catch (err) {
    setError(err.response?.data?.message || 'Login failed');
  }
};


  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-3">
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" type="email" required />
        <input name="password" value={form.password} onChange={handleChange} placeholder="Password" type="password" required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../utils/axios';

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/register', form);
      const { token, ...user } = res.data;
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', res.data.token);
      navigate('/', { state: { message: 'Account created successfully!' } });
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Register</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-3">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" type="email" required />
        <input name="password" value={form.password} onChange={handleChange} placeholder="Password" type="password" required />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

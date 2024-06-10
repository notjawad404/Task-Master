import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            axios.post('http://localhost:5000/auth/login', {
                email,
                password
            }).then((response) => {
                alert(response.data.message);
                navigate('/');
            });
        }
        catch (error) {
            console.error('Error:', error);
            alert('Error logging in');
        }

    }
    
  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
           <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
             <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
             <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 px-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Password</label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 px-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Login
              </button>
            </form>
          </div>
        </div>

    </div>
  )
}

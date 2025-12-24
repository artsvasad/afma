import React, { useState } from 'react';
import api from '../../api/axios';

const Login = ({ onLoginSuccess, onCancel }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/auth/login', { username, password });
            localStorage.setItem('token', res.data.token);
            onLoginSuccess();
        } catch (err) {
            setError('Invalid Username or Password');
        }
    };

    return (
        <div style={overlayStyle}>
            <div style={modalStyle}>
                <h2>Admin Login</h2>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} style={inputStyle} />
                    <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} style={inputStyle} />
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <button type="submit" style={btnStyle}>Login</button>
                        <button type="button" onClick={onCancel} style={{ ...btnStyle, background: '#718096' }}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const overlayStyle = { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 3000 };
const modalStyle = { background: 'white', padding: '30px', borderRadius: '8px', width: '300px', color: '#333' };
const inputStyle = { padding: '10px', borderRadius: '4px', border: '1px solid #ccc' };
const btnStyle = { padding: '10px', background: '#3182ce', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', flex: 1 };

export default Login;
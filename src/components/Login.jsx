import {useEffect, useState} from 'react';
import loginStyle from "../styles/loginStyle.js";
import { useNavigate } from 'react-router-dom';
import { logUser as APILogin } from "../data/index.js";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState({ status: false, message: "" });
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token') !== null) {
            localStorage.removeItem('token');
            localStorage.removeItem('username');
        }
    }, []);

    const onButtonClick = async (e) => {
        e.preventDefault();
        try {
            const token = await APILogin(email, password);
            localStorage.setItem('token', token);
            localStorage.setItem('username', email);
            setError({ status: false, message: "" });
            navigate('/welcome/');
            window.location.reload();
        } catch (e) {
            setError({ status: true, message: e.message });
        }
    };

    return (
        <div style={loginStyle.page}>
            <h1 style={loginStyle.mainTitle}>EventFlow</h1>
            <div style={loginStyle.container}>
                <div style={loginStyle.title}>Login</div>
                <form onSubmit={onButtonClick} style={{ width: "100%" }}>
                    <div style={loginStyle.inputContainer}>
                        <input
                            type="email"
                            value={email}
                            placeholder="Enter your email here"
                            onChange={(ev) => setEmail(ev.target.value)}
                            style={loginStyle.inputBox}
                            autoComplete="email"
                        />
                    </div>
                    <div style={loginStyle.inputContainer}>
                        <input
                            type="password"
                            value={password}
                            placeholder="Enter your password here"
                            onChange={(ev) => setPassword(ev.target.value)}
                            style={loginStyle.inputBox}
                            autoComplete={"current-password"}
                        />
                    </div>
                    {error.status && <div style={loginStyle.error}>{error.message}</div>}
                    <div style={loginStyle.inputContainer}>
                        <button type="submit" style={loginStyle.inputButton}>
                            Log in
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
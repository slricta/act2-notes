import React, {useState} from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    // Handle Login
    const handleLogin = async (e) => {
        e.preventDefault();
        try{
            const res = await axios.post("http://localhost:3000/auth/login", {email, password});
            console.log(res.data);
            localStorage.setItem("token", res.data.access_token);
            navigate("/home");
        } catch (err) {
            alert("Invalid credentials");
        }
    }

return (
    <div className="container">
        <h1 className="name">notes</h1>
        <form onSubmit={handleLogin}>
            {/* email */}
            <input type="email" placeholder="email" value={email}
            onChange={(e) => setEmail(e.target.value)} required></input>

            {/* password */}
            <input type={showPassword ? "text" : "password"} placeholder="password" value={password}
            onChange={(e) => setPassword(e.target.value)} required></input>
            
            
            {/* show password checkbox */}
            <div className="showPass">
            <label>
                <input type="checkbox" checked={showPassword} onChange={(e) => setShowPassword(e.target.checked)} />
                show password
            </label>
            </div>
            <div className="formAction">
            <button className="submit" type="submit"><span>login</span></button>
            </div>
        </form>
        <p>don't have an account? <Link to="/signup" className="links">sign up</Link></p>
    </div>
);
}

export default Login;
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        // Handle Signup
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        try{
            // API call to register
            await axios.post("http://localhost:3000/auth/register", { username, email, password });
            alert("Signup successful! Please login.");
            navigate("/");
        } catch (err){
            alert("Error: " + err.response?.data?.message || "Something went wrong");
        }
    };

return (
    <div className="container">
        <h1 className="name">notes</h1>
        <form onSubmit={handleSignup}>
            {/* usermame input */}
            <input type="text" placeholder="username" value={username}
            onChange={(e) => setUsername(e.target.value)} required></input>
            
            {/* email input */}
            <input type="email" placeholder="email" value={email}
            onChange={(e) => setEmail(e.target.value)} required></input>

            {/* password input */}
            <input type={showPassword ? "text" : "password"} placeholder="password" value={password}
            onChange={(e) => setPassword(e.target.value)} required></input>

            {/* confirm password input */}
            <input type={showPassword ? "text" : "password"} placeholder="confirm password" value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)} required></input>

            {/* show password checkbox */}
            <div className="showPass">
            <label>
                <input type="checkbox" checked={showPassword} onChange={(e) => setShowPassword(e.target.checked)} />
                show password
            </label>
            </div>

            <div className="formAction">
            <button className="submit" type="submit"><span>signup</span></button>
            </div>
            <p>already have an account? <Link to="/" className="links">login</Link></p>
        </form>
    </div>
);
}

export default Signup;
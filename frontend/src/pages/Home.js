import React from 'react';
import '../App.css';
import image from "../images/utd_background.jpg";

const Home = props => {
    return(
        <div className = "Home" style={{ backgroundImage: `url(${image})` }}>
            <div className = "box">
                <h1 align = "left">UTD Tutoring</h1>
                <h2 align = "left">For UTD Students by UTD Students</h2>
                <a href="/Signup">
                    <button className="b">Register</button>
                </a>
                <a href="/Login">
                    <button className="b">Log In</button>
                </a>
                <button className="b">Learn More</button>
            </div>
        </div>
    )
}

export default Home;
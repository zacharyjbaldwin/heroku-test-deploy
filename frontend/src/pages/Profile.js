import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../shared/context/auth-context";

const Profile = props => {

    const ctx = useContext(AuthContext);

    return (
        <React.Fragment>
            <h2>Profile</h2>
            <p>Logged in? {ctx.isLoggedIn ? 'yes' : 'no'}</p>
            <p>Hello there, {ctx.firstName} {ctx.lastName}.</p>
            <p>Your user id is {ctx.userId}</p>
            <p>Your email is {ctx.email}</p>
            <p>You are {ctx.isAdmin ? '' : 'not'} an admin. {ctx.isAdmin ? <Link to="/admin">(Admin Panel)</Link> : ''}</p>
            <p>You are {ctx.isTutor ? '' : 'not'} a tutor.</p>
            <p>Your token begins with <strong>{ctx.token.substring(0, 20)}</strong>...</p>
            <Link to="/tutorsignup">{ctx.isTutor ? 'Edit your tutor profile' : 'Become a tutor'}</Link>
        </React.Fragment>
    );
};

export default Profile;
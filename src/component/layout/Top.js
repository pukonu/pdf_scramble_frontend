import React from "react";
import {Link} from "react-router-dom";

export const Top = () => {
    return (
        <header>
            <div className="navbar navbar-dark bg-dark shadow-sm">
                <div className="container d-flex justify-content-between" style={{ width: 1000 }}>
                    <Link to="/" className="navbar-brand d-flex align-items-center">
                        {/* Vector logo goes here */}
                        <strong>vector.ai</strong>
                    </Link>
                </div>
            </div>
        </header>
    )
};
import React from "react";
import {Link} from "react-router-dom";


export const Empty = ({ icon, text, header, addButton }) => {

    return (
        <div className="col-12 mt100 pb20 div-h-100p d-flex align-content-center justify-content-center">
            <div>
                <div className="text-center" style={{ marginTop: 20, marginBottom: 20 }}>
                    <img src={icon} alt="icon" height={100} />
                </div>
                <div className="text-center" style={{ marginTop: 20, marginBottom: 20 }}>
                    <div className="font-open-sans fs16 mt10">
                        No items found
                    </div>
                </div>
            </div>
        </div>
    )
};
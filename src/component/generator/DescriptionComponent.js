import React from "react";
import classNames from "classnames";

export const DescriptionComponent = ({ children, className }) => (
    <div className={ classNames(className) } style={{ paddingTop: 20 }}>
        {children}
    </div>
);
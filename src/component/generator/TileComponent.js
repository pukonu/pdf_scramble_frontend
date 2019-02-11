import React from 'react';
import classNames from "classnames";
import {API} from "../../config/environment";


export const TileComponent = ({ value }) => (
    <div
        id={value.v}
        style={tileCard}
        className={classNames("StackedListItem--isDraggable")}>
        <img
            style={{ padding: 4, paddingBottom: 0, width: "100%" }}
            src={`${API.development}/${value.tilePath}/tmp-${value.v}.jpg`}
            alt={`tile ${value.v}`} />
        <span style={{ padding: 4, paddingTop: 0, color: "#555", fontSize: 12, fontWeight: "bold" }}>Page: {value.v}</span>
    </div>
);

const tileCard = {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    borderWidth: 1,
    backgroundColor: "#EDEDED",
    borderColor: "#CCC",
    cursor: "pointer",
};
import React, {Component} from 'react';
import {Loading, List} from "../common";
import {TileComponent} from "./TileComponent";

class TileGroupComponent extends Component {

    renderTiles() {
        let isLoading = false;
        if (!isLoading) {
            return (
                <List
                    custom={{ type: this.props.type }}
                    listTitle={this.props.title}
                    itemRenderer={TileComponent}
                    data={this.props.pages}
                />
            )
        } else {
            return <Loading />
        }
    }

    render() {
        return <div style={this.props.style} className={this.props.className}>{ this.renderTiles() }</div>
    }
}

export {TileGroupComponent};
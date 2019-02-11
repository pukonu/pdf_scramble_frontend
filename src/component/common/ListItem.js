import React, {Component} from 'react';

class _ListItem extends Component {
    render() {
        return (
            <li className="list-group-item" dangerouslySetInnerHTML={{ __html: this.props.value.label }}>
                Something
            </li>
        )
    }
}

const ListItem = _ListItem;
export {ListItem};
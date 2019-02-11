import React, {Component} from 'react';
import _ from "lodash";
import {Loading} from "./Loading";
import {ListItem} from "./ListItem";
import {Empty} from "./Empty";
import {DebounceInput} from "react-debounce-input";

class _List extends Component {

    state = {
        apiEndpoint: null,
        params: [],
        isLoading: true,
        isListLoading: false,
        serverProcessing: false,
        placeholder: "search...",
        data: [],
        listItems: [],
        map: {label: "name"},
        emptyObject: {
            icon: "/icons/file-folder1.svg",
            text: "List is empty"
        },
        limit: 25
    };

    componentWillMount() {
        console.log("component has mounted -  List");
        let listItems = null;
        if (!this.props.apiEndpoint) {
            listItems = (this.props.data && this.props.data.length > 0) ? this.props.data.map(this.buildListItems.bind(this)) : null;
        }

        this.setState({
            ...this.props,
            isLoading: false,
            listItems
        });

        if (this.props.serverProcessing) {
            this.onLookupFromServer("")
        }
    }

    componentWillReceiveProps(nextProps) {
        let listItems = null;
        if (!this.props.apiEndpoint) {
            listItems = (nextProps.data && nextProps.data.length > 0) ? nextProps.data.map(this.buildListItems.bind(this)) : null;
        }

        this.setState({
            ...nextProps,
            isLoading: false,
            listItems
        });

        if (nextProps.serverProcessing) {
            this.onLookupFromServer("")
        }
    }

    onItemAction(e) {
        this.props.onItemAction && this.props.onItemAction(e)
    }

    onSearch(e) {
        if (this.props.onSearch) {

            this.props.onSearch(e)

        } else {
            const searchValue = e.target.value.toLowerCase();

            if (this.state.serverProcessing === false) {

                // run search using the _.map function on the label,
                // use _.without to prevent undefined value from showing in the result
                const newData = _.without(
                    _.map(this.state.data, ob => (ob.label.toLowerCase().indexOf(searchValue) > -1) ? ob : undefined),
                    undefined
                );

                this.setState({
                    listItems: newData.map(this.buildListItems)
                });

            } else {
                this.onLookupFromServer(searchValue)
            }
        }
    }

    buildListItems(value, index) {
        const { itemRenderer } = this.props;

        if (itemRenderer) {
            const Item = itemRenderer;
            return <Item
                {...this.props}
                key={`key__listItem__${index}`}
                value={value}
                onItemAction={this.onItemAction.bind(this)} />
        } else {
            return <ListItem
                {...this.props}
                key={`key__listItem__${index}`}
                value={value}
                onItemAction={this.onItemAction.bind(this)} />
        }
    }

    renderListView() {
        if (this.state.listItems) {
            return this.state.listItems;
        } else {
            return <Empty { ...this.state.emptyObject } />
        }
    }

    renderIsViewLoading() {
        if (this.state.isListLoading === false) {
            return (
                <div className="card-body p-0 wit-list-body pb10" style={{ height: "100%", overflowY: "scroll" }}>
                    <ul
                        className="list-group list-group-flush br-t wit-list-content StackedList"
                        style={{ height: "100%" }}>

                        {this.renderListView()}
                    </ul>
                </div>
            )
        } else {
            return (
                <div className="card-body p-0">
                    <Loading />
                </div>
            )
        }
    }

    renderView() {
        const { listTitle } = this.props;
        if (this.state.isLoading === false) {
            return (
                <div className="card wit-list" style={{ height: "100%" }}>
                    <div className="card-header">
                        <div className="card-title">
                            <span className="font-montserrat bold fs14">{listTitle}</span>
                        </div>
                        {this.props.menu}
                    </div>
                    {this.renderIsViewLoading()}
                </div>
            )
        } else {
            return <Loading />
        }
    }

    render() {
        return this.renderView()
    }
}

const List = _List;
export {List};
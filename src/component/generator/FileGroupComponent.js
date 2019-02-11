import React, {Component} from "react";
import {connect} from "react-redux";
import {Sortable, Plugins} from '@shopify/draggable';
import {rxPushArrangement} from "../../store/actions";
import {TileGroupComponent} from "./TileGroupComponent";
import {Loading} from "../common";

class __ extends Component {

    // get file groupings from redux
    state = {
        isLoading: null,
        res: {
            folder_name: "",
            pdf_document_group: [],
        },
        tilePath: "",
        arrangement: null,
    };

    constructor(props) {
        super(props);
        this.dragabbleContainer = null;
        this.sortable = null;
    }

    componentWillUpdate() {
        try {
            this.sortable.destroy();
        } catch (e) {}
    }

    componentDidUpdate() {
        this.initializeDragabble();
    }

    initializeDragabble() {
        this.dragabbleContainer = document.querySelectorAll('#MultipleContainers .StackedList');
        let lastOverContainer;

        if (this.dragabbleContainer.length === 0) {
            return false;
        }

        this.sortable = new Sortable(this.dragabbleContainer, {
            draggable: `.${Classes.draggable}`,
            mirror: {
                constrainDimensions: true,
            },
            plugins: [Plugins.ResizeMirror],
        });

        // let alphaChildren, betaChildren, gammaChildren;
        const groupNum = 3;

        // --- Draggable events --- //
        this.sortable.on('drag:stop', (evt) => {
            lastOverContainer = evt.sourceContainer;

            // move this values into redux
            const groupChildren = [];
            for (let i=0; i<groupNum; i++) {
                groupChildren.push(this.sortable.getDraggableElementsForContainer(this.sortable.containers[i]))
            }
            this.props.rxPushArrangement({groupChildren, folderName: this.state.res.folder_name});
        });

        this.sortable.on('sortable:sorted', (evt) => {
            if (lastOverContainer === evt.dragEvent.overContainer) {
                return;
            }

            lastOverContainer = evt.dragEvent.overContainer;
        });

        return this.sortable;
    }

    renderTileGroup() {
        if (this.props.rx && this.props.rx.isFileError === true) {

            return (
                <div style={{ marginTop: 20 }} className="alert alert-danger">
                    An error occurred with your upload, file is either not a PDF document, too large or a network
                    failure occurred
                </div>
            )

        } else if (this.props.rx && this.props.rx.isFileLoading === true) {

            return <div style={{ marginTop: 20 }}><em className="text-danger">We are processing your data, please wait...</em></div>

        } else if (this.props.rx && this.props.rx.isFileLoading === false) {
            const { fileResponse } = this.props.rx;

            return (
                <div style={{ marginTop: 20 }}>
                    <div id="MultipleContainers" className="row">
                        <div className="col-4">
                            <TileGroupComponent
                                style={draggableClasses.fileGroupBody}
                                className="StackedListWrapper StackedListWrapper--sizeMedium StackedListWrapper--hasScrollIndicator Container"
                                title="Group - Alpha"
                                tilePath={fileResponse.folder_name}
                                pages={fileResponse.pdf_document_group[0].map(v => { return { v, tilePath: fileResponse.folder_name }}) } />
                        </div>
                        <div className="col-4">
                            <TileGroupComponent
                                style={draggableClasses.fileGroupBody}
                                className="StackedListWrapper StackedListWrapper--sizeMedium StackedListWrapper--hasScrollIndicator Container"
                                title="Group - Beta"
                                tilePath={fileResponse.folder_name}
                                pages={fileResponse.pdf_document_group[1].map(v => { return { v, tilePath: fileResponse.folder_name }}) } />
                        </div>
                        <div className="col-4">
                            <TileGroupComponent
                                style={draggableClasses.fileGroupBody}
                                className="StackedListWrapper StackedListWrapper--sizeMedium StackedListWrapper--hasScrollIndicator Container"
                                title="Group - Gamma"
                                tilePath={fileResponse.folder_name}
                                pages={fileResponse.pdf_document_group[2].map(v => { return { v, tilePath: fileResponse.folder_name }})} />
                        </div>
                    </div>
                </div>
            );

        } else {

            return <div>&nbsp;</div>

        }
    }

    render() {
        return this.renderTileGroup()
    }
}

const Classes = {
    draggable: 'StackedListItem--isDraggable',
    capacity: 'draggable-container-parent--capacity',
};

const draggableClasses = {
    fileGroupBody: {
        height: 700,
        marginBottom: 10,
    }
};

const mstp = (state) => {
    return {
        rx: state.fileReducer,
    }
};

const FileGroupComponent = connect(mstp, { rxPushArrangement })(__);
export {FileGroupComponent};
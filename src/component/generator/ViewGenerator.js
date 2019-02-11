import React, {Component} from 'react';
import {UploaderComponent} from "./UploaderComponent";
import {DescriptionComponent} from "./DescriptionComponent";
import {FileGroupComponent} from "./FileGroupComponent";
import {ProcessComponent} from "./ProcessComponent";

class ViewGenerator extends Component {
    render() {
        return (
            <div className="container" style={{ width: 1000 }}>
                <DescriptionComponent>
                    This is a simple multi-page PDF file processor
                </DescriptionComponent>

                <UploaderComponent/>

                <FileGroupComponent />

                <DescriptionComponent>
                    <div className="alert alert-info">
                        <em>
                            You can rearrange each file by dragging and dropping the thumbs within each group, to other
                            parts of the-same group or to a different group.<br/><br/>
                            You will see a <b>Process Update</b> button after re-arranging the file
                        </em>
                    </div>
                </DescriptionComponent>

                <ProcessComponent />
            </div>
        )
    }
}

export {ViewGenerator}
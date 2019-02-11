import React, {Component} from "react";
import {connect} from "react-redux";
import classNames from 'classnames';
import Dropzone from "react-dropzone";
import request from "superagent";
import {API} from "../../config/environment"
import {rxLoadFile, rxPushArrangement, rxPushResetArrangement} from "../../store/actions/FileActions";

class __ extends Component {
    onDrop = (files) => {
        const req = request.post(`${API.development}/thumbnail-generator/generate`);

        this.props.rxPushResetArrangement();
        this.props.rxLoadFile({ fileResponse: null, isFileLoading: true });

        req.attach("pdf_file", files[0])
            .on('error', (err) => {
                this.props.rxLoadFile({ fileResponse: {}, isFileLoading: null, isFileError: true })
            })
            .then(res => {
                this.props.rxLoadFile({ fileResponse: res.body, isFileLoading: false })
            });
    };

    render() {
        return (
            <div style={{ marginTop: 20 }}>
                <Dropzone accept="application/pdf" onDrop={this.onDrop}>
                    {({getRootProps, getInputProps, isDragActive}) => {
                        return (
                            <div
                                {...getRootProps()}
                                style={baseStyle}
                                className={classNames('dropzone', {'dropzone--isActive': isDragActive})}
                            >
                                <input {...getInputProps()} />
                                {
                                    isDragActive ?
                                        <p>Drop your file here...</p> :
                                        <p>Vector.ai Drag and drop a file here (PDF files only)</p>
                                }
                            </div>
                        )
                    }}
                </Dropzone>
            </div>
        );
    }
}

const baseStyle = {
    width: "100%",
    height: 120,
    padding: 30,
    borderWidth: 2,
    borderColor: '#666',
    borderStyle: 'dashed',
    borderRadius: 5
};

const mstp = (state) => {
    return {
        rx: state.fileReducer,
    }
};

const UploaderComponent = connect(mstp, { rxLoadFile, rxPushArrangement, rxPushResetArrangement })(__);
export {UploaderComponent};
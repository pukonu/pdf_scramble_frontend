import React, {Component} from "react";
import {connect} from "react-redux";
import _ from "lodash";
import request from "superagent";
import {API} from "../../config/environment";
import {rxPushArrangement} from "../../store/actions";

class __ extends Component {

    state = {
        downloads: null,
    };

    shouldComponentUpdate(nextProps, nextState) {
        return !_.isEqual(this.props.rx.arrangement, nextProps.rx.arrangement) ||
            !_.isEqual(this.state.downloads, nextState.downloads);
    }

    processFile() {
        const { fileResponse, arrangement } = this.props.rx;
        const req = request.post(`${API.development}/thumbnail-generator/rearrange`);

        req.send({arrangement, folderName: fileResponse.folder_name }).then(res => {
            this.setState({ downloads: res.body.downloads });
        });
    }

    renderDownloadLinks() {
        const { downloads } = this.state;
        const isArrangement = !!this.props.rx.arrangement.length;

        if (!isArrangement) {

            return <div>&nbsp;</div>;

        } else if (downloads) {

            return (
                <div>
                    Download Files:
                    {
                        downloads.map(
                            v => <a
                                key={`id__${v.filename}`}
                                style={{marginLeft: 15}}
                                href={v.download_link}
                                rel="noopener noreferrer"
                                target="_blank"
                                download={`${v.filename}.pdf`} >
                                    {v.filename}
                            </a>
                        )
                    }
                </div>
            )

        } else {
            return (
                <div>
                    <div>
                        <button className="btn btn-primary" onClick={this.processFile.bind(this)}>Process Update</button>
                    </div>
                    <div>
                        No file(s) to download yet, to download a file process the changes that has been made first, by
                        clicking the <b>Process Update</b> button above
                    </div>
                </div>
            )
        }
    }

    render() {
        return (
            <div style={{ marginTop: 20, marginBottom: 30 }}>
                {this.renderDownloadLinks()}
            </div>
        );
    }
}

const mstp = (state) => {
    return {
        rx: state.fileReducer,
    }
};

const ProcessComponent = connect(mstp, { rxPushArrangement })(__);
export {ProcessComponent};
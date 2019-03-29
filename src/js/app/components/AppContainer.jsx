/*
 *  black-duck-radar
 *
 *  Copyright (c) 2019 Synopsys, Inc.
 *
 *  Licensed to the Apache Software Foundation (ASF) under one
 *  or more contributor license agreements. See the NOTICE file
 *  distributed with this work for additional information
 *  regarding copyright ownership. The ASF licenses this file
 *  to you under the Apache License, Version 2.0 (the
 *  "License"); you may not use this file except in compliance
 *  with the License. You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing,
 *  software distributed under the License is distributed on an
 *  "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 *  KIND, either express or implied. See the License for the
 *  specific language governing permissions and limitations
 *  under the License.
 */

import React, { Component } from 'react';
import { collapsedFrame, expandedFrame } from 'css/frame';
import PropTypes from 'prop-types';
import { FRAME_ID, HEADER_ID, ROOT_ID } from 'shared/constants';
import { connect } from 'react-redux';
import Frame from 'react-frame-component';
import Tab from 'app/models/tab';
import { showFrame } from 'shared/actions/app';
import { unloadAppAlias } from 'app/store/actions/alias-actions';
import App from './App';
import { withRouter } from 'react-router';

const initialContent = `<!DOCTYPE html><html><head></head><body><div id="${ROOT_ID}"></div></body></html>`;

class AppContainer extends Component {
    static contextTypes = {
        store: PropTypes.object,
        router: PropTypes.object
    };

    static propTypes = {
        isVisible: PropTypes.bool,
        unloadApp: PropTypes.func.isRequired,
        showFrame: PropTypes.func.isRequired
    };

    static defaultProps = {
        isVisible: false
    };

    constructor(props) {
        super(props);
        this.bindUnloadListener();
        this.onContentMount = this.onContentMount.bind(this);
    }

    bindUnloadListener() {
        window.addEventListener('beforeunload', () => {
            this.props.unloadApp();
        });
    }

    insertStyles() {
        const header = document.getElementById(HEADER_ID);
        const frame = document.getElementById(FRAME_ID);
        frame.contentDocument.head.appendChild(header.cloneNode(true));
    }

    onContentMount() {
        this.insertStyles();
        // We defer the frame reveal to smooth out the transition
        setTimeout(this.props.showFrame, 800);
    }

    render() {
        const { isVisible } = this.props;
        const frameClass = isVisible ? expandedFrame : collapsedFrame;
        return (
            <Frame
                id={FRAME_ID}
                className={frameClass} // eslint-disable-line react/forbid-component-props
                mountTarget={`#${ROOT_ID}`}
                initialContent={initialContent}
                contentDidMount={this.onContentMount}
            >
                <App />
            </Frame>
        );
    }
}

const mapStateToProps = ({ frameVisibilityMap = {} }) => {
    return {
        isVisible: frameVisibilityMap[Tab.getId()]
    };
};

const mapDispatchToProps = (dispatch) => {
    const tabId = Tab.getId();
    return {
        showFrame: () => {
            dispatch(showFrame(tabId));
        },
        unloadApp: () => {
            dispatch(unloadAppAlias(tabId));
        }
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AppContainer));

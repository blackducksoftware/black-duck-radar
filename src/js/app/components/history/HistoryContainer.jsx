/* eslint-disable */
// Not currently being used
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class HistoryContainer extends Component {
    static contextTypes = {
        store: PropTypes.object,
        router: PropTypes.object
    };

    render() {
        return <div>Test History Component</div>;
    }
}

const mapStateToProps = () => {
    return {};
};

const mapDispatchToProps = () => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HistoryContainer);
/* eslint-enable */

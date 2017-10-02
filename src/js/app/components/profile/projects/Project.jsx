import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { clickableRow, statusBar } from 'css/common/rows';
import { leftFloat, nameLabel } from 'css/project/row';

class Project extends Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        version: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        phase: PropTypes.string.isRequired
    };

    shouldComponentUpdate() {
        return true;
    }

    render() {
        const { name, version, url, phase } = this.props;
        const textArray = [name, ' ', version, ' ', ' | ', phase];
        const text = ''.concat(...textArray);
        return (
            <div className={clickableRow}>
                <div className={leftFloat}>
                    <span className={statusBar} />
                    <a className={nameLabel} title={text} href={url} target='_blank' rel='noopener noreferrer'>
                        {text}
                    </a>
                </div>
            </div>
        );
    }
}

export default Project;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { clickableRow, statusBar } from 'css/common/rows';
import { leftFloat, nameLabel } from 'css/project/row';

class Project extends Component {
    static propTypes = {
        name: PropTypes.string.isRequired
    };

    shouldComponentUpdate() {
        return true;
    }

    render() {
        const { name } = this.props;
        return (
            <div className={clickableRow}>
                <div className={leftFloat}>
                    <span className={statusBar} />
                    <span className={nameLabel} title={name}>
                        {name}
                    </span>
                </div>
            </div>
        );
    }
}

export default Project;

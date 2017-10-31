import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SectionHeader from './SectionHeader';
import Policy from './Policy';
import {
    paddedBlock,
    maskBlock,
    collapsedBlock,
    expandedBlock
} from 'css/common/blocks';

class Section extends Component {
    static propTypes = {
        policyList: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.object),
            PropTypes.string
        ])
    };

    static defaultProps = {
        policyList: []
    };

    constructor(props) {
        super(props);
        this.handleHeaderClick = this.handleHeaderClick.bind(this);
        this.state = {
            isExpanded: true
        };
    }

    getPolicies(count) {
        if (!count) {
            return null;
        }

        const { policyList } = this.props;

        return [
            policyList.map((policy) => {
                return (
                    <Policy
                        name={policy.name}
                    />
                );
            })
        ];
    }

    handleHeaderClick() {
        const isExpanded = !this.state.isExpanded;
        this.setState({ isExpanded });
    }

    render() {
        const { policyList } = this.props;
        const count = Array.isArray(policyList) ? policyList.length : 0;

        const collapsibleState = this.state.isExpanded ? expandedBlock : collapsedBlock;

        return (
            <div className={paddedBlock}>
                <SectionHeader handleClick={this.handleHeaderClick} count={count} isExpanded={this.state.isExpanded} />
                <div className={maskBlock}>
                    <div className={collapsibleState}>
                        { this.getPolicies(count) }
                    </div>
                </div>
            </div>
        );
    }
}

export default Section;

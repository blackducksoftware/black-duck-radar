import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { VULN_SEVERITIES } from 'shared/constants';
import SectionHeader from './SectionHeader';
import RowHeader from './RowHeader';
import Vulnerability from './Vulnerability';
import {
    paddedBlock,
    maskBlock,
    collapsedBlock,
    expandedBlock
} from 'css/common/blocks';

class Section extends Component {
    static propTypes = {
        vulnerabilityList: PropTypes.object
    };

    static defaultProps = {
        vulnerabilityList: undefined
    };

    constructor(props) {
        super(props);
        this.handleHeaderClick = this.handleHeaderClick.bind(this);
        this.state = {
            isExpanded: true
        };
    }

    getVulnerabilities(targetSeverity, totalCount) {
        if (!totalCount) {
            return null;
        }

        const { vulnerabilityList } = this.props;
        const keyList = Object.keys(vulnerabilityList);
        const filteredList = keyList.filter(key => vulnerabilityList[key].severity === targetSeverity.toUpperCase());
        const count = filteredList.length;

        if (!count) {
            // If there aren't any vulnerabilities matching this targetSeverity, don't
            // render heading
            return null;
        }

        return [
            <RowHeader severity={targetSeverity} count={count} key={targetSeverity} />,
            filteredList.map((key) => {
                const {
                    vulnerabilityName,
                    severity,
                    source,
                    detailsUrl,
                    vulnerabilityPublishedDate,
                    vulnerabilityUpdatedDate
                } = vulnerabilityList[key];
                return (
                    <Vulnerability
                        name={vulnerabilityName}
                        severity={severity}
                        source={source}
                        url={detailsUrl}
                        created={vulnerabilityPublishedDate}
                        updated={vulnerabilityUpdatedDate}
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
        const { isExpanded } = this.state;
        const { vulnerabilityList } = this.props;
        const count = vulnerabilityList ? vulnerabilityList.length : 0;
        const collapsibleState = isExpanded && count ? expandedBlock : collapsedBlock;

        return (
            <div className={paddedBlock}>
                <SectionHeader handleClick={this.handleHeaderClick} count={count} isExpanded={isExpanded} />
                <div className={maskBlock}>
                    <div className={collapsibleState}>
                        { count && VULN_SEVERITIES.map(severity => this.getVulnerabilities(severity, count)) }
                    </div>
                </div>
            </div>
        );
    }
}

export default Section;

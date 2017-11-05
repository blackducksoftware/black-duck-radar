import React from 'react';
import PropTypes from 'prop-types';
import DuckRadar from './DuckRadar';
import { panelHeader } from 'css/common/headers';
import {
    splashBlock,
    headerText,
    introText,
    stepNumber,
    stepDirection,
    instructions,
    instructionsHeader
} from 'css/splash';

const getRepositories = () => {
    const repoMap = {
        'Cocoapods': 'https://cocoapods.org',
        'Metacpan': 'https://metacpan.org',
        'Maven Repository': 'https://mvnrepository.com',
        'Maven Central': 'https://search.maven.org',
        'Packagist': 'https://packagist.org',
        'PyPI': 'https://pypi.python.org',
        'Rubygems': 'https://rubygems.org',
        'npm': 'https://www.npmjs.com',
        'Nuget': 'https://www.nuget.org'
    };

    return Object.entries(repoMap).map(([repoName, repoUrl]) => {
        return (
            <a href={repoUrl} target='_blank' rel='noopener noreferrer' key={repoName}>
                {repoName}
            </a>
        );
    }).reduce((arr, link, index) => {
        let delimiter = index === 0 ? (<br key="repo-line-break"/>) : ', ';
        return arr.concat(delimiter, link);
    }, []);
};

const Splash = ({ isComponentPage, isComponentIdentified }) => {
    return (
        <div className={splashBlock}>
            <div className={[panelHeader, headerText].join(' ')}>
                Welcome to Radar
            </div>
            <div className={introText}>
                Connect to Hub to check if this package has known vulnerabilities or violates your team’s open source policies.
            </div>
            <DuckRadar />
            <div className={instructions}>
                <p className={instructionsHeader}>
                    After you login in to Radar with your Hub credentials..
                </p>
                <div className={stepNumber}>
                    1
                </div>
                <p className={stepDirection}>
                    Go to a supported package repository:
                    {getRepositories()}
                </p>
                <div className={stepNumber}>
                    2
                </div>
                <p className={stepDirection}>
                    Find a package
                </p>
                <div className={stepNumber}>
                    3
                </div>
                <p className={stepDirection}>
                    Click the Radar extension icon to see a break down of the package's operational, licensing and vulnerability risks
                </p>
            </div>
        </div>
    );
};

export default Splash;

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

import React from 'react';
import DuckRadar from './DuckRadar';
import { panelHeader } from 'css/common/headers';
import { headerText, instructions, instructionsHeader, introText, splashBlock, stepDirection, stepNumber, warningIcon } from 'css/splash';

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

    return Object.entries(repoMap)
        .map(([repoName, repoUrl]) => {
            return (
                <a href={repoUrl} target='_blank' rel='noopener noreferrer' key={repoName}>
                    {repoName}
                </a>
            );
        })
        .reduce((arr, link, index) => {
            let delimiter = index === 0 ? (<br key="repo-line-break" />) : ', ';
            return arr.concat(delimiter, link);
        }, []);
};

const Splash = ({ isComponentPage, isComponentIdentified, isBlackduckConfigured }) => {
    console.log("isComponentPage: %s, isComponentIdentified: %s, isBlackduckConfigured: %s",isComponentPage, isComponentIdentified, isBlackduckConfigured );
    return (
        <div className={splashBlock}>
            <div className={[panelHeader, headerText].join(' ')}>
                Welcome to Radar
            </div>
            {!isBlackduckConfigured &&
            <div className={introText}>
                Connect to Black Duck to check if this package has known vulnerabilities or violates your team’s open source policies.
            </div>
            }
            {isBlackduckConfigured && !isComponentPage && !isComponentIdentified &&
            <div className={introText}>
                <span className={`fa fa-exclamation-triangle ${warningIcon}`}></span>
                Radar could not discover any package information on this page.
            </div>
            }
            {isBlackduckConfigured && isComponentPage && !isComponentIdentified &&
            <div className={introText}>
                <span className={`fa fa-exclamation-triangle ${warningIcon}`}></span>
                Radar supports this repository, but could not find any
                information from the BlackDuck server for this package.
            </div>
            }
            <DuckRadar />
            {!isComponentPage || !isComponentIdentified &&
            <div className={instructions}>
                <p className={instructionsHeader}>
                    After you configure Radar with your Black Duck credentials:
                </p>
                <div className={stepNumber}>
                    1
                </div>
                <p className={stepDirection}>
                    Go to a supported package repository:
                    {getRepositories()}.
                </p>
                <div className={stepNumber}>
                    2
                </div>
                <p className={stepDirection}>
                    Find a package.
                </p>
                <div className={stepNumber}>
                    3
                </div>
                <p className={stepDirection}>
                    Click the Radar extension icon to see a breakdown of the package's operational, licensing and vulnerability risks.
                </p>
            </div>
            }
        </div>
    );
};

export default Splash;

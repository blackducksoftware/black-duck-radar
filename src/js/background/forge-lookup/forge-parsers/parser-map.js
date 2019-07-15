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

import MavenParser from './maven-parser';
import RepoMavenCentralParser from './repo1-maven-parser';

export default {
    //'search.maven.org': MavenParser,
    //'www.nuget.org': NugetParser,
    'mvnrepository.com': MavenParser,
    //'rubygems.org': RubyGemsParser,
    'repo1.maven.org': RepoMavenCentralParser,
    'repo.maven.apache.org': RepoMavenCentralParser
    //'www.npmjs.com': NpmParser,
    //'cocoapods.org': CocoapodsParser,
    //'metacpan.org': MetaCpanParser,
    //'packagist.org': PackagistParser,
    //'pypi.org': PypiOrgParser
};

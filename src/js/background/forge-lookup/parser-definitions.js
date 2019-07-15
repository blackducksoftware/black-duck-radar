export default {
    'definitions': [
        {
            'forgeName': '',
            'url': '',
            'type': 'DOM',
            'forgeSeparator': '',
            'blackDuckSeparator': '',
            'nameHasVersion': false,
            'nameVersionDelimeter': null,
            'nameQuery': '',
            'versionQuery': ''
        },
        {
            'forgeName': 'cocoapods',
            'url': 'cocoapods.org',
            'type': 'DOM',
            'forgeSeparator': ':',
            'blackDuckSeparator': ':',
            'nameHasVersion': false,
            'nameVersionDelimeter': null,
            'nameQuery': 'div.inline-headline h1.hidden-xs a',
            'versionQuery': 'div.inline-headline h1.hidden-xs span'
        },
        {
            'forgeName': 'cpan',
            'url': 'metacpan.org',
            'type': 'DOM',
            'forgeSeparator': '/',
            'blackDuckSeparator': '/',
            'nameHasVersion': true,
            'nameVersionDelimeter': '-',
            'nameQuery': 'div.pod.content.anchors p',
            'versionQuery': 'div.main-content ul.nav-list.slidepanel.sticky-panel-top span[itemprop=softwareVersion]'
        },
        {
            'forgeName': 'npmjs',
            'url': 'www.npmjs.com',
            'type': 'DOM',
            'forgeSeparator': '/',
            'blackDuckSeparator': '/',
            'nameHasVersion': false,
            'nameVersionDelimeter': null,
            'nameQuery': 'div.w-100.ph0-l.ph3.ph4-m h2._30_rF.flex.flex-column.w-100.fw6.mt3.black.dib.ma0.tracked-tight.no-underline.hover-black.f3-ns span',
            'versionQuery': 'div._2_OuR.dib.w-50.bb.b--black-10.pr2 p'
        },
        {
            'forgeName': 'nuget',
            'url': 'www.nuget.org',
            'type': 'DOM',
            'forgeSeparator': '/',
            'blackDuckSeparator': '/',
            'nameHasVersion': true,
            'nameVersionDelimeter': ' ',
            'nameQuery': 'div.package-title h1',
            'versionQuery': 'div.package-title h1 small'
        },
        {
            'forgeName': 'packagist',
            'url': 'packagist.org',
            'type': 'DOM',
            'forgeSeparator': ':',
            'blackDuckSeparator': ':',
            'nameHasVersion': true,
            'nameVersionDelimeter': '-',
            'nameQuery': 'h2.title',
            'versionQuery': 'div.version-details span.version-number'
        },
        {
            'forgeName': 'pypi',
            'url': 'pypi.org',
            'type': 'DOM',
            'forgeSeparator': '/',
            'blackDuckSeparator': '/',
            'nameHasVersion': true,
            'nameVersionDelimeter': ' ',
            'nameQuery': 'div.package-header h1',
            'versionQuery': 'div.package-header h1'
        },
        {
            'forgeName': 'rubygems',
            'url': 'rubygems.org',
            'type': 'DOM',
            'forgeSeparator': '/',
            'blackDuckSeparator': '/',
            'nameHasVersion': true,
            'nameVersionDelimeter': ' ',
            'nameQuery': 'div.l-wrap--b h1.t-display',
            'versionQuery': 'div.l-wrap--b h1.t-display i.page__subheading'
        },
        {
            'forgeName': 'maven',
            'url': 'search.maven.org',
            'type': 'DOM',
            'forgeSeparator': ':',
            'blackDuckSeparator': ':',
            'nameHasVersion': false,
            'nameVersionDelimeter': null,
            'nameQuery': 'app-pom-dependency-information div.mat-card-header-text mat-card-title',
            'versionQuery': 'app-pom-dependency-information div.mat-card-header-text mat-card-subtitle'
        },
        {
            'forgeName': 'maven',
            'url': 'mvnrepository.com',
            'type': 'MAVEN',
            'forgeSeparator': ':',
            'blackDuckSeparator': ':',
            'artifactPrefixPath': '/artifact/'
        },
        {
            'forgeName': 'maven',
            'url': 'repo.maven.apache.org',
            'type': 'WEB_PATH',
            'forgeSeparator': ':',
            'blackDuckSeparator': ':',
            'artifactPrefixPath': '/maven2/',
            'artifactPrefixDelimeter': '.'
        },
        {
            'forgeName': 'maven',
            'url': 'repo1.maven.org',
            'type': 'WEB_PATH',
            'forgeSeparator': ':',
            'blackDuckSeparator': ':',
            'artifactPrefixPath': '/maven2/',
            'artifactPrefixDelimeter': '.'
        }
    ]
};

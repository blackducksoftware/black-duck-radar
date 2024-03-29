export default {
    "definitions": [
        {
            "site": "cocoapods.org",
            "forgeName": "cocoapods",
            "type": "DOM",
            "forgeSeparator": ":",
            "blackDuckSeparator": ":",
            "nameHasVersion": false,
            "nameVersionDelimeter": null,
            "nameQuery": "div.inline-headline h1.hidden-xs a",
            "versionQuery": "div.inline-headline h1.hidden-xs span"
        },
        {

            "site": "metacpan.org",
            "forgeName": "cpan",
            "type": "DOM",
            "forgeSeparator": "/",
            "blackDuckSeparator": "/",
            "nameHasVersion": false,
            "nameVersionDelimeter": null,
            "nameQuery": "div.main-content.col-md-12 div.breadcrumbs > span[itemprop=name]",
            "versionQuery": "div.main-content.col-md-12 ul.nav-list.slidepanel.sticky-panel-top span[itemprop=softwareVersion]"
        },
        {

            "site": "www.npmjs.com",
            "forgeName": "npmjs",
            "type": "DOM",
            "forgeSeparator": "/",
            "blackDuckSeparator": "/",
            "nameHasVersion": false,
            "nameVersionDelimeter": null,
            "nameQuery": "div.w-100.ph0-l.ph3.ph4-m h2.cd6ce1fd.flex.flex-row.justify-start.items-center.w-100.fw6.mt3.black.dib.ma0.tracked-tight.no-underline.hover-black.f3-ns span",
            "versionQuery": "div._702d723c.dib.w-50.bb.b--black-10.pr2 p.f2874b88.fw6.mb3.mt2.truncate.black-80.f4"
        },
        {

            "site": "www.nuget.org",
            "forgeName": "nuget",
            "type": "DOM",
            "forgeSeparator": "/",
            "blackDuckSeparator": "/",
            "nameHasVersion": false,
            "nameVersionDelimeter": " ",
            "nameQuery": "div.package-title h1 span.title",
            "versionQuery": "div.package-title h1 span.version-title"
        },
        {

            "site": "packagist.org",
            "forgeName": "packagist",
            "type": "DOM",
            "forgeSeparator": ":",
            "blackDuckSeparator": ":",
            "nameHasVersion": false,
            "nameVersionDelimeter": null,
            "nameQuery": "h2.title",
            "versionQuery": "div.version-details div.title span.version-number"
        },
        {

            "site": "pypi.org",
            "forgeName": "pypi",
            "type": "DOM",
            "forgeSeparator": "/",
            "blackDuckSeparator": "/",
            "nameHasVersion": true,
            "nameVersionDelimeter": " ",
            "nameQuery": "div.package-header h1",
            "versionQuery": "div.package-header h1"
        },
        {

            "site": "rubygems.org",
            "forgeName": "rubygems",
            "type": "DOM",
            "forgeSeparator": "/",
            "blackDuckSeparator": "/",
            "nameHasVersion": true,
            "nameVersionDelimeter": " ",
            "nameQuery": "div.l-wrap--b h1.t-display",
            "versionQuery": "div.l-wrap--b h1.t-display i.page__subheading"
        },
        {

            "site": "search.maven.org",
            "forgeName": "maven",
            "type": "MAVEN",
            "forgeSeparator": ":",
            "blackDuckSeparator": ":",
            "artifactPrefixPath": "/artifact/"
        },
        {

            "site": "mvnrepository.com",
            "forgeName": "maven",
            "type": "MAVEN",
            "forgeSeparator": ":",
            "blackDuckSeparator": ":",
            "artifactPrefixPath": "/artifact/"
        },
        {

            "site": "repo.maven.apache.org",
            "forgeName": "maven",
            "type": "WEB_PATH",
            "forgeSeparator": ":",
            "blackDuckSeparator": ":",
            "artifactPrefixPath": "/maven2/",
            "artifactPrefixDelimeter": "."
        },
        {

            "site": "repo1.maven.org",
            "forgeName": "maven",
            "type": "WEB_PATH",
            "forgeSeparator": ":",
            "blackDuckSeparator": ":",
            "artifactPrefixPath": "/maven2/",
            "artifactPrefixDelimeter": "."
        },
        {

            "type": "ARTIFACTORY",
            "forgeSeparator": ":",
            "blackDuckSeparator": ":",
            "nameQuery": "",
            "versionQuery": "",
            "forgeQuery": "#jf-artifacts div.content-wrapper.ng-scope div div div div jf-artifact-info div jf-tabs.ng-isolate-scope ul.nav.nav-tabs li a span",
            "forgeTabIndex": 1,
            "defaultTabQuery": "jf-tab[name='General'] jf-general table.jf-data-table.ng-scope tbody tr td",
            "moduleIdIndex": 5,
            "scriptDelayMs": 500,
            "forgeMap": {
                "Composer Info": {
                    "name": "packagist",
                    "forgeSeparator": ":",
                    "blackDuckSeparator": ":",
                    "tableQuery": "jf-tab[name='ComposerInfo'] jf-composer table.jf-data-table.ng-scope tbody tr td",
                    "nameIndex": 1,
                    "versionIndex": 3
                },
                "RubyGems": {
                    "name": "rubygems",
                    "forgeSeparator": "/",
                    "blackDuckSeparator": "/",
                    "tableQuery": "jf-tab[name='RubyGems'] jf-ruby-gems table.jf-data-table.ng-scope tbody tr td",
                    "nameIndex": 1,
                    "versionIndex": 3
                },
                "PyPI Info": {
                    "name": "pypi",
                    "forgeSeparator": "/",
                    "blackDuckSeparator": "/",
                    "tableQuery": "jf-tab[name='PyPIInfo'] jf-py-pi table.jf-data-table.ng-scope tbody tr td",
                    "nameIndex": 1,
                    "versionIndex": 3
                },
                "NuPkg Info": {
                    "name": "nuget",
                    "forgeSeparator": "/",
                    "blackDuckSeparator": "/",
                    "tableQuery": "jf-tab[name='NuPkgInfo'] jf-nuget table.jf-data-table.ng-scope tbody tr td",
                    "nameIndex": 1,
                    "versionIndex": 3
                },
                "Npm Info": {
                    "name": "npmjs",
                    "forgeSeparator": "/",
                    "blackDuckSeparator": "/",
                    "tableQuery": "jf-tab[name='NpmInfo'] jf-npm-info table.jf-data-table.ng-scope tbody tr td",
                    "nameIndex": 1,
                    "versionIndex": 3
                }
            }
        }
    ]
};

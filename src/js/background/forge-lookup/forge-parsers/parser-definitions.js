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
            "nameHasVersion": true,
            "nameVersionDelimeter": "-",
            "nameQuery": "div.pod.content.anchors p",
            "versionQuery": "div.main-content ul.nav-list.slidepanel.sticky-panel-top span[itemprop=softwareVersion]"
        },
        {

            "site": "www.npmjs.com",
            "forgeName": "npmjs",
            "type": "DOM",
            "forgeSeparator": "/",
            "blackDuckSeparator": "/",
            "nameHasVersion": false,
            "nameVersionDelimeter": null,
            "nameQuery": "div.w-100.ph0-l.ph3.ph4-m h2.cd6ce1fd.flex.flex-column.w-100.fw6.mt3.black.dib.ma0.tracked-tight.no-underline.hover-black.f3-ns span",
            "versionQuery": "div._702d723c.dib.w-50.bb.b--black-10.pr2 p"
        },
        {

            "site": "www.nuget.org",
            "forgeName": "nuget",
            "type": "DOM",
            "forgeSeparator": "/",
            "blackDuckSeparator": "/",
            "nameHasVersion": true,
            "nameVersionDelimeter": " ",
            "nameQuery": "div.package-title h1",
            "versionQuery": "div.package-title h1 small"
        },
        {

            "site": "packagist.org",
            "forgeName": "packagist",
            "type": "DOM",
            "forgeSeparator": ":",
            "blackDuckSeparator": ":",
            "nameHasVersion": true,
            "nameVersionDelimeter": "-",
            "nameQuery": "h2.title",
            "versionQuery": "div.version-details span.version-number"
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
            "nameQuery": "div.artifact-details-header div.pull-right.text-right div h2.artifact-name-heading",
            "versionQuery": "div.artifact-details-header div.pull-right.text-right div h2.artifact-name-heading",
            "forgeQuery": "ul.nav.nav-tabs",
            "forgeMap": {
                "RubyGems": "rubygems",
                "PyPi Info": "pypi",
                "NuPkg Info": "nuget",
                "Composer Info": "packagist",
                "Npm Info": "npmjs"
            }
        }
    ]
};

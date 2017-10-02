import MavenCentralParser from './maven-central-parser';
import MvnRepositoryParser from './mvn-repository-parser';
import NugetParser from './nuget-parser';
import PypiParser from './pypi-parser';
import RubyGemsParser from './ruby-gems-parser';
import RepoMavenCentralParser from './repo1-maven-parser';
import NpmParser from './npm-parser';
import CocoapodsParser from './cocoapods-parser';
import MetaCpanParser from './meta-cpan-parser';
import PackagistParser from './packagist-parser';
import PypiOrgParser from './pypi-org-parser';

export default {
    'search.maven.org': MavenCentralParser,
    'www.nuget.org': NugetParser,
    'mvnrepository.com': MvnRepositoryParser,
    'pypi.python.org': PypiParser,
    'rubygems.org': RubyGemsParser,
    'repo1.maven.org': RepoMavenCentralParser,
    'repo.maven.apache.org': RepoMavenCentralParser,
    'www.npmjs.com': NpmParser,
    'cocoapods.org': CocoapodsParser,
    'metacpan.org': MetaCpanParser,
    'packagist.org': PackagistParser,
    'pypi.org': PypiOrgParser
};

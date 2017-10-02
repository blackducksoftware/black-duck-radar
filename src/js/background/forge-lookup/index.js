import parserMap from './forge-parsers/parser-map';

class ForgeLookup {
    constructor() {
        const parserTuples = Object.keys(parserMap)
            .map(key => [key, parserMap[key]]);
        this.parserMap = new Map(parserTuples);
    }

    getForgeParser(opts) {
        const parsedUrl = new URL(opts.url);
        const { hostname } = parsedUrl;
        const Parser = this.parserMap.get(hostname);
        return Parser ? new Parser(Object.assign({}, opts, { url: parsedUrl })) : null;
    }
}

export default ForgeLookup;

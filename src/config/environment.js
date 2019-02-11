export const PROTOCOL = {
    http: "http",
    developmentPort: 80,
    productionPort: 80,
    // developmentServerName: "prologicmacbookpro15.local",
    developmentServerName: "vectorai.postprincipal.com",
    productionServerName: "vectorai.postprincipal.com",
};

export const API = {
    development: `${PROTOCOL.http}://${PROTOCOL.developmentServerName}:${PROTOCOL.developmentPort}/api`,
    production: `${PROTOCOL.http}://${PROTOCOL.productionServerName}:${PROTOCOL.productionPort}/api`,
};
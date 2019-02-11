export const PROTOCOL = {
    http: "http",
    developmentPort: 80,
    productionPort: 80,
    // developmentServerName: "prologicmacbookpro15.local",
    developmentServerName: "vector.postprincipal.com",
    productionServerName: "vector.postprincipal.com",
};

export const API = {
    development: `${PROTOCOL.http}://${PROTOCOL.developmentServerName}:${PROTOCOL.developmentPort}/api`,
    production: `${PROTOCOL.http}://${PROTOCOL.productionServerName}:${PROTOCOL.productionPort}/api`,
};
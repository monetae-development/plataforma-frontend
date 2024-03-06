// "Production" enabled environment

export const environment = {
    production: true,
    hmr: false,
    appConfig: 'appconfig.production.json',
    socketioHost: 'http://34.239.244.182:3000', //AWS Development
    uploadMaxFileSize: 10485760,
};

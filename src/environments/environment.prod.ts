// "Production" enabled environment

export const environment = {
    production: true,
    hmr: false,
    appConfig: 'appconfig.production.json',
    socketioHost: 'http://52.207.244.72:3000', //AWS Development
    uploadMaxFileSize: 10485760,
};

// "Production" enabled environment

export const environment = {
    production: true,
    hmr: false,
    appConfig: 'appconfig.k8s.json',
    socketioHost: 'http://localhost:3000',
};

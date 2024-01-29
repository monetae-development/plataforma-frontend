// "Production" enabled environment

export const environment = {
    production: true,
    hmr: false,
    appConfig: 'appconfig.k8s.json',
    socketioHost: 'http://52.207.244.72:3000',
    uploadMaxFileSize: 10485760,
};

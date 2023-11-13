// "Production" enabled environment

export const environment = {
    production: true,
    hmr: false,
    appConfig: 'appconfig.production.json',
    //socketioHost: 'http://localhost:3000', //Development
    socketioHost: 'http://52.207.244.72:3000', //AWS Development
    //socketioHost: 'http://192.168.2.4:3000', //Localhost Docker
};

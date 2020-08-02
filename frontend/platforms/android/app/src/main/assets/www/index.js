const StartApp = () => {
    window.location = 'http://192.168.1.38:3000';
};

if (window.cordova) {
    document.addEventListener('deviceready', StartApp, false);
} else {
    StartApp();
}

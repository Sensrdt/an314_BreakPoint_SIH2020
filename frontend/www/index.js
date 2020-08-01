const StartApp = () => {
    window.location = 'http://192.168.0.105:3000';
};

if (window.cordova) {
    document.addEventListener('deviceready', StartApp, false);
} else {
    StartApp();
}

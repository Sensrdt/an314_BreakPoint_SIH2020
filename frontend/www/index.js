const StartApp = () => {
    window.location = 'https://reelitin.herokuapp.com/';
};

if (window.cordova) {
    document.addEventListener('deviceready', StartApp, false);
} else {
    StartApp();
}

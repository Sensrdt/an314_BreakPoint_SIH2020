const StartApp = () => {
    // window.location = 'https://reelitin.herokuapp.com/';
    window.open('https://reelitin.herokuapp.com/', '_blank', 'location=yes');
};

if (window.cordova) {
    document.addEventListener('deviceready', StartApp, false);
} else {
    StartApp();
}

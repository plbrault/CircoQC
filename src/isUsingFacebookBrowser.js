const ua = navigator.userAgent || navigator.vendor || window.opera;
const isUsingFacebookBrowser = (ua.indexOf('FBAN') > -1) || (ua.indexOf('FBAV') > -1);

export default isUsingFacebookBrowser;

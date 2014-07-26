var lang = window.localStorage.getItem('userLang') || 'en';
var extjsFile = 'ext/locale/ext-lang-' + lang + '.js';

document.write('<script type="text/javascript" src="translations/' + lang + '.js"></script>');
document.write('<script type="text/javascript" src="' + extjsFile + '"></script>');
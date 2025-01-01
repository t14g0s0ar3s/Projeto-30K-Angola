document.addEventListener('DOMContentLoaded', function () {
    /* ALTERE O VALOR 10 PARA OS SEGUNDOS EM QUE AS SEÇÕES VÃO APARECER */
    var SECONDS_TO_DISPLAY = 0;
    var CLASS_TO_DISPLAY = 'esconder';

    /* DAQUI PARA BAIXO NAO PRECISA ALTERAR */
    var attempts = 0;
    var elsHiddenList = [];
    var elsDisplayed = false;
    var elsHidden = document.querySelectorAll(`.${CLASS_TO_DISPLAY}`);
    var alreadyDisplayedKey = `alreadyElsDisplayed${SECONDS_TO_DISPLAY}`;
    var alreadyElsDisplayed = localStorage.getItem(alreadyDisplayedKey);

    setTimeout(function () {
        elsHiddenList = Array.prototype.slice.call(elsHidden);
    }, 0);

    var showHiddenElements = function () {
        elsDisplayed = true;
        elsHiddenList.forEach(e => (e.classList.remove('esconder')));
        localStorage.setItem(alreadyDisplayedKey, true);
        window.dispatchEvent(new CustomEvent('showHiddenElements'));
    };

    var startWatchVideoProgress = function () {
        if (
            typeof smartplayer === 'undefined' ||
            !(smartplayer.instances && smartplayer.instances.length)
        ) {
            if (attempts >= 10) return;
            attempts += 1;
            return setTimeout(function () {
                startWatchVideoProgress();
            }, 1000);
        }

        smartplayer.instances[0].on('timeupdate', () => {
            if (elsDisplayed || smartplayer.instances[0].smartAutoPlay) return;
            if (smartplayer.instances[0].video.currentTime < SECONDS_TO_DISPLAY) return;
            showHiddenElements();
        });
    };

    if (alreadyElsDisplayed === 'true') {
        setTimeout(function () {
            showHiddenElements();
        }, 100);
    } else {
        startWatchVideoProgress();
    }
});
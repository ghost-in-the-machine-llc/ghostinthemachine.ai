const players = document.querySelectorAll('.player');
players.forEach(displayClips);

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function displayClips(player) {
    const display = player.querySelector('.display');
    const clips = player.querySelectorAll('.clip');

    const typewriter = new Typewriter(display, {
        cursor: '',
        delay: 0,
        deleteSpeed: 0,
        skipAddStyles: true,
    });

    clips.forEach((c) => {
        const words = c.textContent.split(/\s+/);

        words.forEach((w, i) => {
            if (!w) return;
            if (i) w = ' ' + w;
            const pause = getRandomInt(2, 160);
            typewriter.pasteString(w).pauseFor(pause); // make random
        });

        typewriter
            .pauseFor(3500)
            .callFunction(({ elements: { wrapper } }) => {
                wrapper.innerHTML = '';
            });
    });

    typewriter.start().callFunction(() => {
        typewriter.stop();
        displayClips(player);
    });
}

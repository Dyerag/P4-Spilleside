mergeInto(LibraryManager.library, {
    SendScore: function (score) {
        console.log("Plugin has received score:" + score + "\n ");
        if (typeof window.SaveScore === 'function') {
            console.log("Transferring to Webpage to SaveScore function in the webpage.");
            window.SaveScore(score);
        }
        else {
            console.log("SaveScore function not found in the webpage.");
        }
    }
});
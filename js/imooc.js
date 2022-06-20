

function skipNextChapter() {

    let progressBar = document.getElementsByClassName('vjs-progress-holder')
    if (progressBar.length > 0) {
        let progress = progressBar[0].getAttribute('aria-valuenow')
        console.log('checking progress: ', progress)
        if (parseInt(progress) == 100) {
            let btn = document.getElementsByClassName('next-btn')[0]
            btn.click()
        }    
    } else {
        console.log('finding next chapter ...')
        
        let chapters = document.getElementsByClassName('learning')
        if (chapters.length == 0) {
            document.getElementsByClassName('sz-list')[0].click()
            setTimeout(skipNextChapter, 5000)
            return
        }
        
        let chapter = chapters[0].nextElementSibling
        while (chapter && chapter.getElementsByTagName('a').length == 0) {
            chapter = chapter.nextElementSibling
        }
        if (chapter == null) {
            console.log('All chapters has been played!')
            return;
        } else {
            let anchor = chapter.getElementsByTagName('a')[0]
            console.log('finding next chapter: ', anchor.innerText) 
            anchor.click()
        }
    }
    setTimeout(skipNextChapter, 5000)
}

window.addEventListener('load', (event) => {
    if (document.location.href.match('https?://.+\.imooc\.com/lesson/.*')) {
        // setup timer
        setTimeout(skipNextChapter, 5000)
    }
});

console.log('imooc current page is:', document.location.href)

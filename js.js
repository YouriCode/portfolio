let pageOpened = false;
const anchors = document.querySelectorAll(".anchor");

for (let i = 0; i < anchors.length; i++) {
    anchors[i].addEventListener("click", handleAnchorClick);
}

function handleAnchorClick(event) {
    event.preventDefault();
    const id = this.getAttribute("data-id");
    const color = this.getAttribute("data-color");

    if (this.classList.contains("active")) {
        closePage();
        this.classList.remove("active");
    } else {
        this.classList.add("active");

        if (pageOpened === false) {
            openPage(id, color);
        } else {
            switchPage(id, color);
        }
    }
}

function openPage(id, color) {
    loadPage(id);

    gsap.to("nav a", {
        "pointerEvents" : "none"
    })

    gsap.to("article", {
        "opacity": 0,
        "scale": 0.8,
        "duration": 0.2,
    });

    gsap.to("#container", {
        "x": "0px",
        "duration": 0.5,
        "ease": "power1"
    });

    gsap.to(["body", "nav"], {
        "backgroundColor": color,
        "duration": 0.5
    });

    gsap.to("#container", {
        "overflowY": "auto",
        "delay": 0.5,
        onComplete: function () {
            pageOpened = true;
            gsap.to("nav a", {
                "pointerEvents" : "auto"
            })
        }
    });
}

function switchPage(id, color) {
    const activeLinks = document.querySelectorAll("a.active");

    for (let j = 0; j < activeLinks.length; j++) {
        activeLinks[j].classList.remove("active");
    }

    event.currentTarget.classList.add("active");

    gsap.to("#container", {
        "opacity": 0,
        "duration": 0.2,
        "onComplete": function () {
            loadPage(id);
        }
    });

    gsap.to("#container", {
        "opacity": 1,
        "duration": 0.2,
        "delay": 0.2,
    });

    gsap.to(["body", "nav"], {
        "backgroundColor": color,
        "duration": 0.5
    });

    setTimeout(function() {
        document.querySelector("#container").scrollTop = 0;
    }, 200)
}

function loadPage(id) {
    const shownContent = document.querySelector(".shown-content");
    if (shownContent) shownContent.classList.remove("shown-content");
    document.getElementById(id).classList.add("shown-content");
}

function closePage() {
    const activeLinks = document.querySelectorAll("a.active");

    for (let i = 0; i < activeLinks.length; i++) {
        activeLinks[i].classList.remove("active");
    }

    gsap.to("nav a", {
        "pointerEvents" : "none"
    })

    gsap.to("#container", {
        "overflow": "hidden"
    });

    gsap.to("#container", {
        "x": "110vw",
        "duration": 0.5,
        "ease": "power1"
    });

    gsap.to("article", {
        "opacity": 1,
        "scale": 1,
        "duration": 0.2,
        "delay": 0.2
    });

    gsap.to(["body", "nav"], {
        "backgroundColor": "#fff3ca",
        "duration": 0.5,
        onComplete: function () {
            const shownContent = document.querySelector(".shown-content");
            shownContent.classList.remove("shown-content");
            gsap.to("nav a", {
                "pointerEvents" : "auto"
            })
        }
    });

    pageOpened = false;
}

(function (window) {

    'use strict';

    window.code = window.code || {};

    window.code.lightweightYoutubePlayer = function () {

        var dataYoutubeVideos = '[data-youtube]';

        var youtubeVideos = [...document.querySelectorAll(dataYoutubeVideos)];

        function init() {
            youtubeVideos.forEach(function(element) {
                bindYoutubeVideoEvent(element);
            });
        }

        function bindYoutubeVideoEvent(element) {
            var button = element.querySelector('[data-youtube-button]');

            button.addEventListener('click', createIframe);
        }

        function createIframe(event) {
            var url = event.target.dataset.youtubeButton;
            var youtubePlaceholder = event.target.parentNode;

            var htmlString = '<div class="video__youtube"> <iframe class="video__iframe" src="' + url + '?autoplay=1" frameborder="0" allowfullscreen></iframe></div>';

            youtubePlaceholder.style.display = 'none';
            youtubePlaceholder.insertAdjacentHTML('beforebegin', htmlString);
            youtubePlaceholder.parentNode.removeChild(youtubePlaceholder);
        }

        return {
           init: init
        }
    };

})(window)

ready();

function ready() {
    var lightweightYoutubePlayer = new code.lightweightYoutubePlayer()

    if (document.readyState != 'loading') {
        page.init()
    } else {
        document.addEventListener('DOMContentLoaded', lightweightYoutubePlayer.init);
    }
}
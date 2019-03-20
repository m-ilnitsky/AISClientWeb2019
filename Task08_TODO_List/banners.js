"use strict";

(function () {
    document.addEventListener("DOMContentLoaded", function () {
        function bottomOnMouseOver(event) {
            if (event.target.matches("img")) {
                var banners = document.querySelectorAll(".banner");

                for (var i = 0, l = banners.length; i < l; i++) {
                    if (banners[i].matches(".position-2")
                        || banners[i].matches(".move-to-2")
                        || banners[i].matches(".move-to-1")) {
                        console.info("return");
                        return;
                    }
                }

                console.info("bottomOnMouseOver");
                for (i = 0, l = banners.length; i < l; i++) {
                    banners[i].classList.add("bottom-attack");
                }
            }
        }

        function bottomOnMouseOut(event) {
            if (event.target.matches("img")) {
                var banners = document.querySelectorAll(".banner");

                for (i = 0, l = banners.length; i < l; i++) {
                    if (banners[i].matches(".position-2")
                        || banners[i].matches(".move-to-2")
                        || banners[i].matches(".move-to-1")) {
                        console.info("return");
                        return;
                    }
                }

                console.info("bottomOnMouseOut");
                for (var i = 0, l = banners.length; i < l; i++) {
                    banners[i].classList.remove('bottom-attack');
                    banners[i].classList.remove('shake');
                    banners[i].classList.add("free");
                }
            }
        }

        function onMouseDown(event) {
            if (event.target.matches("img")) {
                var banners = document.querySelectorAll(".banner");

                for (i = 0, l = banners.length; i < l; i++) {
                    if (banners[i].matches(".position-2")
                        || banners[i].matches(".move-to-2")
                        || banners[i].matches(".move-to-1")) {
                        console.info("return");
                        return;
                    }
                }

                console.info("onMouseDown");
                for (var i = 0, l = banners.length; i < l; i++) {
                    banners[i].classList.remove('bottom-attack');
                    banners[i].classList.remove('shake');
                    banners[i].classList.add("free");
                }

                event.target.parentElement.parentElement.parentElement.classList.add('shake');
            }
        }

        function onMouseUp(event) {
            function finishAnimation() {
                event.target.parentElement.parentElement.parentElement.classList.remove('free');
                event.target.parentElement.parentElement.parentElement.classList.remove('move-to-1');
                event.target.parentElement.parentElement.parentElement.classList.remove('move-to-2');
                event.target.parentElement.parentElement.parentElement.classList.add('position-2');
                clearInterval(timer);
            }

            function animate() {
                var timePassed = Date.now() - start;

                if (timePassed < 1500) {
                    if (state === 1) {
                        return;
                    } else if (state === 0) {
                        event.target.parentElement.parentElement.parentElement.classList.remove('free');
                        event.target.parentElement.parentElement.parentElement.classList.add('move-to-1');
                        state = 1;
                    } else {
                        finishAnimation();
                        return;
                    }
                    console.info("state1=" + state);
                    console.info(event.target + "  :");
                    console.info(event.target.parentElement.parentElement.parentElement);
                } else if (timePassed > 1500 && timePassed < 1700) {
                    if (state === 2) {
                        return;
                    } else if (state === 1) {
                        event.target.parentElement.parentElement.parentElement.classList.remove('move-to-1');
                        event.target.parentElement.parentElement.parentElement.classList.remove('free');
                        event.target.parentElement.parentElement.parentElement.classList.add('move-to-2');
                        state = 2;
                    } else {
                        finishAnimation();
                        return;
                    }
                    console.info("state2=" + state);
                    console.info(event.target + "  :");
                    console.info(event.target.parentElement.parentElement.parentElement);
                } else if (state === 2 && timePassed > 1700 && timePassed < 2000) {
                    if (state === 3) {
                        return;
                    } else if (state === 2) {
                        event.target.parentElement.parentElement.parentElement.classList.remove('move-to-2');
                        event.target.parentElement.parentElement.parentElement.classList.remove('free');
                        event.target.parentElement.parentElement.parentElement.classList.add('position-2');
                        state = 3;
                    } else {
                        finishAnimation();
                        return;
                    }
                    console.info("state3=" + state);
                    console.info(event.target + "  :");
                    console.info(event.target.parentElement.parentElement.parentElement);
                } else if (timePassed > 2000) {
                    state = 4;
                    finishAnimation();
                    console.info("state4=" + state);
                    console.info(event.target + "  :");
                    console.info(event.target.parentElement.parentElement.parentElement);
                }
            }

            if (event.target.matches("img")) {

                var banners = document.querySelectorAll(".banner");

                if (event.target.matches(".position-2 img")) {
                    for (var i = 0, l = banners.length; i < l; i++) {
                        banners[i].classList.remove('position-2');
                        banners[i].classList.add('free');
                    }
                } else {

                    for (i = 0, l = banners.length; i < l; i++) {
                        banners[i].classList.remove('free');
                        banners[i].classList.remove('shake');
                        banners[i].classList.remove('bottom-attack');
                        console.info(banners[i]);
                        console.info(banners[i].classList);
                    }

                    var start = Date.now();
                    var state = 0;
                    var timer = setInterval(animate, 20);
                }
            }
        }

        var bannerHtmlAcademy = document.querySelector(".banner.banner-html-academy");
        bannerHtmlAcademy.addEventListener("mouseover", bottomOnMouseOver);
        bannerHtmlAcademy.addEventListener("mouseout", bottomOnMouseOut);

        var bannerAcademItSchool = document.querySelector(".banner.banner-academ-it-school");
        bannerAcademItSchool.addEventListener("mouseout", bottomOnMouseOut);

        var banners = document.querySelectorAll(".banner");
        for (var i = 0, l = banners.length; i < l; i++) {
            banners[i].addEventListener("mousedown", onMouseDown);
            banners[i].addEventListener("mouseup", onMouseUp);
        }
    });
})();
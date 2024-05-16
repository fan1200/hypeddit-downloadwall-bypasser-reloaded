// ==UserScript==
// @name         Hypeddit DownloadWallBypasser 2k24
// @namespace    http://tampermonkey.net/
// @version      2024-04-04
// @description  Bypass the fangates. Soundcloud and Spotify accounts are mandatory! Please make sure to log them on first before running the script!
// @author       fan1200
// @match        https://hypeddit.com/track/*
// @match        https://secure.soundcloud.com/connect*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=hypeddit.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    window.hypedditSettings = {
        email: 'jouch@hippo.com',
        name: 'Jojo',
        comment: 'Nice!',
        auto_close: true,
        auto_close_timeout_in_ms: 5000
    }

    if (window.location.host.includes('soundcloud.com')) {
        const button = document.querySelector('button[id="submit_signup"]');

        if (button) {
            button.click();
        } else {
            let isDone = false;
            const maxTries = 10;
            let cou = 0;

            const retryClick = () => {
                const button = document.querySelector('button[id="submit_signup"]');

                if (button) {
                    button.click();
                    isDone = true;
                } else {
                    cou++;
                    if (cou < maxTries) {
                        setTimeout(retryClick, 200);
                    }
                }
            };

            setTimeout(retryClick, 200);
        }
    }


    window.handleFollowOptions = function(containerElementId, skipperId)
    {
        if(document.getElementById(containerElementId) !== null) {
            document.getElementById(containerElementId).querySelectorAll('a').forEach((accountItem) => {
                accountItem.classList.remove("undone");
                accountItem.classList.add("done");
            });

            document.getElementById(skipperId).click();

        }
    }

    window.handleSoundCloud = function() {

        console.log('SOUNDCLOUD');

        const comment = window.hypedditSettings.comment;

        if(document.getElementById("sc_comment_text") !== null) {
            document.getElementById("sc_comment_text").setAttribute('value', comment);
        }


        if(document.getElementById("step_sc") !== null) {
            document.getElementById("step_sc").querySelector('a').click();
        }
    };

    window.handleInstagram = function() {

        console.log('INSTA');
        window.handleFollowOptions("instagram_status", "skipper_ig_next");
    };

    window.handleYoutube = function() {

        console.log('YOUTUBE');
        window.handleFollowOptions("youtube_status", "skipper_yt_next");
    };

    window.handleSpotify = function() {

        console.log('SPOTIFY');
        document.getElementById("step_sp").querySelector('a').click();

    };

    window.handleDownload = function() {
        console.log("DOWNLOAD");
        downloadUnlimitedGate();

        if(window.hypedditSettings.auto_close) {
            const timeout = window.hypedditSettings.auto_close_timeout_in_ms;
            window.setTimeout(function() {
                close();
            }, timeout);
        }
    }

    window.handleEmail = function() {

        const email = window.hypedditSettings.email;
        const name = window.hypedditSettings.name;

        if(document.getElementById("email_name") !== null) {
            document.getElementById("email_name").setAttribute('value', name);
        }

        if(document.getElementById("email_address") !== null) {
            document.getElementById("email_address").setAttribute('value', email);
            document.getElementById("email_address").value = email;
        }

        document.getElementById("email_to_downloads_next").click();
    }

    window.handleTikTok = function() {
        console.log("TIKTOK");
        window.handleFollowOptions("tiktok_status", "skipper_tk_next");
    }

    window.handleFacebook = function() {
        console.log("FACEBOOK");
        document.getElementById("fbCarouselSocialSection").click();
    }

    window.handleMultiPortal = function() {
        document.getElementById("step_email").previousElementSibling.click();
        window.handleEmail();
    }

    window.handleEmailSoundCloud = function() {
        document.getElementById("step_email").previousElementSibling.click();
        window.handleEmail();
    }

    window.handleSoundCloudYoutube = function() {
        document.getElementById("step_yt").previousElementSibling.click();
        window.handleYoutube();
    }

    window.handleDonate = function() {
        document.getElementById("step_dn").previousElementSibling.click();
        document.getElementById("donation_next").click();
    }
    
    const targetNode = document.getElementById("myCarousel");

    const config = { attributes: true, childList: true, subtree: true };


    let prevStepContent = null;
    const callback = (mutationList, observer) => {
        for (const mutation of mutationList) {

            if (mutation.type === "attributes") {
                const stepContent = document.querySelector('.fangate-slider-content:not(.move-left)');

                if(stepContent !== prevStepContent) {

                    const stepClassList = stepContent.classList;

                    if(stepClassList.contains("sp|ig|email")) {
                        window.handleMultiPortal();
                    }

                    if(stepClassList.contains("email|sc")) {
                        window.handleEmailSoundCloud();
                    }

                    if(stepClassList.contains("sc|yt")) {
                        window.handleSoundCloudYoutube();
                    }

                    if(stepClassList.contains("dn")) {
                        window.handleDonate();
                    }                    

                    if (stepClassList.contains("sc")) {
                        window.handleSoundCloud();
                    }

                    if (stepClassList.contains("ig")) {
                        window.handleInstagram();
                    }

                    if (stepClassList.contains("dw")) {
                        window.handleDownload();
                    }

                    if (stepClassList.contains("yt")) {
                        window.handleYoutube();
                    }

                    if (stepClassList.contains("sp")) {
                        window.handleSpotify();
                    }

                    if (stepClassList.contains("email")) {
                        window.handleEmail();
                    }

                    if (stepClassList.contains("tk")) {
                        window.handleTikTok();
                    }

                    if (stepClassList.contains("fb")) {
                        window.handleFacebook();
                    }
                }

                prevStepContent = stepContent;
            }
        }
    };


    const observer = new MutationObserver(callback);

    observer.observe(targetNode, config);

    const _start = () => {
        if(document.getElementById("downloadProcess") !== null) {
            document.getElementById("downloadProcess").click();
        }
    };

    window.setTimeout(_start, 800);

})();

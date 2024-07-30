// ==UserScript==
// @name         Hypeddit, PumpYourSound DownloadWallBypasser 2k24
// @namespace    http://tampermonkey.net/
// @version      2024-07-30
// @description  Bypass the fangates. Soundcloud and Spotify accounts are mandatory! Please make sure to log them on first before running the script!
// @author       fan1200, Zuko <tansautn@gmail.com>
// @match        https://hypeddit.com/*
// @match        https://pumpyoursound.com/f/*
// @match        https://pumpyoursound.com/?do=soundConnectAuth*
// @match        https://secure.soundcloud.com/connect*
// @match        https://secure.soundcloud.com/authorize*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=hypeddit.com
// @grant        none
// ==/UserScript==

;(function () {
  "use strict"

  window.hypedditSettings = {
    email: "jouch@hippo.com",
    name: "Jojo",
    comment: "Nice!",
    auto_close: true,
    auto_close_timeout_in_ms: 5000,
  }
  const pumpUrSoundHandler = function () {
    const steps = document.querySelectorAll('.fanpageDownload__item');
    if (!window.hasOwnProperty('isPumpHandled')) {
      window.isPumpHandled = false;
    }
    steps.forEach((e) => {
      if (window.isPumpHandled) {
        console.warn('Pump handled, abort');
        return;
      }
      const curEl = e;
      const curStep = curEl.querySelector('.fangateStep.state');
      let stepLabel;
      if (curStep.classList.contains('pull-left')) {
        return; // continue
      }
      if (!curStep.classList.contains('done')) {
        stepLabel = Array.from(curStep.classList)
        .find(v => v.includes('fangateStep--'))
        .replace('fangateStep--', '');
        console.info(stepLabel, curStep, curStep.classList.contains('done'), curStep.classList.contains('pull-left'));
        switch (stepLabel) {
          case 'soundcloud':
          case 'facebook':
            // TODO : use post message API to communicate with child windows.
            // TODO : sessionStorage set value to check the connect process
            // TODO : facebook and youtube does not require any validation. So just close it's modal
            window.setTimeout(() => {
              curEl.querySelector('.socBtn').click();
              console.info('trigger click for' + stepLabel);
            }, 200);
            break;
          case 'comment':
            let isDomLoaded = false;
            $(document).ready(() => {
              isDomLoaded = true
            });
            // FIXME : why addEventListener not work?. Handler event not get called by any thread ?
            // document.addEventListener('DOMContentLoaded', () => {
            //   isDomLoaded = true;
            // });
            const commentPump = () => {
              console.warn(!document.querySelector('#soundcloud-api') || !isDomLoaded, !document.querySelector('#soundcloud-api'), !isDomLoaded);
              if (!document.querySelector('#soundcloud-api') || !isDomLoaded) {
                window.setTimeout(commentPump, 300);
                console.info('no SC api or dom not ready yet, try in next 200 ms');
                return;
              }
              curEl.querySelector('input[name="fangate_comment"]').value = window.hypedditSettings.comment;
              const button = curEl.querySelector('.btn.fangatex__sendComment');
              button.click();
              console.info('trigger Comment click for' + stepLabel);
              // Please don't remove this. Need to consider it later.
              // const scConn = SC.connect(function () {
              //   $.nette.ajax({
              //     url: "/?do=mySoundcloudAccessToken"
              //   }).success(function (e) {
              //     console.log(e), accessToken = e, console.log(e), $.nette.ajax({
              //       url: t.attr("data-href").replace("accessToken=access_token", "accessToken=" + accessToken)
              //     })
              //   })
              // });
              sessionStorage.setItem('scConnDialog', (new URLSearchParams(button.dataset.href.split('?')[1]).get('fangateId')));
            }
            window.setTimeout(commentPump, 300);
            break;
        }
        window.isPumpHandled = true;
      }
    });
  }
  window._pumpUrSoundHandler = pumpUrSoundHandler;

  if (window.location.host.includes('pumpyoursound.com') && window.location.href.includes('/f/')) {
    console.info('Run pumpUrSoundHandler');
    pumpUrSoundHandler();
    return;
  }

  if (window.location.host.includes('pumpyoursound.com') && window.location.href.includes('/soundConnectAuth/')) {
    console.info(sessionStorage.getItem('scConnDialog'));
    console.info(window.location.href.includes(sessionStorage.getItem('scConnDialog')));
    window.close();
    console.info('pump connect closed');
    return;
  }

  if (window.location.host.includes("soundcloud.com")) {
    const button = document.querySelector('button[type="submit"]')

    if (button) {
      button.click()
    } else {
      let isDone = false
      const maxTries = 10
      let cou = 0

      const retryClick = () => {
        const button = document.querySelector('button[type="submit"]')

        if (button) {
          button.click()
          isDone = true
        } else {
          cou++
          if (cou < maxTries) {
            setTimeout(retryClick, 200)
          }
        }
      }

      setTimeout(retryClick, 200)
    }
  }

  window.handleFollowOptions = function (containerElementId, skipperId) {
    if (document.getElementById(containerElementId) !== null) {
      document
      .getElementById(containerElementId)
      .querySelectorAll("a")
      .forEach((accountItem) => {
        accountItem.classList.remove("undone")
        accountItem.classList.add("done")
      })

      document.getElementById(skipperId).click()
    }
  }

  window.handleSoundCloud = function () {
    console.log("SOUNDCLOUD")

    const comment = window.hypedditSettings.comment

    if (document.getElementById("sc_comment_text") !== null) {
      document
      .getElementById("sc_comment_text")
      .setAttribute("value", comment)
    }

    if (document.getElementById("step_sc") !== null) {
      document.getElementById("step_sc").querySelector("a").click()
    }
  }

  window.handleInstagram = function () {
    console.log("INSTA")
    window.handleFollowOptions("instagram_status", "skipper_ig_next")
  }

  window.handleYoutube = function () {
    console.log("YOUTUBE")
    window.handleFollowOptions("youtube_status", "skipper_yt_next")
  }

  window.handleSpotify = function () {
    console.log("SPOTIFY")
    document.getElementById("step_sp").querySelector("a").click()
  }

  window.handleDownload = function () {
    console.log("DOWNLOAD")
    downloadUnlimitedGate()

    if (window.hypedditSettings.auto_close) {
      const timeout = window.hypedditSettings.auto_close_timeout_in_ms
      window.setTimeout(function () {
        close()
      }, timeout)
    }
  }

  window.handleEmail = function () {
    const email = window.hypedditSettings.email
    const name = window.hypedditSettings.name

    if (document.getElementById("email_name") !== null) {
      document.getElementById("email_name").setAttribute("value", name)
    }

    if (document.getElementById("email_address") !== null) {
      document
      .getElementById("email_address")
      .setAttribute("value", email)
      document.getElementById("email_address").value = email
    }

    document.getElementById("email_to_downloads_next").click()
  }

  window.handleTikTok = function () {
    console.log("TIKTOK")
    window.handleFollowOptions("tiktok_status", "skipper_tk_next")
  }

  window.handleFacebook = function () {
    console.log("FACEBOOK")
    document.getElementById("fbCarouselSocialSection").click()
  }

  window.handleMultiPortal = function () {
    document.getElementById("step_email").previousElementSibling.click()
    window.handleEmail()
  }

  window.handleEmailSoundCloud = function () {
    document.getElementById("step_email").previousElementSibling.click()
    window.handleEmail()
  }

  window.handleSoundCloudYoutube = function () {
    document.getElementById("step_yt").previousElementSibling.click()
    window.handleYoutube()
  }

  window.handleDonate = function () {
    document.getElementById("step_dn").previousElementSibling.click()
    document.getElementById("donation_next").click()
  }



  const targetNode = document.getElementById("myCarousel")

  const config = { attributes: true, childList: true, subtree: true }

  let prevStepContent = null
  const callback = (mutationList, observer) => {
    for (const mutation of mutationList) {
      if (mutation.type === "attributes") {
        const stepContent = document.querySelector(
          ".fangate-slider-content:not(.move-left)"
        )

        if (stepContent !== prevStepContent) {
          const stepClassList = stepContent.classList

          if (stepClassList.contains("sp|ig|email")) {
            window.handleMultiPortal()
          }

          if (stepClassList.contains("email|sc")) {
            window.handleEmailSoundCloud()
          }

          if (stepClassList.contains("sc|yt")) {
            window.handleSoundCloudYoutube()
          }

          if (stepClassList.contains("dn")) {
            window.handleDonate()
          }

          if (stepClassList.contains("sc")) {
            window.handleSoundCloud()
          }

          if (stepClassList.contains("ig")) {
            window.handleInstagram()
          }

          if (stepClassList.contains("dw")) {
            window.handleDownload()
          }

          if (stepClassList.contains("yt")) {
            window.handleYoutube()
          }

          if (stepClassList.contains("sp")) {
            window.handleSpotify()
          }

          if (stepClassList.contains("email")) {
            window.handleEmail()
          }

          if (stepClassList.contains("tk")) {
            window.handleTikTok()
          }

          if (stepClassList.contains("fb")) {
            window.handleFacebook()
          }
        }

        prevStepContent = stepContent
      }
    }
  }

  const observer = new MutationObserver(callback)

  observer.observe(targetNode, config)

  const _start = () => {
    if (document.getElementById("downloadProcess") !== null) {
      document.getElementById("downloadProcess").click()
    }
  }

  window.setTimeout(_start, 800)
})()

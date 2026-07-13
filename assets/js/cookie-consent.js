/* Bexorad cookie consent banner — Google Consent Mode v2
   -------------------------------------------------------
   Works together with the inline gtag consent snippet in <head>.
   Default consent state is set to "denied" in <head> BEFORE this file
   runs, so no ad/analytics cookies are set until the visitor accepts.
*/
(function () {
  var STORAGE_KEY = "bexorad_cookie_consent"; // "granted" | "denied"

  function getStoredConsent() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      return null;
    }
  }

  function storeConsent(value) {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch (e) {
      /* ignore if storage is unavailable */
    }
  }

  function updateGoogleConsent(granted) {
    if (typeof window.gtag === "function") {
      window.gtag("consent", "update", {
        ad_storage: granted ? "granted" : "denied",
        ad_user_data: granted ? "granted" : "denied",
        ad_personalization: granted ? "granted" : "denied",
        analytics_storage: granted ? "granted" : "denied",
      });
    }
  }

  function hideBanner(banner) {
    banner.classList.remove("is-visible");
    setTimeout(function () {
      banner.style.display = "none";
    }, 250);
  }

function showCookieBanner() {
  var banner = document.getElementById("cookieConsentBanner");
  if (!banner) return;

  banner.style.display = "flex";

  requestAnimationFrame(function () {
    banner.classList.add("is-visible");
  });
}

// Make it accessible from anywhere
window.showCookieBanner = showCookieBanner;

  function init() {
    var banner = document.getElementById("cookieConsentBanner");
    if (!banner) return;

    var stored = getStoredConsent();
    if (stored === "granted") {
      updateGoogleConsent(true);
      return;
    }
    if (stored === "denied") {
      updateGoogleConsent(false);
      return;
    }

    // No stored choice yet — show the banner.
    showCookieBanner();

    var acceptBtn = document.getElementById("cookieConsentAccept");
    var rejectBtn = document.getElementById("cookieConsentReject");

    if (acceptBtn) {
      acceptBtn.addEventListener("click", function () {
        storeConsent("granted");
        updateGoogleConsent(true);
        hideBanner(banner);
      });
    }
    if (rejectBtn) {
      rejectBtn.addEventListener("click", function () {
        storeConsent("denied");
        updateGoogleConsent(false);
        hideBanner(banner);
      });
    }
  }

if (document.readyState === "loading") {

  document.addEventListener("DOMContentLoaded", function () {

    init();

    var privacyLink = document.getElementById("privacy-choices-link");

    if (privacyLink) {
      privacyLink.addEventListener("click", function (e) {
        e.preventDefault();
        showCookieBanner();
      });
    }

  });

} else {

  init();

  var privacyLink = document.getElementById("privacy-choices-link");

  if (privacyLink) {
    privacyLink.addEventListener("click", function (e) {
      e.preventDefault();
      showCookieBanner();
    });
  }

}
})();

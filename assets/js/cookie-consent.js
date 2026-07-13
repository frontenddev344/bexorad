/* Bexorad cookie consent banner — Google Consent Mode v2 */

(function () {

  var STORAGE_KEY = "bexorad_cookie_consent";

  var banner;
  var acceptBtn;
  var rejectBtn;

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
    } catch (e) {}
  }

  function updateGoogleConsent(granted) {

    if (typeof gtag !== "function") return;

    gtag("consent", "update", {
      ad_storage: granted ? "granted" : "denied",
      analytics_storage: granted ? "granted" : "denied",
      ad_user_data: granted ? "granted" : "denied",
      ad_personalization: granted ? "granted" : "denied"
    });

  }

  function showBanner() {

    if (!banner) return;

    banner.style.display = "flex";

    requestAnimationFrame(function () {
      banner.classList.add("is-visible");
    });

  }

  function hideBanner() {

    if (!banner) return;

    banner.classList.remove("is-visible");

    setTimeout(function () {
      banner.style.display = "none";
    }, 250);

  }

  function acceptCookies() {

    storeConsent("granted");

    updateGoogleConsent(true);

    hideBanner();

  }

  function rejectCookies() {

    storeConsent("denied");

    updateGoogleConsent(false);

    hideBanner();

  }

  function init() {

    banner = document.getElementById("cookieConsentBanner");

    if (!banner) return;

    acceptBtn = document.getElementById("cookieConsentAccept");
    rejectBtn = document.getElementById("cookieConsentReject");

    if (acceptBtn) {
      acceptBtn.addEventListener("click", acceptCookies);
    }

    if (rejectBtn) {
      rejectBtn.addEventListener("click", rejectCookies);
    }

    var privacyLink = document.getElementById("privacy-choices-link");

    if (privacyLink) {

      privacyLink.addEventListener("click", function (e) {

        e.preventDefault();

        showBanner();

      });

    }

    var stored = getStoredConsent();

    if (stored === "granted") {

      updateGoogleConsent(true);

      return;

    }

    if (stored === "denied") {

      updateGoogleConsent(false);

      return;

    }

    showBanner();

  }

  window.showCookieBanner = showBanner;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

})();   
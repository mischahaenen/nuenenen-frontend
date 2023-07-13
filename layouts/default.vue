<template>
  <div>
    <BaseHeader />
    <main>
      <slot />
    </main>
    <BaseFooter />
  </div>
  <!-- Matomo -->
  <script type="application/javascript">
      var _paq = window._paq = window._paq || [];
      /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
      _paq.push(["setDocumentTitle", document.domain + "/" + document.title]);
      _paq.push(["setCookieDomain", "*.www.aula2023.ch"]);
      _paq.push(['trackPageView']);
      _paq.push(['enableLinkTracking']);
      (function() {
        var u="https://stat.pfadi-nuenenen.ch/";
        _paq.push(['setTrackerUrl', u+'matomo.php']);
        _paq.push(['setSiteId', '1']);
        var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
        g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
      })();
  </script>
  <!-- End Matomo Code -->
</template>

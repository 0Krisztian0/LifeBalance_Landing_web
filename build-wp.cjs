const fs = require('node:fs');
const path = require('node:path');

const root = __dirname;
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const css = html.match(/<style>([\s\S]*?)<\/style>/)?.[1];
const start = html.indexOf('<div class="lp">');
const end = html.lastIndexOf('</div>\n</body>');
const body = start >= 0 && end > start ? html.slice(start, end + '</div>'.length) : '';
if (!css || !body) throw new Error('Nem található a WordPressbe csomagolandó HTML vagy CSS.');
fs.writeFileSync(path.join(root, 'wp-beillesztes.html'),
  '<!-- WordPress HTML blokk / Elementor HTML widget. Feltöltés után a kép src értékét cseréld a Médiatár pontos URL-jére. -->\n' +
  '<style>\n' + css + '\n</style>\n' +
  body.replace('src="kepek/felulet.png"', 'src="[MEDIATÁR URL: lifebalance-felulet.png]"') + '\n', 'utf8');

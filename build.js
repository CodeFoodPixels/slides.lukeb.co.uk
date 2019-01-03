'use strict';

const fs = require('fs');
const redirects = require('./redirects.json');

fs.mkdirSync(`build`);

fs.copyFileSync(`404.html`, `build/404.html`);

for (let slug in redirects) {
    fs.appendFileSync(`build/_redirects`, `/${slug} ${redirects[slug]} 301!\n`);
}


'use strict';

const fs = require('fs');
const redirects = require('./redirects.json');

if (fs.existsSync(`build`)) {
    fs.rmdirSync(`build`);
}

fs.mkdirSync(`build`);

const links = [];
for (let slug in redirects) {
    fs.appendFileSync(`build/_redirects`, `/${slug.toLowerCase()} ${redirects[slug]} 301!\n`);
    links.unshift(`<p><a href="${redirects[slug]}">${slug}</a></p>\n`);
}

let errorPage = fs.readFileSync(`404.html`, 'utf8');

errorPage = errorPage.replace(`{{list}}`, links.join(''));

fs.writeFileSync(`build/404.html`, errorPage);

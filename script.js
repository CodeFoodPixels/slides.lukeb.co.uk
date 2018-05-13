'use strict';

const rimraf = require('rimraf');
const fs = require('fs');
const redirects = require('./redirects.json');

rimraf('docs/!(404.html)', (err) => {
    if (err) {
        throw err;
    }

    for (let key in redirects) {
        fs.mkdir(`docs/${key}`, (err) => {
            if (err) {
                throw err;
            }

            const file = `<!DOCTYPE html>
<html>
<head>
    <title>Redirecting...</title>
    <meta http-equiv="refresh" content="0;url=${redirects[key]}" />
</head>
<body>
    <a href="${redirects[key]}">CLick here if you're not redirected</a>
</body>
</html>
`

            fs.writeFile(`docs/${key}/index.html`, file, (err) => {
                if (err) {
                    throw err;
                }
            });
        })
    }
})

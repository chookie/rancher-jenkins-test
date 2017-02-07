import serializeJs  from 'serialize-javascript';

function getCss(styleSrc) {
  if(process.env.NODE_ENV === 'production') {
    return `<link href="${styleSrc}" rel="stylesheet" />`;
  }
  return styleSrc;
}

function getJs(jsSrc) {
  if(jsSrc) {
    return `<script src="${jsSrc}"></script>`;
  }
  return jsSrc;
}

function getHtml({head, preloadedState, html, styleSrc, jsSrc}) {
  return (`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta charset="utf-8"/>
      <meta content="width=device-width, initial-scale=1" name="viewport">
      <meta name="description" content=${head.meta.description}/>
      <title>${head.title}</title>
      <link rel="stylesheet" type="text/css" href="https://cloud.typography.com/6907712/671986/css/fonts.css"/>
      <link href="/images/favicon.ico" rel="shortcut icon">
      ${getCss(styleSrc)}
    </head>
    <body>
        <script>
          window.__PRELOADED_STATE__ = ${serializeJs(preloadedState, {isJSON: true})}
        </script>
        <div id="app">${html}</div>
        ${getJs(jsSrc)}
    </body>
    </html>
`);
}

export { getHtml };

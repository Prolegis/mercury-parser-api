import Mercury from '@postlight/mercury-parser';

import { corsSuccessResponse, corsErrorResponse, runWarm } from './utils';

const parseHtml = async ({ body }, context, cb) => {
  const { url, html } = JSON.parse(body);
  // const Buffer = require('buffer/').Buffer;
  const htmlBuffer = Buffer.from(html, 'utf-8');

  const result = await Mercury.parse(url, {
    contentType: 'text',
    htmlBuffer,
  });

  // const result = await Mercury.parse(url, { html });

  return cb(
    null,
    result
      ? corsSuccessResponse(result)
      : corsErrorResponse({ message: 'There was an error parsing that URL.' })
  );
};

export default runWarm(parseHtml);

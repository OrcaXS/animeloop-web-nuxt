/**
 * Originally written by NanozukiCrows
 */

import fetch from 'isomorphic-fetch';
import qs from 'qs';

import apiPrefix from '~/config';

function encodeFormData(data) {
  return Object.entries(data).map(item => (
    `${item[0]}=${encodeURIComponent(item[1])}`
  )).join('&');
}

/* request proptype: {
 *   url: '',
 *   data: {},
 *   method: 'GET',
 * }
 */
async function callApi(request) {
  const init = {
    method: request.method || 'GET',
    headers: {},
  };
  const hasBody = !((init.method === 'GET') || (init.method === 'HEAD'));

  // headers and body
  if (hasBody) {
    init.headers['content-type'] = 'application/x-www-form-urlencoded';
    init.body = encodeFormData(request.data);
  }

  // url
  const url = ((!hasBody) && (request.data))
    ? `${apiPrefix}${request.url}${qs.stringify(request.data, { addQueryPrefix: true })}`
    : `${apiPrefix}${request.url}`;

  try {
    const res = await fetch(url, init);
    const json = await res.json();
    return json;
  } catch (error) {
    throw error;
  }
}

const remote = {
  getOneRandomLoop: callApi({ url: 'rand/loop', data: { full: true, limit: 1 } }),
  getRandomLoopList: count => callApi({ url: 'rand/loop', data: { full: true, limit: count } }),
  getLoopByID: id => callApi({ url: 'loop', data: { id } }),
  getLoopsByEpisodeID: id => callApi({ url: 'loop', data: { episodeid: id } }),
  getEpisodeByID: id => callApi({ url: 'episode', data: { id } }),
  getEpisodesBySeriesID: id => callApi({ url: 'episode', data: { seriesid: id } }),
  getTagsByID: id => callApi({ url: 'tag', data: { loopid: id } }),
  getSeriesByID: id => callApi({ url: 'series', data: { id } }),
  getSeriesByString: string => callApi({ url: 'search/series', data: { value: string } }),
  // getSeriesPageCount: callApi({ url: 'series/page/count' }),
  // getSeriesByPageNum: num => callApi({ url: 'series', data: { page: num } }),
  // getSeriesBySeason: seasonString => call({ url: ''})
  getAllSeasons: callApi({ url: 'series/season' }),
  getSeriesGroup: ({
    type, season, page, limit,
  } = {}) => callApi({
    url: 'series',
    data: {
      type, season, page, limit,
    },
  }),
  getSeriesCount: ({
    type, season,
  } = {}) => callApi({
    url: 'series/count',
    data: {
      season, type,
      // Avoid request being blocked by uBlock
    },
  }),
};

export default remote;

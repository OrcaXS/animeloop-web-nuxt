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
    console.log(url);
    return json;
  } catch (error) {
    throw error;
  }
}

const remote = {
  getOneRandomLoop: callApi({ url: 'rand/loop/full' }),
  getRandomLoopList: count => callApi({ url: `rand/loop/${count}/full` }),
  getLoopByID: id => callApi({ url: `loop/${id}/full` }),
  getLoopsByEpisodeID: id => callApi({ url: 'loop', data: { episode: id } }),
  getEpisodeByID: id => callApi({ url: `episode/${id}/full` }),
  getEpisodesBySeriesID: id => callApi({ url: 'episode', data: { series: id } }),
  getTagsByID: id => callApi({ url: 'tag', data: { loop: id } }),
  getSeriesByID: id => callApi({ url: `series/${id}` }),
  getSeriesByString: string => callApi({ url: 'search/series', data: { value: string } }),
  getSeriesPageCount: callApi({ url: 'series/page/count' }),
  getSeriesByPageNum: num => callApi({ url: 'series', data: { page: num } }),
};

export default remote;

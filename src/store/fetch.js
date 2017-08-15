async function fetchGen(fetchUri, fetchOptions) {
  // const reqID = JSON.parse(fetchOptions.body).id;
  const response = await fetch(fetchUri, fetchOptions);
  if (response.status !== 200) {
    throw new Error(`Returned ${response.status}: ${response.statusText}`);
  }
  const json = await response.json();
  // if (reqID !== json.id) {
  //   throw new Error(`ID Mismatched: reqID is ${reqID}, resID is ${json.id}`);
  // }
  return json;
}

export default fetchGen;

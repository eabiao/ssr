let listResp = await fetch(process.env.URL01, {
  method: 'POST',
  headers: {
    'token': process.env.TOKEN
  }
});

let resultList = await listResp.json();

resultList.forEach(item=>{
  let uuid = item.uuid;

  let ssrResp = await fetch(item.url, {
    method: 'POST',
    headers: {
      'Accept':'*/*',
      'User-Agent':'clash-verge/v1.7.5'
    }
  });

  let ssrRespHeaders = await ssrResp.headers;
  let ssrRespBody = await ssrResp.text();

  console.log(item.uuid, item.url, ssrRespHeaders, ssrRespBody);
});

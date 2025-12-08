let listResp = await fetch(process.env.URL01, {
  headers: {
    'user-agent': process.env.TOKEN
  }
});

let resultList = await listResp.json();

for(let item of resultList){
  console.log("uuid:", item.uuid);

  let ssrResp1 = await fetch(item.url, {
    headers: {
      'Accept':'*/*',
      'User-Agent':'Shadowrocket/2678'
    }
  });
  
  let ssrResp2 = await fetch(item.url, {
    headers: {
      'Accept':'*/*',
      'User-Agent':'clash-verge/v1.7.5'
    }
  });

  let data = {
    uuid: item.uuid,
    headers: Object.fromEntries(ssrResp.headers.entries()),
    value1: await ssrResp1.text(),
    value2: await ssrResp2.text()
  };

  await fetch(process.env.URL02, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'user-agent': process.env.TOKEN
    },
    body: JSON.stringify(data)
  });

  console.log("uuid:", item.uuid, "done.\n");
}



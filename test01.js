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
      'User-Agent':'Shadowrocket/2678 CFNetwork/3826.600.41 Darwin/24.6.0 iPhone14,7'
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
    value1: {
      headers: Object.fromEntries(ssrResp1.headers.entries()),
      body: await ssrResp1.text()
    },
    value2: {
      headers: Object.fromEntries(ssrResp2.headers.entries()),
      body: await ssrResp2.text()
    }
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



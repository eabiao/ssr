let listResp = await fetch(process.env.URL01, {
  headers: {
    'user-agent': process.env.TOKEN
  }
});

let resultList = await listResp.json();

for(let item of resultList){
  console.log("pull", item.uuid);
  
  let ssrResp = await fetch(item.url, {
    headers: {
      'Accept':'*/*',
      'User-Agent':'clash-verge/v1.7.5'
    }
  });
  
  console.log("pull", item.uuid, "done.\n");

  let data = {
    uuid: item.uuid,
    value: {
      headers: {"subscription-userinfo": ssrResp.headers.get("subscription-userinfo")},
      body: await ssrResp.text()
    }
  };

  console.log("push", item.uuid);
  await fetch(process.env.URL02, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'user-agent': process.env.TOKEN
    },
    body: JSON.stringify(data)
  });

  console.log("push", item.uuid, "done.\n");
}



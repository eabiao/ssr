let listResp = await fetch(process.env.URL01, {
  headers: {
    'user-agent': process.env.TOKEN
  }
});

let resultList = await listResp.json();

async function process(item) {
  console.log("uuid:", item.uuid);
  
  let ssrResp = await fetch(item.url, {
    headers: {
      'Accept':'*/*',
      'User-Agent':'clash-verge/v1.7.5'
    }
  });

  let data = {
    uuid: item.uuid,
    value: {
      headers: Object.fromEntries(ssrResp.headers.entries()),
      body: await ssrResp.text()
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

for(let item of resultList){
  await process(item);
}



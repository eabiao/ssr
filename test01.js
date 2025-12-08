let listResp = await fetch(process.env.URL01, {
  method: 'POST',
  headers: {
    'token': process.env.TOKEN
  }
});

let resultList = await listResp.json();

resultList.forEach(async (item) => {
  console.log("uuid:", item.uuid);
  
  let ssrResp = await fetch(item.url, {
    headers: {
      'Accept':'*/*',
      'User-Agent':'clash-verge/v1.7.5'
    }
  });

  let data = {
    "headers": Object.fromEntries(ssrResp.headers.entries()),
    "body": await ssrResp.text()
  };

  await fetch(process.env.URL02, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'token': process.env.TOKEN
    },
    body: data
  });

  console.log("@@@@@post data", data , "--------------\n\n\n");

  console.log("uuid:", item.uuid, "done.\n");
});

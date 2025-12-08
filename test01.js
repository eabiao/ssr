let listResp = await fetch(process.env.URL01, {
  method: 'POST',
  headers: {
    'token': process.env.TOKEN
  }
});

let resultList = await listResp.json();
console.log(resultList);

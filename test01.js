const listUrl = process.env.URL01;
const saveUrl = process.env.URL02;

const cmsHeaders = {
  "token": process.env.TOKEN
};

const ssrHeaders = {
  'Accept':'*/*',
  'User-Agent':'clash-verge/v1.7.5'
};

let ssrUrl = "";

const resp01 = await fetch(listUrl, {ssrHeaders});

console.log("headers", await resp01.headers);
console.log("headers", await resp01.text());

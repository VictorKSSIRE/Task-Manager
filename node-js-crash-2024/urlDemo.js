import url from 'url';

const urlString = 'http://www.google.com/search?q=hello+world';

// URL Object
const urlObj = new URL(urlString);

console.log(urlObj);

// format() - object to string
console.log(url.format(urlObj));

// import.meta.url - file URL 
console.log(import.meta.url);

// fileURLToPath()
console.log(url.fileURLToPath(import.meta.url));

console.log(urlObj.search);

const params = new URLSearchParams(urlObj.search);
console.log(params);
params.append('limit', '5');
console.log(params);
var token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMSIsInJvbGVzIjpbXSwiZXhwIjoxNjc2Mzc0Mzg5LCJpYXQiOjE2NzYzNzI1ODl9.5Zn48t3VoyMQNSwdW6bDg_UyWWO-1_uP19Ijm-gHkqs"

var base64Payload = token.split('.')[1]; //value 0 -> header, 1 -> payload, 2 -> VERIFY SIGNATURE
var payload = Buffer.from(base64Payload, 'base64'); 
var result = JSON.parse(payload.toString())
console.log(result);

const arr =  ["ROLE_ADMIN", "ROLE_PERMITTED"]
let found = arr.find(e => e == 'c');

console.log(!found);
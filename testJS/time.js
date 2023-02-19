let a = 1669258404 * 1000;
// let b = 1663555632 * 1000;


let date = new Date(a);
// let date1 = new Date(b);

function getWorldTime(tzOffset) {
  var now = new Date(1661139035 * 1000);
  var tz = now.getTime() + now.getTimezoneOffset() * 60000 + tzOffset * 3600000;
  now.setTime(tz);
  var s =
    leadingZeros(now.getFullYear(), 4) +
    "-" +
    leadingZeros(now.getMonth() + 1, 2) +
    "-" +
    leadingZeros(now.getDate(), 2) +
    " " +
    leadingZeros(now.getHours(), 2) +
    ":" +
    leadingZeros(now.getMinutes(), 2) +
    ":" +
    leadingZeros(now.getSeconds(), 2);
  return s;
}
function leadingZeros(n, digits) {
  var zero = "";
  n = n.toString();
  if (n.length < digits) {
    for (i = 0; i < digits - n.length; i++) zero += "0";
  }
  return zero + n;
}


// console.log(getWorldTime(-4));

console.log(date);
// console.log(date1);

console.log("did:ethr:0x5:0x3aFA93a829a3d12D56336e6320559C8A372e76AE".replace("did:ethr:0x5:",""));
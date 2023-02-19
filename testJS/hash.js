const CryptoJS = require('crypto-js')
const axios = require('axios')

const date = Date.now().toString();
const subId = "ncp:sms:kr:269773260607:sens_demo2";
const accessKey = "TAlzIzn8oq7YjxXpVxfS";
const secretKey = "bc47a6e0hqHSSScmBSoBSFB2ZwHAssMFgSKUPzif";
const method = 'POST';
const space = " ";
const newLine = "\n";
const apiUrl = `https://sens.apigw.ntruss.com/sms/v2/services/${subId}/messages`;
const url2 = `/sms/v2/services/${subId}/messages`;

const  hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secretKey);

hmac.update(method);
hmac.update(space);
hmac.update(url2);
hmac.update(newLine);
hmac.update(date);
hmac.update(newLine);
hmac.update(accessKey);

const hash = hmac.finalize();
const signature = hash.toString(CryptoJS.enc.Base64);

console.log(signature);
console.log(date);

axios({
    method: method,
    json: true,
    url: apiUrl,
    headers: {
      'Content-Type': 'application/json',
      'x-ncp-iam-access-key': accessKey,
      'x-ncp-apigw-timestamp': date,
      'x-ncp-apigw-signature-v2': signature,
    },
    data: {
      type: 'SMS',
      contentType: 'COMM',
      countryCode: '82',
      from: '01091628235',
      content: `[NEOND] 인증번호 [1234]를 입력해주세요.`,
      messages: [
        {
          to: `01091628235`,
        },
      ],
    }, 
    })
  .then(function (data) {
    console.log(data);
  })

const pinataSDK = require('@pinata/sdk')
const jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI0YzFkOTkxZC0yNzRjLTRhZTMtYjA2OS1jNDgwNDlmOTdhNGYiLCJlbWFpbCI6ImltZWxvbjI3OUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiN2YyYjA3NjFhNzU1OWIzYzllOTciLCJzY29wZWRLZXlTZWNyZXQiOiIwNTAyNTQ2MDQ3NWU4ZTY4NWY3NTVjYTczMTc0MzVhNjNjOGE4NWY1MTY2YjZkNjk0OGNkYzI5MTkxNTI4YmRkIiwiaWF0IjoxNjY4NTgwNzUyfQ.krP5mUghGJXqLqJ1j_ITitN-Hb39lzU22DobC7sHnBc"
const pinata = new pinataSDK({ pinataJWTKey: jwt});

// const body = {
//     message: 'Pinatas are awesome'
// };
// const options = {
//     pinataMetadata: {
//         name: MyCustomName,
//         keyvalues: {
//             customKey: 'customValue',
//             customKey2: 'customValue2'
//         }
//     },
//     pinataOptions: {
//         cidVersion: 0
//     }
// };

// pinata.testAuthentication().then((result) => {
//     //handle successful authentication here
//     console.log(result);
// }).catch((err) => {
//     //handle error here
//     console.log(err);
// });

// pinata.pinJSONToIPFS(body, null).then((result) => {
//     //handle results here
//     console.log(result);
// }).catch((err) => {
//     //handle error here
//     console.log(err);
// });

const path = "/Users/choiwonhyeok/Documents/test/json"
const options = {
    pinataMetadata: {
        name: 'My Awesome Website',
        // keyvalues: {
        //     customKey: 'customValue',
        //     customKey2: 'customValue2'
        // }
    },
    pinataOptions: {
        cidVersion: 0
    }
};

pinata.pinFromFS(path, options).then((result) => {
    //handle results here
    console.log(result);
}).catch((err) => {
    //handle error here
    console.log(err);
});
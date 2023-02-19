// const arr = new Array(16).fill().map((_,i) => i+1); // 배열 생생성

// // 피셔-예이츠 셔플
// const fysOriginal = (arr) => {
//     let roll = Math.floor(Math.random() * arr.length);
//     const strikeOut = [];
//     while(arr.length) {
//         strikeOut.push(arr.splice(roll,1)[0]);
//         roll +=1;
//         if(roll >= arr.length)
//         roll = 0;
//     }
//     return strikeOut
// }

// // 빙고판 생성
// const shuffle = fysOriginal(arr)
// const binggo = Array.from(Array(4), (_,i) => new Array(4).fill().map((_,j) => shuffle[i*4+j]))
// console.log(binggo);


const result =  [
    [ true, true, true, true ],
    [ false, true, false, false ],
    [ false, false, true, false ],
    [ false, false, true, true ],
]

function BinggoResult(arr2) {
    var row = 0; // 가로빙고
    var col = 0; // 세로빙고
    var cross = 0; // 대각선빙고


    // 가로빙고 카운트
    for (i = 0; i < arr2.length; i++) {
        var check = false;
        for (var j = 0; j < arr2[i].length; j++) {
            if (arr2[i][j] == true) {
                check = true;
            } else {
                check = false;
                break;
            }
        }
        if (check) row++; // 빙고 카운트
    }

    // 세로빙고 카운트
    for (i = 0; i < arr2[0].length; i++) {
        var check = false;
        for (var j = 0; j < arr2[i].length; j++) {
            if (arr2[j][i] == true) {
                check = true;
            } else {
                check = false;
                break;
            }
        }
        if (check) col++;  //빙고 카운트 
    }

    // 대각선 빙고 카운트
    var right = 0;
    var left = 0;

    for (i = 0; i < arr2[0].length; i++) {
        if (arr2[i][i] == true) right++; // 오른대각
        if (arr2[arr2.length - i - 1][i] == true) left++;  // 왼대각
        if (right == 4 || left == 4) cross++;
    }
    if (right == 4 && left == 4) cross++;

    // 결과
    console.log(cross + row + col);
}

BinggoResult(result);


// a,b,c => 15 빙고!

// [
    // [ 8, 10, 12, 14, 16 ],
    // [ 18, 20, 22, 24, 1 ],
    // [ 3, 5, 7, 11, 15 ],
    // [ 19, 23, 2, 6, 13 ],
    // [ 21, 4, 17, 9, 25 ]
// ]

// [
//   [ 6, 8, 10, 12, 14 ],
//   [ 16, 18, 20, 22, 24 ],
//   [ 1, 3, 5, 9, 13 ],
//   [ 17, 21, 25, 2, 7 ],
//   [ 15, 23, 4, 19, 11 ]
// ]

// [
//   [ 25, 1, 3, 5, 7 ],
//   [ 9, 11, 13, 15, 17 ],
//   [ 19, 21, 23, 2, 6 ],
//   [ 10, 14, 18, 22, 4 ],
//   [ 12, 20, 8, 24, 16 ]
// ]





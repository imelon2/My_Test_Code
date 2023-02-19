const arr = new Array(25).fill().map((_,i) => i+1); //배열 생생성

// const arr2 = Array.from(Array(5), () => new Array(5).fill().map((_,i) => i+1))
// arr.sort(() => {
// //   return 0.5 - Math.random();
// }); 


console.log(arr2)


function shuffle(array) {
    for (let index = array.length - 1; index > 0; index--) {
      // 무작위 index 값을 만든다. (0 이상의 배열 길이 값)
      const randomPosition = Math.floor(Math.random() * (index + 1));
  
      // 임시로 원본 값을 저장하고, randomPosition을 사용해 배열 요소를 섞는다.
      const temporary = array[index];
      array[index] = array[randomPosition];
      array[randomPosition] = temporary;
    }

    console.log(array);
  }

//   shuffle(arr)

// console.log(Math.floor(Math.random() * (5 + 1)));


// 임의로 입력된 배열 [1, 2, 3, 4, 5]가 있다고 가정해보자.
// 0부터 4까지의 난수를 발생시킨다.
// (2)에서 난수가 3이 나왔다고 가정해보자.
// 입력 배열[3]의 값을 뺀다. 그러면 입력배열은 [1, 2, 4, 5]가 된다.
// 난수 3에 1을 더한다(난수: 4)
// 난수 4와 입력 배열 길이에 1을 뺀 값를 비교연산 한다. 이 때 난수 4가 더 클 경우, 난수를 0으로 만들고, 난수 4가 더 작은 경우 값을 유지한다.
// (4) - (6) 과정을 입력 배열이 빈 상태가 될 때까지 반복한다.
const fysOriginal = (arr) => {
    let roll = Math.floor(Math.random() * arr.length);
    const firstRoll = roll;
    const strikeOut = [];
    while(arr.length) {
        strikeOut.push(arr.splice(roll,1)[0]);
        roll +=1;
        if(roll >= arr.length)
        roll = 0;
    }

    console.log(strikeOut);
}

// fysOriginal(arr)
// console.log(parseInt(2.94));
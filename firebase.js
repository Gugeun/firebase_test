const firebaseConfig = {
    apiKey: "AIzaSyBFdk0PkaHgeQ1J2zRQsVXlkMgre-WH6vs",
    authDomain: "prog-52077.firebaseapp.com",
    databaseURL: "https://prog-52077-default-rtdb.firebaseio.com",
    projectId: "prog-52077",
    storageBucket: "prog-52077.appspot.com",
    messagingSenderId: "611042588336",
    appId: "1:611042588336:web:e831552010eaafa9ad2d75",
    measurementId: "G-4DFZJVJWDZ"
  };

  // 파이어베이스 앱 초기화
const app = firebase.initializeApp(firebaseConfig);

// 파이어베이스 실시간 데이터베이스 생성
const database = firebase.database();

//데이터 저장 실습
function writeUserData(userId, email, nick) {
    
    database.ref("users/"+userId).set({
      email: email,
      nick : nick
    });
}
//////////////////////////////////////////////////////////
// 데이터 읽기 실습
// 1. 전체 조회된 결과 출력
//    - 테이블 태그 or 목록 태그를 활용해서 출력

// 2. 특정 사용자 조회
//    - id값 입력받은 후 해당 사용자의 email, nick 출력

function readUserData(){
    database.ref("users/").on('value',(snapshot)=>{
        // 실시간 데이터베이스 값 접근
        console.log(snapshot.val());

        let data = snapshot.val();
        let keys = Object.keys(data);

        console.log(Object.keys(data));
        console.log(data["google"]);
        console.log(data[keys[0]]);
        console.log(keys.length);
        const result = document.getElementById("result");

        // 데이터베이스 웹 페이지 출력
        // result.innerText = `${data[keys[0]].email} / ${data[keys[0]].nick}`;
        for(let i=0; i<keys.length;i++){
            result.innerHTML += `${data[keys[i]].email} / ${data[keys[i]].nick}`
            
        };
    });
};

//////////////////////////////////////////////////////////

const readBtn = document.getElementById("readBtn");

readBtn.addEventListener("click",()=>{
    readUserData();
});

let form = document.querySelector("form");
let id = form.id;
let email = form.email;
let nick = form.nick;
let submit = document.getElementById("submit");

submit.addEventListener("click", (event) => {
    event.preventDefault();
    console.log(id.value);
    console.log(email.value);
    console.log(nick.value);

    writeUserData(id.value,email.value,nick.value);
});
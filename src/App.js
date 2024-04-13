import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react'; //일부분만 갱신

// html코드을 작성하려면 return()안에 작성
// css를 사용하려면 위에 보이는 것처럼 import './App.css' : App.css랑 연결
// class -> className : js에 이미 class라는 명령어가 있어서
// - 표시는 뺄셈으로 취급하기 때문에 대문자로 작성 : font-size => fontSize
// 변수를 사용할 때는 {}로 이용
// style은 object 자료형으로 작성{키:값, 키:값}
// return() 안에 가장 바깥에는 하나의 태그만 : 모든것을 감싸는 div 하나만 허용

// react : 변수가 바뀌면 화면이 바뀌는 useState (웹페이지를 다시 불러올 필요가 없음)
// -> import React, {useState} from 'react';
// react는 화면에 보여줄 값을 '변수'에 보관하지 않고 'state'에 보관
// 변수는 값이 변경되어도 화면에 반영되지 않지만, useState라는 것을 사용하면 값이 바뀌면 화면도 따라서 바뀜
// 따라서, 변경될만한 값은 useState로 보관하고, 변경이 안될 값은 변수에 보관

function App() {
  // 여기에 자바스크립트 작성 가능
  let 변수 = 'React Company' //html안에서 사용하려면 {}필요
  // useState 사용 이유 : 값 바뀌면 화면도 같이 바뀌게 하려고
  let [value, setValue] = useState ('Daily Memory')
  let [title, setTitle] = useState (['제목1','제목2','제목3','제목4'])
  let [dateTime, setDateTime] = useState (['2024.04.13', '2024.04.12', '2024.03.29', '2024.02.28'])
  let [score, setScore] = useState ([0, 0, 0, 0])
  //useState로 false [modal, setModal]
  let [modal, setModal] = useState (false)
  let [curIdx, setCurIdx] = useState (0)  //모달창이 열릴 때 몇번 째 항목이 열렸는지 구분


  let [icon, setIcon] = useState(['💌', '😰', '😜', '🍣'])


  //return 안에는 html코드(자바스크립트 작성하려면 {}필요)
  return (
    <div className="App">
      <div className = "black-nav">
        <img src ={logo} width={'100px'} height={'100px'} alt = ""></img>
        <h4 style = {{color:'yellowgreen', fontSize:'20px'}}>{value}</h4>
      </div>
      
    {/*
    리액트에서 ()안의 반복문은 for가 아니라 map으로 한다
    왜냐하면 for(){}에서 중괄호가 중복되기 때문에 map으로 제공
    배열.map()
    
    list 클래스를 4번 반복
    */
   //중괄호 안에서 반복문 쓰려면 map == forEach
   //title의 배열 갯수만큼 반복
   //map 가장 바깥 태그에 구분할 수 있는 key를 적어주기
    title.map(function(element, idx){
      return(
      <>
        <div className = "list" key={idx}>
          <h4 onClick = {()=>{
            setCurIdx(idx)
            setModal(true) //true대신 !modal을 주면 클릭할때마다 false, true 바뀜
          }}>{element} <span onClick = {(e)=>{
            //자바스크립트에서 배열요소를 수정하려면 분해했다가 변경하고 다시 합쳐야함
            e.stopPropagation()
            setScore(()=>{
              let src = [...score]
              src[idx] += 1
              return src
            })
          }}>{icon[idx]}</span> {score[idx]}</h4>
          <p>{dateTime[idx]} 작성</p>
        </div>
      </>
      )
    })
    }
      

      {/*
      부분만 떼고 싶다 ==> 컴포넌트로 만든다 
      modal 값이 false면 안보이게, true면 보이게
      ()안에다가 자바스크립트 코드를 넣어야하는데, if랑 for가 ()를 사용하네?
      react {}안에서는 if와 for가 사용이 불가능 ==> {} 중복때문에
      if는 삼힝연산자로, for는 map으로 제공...
      삼항연산자 : (조건식 ? 맞으면_실행할 코드 : 클리면_실행할코드)
      3 > 1? true : false

      modal 상태가 true면 <Modal/> 컴포넌트 적용, false면 아무것도 없게
      h4태그에 onClick을 넣고 setModal을 true로 설정하게

      다른 컴포넌트에 값을 넘겨줄 때는 props라는 것을 사용
      컴포넌트에 값을 전달 (속성 주듯이 이름을 정해 넘길 수 있음)
      */
      modal == true ? <Modal idx={curIdx} title={title} date={dateTime} />: null}
    </div>
  );
}

export default App;

//Modal 컴포넌트 분리
//코드가 길어지면 별도의 함수로 분리해서 '컴포넌트'로 만들어준다
//return() 안에 html태그를 작성
//사용하고자 하는 곳에 <함수명/>
//컴퍼넌트로 사용할 함수는 대문자, 일반함수는 소문자 시작
function Modal(props) {
  return(
    <>
      <div className = 'modal'>
        <h4>{props.title[props.idx]}</h4>
        <p>{props.date[props.idx]} 작성</p>
        <p>상세 내용</p>
      </div>
    </>
  )
}
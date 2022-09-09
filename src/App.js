import React,{useState} from 'react';
import './App.css';

function App() {
  const [inputdate, seInputdate] = useState("");
  const [text, setText] = useState(null);

  const calculateInput = ()=>{
    // console.log(inputdate);
    var dateIn = inputdate.split("-").reverse();
    console.log(dateIn);
    var date = { day: '', month: '', year: '' };
    date.day = dateIn[0];
    date.month = dateIn[1]
    date.year = dateIn[2]
    // console.log(date);
    return date;
    
  }

  const dateInString = (date)=>{
    var dateInStr = { day: "", month: "", year: "" };
  
    if (date.day < 10) {
      dateInStr.day = "0" + date.day;
    } else {
      dateInStr.day = date.day.toString();
    }
  
    if (date.month < 10) {
      dateInStr.month = "0" + date.month;
    } else {
      dateInStr.month = date.month.toString();
    }
  
    dateInStr.year = date.year.toString();
    
    return dateInStr;
  }

  const allDateFormats = (input)=>{
    // console.log(input)
    const arr = [];
    let ddmmyyyy= input.day+input.month+input.year;
    arr.push(ddmmyyyy)
    let mmddyyyy= input.month+input.day+input.year;
    arr.push(mmddyyyy)
    let yyyymmdd= input.year+input.month+input.day;
    arr.push(yyyymmdd)
    let ddmmyy= input.day+input.month+input.year.slice(-2);
    arr.push(ddmmyy)
    let mmddyy= input.month+input.day+input.year.slice(-2);
    arr.push(mmddyy)
    let yymmdd= input.year.slice(-2)+input.month+input.day;
    arr.push(yymmdd)
    // console.log(arr)
    return arr;
    
  }

  const checkPalindromeForAllFormats = (input) => {
    //['10092020', '09102020', '20200910', '091020', '100920', '200910']
    const arr = allDateFormats(input);
    let flagArr = [];
    for (let i = 0; i < arr.length; i++) {
      let reverseStr = arr[i].split("").reverse().join("");
      if (arr[i] === reverseStr) {
        flagArr.push(true);
      } else {
        flagArr.push(false);
      }
    }
    // console.log(flagArr)
    return flagArr;
  };

const isLeapYear = (year)=>{
  if(year %400 === 0)
    return true;

  if(year %100 === 0)
    return false;

  if(year%4 === 0)
    return true;

  return false;

}

const getPreviousDate = (input) => {
  let numDay = Number(input.day);
  let day = (numDay - 1);
  let month = Number(input.month);
  let year = Number(input.year);
  

  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (day === 0) {
    month--;
    
    if (month === 0) {
      month = 12;
      day = 31;
      year--;
    } else if (month === 2) {
        if (isLeapYear(year)) {
          day = 29;
        } else {
          day = 28;
        }
    } else {
      day = daysInMonth[month - 1];
    }
  }

  var date2 = {
    day: (day),
    month: (month),
    year: (year)
  };
  return dateInString(date2)
  
};

const getNextDate = (input) => {
  let numDay = Number(input.day)
  let day = (numDay + 1);
  let month = Number(input.month);
  let year = Number(input.year);

  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (month === 2) {
      if (isLeapYear(year)) {
          if (day > 29) {
            day = 1;
            month = 3;
          }
      } else if (day > 28) {
          day = 1;
          month = 3;
      } 
    
  } else if (day > daysInMonth[month - 1]) {
      day = 1;
      month++;
  }
  

  if (month > 12) {
    month = 1;
    year++;
  }

  var date2 = {
    day: (day),
    month: (month),
    year: (year)
  };
  return dateInString(date2)
  
};

const getNextPalindrome = (input) => {
  var nextDate = getNextDate(input);
  var counter = 0;

  while (1) {
    counter++;
    const resultList = checkPalindromeForAllFormats(nextDate);
    for (let i = 0; i < resultList.length; i++) {
      if (resultList[i]) {
        return [counter, nextDate];
      }
    }
    nextDate = getNextDate(nextDate);
  }
};

const getPrevPalindrome = (input) => {
  var prevDate = getPreviousDate(input);
  // console.log("previous date", prevDate);
  // var ch = checkPalindromeForAllFormats(prevDate);
  // console.log("ch", ch);
  var counter = 0;

  while (1) {
    counter++;
    const resultList = checkPalindromeForAllFormats(prevDate);
    for (let i = 0; i < resultList.length; i++) {
      if (resultList[i]) {
        return [counter, prevDate];
      }
    }
    prevDate = getPreviousDate(prevDate);
  }
};
 

  const calulatePalindrome = ()=>{
    // { day: '14', month: '08', year: '2022' }
    const input = calculateInput();
    
    // // [false, false, false, false, false, false]
    const arrayOfPalindromes = checkPalindromeForAllFormats(input);
    var ispalindrome = false;
    for(let i=0;i<arrayOfPalindromes.length; i++){
      if(arrayOfPalindromes[i]){
        ispalindrome = true;
        break;
      } 
    }
    
    if(!ispalindrome){
      const [count1, nextDate] = getNextPalindrome(input);
      const [count2, prevDate] = getPrevPalindrome(input);

        if(count1 > count2){
          setText("Oops!😐 The nearest palindrome date is "+prevDate.day+"-"+prevDate.month+"-"+prevDate.year+", you missed by "+count2+" days.");
        }else {
          setText("Oops!😐 The nearest palindrome date is "+nextDate.day+"-"+nextDate.month+"-"+nextDate.year+", you missed by "+count1+" days.");
        }
    } else {
      setText("Wohoo! Your birthday date is a palindrome!🥳🥳" );
    }    
    
  }

  return (
    <>
    {/* <div className="bg-image"></div> */}
    <div className="App">
      <h1 >Is Your Palindrome Birthday! 🤔</h1>
      <h4 >Enter your Birthday date:</h4>

      <div className='input-date'>
        <input onChange={(e)=>seInputdate(e.target.value)} type="date"/>
        <button onClick={calulatePalindrome}>Show</button>
      </div>

      <p className='display-text'>{text}</p>
    </div>
    <footer className='footer'>
      <p className="footerText">© | 2022 | Kumari Smitha</p>
      <ul>
        <li><a href="https://github.com/Kumari-Smitha"><img src="github.png" alt="github"/></a></li>
        <li><a href="https://github.com/Kumari-Smitha"><img src="linkedin.png" alt="linkedin"/></a></li>
        <li><a href="https://github.com/Kumari-Smitha"><img src="twitter.png" alt="twitter"/></a></li>
      </ul>
    </footer>
  </>
  );
}

export default App;

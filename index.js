let birthdateInput = document.querySelector("#input-birth-date");
let checkBtn = document.querySelector("#check-btn");
let output = document.querySelector("#output")

const reverseString = (str) => {
    let splitStr = str.split('');
    let reverseStr = splitStr.reverse();
    let joinReveresedStr = reverseStr.join("");
    return joinReveresedStr;
}

const checkStringPalindrome = (str) => {
    let joinReveresedStr = reverseString(str);
    return (str === joinReveresedStr);

}

const convertDateToString = (date) => {
    let dateInString = {
        day: '',
        month: '',
        year: ''
    };
    if (date.day < 10) {
        dateInString.day = '0' + date.day;
    } else {
        dateInString.day = date.day.toString();
    }

    if (date.month < 10) {
        dateInString.month = '0' + date.month;
    } else {
        dateInString.month = date.month.toString();
    }

    dateInString.year = date.year.toString();
    return dateInString;

}

 const dateVariations = (date) => {
    let ddmmyyyy = date.day + date.month + date.year;
    let mmddyyyy = date.month + date.day + date.year;
    let yyyymmdd = date.year + date.month + date.day;
    let ddmmyy = date.day + date.month + date.year.slice(-2);;
    let mmddyy = date.month + date.day + date.year.slice(-2);;
    let yyddmm = date.year.slice(-2) + date.day + date.month;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yyddmm];
}

const checkPalindromeForAllDateVarinations = (date) =>{
    let variationOfDates = dateVariations(date);
    let palindromeList = [];
    for (let i = 0; i < variationOfDates.length; i++) {
        let result = checkStringPalindrome(variationOfDates[i]);
        palindromeList.push(result);
    }
    return palindromeList;
}
// var date = {
//     day: 11,
//     month: 2,
//     year: 2020
//   }

// var dateStr = convertDateToString(date);
// console.log(checkPalindromeForAllDateVarinations(dateStr));

const leapYear = (year) => {
    if (year % 400 === 0)
        return true;
    if (year % 100 === 0)
        return false;
    if (year % 4 === 0)
        return true;

    return false;
}

const getNextDate = (date) => {
    let day = date.day + 1;
    let month = date.month;
    let year = date.year;
    let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (month === 2) {
        if (leapYear(year)) {
            if (day > 29) {
                day = 1;
                month = 3;
            }
        } else {
            if (day > 28) {
                day = 1;
                month = 3;
            }
        }
    } else {
        if (day > daysInMonth[month - 1]) {
            day = 1;
            month = month + 1;
        }
    }
    if (month > 12) {
        month = 1;
        year = year + 1;
    }
    return {
        day: day,
        month: month,
        year: year
    }
}

const getNextPalindromeDate = (date)=> {
    let nextDate = getNextDate(date);
    let ctr = 0;
    while (1) {
        ctr = ctr + 1;
        let dateStr = convertDateToString(nextDate);
        let palindromeList = checkPalindromeForAllDateVarinations(dateStr);
        for (let i = 0; i < palindromeList.length; i++) {
            if (palindromeList[i]) {
                return [ctr, nextDate];
            }

        }
        nextDate = getNextDate(nextDate);
    }

}

let date = {
    day: 11,
    month: 2,
    year: 2021
  }

console.log(getNextPalindromeDate(date));

const clickHandler = (e) => {
    let birthDate = birthdateInput.value;
    if (birthDate !== "") {
        let listOfDate = birthDate.split('-');
        let date = {
            day: Number(listOfDate[2]),
            month: Number(listOfDate[1]),
            year: Number(listOfDate[0])
        };
        let dateStr = convertDateToString(date);
        let checkPalindrome = checkPalindromeForAllDateVarinations(dateStr);
        let isPalindrome = false;
        for (let i = 0; i < checkPalindrome.length; i++) {
            if (checkPalindrome[i]) {
                isPalindrome = true;
                break;
            }
        }
        if (isPalindrome) {
            output.innerText = "Your birthday is a palindrome"
        } else {
            let [ctr, nextDate] = getNextPalindromeDate(date);
            output.innerText = `The next palindrom date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed it by ${ctr} days.`;
        }
    }
}

checkBtn.addEventListener('click', clickHandler);
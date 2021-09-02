var birthdateInput = document.querySelector("#input-birth-date");
var checkBtn = document.querySelector("#check-btn");
var output = document.querySelector("#output")

function reverseString(str) {
    var splitStr = str.split('');
    var reverseStr = splitStr.reverse();
    var joinReveresedStr = reverseStr.join("");
    return joinReveresedStr;
}

function checkStringPalindrome(str) {
    var joinReveresedStr = reverseString(str);
    return (str === joinReveresedStr);

}

function convertDateToString(date) {
    var dateInString = {
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

function dateVariations(date) {
    var ddmmyyyy = date.day + date.month + date.year;
    var mmddyyyy = date.month + date.day + date.year;
    var yyyymmdd = date.year + date.month + date.day;
    var ddmmyy = date.day + date.month + date.year.slice(-2);;
    var mmddyy = date.month + date.day + date.year.slice(-2);;
    var yyddmm = date.year.slice(-2) + date.day + date.month;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yyddmm];
}

function checkPalindromeForAllDateVarinations(date) {
    var variationOfDates = dateVariations(date);
    var palindromeList = [];
    for (var i = 0; i < variationOfDates.length; i++) {
        var result = checkStringPalindrome(variationOfDates[i]);
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

function leapYear(year) {
    if (year % 400 === 0)
        return true;
    if (year % 100 === 0)
        return false;
    if (year % 4 === 0)
        return true;

    return false;
}

function getNextDate(date) {
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;
    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
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

function getNextPalindromeDate(date) {
    var nextDate = getNextDate(date);
    var ctr = 0;
    while (1) {
        ctr = ctr + 1;
        var dateStr = convertDateToString(nextDate);
        var palindromeList = checkPalindromeForAllDateVarinations(dateStr);
        for (var i = 0; i < palindromeList.length; i++) {
            if (palindromeList[i]) {
                return [ctr, nextDate];
            }

        }
        nextDate = getNextDate(nextDate);
    }

}

var date = {
    day: 11,
    month: 2,
    year: 2021
  }

console.log(getNextPalindromeDate(date));

function clickHandler(e) {
    var birthDate = birthdateInput.value;
    if (birthDate !== "") {
        var listOfDate = birthDate.split('-');
        var date = {
            day: Number(listOfDate[2]),
            month: Number(listOfDate[1]),
            year: Number(listOfDate[0])
        };
        var dateStr = convertDateToString(date);
        var checkPalindrome = checkPalindromeForAllDateVarinations(dateStr);
        var isPalindrome = false;
        for (var i = 0; i < checkPalindrome.length; i++) {
            if (checkPalindrome[i]) {
                isPalindrome = true;
                break;
            }
        }
        if (isPalindrome) {
            output.innerText = "Your birthday is a palindrome"
        } else {
            var [ctr, nextDate] = getNextPalindromeDate(date);
            output.innerText = `The next palindrom date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed it by ${ctr} days.`;
        }
    }
}

checkBtn.addEventListener('click', clickHandler);
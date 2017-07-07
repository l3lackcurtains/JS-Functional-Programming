/*
 * =================================
 * Remove duplicate in the string
 * =================================
*/

const arr = 'hello'
const arr2 = []
const dup = []


for (let i = 0; i < arr.length; i++) {
	if(dup[arr.charCodeAt(i)])	{
		continue
	}
	dup[arr.charCodeAt(i)] = true
	arr2.push(arr[i])
}

const str1 = arr2.join('')

// Regular Expression in Javascript
/*
 * ^ indicates beigining of beigining of string
 * $ is used to mark the end
 * adding 'g' for global
 * adding 'i' for ignore case
 * /Test[0-9]+/ => "Test2" only
 * /Test[0-9]+/i => "Test1" only
 * /Test[0-9]+/gi => "test1", "test2" and "TEST3"
 * support functions: match(), replace(), search()
*/

/*
 * =========================
 * Use of match()
 * =========================
*/

const myRe = /^(ba|na)+$/
const phoneNo = '(977) 982-4119696'
/*
 * Regular Expression syntax:
 * slash in front of ( is used to remove its special meaning in regular expression syntax
 * \d means Digit [0-9] , [0-9][0-9][0-9] ~ \d\d\d
*/
// const phoneRe = /^\(\d\d\d\) \d\d\d-\d\d\d\d\d\d\d$/
const phoneRe = /^\(\d{3}\) \d{3}-\d{7}$/
if(phoneNo.match(phoneRe)){
	// console.log('Phone Number is valid.')
}else {
	// console.log('Phone Number is invalid.')
}

/*
 * =========================
 * Use of replace()
 * =========================
*/

// replace 'cie' with 'cei'

const theStr = '$cie$xie$die'
/* 
 * Ignore case and to be global => /gi
 * so that it finds all occurrences, not just the first => /g
*/ 
const theNewStr = theStr.replace(/cie/gi, 'cei')

// any letter except c
const theOtherStr = theStr.replace(/[abd-z]ie/gi, 'lol')

// What if we want to replace xie to xei or aie to aei or else other than 'c'
const theOtherNewStr = theStr.replace(/([abd-z])ie/gi, '$1ei')

// console.log(theNewStr, theOtherStr, theOtherNewStr)

/*
 * =========================
 * Use of search()
 * similar to indexOf() except that it takes regular expression
 * instread of string.
 * =========================
*/

const sString = 'test1 Test2 TEST3'

const res = sString.search(/TEST[0-9]+/)

// console.log(res)


/*
 * Count number or words in sentence
*/

let sent = ' Hello i am madhav   poudel\n I am from pokhara.\n but, i am arginally from syangja'

// removes whitespace in front and at last, /s vaneko space
sent = sent.replace(/^\s*|\s*$/gi, '')

/*
 * convert two or more spaces to one
 * [ ] => space or just space
 * {2,} => 2 or more than two
*/ 

sent = sent.replace(/[ ]{2,}/gi, ' ')

/*
 * exclude new line with a start spacing
*/
sent = sent.replace(/\n[ ]/, ' ') 

const len = sent.split(' ').length

// console.log(sent, len)

/*
 * Check if the value is ip or not
*/

const ipAddress = '192.168.2.341'

const ipRe = /^([0-9][0-9][0-9])\.([0-9][0-9][0-9])\.([0-9][0-9][0-9]|[0-9][0-9]|[0-9])\.([0-9][0-9][0-9]|[0-9][0-9]|[0-9])$/gi

if (ipAddress.match(ipRe)) {
	// console.log('This one is ip address')
} else {
	// console.log('Sorry, This is not ip address.')
}


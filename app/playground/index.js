import {
	forEach,
	forEachObject,
	unless,
	every,
	some,
	sortBy
} from '../lib/hoc'


import {
	outer,
	outerReturns,
	tap
} from '../lib/closure'


/*
 * =============================================================
 * High Order Functions
 * =============================================================
*/ 


let arr = [1,3,4,5,6]

forEach(arr, (a) => {
	unless((a % 2), () => {
		// console.log(`${a} is even number.`)
	})
})

// 4 is even number.
// 6 is even number.


let object = {
	a: 'hello',
	b: 'world'
}

forEachObject(object, (key, val) => {
	// console.log(`${key} => ${val}`)
})
// => a => hello
// => b => world


// Use of every
const res1 = every([NaN, NaN, NaN], isNaN) // true
const res2 = every([NaN, NaN, 6], isNaN) // false
const res3 = some([NaN, NaN, 6], isNaN) // true


// Use of sort

const fruits = [ 'orange', 'apple', 'pineapple', 'banana' ]

const sortRes = fruits.sort()
// => [ 'apple', 'banana', 'orange', 'pineapple' ]

// Use of sort() to sort array with object
const peoples = [
	{ firstName: 'John', lastName: 'Doe' },
	{ firstName: 'Rock', lastName: 'Ignert' },
	{ firstName: 'Anderson', lastName: 'Caert'},
	{ firstName: 'Umesh', lastName: 'Akinston'}
]

const newPeoples = peoples.sort((a,b) => a.lastName > b.lastName )
// a>b -> ascending, a<b -> decending
/*
 * [ { firstName: 'Umesh', lastName: 'Akinston' },
 * { firstName: 'Anderson', lastName: 'Caert' },
 * { firstName: 'John', lastName: 'Doe' },
 * { firstName: 'Rock', lastName: 'Ignert' } ]
*/

const newSortedPeoples = peoples.sort(sortBy('firstName'))
// console.log(newSortedPeoples)


/*
 * =============================================================
 * Closure and High Order Functions
 * =============================================================
*/ 

// outer('argument') // global, out, in

const outerRet = outerReturns(5)
// outerRet()

// tap('fun')((it) => console.log('value is', it))

// Unary Functions
const resA = [1,2,3].map((a) => a*a) // [ 1, 4 , 9 ]

const resB = ['1', '2', '3'].map(parseInt) // [ 1, NaN, NaN ]

const unary = (fn) => fn.length === 1 ? fn : arg => fn(arg)

const resC = ['1', '2', '3'].map(unary(parseInt)) // [ 1, 2, 3 ]

// once HOC: allow developers to run function only one time
const once = (fn) => {
	let done = false
	return () => done ? undefined : ((done = true), fn.apply(this, arguments))
}

const doPayment = once(() => {
	console.log('Payment is done.')
})

// doPayment() // => Payment is done.
// doPayment() // undefined

/*
 * Memoized function: Special high order function that allows the function to remember or memorize the result
*/

const memoized = (fn) => {
	const lookupTable = {}
	return arg => lookupTable[arg] || (lookupTable[arg] = fn(arg))
}

const fastFactorial = memoized((n) => {
	if( n === 0) return 1
	return n * fastFactorial(n-1)
})

const factRes = fastFactorial(5)
// 120
// lookupTable = { 0: 1, 1: 1, 2: 2, 3: 6, 4: 24, 5: 120 }

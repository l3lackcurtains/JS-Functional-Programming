import {
	outer,
	outerReturns,
	tap
} from '../lib/closure'

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

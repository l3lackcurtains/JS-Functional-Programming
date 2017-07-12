/*
 * ==== Terminologies ====
 * 
 * Unary Functions:
 * Function that takes a single functional argument
 * const identity = x => x
 * 
 * Binary Function:
 * Functions that takes two arguments
 * const add = (x,y) => x + y
 * 
 * variadic functions
 * function that takes variable number of arguments
 * In older version of JS
 * function variadic(a) {
 *   console.log(a)
 *   console.log(arguments)
 * }
 * 
 * Using spread operator
 * const variadic = (a, ...variadic) => {
 *   console.log(a)
 *   console.log(variadic)
 * }
 * 
 * variadic (1,2,3)
 * => 1
 * => [2, 3]
 * 
*/


/*
 * ==================================================
 * Currying
 * ==================================================
 * Currying is a process of converting a function with n number of
 * arguments into a nested unary function..
*/

// Simple version of add function
const add = (x, y) => x + y

// currying version of add function
const addCurried = x => y => x + y

// This one is curried if we call with one argument

// addCurried(4)
// --> fn = y => 4 + y

const ress = addCurried(4)(4)

// convert binary function into curry function

const curry = (binaryFunc) => {
	return function(firstArg) {
		return function(secondArg) {
			return 
		}
	}
}

// const curry = (binaryFunc) => firstArg => secondArg => binaryFunc(firstArg, secondArg)


let autoCurriedAdd = curry(add)
const res22 = autoCurriedAdd(2)(2)


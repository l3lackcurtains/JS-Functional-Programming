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


// curry function
let curry12 = fn => {
	if (typeof fn !== 'function'){
		throw Error('No function provided.')
	}

	return function curriedFn(...args) {
		if(args.length < fn.length) {
			return function() {
				return curriedFn.apply(null, args.concat([].slice.call(arguments)))
			}
		}
		return fn.apply(null, args)
	}
}


const multiply = (x,y,z) => x * y * z

let ml1 = curry12(multiply)(3)(2)(8) // 48

/*
 * =======================
 * Partial Functions
 * =======================
*/

const partial = function (fn, ...partialArgs) {
	let args = partialArgs
	return function(fullArguments) {
		let arg = 0
		for(let i = 0; i < args.length && arg < fullArguments.length; i++) {
			if (args[i] === undefined) {
				args[i] = fullArguments[arg++]
			}
		}
		return fn.apply(null, args)
	}
}

let delayTenMs = partial(setTimeout, undefined, 10)

delayTenMs(() => console.log("Do Y Task"))

/*
 * let args = partialArgs
 * 	=> args = [undefined,10]
 * fullArguments points to 
 * [() => console.log("Do Y task")]
*/


let obj = {foo: "bar", bar: "foo"}
JSON.stringify(obj, null, 2)


let obj = {foo: "bar", bar: "foo"}
JSON.stringify(obj, null, 2)

let prettyPrintJson = partial(JSON.stringify, undefined, null, 2)

prettyPrintJson({ foo: 'bar', bar: 'foo' })

/*
 * we are modifying the partialArgs by replacing the undefined values
 * with our argument, and Arrays are used for reference!
*/


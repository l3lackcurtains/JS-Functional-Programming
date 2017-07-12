/*
 * Closure and High Order Functions
 * closure is simply a inner function, a function within another function
 * Closure is so powerful because of its access to the scope chain( or scope level)
 * closure can access to three scopes
 * => Variable declared in its own declaration
 * => global variables
 * => outer function variables
 * eg: 
 * function outer() {
 *    function inner() {
 *      // Magic happens here..
 *    }
 * }
*/

// Scope access properties
let global = 'global'
export function outer(arg) {
	var out = 'out'
	function inner() {
		var inn = 'in'
		console.log(global, out, inn, arg)
	}
	inner()
}

export const outerReturns = (arg) => {
	const inner = () => {
		console.log(arg)
	}
	return inner
}

// Tap Function (exp1, exp2), can return multiple expression..
export const tap = value => fn => (
	typeof(fn) === 'function' && fn(value), // if typeof condition is met, call the function...
	console.log(value)
)


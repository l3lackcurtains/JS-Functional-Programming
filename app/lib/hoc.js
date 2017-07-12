/*
 * High Order Functions
 * (Abstract the How part and let programmer do what part)
*/

export const forEach = (array, fn) => {
	for (let i=0; i<array.length; i++) {
		fn(array[i])
	}
}

export const forEachObject = (obj, fn) => {
	for (let prop in obj) {
		if (obj.hasOwnProperty(prop)) {
			// call function with key and its value
			fn(prop, obj[prop])
		}
	}
}

export const unless = (predicate, fn) => {
	if (!predicate) fn()
}

/*
 * Real World High Order Functions
*/

// every HOC
export const every = (arr, fn) => {
	let result = true
	for (const val of arr) 
		result = result && fn(val)
	return result
}

export const some = (arr, fn) => {
	let result = true
	for (const val of arr) 
		result = result || fn(val)
	return result
}

// Return function
export const sortBy = (property) => {
	return (a,b) => {
		const res = a[property] > b[property]
		return res
	}
}

/* 
 * But, How come the returned function carries a property value that we have passed.
 * The sortBy function works, Just because javascript supports closures
*/
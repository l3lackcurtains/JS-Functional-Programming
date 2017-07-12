/*
 * Use of map
*/
const x01 = [1,2,3,4,5]
const map = (arr, fn) => {
	const newArr = []
	for( const a of arr) {
		newArr.push(fn(a))
	}
	return newArr
}

const x02 = map(x01, (x) => x*x) // [ 1, 4, 9, 16, 25 ]


let apressBooks = [
	{
		"id": 111,
		"title": "C# 6.0",
		"author": "ANDREW TROELSEN",
		"rating": [4.7],
		"reviews": [{good : 4 , excellent : 12}]
	},
	{
		"id": 222,
		"title": "Efficient Learning Machines",
		"author": "Rahul Khanna",
		"rating": [4.5],
		"reviews": []
	},
	{
		"id": 333,
		"title": "Pro AngularJS",
		"author": "Adam Freeman",
		"rating": [4.0],
		"reviews": []
	},
	{
		"id": 444,
		"title": "Pro ASP.NET",
		"author": "Adam Freeman",
		"rating": [4.2],
		"reviews": [{good : 14 , excellent : 12}]
	}
]

const apressBooks2 = map(apressBooks, (book) => ({ title: book.title, id: book.id }))
/*
[ { title: 'C# 6.0', id: 111 },
  { title: 'Efficient Learning Machines', id: 222 },
  { title: 'Pro AngularJS', id: 333 },
  { title: 'Pro ASP.NET', id: 444 } ]
*/



/*
 * Use of filter
*/

const filter = (arr, fn) => {
	const res = []
	for( const a of arr)
		(fn(a) ? res.push(a) : undefined)
	return res
}

const b01 = [1,2,3,4]

const b02 = filter(b01, (a) => a < 3) // [ 1, 2 ]

const apressBooks3 = filter(apressBooks, (book) => book.rating[0] > 4.5)
/*
[ { id: 111,
    title: 'C# 6.0',
    author: 'ANDREW TROELSEN',
    rating: [ 4.7 ],
    reviews: [ [Object] ] } ]
*/

/*
 * Chaining map and filter
*/

const apressBooks4 = map(filter(apressBooks, book => book.rating[0] > 4.5), (b) => ({ title: b.title, id: b.id }))

// [ { title: 'C# 6.0', id: 111 } ]

/*
 * concatAll Function
*/

const concatAll = (arr, fn) => {
	let res = []
	for(const a of arr) {
		res.push.apply(res, a)
	}
	return res
}

/*
 * reducing Function
*/

let useless = [1,2,4,5]

const reduce = (arr, fn, initialVal) => {
	let acc;
	if(initialVal != undefined)
		acc = initialVal
	else 
		acc = arr[0]

	
	for(const a of arr) {
		acc = fn(acc, a)
	}
	return acc
}

const useless2 = reduce(useless, (acc,val) => acc + val, 12 )

const apressBooks5 = reduce(apressBooks, (acc, bookDetail) => {
	let goodReviews = bookDetail.reviews[0] != undefined ? bookDetail.reviews[0].good : 0
	let excellentReviews = bookDetail.reviews[0] != undefined ? bookDetail.reviews[0].excellent : 0
	return { good: acc.good + goodReviews, excellent: acc.excellent }
}, { good: 18, excellent: 24 })


// { good: 36, excellent: 24 }

/*
 * Zipping Arrays
*/

let apressBooksArray = [
 	{
		name : "beginners",
		bookDetails : [
			{
				"id": 111,
				"title": "C# 6.0",
				"author": "ANDREW TROELSEN",
				"rating": [4.7]
			},
			{
				"id": 222,
				"title": "Efficient Learning Machines",
				"author": "Rahul Khanna",
				"rating": [4.5],
				"reviews": []
			}
		]
	},
	{
		name : "pro",
		bookDetails : [
			{
				"id": 333,
				"title": "Pro AngularJS",
				"author": "Adam Freeman",
				"rating": [4.0],
				"reviews": []
			},
			{
				"id": 444,
				"title": "Pro ASP.NET",
				"author": "Adam Freeman",
				"rating": [4.2]
			}
		]
	}
]


let reviewDetails = [
	{
		"id": 111,
		"reviews": [{good : 4 , excellent : 12}]
	},
	{
		"id" : 222,
		"reviews" : []
	},
	{
		"id" : 333,
		"reviews" : []
	},
	{
		"id" : 444,
		"reviews": [{good : 14 , excellent : 12}]
	}
]

const zip = (leftArr, rightArr, fn) => {
	let index, results = []

	for( index = 0; index< Math.min(leftArr.length, rightArr.length); index++)
		results.push(fn(leftArr[index], rightArr[index]))

	return results
}

const resu1 = zip([1,2,3], [4,5,6], (x,y) => x+y) // [ 5, 7, 9 ]

// Concatinates book.bookDetails of all objects into one array..
let bookDetails12 = concatAll(
	map(apressBooksArray, book => book.bookDetails)
)

const mergeBookDetails = zip(bookDetails12, reviewDetails, (book, review) => {
	if(book.id === review.id) {
		let clone = Object.assign({}, book)
		clone.ratings = review
		return clone
	}
})

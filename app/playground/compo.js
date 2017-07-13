import {
    partial,
    map,
    filter,
    reduce
} from '../lib/closure'

/*
 * ======================================
 * Compositions and pipelines
 * ======================================
 * creating a function that will combine two functions by sending the
 *  output of one function as an input to another function
*/


const compose1 = (a,b) => (c) => a(b(c))
// Function is called from Right to Left

let data = parseFloat('4.56')
let number = Math.round(data)

// so, lets write a compose
let measure = compose1(Math.round, parseFloat)
// --> measure = c => Math.round(parseFloat(c))

const res67 = measure("1.83")
// he functions Math.round or parseFloat aren’t executed/run until we call our number function.

let splitIntoSpaces = (str) => str.split(' ')
let count = (array) => array.length

const countWords = compose1(count, splitIntoSpaces)

const res68 = countWords("hello world.. into one")

// Use of compose with map and filter functions from earlier

let someBooks = [
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

// Some filtering functions
let filterOutStandingBooks = book => book.rating[0] === 5
let filterGoodBooks = book => book.rating[0] > 4.5
let filterBadBooks = book => book.rating[0] < 3.5

// some projection functions

let projectTitleAndAuthor = book => {
    return { title: book.title, author: book.author }
}

let projectAuthor = book => ({ author: book.author })
let projectTitle = book => ({ title: book.title })

/*
 * Why using small functions ?
 * ---------------------------
 * composition is all about small functions being composed into a larger 
 * function. Simple functions are easy to read, test, and maintain; and
 * using compose we can build anything out of it, as we will see in this
 * section.
*/

let queryGoodBooks = partial(filter, undefined, filterGoodBooks)
let mapTitleAndAuthor = partial(map, undefined, projectTitleAndAuthor)

let titleAndAuthorForGoodBooks = compose1(mapTitleAndAuthor, queryGoodBooks)

/*
 * The compose function can only compose a function that takes one argument
 * However, both filter and map takes two arguments, so we cant compose
 * them directly. So we used partial function to partially apply the second
 * argument for both map and filter
*/

const res69 = titleAndAuthorForGoodBooks(someBooks)

/*
 * we have used partial to fill the arguments of a function.
 * However you can use curry to do the same thing.
*/

/*
 *  compose many function
 * we need to send the output of each function as an input to another
 * function (by remembering the last executed function output 
 * ecursively). We can usereduce function, which we have used in 
 * revious chapters to reduce the n of function calls one at a time.
 *
*/

const compose = (...fns) =>
    value =>
        reduce(fns.reverse(), (acc, fn) => fn(acc), value)

// using it with above examples

let oddOrEven = ip => ip%2 == 0 ? 'even' : 'odd'

const oddOrEvenWords = compose(oddOrEven, count, splitIntoSpaces)

const res70 = oddOrEvenWords('Hello this words are odd.')

/*
 * Pipelines / Sequence 
*/

const pipe = (...fns) =>
    value =>
        reduce(fns, (acc, fn) => fn(acc), value)


const oddOrEvenWords2 = pipe(splitIntoSpaces, count, oddOrEven)

/*
 * ========================
 * Properties of compose
 * ========================
*/

// @ Composition is associative.

// compose(f, compose(g, h)) == compose(compose(f,g), h)

let oddOrEvenWords3 = compose(compose(oddOrEven,count),splitIntoSpaces)
let oddOrEvenWords4 = compose(oddOrEven,compose(count,splitIntoSpaces))

// Benefits
let countOddOrEven = compose(oddOrEven, count)
let oddOrEvenWords5 = compose(countOddOrEven, splitIntoSpaces)


// identity. The aim of this function is to take the argument and return the same argument; hence the name identity:

const identity = it => {
    // console.log(it)
    return it
}

// Really, can be used for debugging purpose..
let oddOrEvenWords6 = compose(oddOrEven, identity, count, splitIntoSpaces)("Test string")


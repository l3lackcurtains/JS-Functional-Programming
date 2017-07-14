/*
 * Generators
*/

// Callback Hell problem.

/*
Synchronous vs. Asynchronous
Synchronous is when the function blocks the caller when it is executing and returns the
result once it’s available.
Asynchronous is when the function doesn't block the caller when it’s executing the function
but returns the result once available.
We deal with Asynchronous heavily when we deal with an AJAX request in our project.

Callback Hell makes the program harder to understand. Handling errors and bubbling
the errors out of callback are tricky and always error prone.
*/

let async = (fn) => {
        //some async operation
        //call the callback with async operation
        fn(/*  result data */)
}
let async2 = (fn) => {
        //some async operation
        //call the callback with async operation
        fn(/*  result data */)
}
let async3 = (fn) => {
        //some async operation
        //call the callback with async operation
}
// Now if someone wants to process these functions at once, how they do it? The only
// way to do it is like this:

async(function(x){
    async2(function(y){
        async3(function(z){
            // do things
        })
    })
})
// => This one is called Callback Hell

/*
 * Before ES6 arrived, JavaScript developers used Promises to solve the above problem.
 * Promises are great, but given the fact that ES6 has generators at language level, we don’t
 * need Promises anymore!
*/

// Basics of generators

// @ creating generators

function* gen(){
    return 'first generator'
}

let genResult = gen()
// GeneratorFunctionPrototype { _invoke: [Function: invoke] }

let genExactResult = genResult.next().value // first generator

// Caveats of Generators
// The problem with next we cannot call it again

let genExactResult2 = genResult.next().value // undefined


// yield New Keyword

function* genSequence() {
    yield 'First'
    yield 'second'
    yield 'third'
}

let genSeqRes = genSequence()

// console.log(genSeqRes.next().value, genSeqRes.next().value, genSeqRes.next().value)
// => First second third

// All generators with yield will execute in lazy evaluation order
// lazy evaluation means the code won’t run until we ask it to run.


// done Property of Generator

// console.log('done value for the first time',genSeqRes.next())
// done: false

// 4th time we call
// => { value: undefined, done: true }

// we can interate our generators

/*

for( let val of genSequence())
    console.log(val)
// first second third

*/

// Passing Data to Generators

function* sayFullName() {
    const firstName = yield
    const secondName = yield
    console.log(firstName, secondName)
}

let fullName = sayFullName()

fullName.next()
fullName.next('Anto')
fullName.next('Otna')
// Anto otnA


/*
 * ====================
 * Using Generators to Handle Async Calls
 * ====================
*/

// Generators for Async - A Simple Case

let getdataOne = (cb) => {
    setTimeout(function(){
        cb('Dummy data one')
    }, 1000)
}

let getdataTwo = (cb) => {
    setTimeout(function(){
        cb('dummy data two')
    }, 1000)
}

getdataOne((data) => console.log('data received:', data))

getdataTwo((data) => console.log('data received:', data))

let generator
let getDataOne = () => {
    setTimeout(function(){
        generator.next('dummy data one.')
    }, 1000)
}

let getDataTwo = () => {
    setTimeout(function(){
        generator.next('dummy data two.')
    }, 1000)
}

function* main() {
    let dataOne = yield getDataOne()
    // console.log('data one', dataOne)
    let dataTwo = yield getDataTwo()
    // prints after 1 + 1 = 2 sec
    console.log('data one', dataOne)
    console.log('data two', dataTwo)
}

generator = main()
generator.next()

/*
 * Generators for Async - A Real-World Case
*/

let https = require('https')

function httpGetAsync(url, callback) {
    return https.get(url,
    function(response) {
        var body = ''
        response.on('data', function(d) {
            body += d
        })
        response.on('end', function() {
            let parsed = JSON.parse(body)
            callback(parsed)
        })

    })
}

// httpGetAsync('https://www.reddit.com/r/pics/.json', data => console.log(data))
/*
 * ---------------------------
  { modhash: '',
    children:
    [ { kind: 't3', data:
        { kind: 't3', data:
        { kind: 't3', data:
        . . .
        { kind: 't3', data:
    after: 't3_5bzyli',
    before: null
    }
  * ---------------------------
  what if we want data.children[0].data.url
*/
/*


httpGetAsync('https://www.reddit.com/r/pics/.json', picJson => {
    httpGetAsync(picJson.data.children[0].data.url+".json", firstPic => {
        console.log(firstPic)
    })
})

*/

/*
The above code will print the data as required. We are least worried about the data
being printed. But we are worried about our code structure.
*/

// Solving the issue with the help of generators
let generator2
function request(url) {
    httpGetAsync(url, function(response) {
        generator2.next(response)
    })
}

function* main2() {
    let picJson = yield request('https://www.reddit.com/r/pics/.json')
    let firstPictureData = yield request(picJson.data.children[0].data.url+".json")
    console.log(firstPictureData)
}


generator2 = main2()
// generator2.next()
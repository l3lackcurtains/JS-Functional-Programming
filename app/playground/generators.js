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


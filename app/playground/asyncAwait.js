/*
 * Async/Await
*/
import fetch from 'node-fetch'
// SImple promise based request api
function getFromGithub() {
    const userName = 'l3lackcurtains'
    const url = 'https://api.github.com/users'

    fetch(`${url}/${userName}/repos`)
        .then(repoRes => {
            return repoRes
        })
        .then(userRepos => {
            console.log(userRepos)
        })
        .catch(err => {
            console.log(err)
        })
}

// getFromGithub()

// Writing same function using async/await
async function _getFromGithub() {
    try {
        const userName = 'l3lackcurtains'
        const url = 'https://api.github.com/users'
        const reposResponse = await fetch(`${url}/${userName}/repos`)
        const userRepos = await reposResponse.json()

        console.log(userRepos)
    } catch(err) {
        console.log(err)
    }
}

// _getFromGithub()

/*
 * Async functions
 * ----------------
 * Async function returns a Promise implicitly, and the resolved value
 * of the promise will be whatever you return from the function. Our function
 * has an async keyword on its defination (which says that this function
 * will be asynchronous). It also has await keyword, which used to 
 * 'wait for' a promise. This also implies that we can only use await
 * inside functions defined with the async keyword.
*/



async function myAsyncFunc() {
    const res = await somethingThatReturnsPromise()
    console.log(res)
}


/*  if the promise resolves we can immediately interact with it on next line
   and if it rejects then an error is thrown, so
   try/catch magically works here again.
*/
async function myAsyncFunc() {
    try {
        const res = await somethingThatReturnsPromise()
        console.log(res)
    } catch (err) {
        console.log(err)
    }
}

/*
since, Nodejs 8 has a new utility function that converts a 
callback-based function into promise-based one, called
util.promisify()

*/


/*
Error Handling...
-----------------
In some cases the error is not catched and shallowed by await itself.
In the example below with Promises, the try/catch won’t
handle if JSON.parse fails because it’s happening inside a Promise. 

--------------------------------------------------------------
*/
function makeRequest() {
    try {
        fetch('foo')
            .then(res => {
                const res = JSON.parse(res)
                console.log(res)
            })
            .catch((err) => console.log(err))
    }
}

// in async form

async function makeRequest() {
    try {
        const res = JSON.parse(await fetch('foo'))

        console.log(res)
    } catch(err) {
        console.log(err)
    }
}

/*
Dealing with conditionals
=======================================================
*/
function makeRequest() {
    return fetch('foo')
            .then(res => {
                if(data.doesItNeedAnotherReq) {
                    return makeAnotherReq(res)
                    .then(secondRes => {
                        console.log(secondRes)
                        return secondRes
                    })
                }
                console.log(res)
                return res
            })
}

// Async/Await way

async function makeRequest() {
    const res = await fetch('foo')

    if(res.doesItNeedAnotherReq) {
        const secondRes = await makeSecondReq(res)
        console.log(secondRes)
        return secondRes
    }
    console.log(res)
    return res
}

/*
Loops
==========================================
*/
let promise = Promise.resolve()
const posts = [{}, {}, {}]

posts.forEach(post => {
    promise = promise.then(() => {
        return db.insert(post)
    })
})

promise.then(() => {
  // now all our docs have been saved
})

// Using async / await

const posts = [{}, {}, {}]

async function insertPosts(posts) {
    for (let post of posts) {
        await db.insert(post)
    }
}

/*
-------------------------------------------------
but note that you cannot use any loop forEach() loop here
hat is a problem if you want to use one of the Array.prototype
utility functions such as map(), forEach(), etc, because they rely on callbacks.
*/

// This wont work
async function insertPosts(posts) {
  posts.forEach(post => {
    await db.insert(post);
  });
}

// Maybe this will work
async function insertPosts(posts) {
  posts.forEach(async post => {
    const postId = await db.insert(post);

    console.log(postId);
  });
  // Not finished here
}

/*
Unfortunately not. Again, this code doesn’t work, but there is one
caveat: the Promise returned by db.insert() is resolved asynchronously,
which means that the callbacks won’t finish when forEach()returns. As 
a consequence, you can’t await the end of insertPosts().
*/

/*
 * Sequentially vs. Parallelism
 * Using async normally our code becomes serial which means that
 * one statemenr will execute one after another. But, since, Async
 * function become Promises, we can use a workflow so as we could 
 * use for Promise to handle parallelism
*/

const posts = [{}, {}, {}]

function insertPostsConcurrently(posts) {
    return Promise.all(posts.map(doc => {
        return db.insert(post)
    })).then(results => {
        console.log(results)
    })
}

// By using Async Await

async function insertPostsConcurrently(posts) {
    const promises = posts.map(post => db.insert(post))

    const res = await Promise.all(promises)
    console.log(res)
}

/*
First make arrays of promises, which starts invoking all the promises
immediatrly. Secondly, that we are awating those promises withinn the
main function. Consider the code block below which illustrates three 
different Promises that will execute in parallel.

*/

async function getConcurrently() {
    let promises = []

    promises.push(getUsers())
    promises.push(getCategories())
    promises.push(getProducts())

    let [users, categories, products ] = await Promise.all(promises)
}

/*
To be aware:
if one of the Promises fail, all of them will be aborted, what will result,
in the previous example, that none of these three variables will receive the expected values.
*/

// Unit testing with async functions

const assert = require('assert')

test('Test async code', () => {
    getAsyncRes() // A
        .then(first => {
            assert.strictEqual(first, 'foo') // 8
            return getAsyncRes2()
        })
        .then(second => {
            assert.strictEqual(second, 'bar')
        })
})

// Async await way

test('Testing async code', async () => {
    const first = await getAsyncRes()
    assert.strictEqual(first, 'foo')

    const second = await getAsyncResult2();
    assert.strictEqual(second, 'bar');
})

/*

Quick tips and must remembers
+++++++++++++++++++++++++++++++++++
=> Async functions are started synchronously, settled asynchronously.

=> On async/await functions, returned Promises are not wrapped. That
means a) returning a non-Promise value fulfills p with that value.
b) returning a Promise means that p now mirrors the state of that Promise.

=> You can forward both fulfillment and rejections of another asynchronous
computation without an await. That means that you return values which
can be handled by another async function.

=> You don’t need await if you “fire and forget”. Sometimes you only want
to trigger an asynchronous computation and are not interested in when it finishes.

=> You can’t await on callbacks, since it can bring you a lot of bugs.

=> Your Async functions must be entirely surrounded by try/catches, at least at the top level.

=> For parallelism you can set your async functions to a Promise.all method.

=> You can do unit testing with async functions using the test-framework Mocha.

=> Sometimes you just don’t need to worry that much about unhandled rejections
(be careful on this one).

*/



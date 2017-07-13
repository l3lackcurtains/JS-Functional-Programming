/*
 * Fun with Functors
 * ================
 * Help us to handle errors in purely functional way.
 * 
 * Functor is a plain object (or type class in other languages) that
 * implements the function map that, while running over each
 * value in the object to produce a new object.
 * 
 * Functor Is a Container
*/

const Container = function(val) {
    this.value = val
}

// But dont use arrow function for it.
const Container1 = val => {
    this.value = val
}

// The above code will be fine, but the moment we try to apply new keyword on our Container ,
// we will be getting the back an error like this:
// Container is not a constructor(...)(anonymous function)

let testValue = new Container(3)

Container.of = function(value) {
    return new Container(value)
}

let testValue2 = Container.of('hell')
// Nested container ...
let testValue3 = Container.of(Container.of(4))

/*
 * so, Functor is nothing but a Container that can hold
 * the value. but, why we use map()
 * map function allows us to call any function on the value that is
 * being currently held by the Container
*/

// Functor Implements Method Called map

Container.prototype.map = function(fn) {
    return Container.of(fn(this.value))
}

let double = (x) => x*x

const res81 = Container.of(3).map(double)
    .map(double)
    .map(double)
    // Chainable

// Use of maybe functor (helps to handle errors functional way)

const MayBe = function(val) {
    this.value = val
}

MayBe.of = function(val) {
    return new MayBe(val)
}

// Checks first if value is null or undefined
MayBe.prototype.isNothing = function() {
    return (this.value === null || this.value === undefined)
}

// After check, it maps
MayBe.prototype.map = function(fn) {
    return this.isNothing() ? MayBe.of(null) : MayBe.of(fn(this.value))
}

// Simple Usecase: Abstraction that take care of error handling..

let str1 = MayBe.of('string').map((x) => x.toUpperCase())

let str2 = MayBe.of(null).map((x) => x.toUpperCase())

MayBe.of("George")
     .map(() => undefined)
     .map((x) => "Mr. " + x)
// map(() => undefined)

/*
 * Either Functor
 * which branching (i.e., out of two map calls above) failed with undefined or null values.
*/

// nothing
const Nothing = function(val) {
    this.value = val
}

Nothing.of = function(val) {
    return new Nothing(val)
}

Nothing.prototype.map = function(fn) {
    return this
}

// some
const Some = function(val) {
    this.value = val
}

Some.of = function(val) {
    return new Some(val)
}

Some.prototype.map = function(fn) {
    return Some.of(fn(this.value))
}

Some.of("test").map((x) => x.toUpperCase())
// => Some {value: "TEST"}

Nothing.of("test").map((x) => x.toUpperCase())
// => Nothing {value: "test"}

// Either
const Either = {
    Some: Some,
    Nothing: Nothing
}
/*
let getTopTenSubRedditPostsEither = (type) => {
    let response
    try{
       response = Some.of(JSON.parse(request('GET',"https://www.reddit.com/r/subreddits/" + type + ".json?limit=10").getBody('utf8')))
    } catch(err) {
        response = Nothing.of({ message: "Something went wrong" , errorCode: err['statusCode'] })
    }
    return response
}

let getTopTenSubRedditDataEither = (type) => {
    let response = getTopTenSubRedditPostsEither(type);
    return response.map((arr) => arr['data'])
                             .map((arr) => arr['children'])
                             .map((arr) => arrayUtils.map(arr,
                                (x) => {
                                    return {
                                        title : x['data'].title,
                                        url   : x['data'].url
                                    }
                                }
                            ))
}

getTopTenSubRedditDataEither('new2')
// which will return:
// Nothing { value: { message: 'Something went wrong', errorCode: 404 } }
*/

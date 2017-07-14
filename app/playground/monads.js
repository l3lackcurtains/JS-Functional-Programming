/*
 * ============================
 * Monads
 * ============================
*/
import request from 'sync-request'
import { MayBe } from '../lib/functors'
import { map } from '../lib/closure'
// Getting Reddit Comments for Our Search Query

let searchResult = search => {
    let response
    try {
        response = JSON.parse(request('GET',"https://www.reddit.com/search.json?q=" + encodeURI(search)).getBody('utf8'))
        // encodeURI : escaping characters

    } catch(err) {
        response = { message: 'Something went wrong.', errorCode: err['statusCode'] }
    }

    return response
}

// const redditRes = searchResult('Functional Programming')

/*
 * Implementing the second Step For each search children object, we
 * need to get its permalink value to get the list of comments. We 
 * can write a separate method for getting s list of comments for
 * the given URL.
*/
let getComments = link => {
    let response
    try {
        response = JSON.parse(request('GET',"https://www.reddit.com/" + link).getBody('utf8'))

    } catch(err) {
        response = { message: 'Something went wrong.', errorCode: err['statusCode'] }
    }
    return response
}

// const commentRes = getComments('r/IAmA/comments/3wyb3m/we_are_the_team_working_on_react_native_ask_us/.json')

let mergeViaMayBe = (searchText) => {
    let redditMayBe = MayBe.of(searchResult(searchText))
    let ans = redditMayBe
        .map((arr) => arr['data'])
        .map((arr) => arr['children'])
        .map((arr) => map(arr, x => {
            return {
                title: x['data'].title,
                permalink: x['data'].permalink
            }
        }))
        .map(obj => map(obj, x => {
            return {
                title: x.title,
                comments: MayBe.of(getComments(x.permalink.replace('?ref=search_posts', '.json')))
            }
        }))
    return ans

}

// const mergeRedditRes = mergeViaMayBe('Functional programming')

/*
 * What's the problem with this method then,
 * So Many use of maps -  4 in our case
 * Can we make our mergeViaMayBe
 * better? Yes we can – meet Monads!
*/


// Solving the Problem via join
MayBe.prototype.join = function() {
    return this.isNothing() ? MayBe.of(null) : this.value
}

let joinExample = MayBe.of(MayBe.of(5))


let joinedExample = joinExample.join()

joinExample.map((outsideMayBe) => {
    return outsideMayBe.map((val) => val + 4)
})

// MayBe { value: MayBe { value: 9 } }

joinExample.join().map((v) => v + 4)
// MayBe { value: 9 }

let mergeViaJoin = (searchText) => {
    let redditMayBe = MayBe.of(searchResult(searchText))
    let ans = redditMayBe.map((arr) => arr['data'])
               .map((arr) => arr['children'])
               .map((arr) => map(arr,(x) => {
                        return {
                            title : x['data'].title,
                            permalink : x['data'].permalink
                        }
                    }
                ))
               .map((obj) => map(obj, (x) => {
                    return {
                        title: x.title,
                        comments: MayBe.of(getComments(x.permalink.replace("?ref=search_posts",".json"))).join()
                    }
               }))
               .join()
   return ans
}

const mergedRes = mergeViaJoin("functional programming")


// chain Implementation
MayBe.prototype.chain = function(f) {
    return this.map(f).join()
}

let mergeViaChain = (searchText) => {
    let redditMayBe = MayBe.of(searchResult(searchText))
    let ans = redditMayBe
               .map((arr) => arr['data'])
               .map((arr) => arr['children'])
               .map((arr) => arrayUtils.map(arr,(x) => {
                        return {
                            title : x['data'].title,
                            permalink : x['data'].permalink
                        }
                    }
                ))
               .chain((obj) => map(obj, (x) => {
                    return {
                       title: x.title,
                       comments: MayBe.of(getCommentsx.permalink.
replace("?ref=search_posts",".json")).join()
                    }
               }))
   return ans;
}

// The output is going to be exactly the same via chain too!

/*
 * So What Is a Monad?
 * --------------------------- 
 * Monad is a functor that has a chain method! which helps to
 * flatten the MayBe data
 * MayBe with only of and map is a Functor. A functor with chain
 *  is a Monad!
*/
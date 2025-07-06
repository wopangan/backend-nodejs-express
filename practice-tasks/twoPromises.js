// First task: 
// Create a script which has two methods that return promises with two different setTimeouts.
// Second promise is invoked the first promise is resolved.

let firstPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("First promise pesolved!")
    }, 6000)
})

let secondPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("Second promise resolved!")
    }, 3000)
})

console.log("Calling all promises...")

firstPromise.then((firstMessage) => {
    console.log(`From callback ${firstMessage}`)
    
    secondPromise.then((secondMessage) => {
        console.log(`From callback ${secondMessage}`)
    })
})

// Second task:
// Change the code to call the promises sequentially

firstPromise.then((firstMessage) => {
    console.log(`From callback ${firstMessage}`)
})

secondPromise.then((secondMessage) => {
    console.log(`From callback ${secondMessage}`)
})

// Take:
// First task shows 'promise chaining', where the second promise starts after the first (6s + 3s).
// Second task shows sequential execution starting with the 3s promise, then the 6s promise output appears in order of call.
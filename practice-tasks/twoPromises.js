// Task: 
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
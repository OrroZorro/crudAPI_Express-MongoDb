fetch('http://localhost:3001/books')
.then(response => {
    if(!response.ok) {
        throw new Error('Response is not okay')
    }
    return response.json()
})
.then(data => {
    console.log(data);
})
.catch(error => {
    console.error('There was a problem:', error)
})
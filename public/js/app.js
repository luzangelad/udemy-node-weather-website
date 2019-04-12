const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('#msg1')
const msga2 = document.querySelector('#msg2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value

    msg1.textContent = 'Loading...'
    msg2.textContent = ''

    fetch(`/weather?address=${location}`).then((res) => {
        res.json().then((data) => {
            if (data.error) {
                msg1.textContent = `An error occurred: ${data.error}`
            } else {
                msg1.textContent = data.location
                msg2.textContent = data.forecast
            }
        })
    })
})
const getInput = async (day, filename) =>  {
    return fetch(`/data/${day}/${filename}`).then(response => response.text())
}

export default getInput
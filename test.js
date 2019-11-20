async function init() {
    const response = await fetch('https://desolate-lowlands-42565.herokuapp.com/products')
    const myJson = await response.json();
    console.log(JSON.stringify(myJson));
}

init()
const products = document.getElementById("products")

async function product(){
    const api = "https://api.everrest.educata.dev/shop/products/all";
    try{
        const response = await fetch(api, {
            // method: "GET",
            // headers: {
            //     "Content-Type": "application/json",
            //     "User-Agent": navigator.userAgent,  // Simulates a browser request
            //     // "Authorization": "Bearer YOUR_TOKEN_HERE" // If required
            // }
        })
        const json = await response.json()
        console.log(json)
        const images = json.products[4].thumbnail;
        console.log(images)
        const img = document.createElement("img")
        img.src = images;

        products.appendChild(img)


    }catch(error){
        console.error(error);
    }
}
product()
// console.log("giorgi")
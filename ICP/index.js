
let arr =[]
async function  fetchData(){
    
    try {
        let response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a')
        let data = await response.json()
        console.log(data)
        arr.push(data.drinks)
        console.log(arr)
        let result = data.drinks
        result.forEach((el)=>{
            let ele = {dateModified:el.dateModified}
            let id = el.idDrink
            arr.push(ele,id)
        })
    } catch (error) {
        console.log(error)
    }
    console.log(arr)
    let sorted = arr.sort((a,b)=>a.dateModified-b.dateModified)
    console.log(sorted)
}
fetchData()
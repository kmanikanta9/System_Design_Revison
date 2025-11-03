console.log('working')


const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn')

const resultsDiv = document.getElementById('results')
const paginationDiv = document.getElementById('pagination')

let allMeals = []
let currentPage = 1;
const itemsPerPage = 6;

searchBtn.addEventListener('click',handleSearch);
searchInput.addEventListener('input',handleLiveSearch)


async function handleSearch() {
    const query = searchInput.value.trim()
    if(query){
        await fetchMeals(query)
    }
}
async function handleLiveSearch(e) {
    const query = searchInput.value.trim()
    if(query.length>2){
        await fetchMeals(query)
    }
}



async function fetchMeals(query){
    try {
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
        let data = await response.json()
        console.log(data)
        if(data.meals){
            allMeals = data.meals;
            currentPage =1
            displayMeals(data.meals)
        }else{
            allMeals =[]
            paginationDiv.innerHTML = ''
        }
        
    } catch (error) {
        console.log(error)
    }
}
function displayMeals(data){
    resultsDiv.innerHTML=''
    
    if(allMeals.length==0){
        paginationDiv.innerHTML=''
        return
    }

    const start = (currentPage-1)*itemsPerPage;
    const end = start+ itemsPerPage;
    const pageMeals = allMeals.slice(start,end)
    pageMeals.forEach(meal=>{
        let mealBox = document.createElement('div')
        let title = document.createElement('h3')
        const image = document.createElement('img')
        const category = document.createElement('p')
        const area = document.createElement('p')
        title.textContent = meal.strMeal;
        image.src = meal.strMealThumb
        category.textContent = `Category: ${meal.strCategory}`
        area.textContent = `Area: ${meal.strArea}`


        mealBox.append(title,image,category,area)
        resultsDiv.appendChild(mealBox)
    })
    // data.forEach((meal,index)=>{
    //     let mealBox = document.createElement('div')
    //     let title = document.createElement('h3')
    //     const image = document.createElement('img')
    //     const category = document.createElement('p')
    //     const area = document.createElement('p')
    //     title.textContent = meal.strMeal;
    //     image.src = meal.strMealThumb
    //     category.textContent = `Category: ${meal.strCategory}`
    //     area.textContent = `Area: ${meal.strArea}`
        
    //     // list.innerHTML=`
    //     // <p>${item.strMeal}</p>
    //     // <p>${item.strCategory}</p>
    //     // <img src=${item.strMealThumb} alt="">
    //     // <p>${item.strArea}</p>
    //     // `
    //     // resultsDiv.append(list)

    //     mealBox.append(title,image,category,area)
    //     resultsDiv.appendChild(mealBox)
    // })
    renderPagination()

}

// title,category,image and area

function renderPagination(){
    paginationDiv.innerHTML =''
    const totalPages = Math.ceil(allMeals.length/itemsPerPage)
    if(totalPages<=1) return;
    if(currentPage>1){
        const prevBtn = createPagination('PREV',()=>{
            currentPage--;
            displayMeals()
        })
        paginationDiv.appendChild(prevBtn)
    }
    if(currentPage<totalPages){
        const nextBtn = createPagination('NEXT',()=>{
            currentPage++;
            displayMeals()

        })
        paginationDiv.appendChild(nextBtn)
    }

    for(let i=1;i<=totalPages;i++){
        const btn = createPagination(i,()=>{
            currentPage = i;
            displayMeals()
        })
        if(i==currentPage) btn.classList.add('active')
        paginationDiv.appendChild(btn)
    }

}

function createPagination(text,clickHandler){
    const button = document.createElement('button')
    button.textContent = text;
    button.addEventListener('click',clickHandler)
    return button;
}
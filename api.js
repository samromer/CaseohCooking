(function () {
const search = document.querySelector('#find');
let searchText;
let vegan = false;
let gluten = false

   document.querySelector("#find").addEventListener('keypress', (e) => {
    if (e.key === "Enter") {
            sheetClose();
           e.preventDefault();
           searchText = search.value;

           if(vegan = true)
            {
                searchText += " vegan";
            }

            if(gluten = true)
            {
                searchText += " gluten free";
            }

           const asnycRequestObject = new XMLHttpRequest();
           asnycRequestObject.open('GET', `https://api.spoonacular.com/recipes/complexSearch?query=${searchText}&apiKey=46104d4115db454caed6cfb378f0caf1`);
           asnycRequestObject.onload = handleSuccess;
           asnycRequestObject.onerror = handleError;
           asnycRequestObject.send();
        }
       });
       
       function handleSuccess()
       {
           document.querySelector('.recipes').innerHTML = "";
           const data = JSON.parse(this.responseText)
           console.log(data);
           if(data.results.length == 0)
           {
            handleError();
           }else
           {
            //every result gets procesed
                for(i =0; i <  data.results.length; i++)
                {
                let id = data.results[i].id
                let name = data.results[i].title
                let image = data.results[i].image
                    generateRecipe(id, image, name);
                }
           }
       }

       function handleError()
       {
        // shows error message telling user to check for typos
            const newError = `<div class="error">
                                <img class="errorImage" src="images/shrimpalfredo.png" alt="error 404 nothing found">
                            <div>Recipe not found</div>
                            <div>check for typos</div>
                        </div>`;
            const errorList = document.createElement('div');
            errorList.innerHTML = newError;
            
            document.querySelector('.recipes').append(errorList);
       }
   })();

   function generateRecipe(id, image, name)
   {
    //shows image and name of dish
    //can be clicked for more info about the dish
       const newRecipe = `<div class="recipe">
                    <img src="${image}" alt="${name}" class="recipeImage">
                        <div class="recipeName">
                            <p>${name}</p>
                        </div>
                   </div>`;
       const recipeList = document.createElement('div');
       recipeList.innerHTML = newRecipe;
       
       document.querySelector('.recipes').append(recipeList);
       
       recipeList.querySelectorAll(".recipe").forEach((element) => {
        element.addEventListener("click", () => {

            // opens the sheet with the clicked item through the name of the item
        sheetOpen(id, name, image);
        let height = screen.height - 56 + "px";
        document.querySelector('main').style.height = height;
        document.querySelector('main').style.overflowY = "hidden";
        })
    });
   }
   
   //stuff to make page work V

   const topAppBarElement = document.querySelector('.mdc-top-app-bar');
   const topAppBar = new MDCTopAppBar(topAppBarElement);
   
   const drawer = MDCDrawer.attachTo(document.querySelector('.mdc-drawer'));

const menuItem = document.querySelector('#menuBtn');
const listEl = document.querySelector('.mdc-drawer .mdc-list');
const mainContentEl = document.querySelector('.main-content');

menuItem.addEventListener('click', () => {
 if (drawer.open) {
   drawer.open = false;
 } else {
   drawer.open = true;
 }
});

listEl.addEventListener('click', () => {
 drawer.open = false;
});

   //sheet code V

document.querySelector('#closeBtn').addEventListener('click', () => {
 sheetClose();
   document.querySelector('main').style.height = "100%";
   document.querySelector('main').style.overflowY = "scroll";
   console.log("Scroll")
})

function sheetOpen(id, name, image) 
{ 

    const asnycRequestObject = new XMLHttpRequest();
    asnycRequestObject.open('GET', `https://api.spoonacular.com/recipes/${id}/information?apiKey=46104d4115db454caed6cfb378f0caf1`);
    asnycRequestObject.onload = handleSuccess;
    asnycRequestObject.onerror = handleError;
    asnycRequestObject.send();
    
function handleSuccess()
{
    const data = JSON.parse(this.responseText)
     //result gets procesed
            document.querySelector('.sheetImage').src = image;
            document.querySelector('#recipeName').innerHTML = name;

            let ingredients = "";
        
            console.log(data)
              
            document.querySelector('#diets').innerHTML =  getInfo(data.diets);

            document.querySelector('#types').innerHTML = getInfo(data.dishTypes);

            for(i =0; i <  data.extendedIngredients.length; i++)
                {
                    ingredients += data.extendedIngredients[i].nameClean + " ";
                }

            document.querySelector('#ingredients').innerHTML = ingredients;

            document.querySelector('#info').innerHTML = data.instructions;    
}

function getInfo(searchTerm)
{
    let info = "";

    for(i =0; i <  searchTerm.length; i++)
        {
            info += searchTerm[i] + " ";
        }

        return info;
}

function handleError()
{
 // shows error message telling user to check for typos
     const newError = `<div class="error">
                         <img class="errorImage" src="images/shrimpalfredo.png" alt="error 404 nothing found">
                     <div>Recipe not found</div>
                     <div>check for typos</div>
                 </div>`;
     const errorList = document.createElement('div');
     errorList.innerHTML = newError;
     
     document.querySelector('.recipes').append(errorList);
}

//  document.querySelector('.sheetImage').src = image.src;
//  document.querySelector('#homeBtn').innerHTML = image.alt;
 document.querySelector('.sheet').classList.remove("sheet-out-of-view")
 document.querySelector('#closeBtn').classList.remove("hidden")
 document.querySelector('#menuBtn').classList.add("hidden")
}

function sheetClose() {
 document.querySelector('.sheet').classList.add("sheet-out-of-view")
 document.querySelector('#closeBtn').classList.add("hidden")
 document.querySelector('#menuBtn').classList.remove("hidden")
}

//opens the account page
document.querySelector('.account').addEventListener('click', () => {
    document.querySelector('.accountPage').classList.remove("hidden")
    document.querySelector('.recipes').classList.add("hidden")
   })

//opens menu to select vegan search
   const menu = new MDCMenu(document.querySelector('.mdc-menu'));

document.querySelector('#menu').addEventListener('click', () => {
    menu.open = true;
   })

   document.querySelector('#vegan').addEventListener('click', () => {
       if(vegan == true)
       {
           vegan = false;
           document.querySelector('#veganText').innerHTML = "Vegan"
       }else{
           vegan = true;
           document.querySelector('#veganText').innerHTML = "Vegan x"
       }
       console.log(vegan)
      })
      
   document.querySelector('#gluten').addEventListener('click', () => {
    if(gluten == true)
    {
        gluten = false;
        document.querySelector('#glutenText').innerHTML = "Gluten free"
    }else{
        gluten = true;
        document.querySelector('#glutenText').innerHTML = "Gluten  free x"
    }
   })
let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let mood = 'create';
let temp;

// Get Total Price
function getTotal()
{
    if(price.value != ''){
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result
        total.style.background = 'green'
    }else{
        total.innerHTML = '';
        total.style.background = '#332569'
    }
}

// Get New Product
let dataProduct;
if(localStorage.product != null){
    dataProduct = JSON.parse(localStorage.product)
}else{
    dataProduct = []
}

submit.onclick = function(){
    let newProduct = {
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
    }

    if(title.value != '' && price.value != ''){
        if(mood == 'create'){
            // Create Count
            if(newProduct.count > 1){
                for(let i = 0; i < newProduct.count; i++){
                    dataProduct.push(newProduct);
                }
            }else{
                dataProduct.push(newProduct);
                total.style.background = '#332569'
            }
        }else{
            dataProduct[temp] = newProduct;
            mood = 'create';
            submit.innerHTML = 'Create';
            count.style.display = 'block';
            total.style.background = '#332569'
        } 
        clearData()   
    }   

    // Save Data in Local Storage
    localStorage.setItem('product', JSON.stringify(dataProduct))
    readData ()
}

// Clear Inputs
function clearData(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}

// Read Data
function readData(){
    let table = '';
    for(let i = 0; i < dataProduct.length; i++){
        table += `
        <tr>
            <td>${i+1}</td>
            <td>${dataProduct[i].title}</td>
            <td>${dataProduct[i].price}</td>
            <td>${dataProduct[i].taxes}</td>
            <td>${dataProduct[i].ads}</td>
            <td>${dataProduct[i].discount}</td>
            <td>${dataProduct[i].total}</td>
            <td>${dataProduct[i].category}</td>
            <td><button onclick="updateData(${i})" id="update">Update</button></td>
            <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
        </tr>

        `
    }
    document.getElementById('tbody').innerHTML = table;
    let btnDelete = document.getElementById('deleteAll');
    if(dataProduct.length > 0){
        btnDelete.innerHTML = `
        <button onclick="deleteAll()">Delete All</button>
        `
    }else{
        btnDelete.innerHTML = '';
    }
}
readData ()

// Delete Products
function deleteData(i){
    dataProduct.splice(i,1);
    localStorage.product = JSON.stringify(dataProduct);
    readData()
}

function deleteAll(){
    localStorage.clear()
    dataProduct.splice(0)
    readData()
}


// Update Products
function updateData(i){
    title.value = dataProduct[i].title;
    price.value = dataProduct[i].price;
    taxes.value = dataProduct[i].taxes;
    ads.value = dataProduct[i].ads;
    discount.value = dataProduct[i].discount;
    category.value = dataProduct[i].category;
    count.style.display = 'none';
    submit.innerHTML = 'Update';
    mood = 'update';
    temp = i;
    scroll({
        top: 0,
        behavior: "smooth",
    })
    getTotal()
}

//Search Products
let searchMood = 'title';
function getSearchMood(id){
    let search = document.getElementById('search');
    if(id == 'searchTitle'){
        searchMood = 'title';
    }else{
        searchMood = 'category'
    }
    search.placeholder = 'Search by ' + searchMood;
    search.focus()
    search.value = '';
    readData()
}

function searchData(value){
    let table = '';
    for(let i = 0; i < dataProduct.length; i++){
    if(searchMood == 'title'){
            if(dataProduct[i].title.includes(value.toLowerCase())){
                table += `
                <tr>
                    <td>${i}</td>
                    <td>${dataProduct[i].title}</td>
                    <td>${dataProduct[i].price}</td>
                    <td>${dataProduct[i].taxes}</td>
                    <td>${dataProduct[i].ads}</td>
                    <td>${dataProduct[i].discount}</td>
                    <td>${dataProduct[i].total}</td>
                    <td>${dataProduct[i].category}</td>
                    <td><button onclick="updateData(${i})" id="update">Update</button></td>
                    <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
                </tr>
                `        
            }
    }else{
            if(dataProduct[i].category.includes(value.toLowerCase())){
                table += `
                <tr>
                    <td>${i}</td>
                    <td>${dataProduct[i].title}</td>
                    <td>${dataProduct[i].price}</td>
                    <td>${dataProduct[i].taxes}</td>
                    <td>${dataProduct[i].ads}</td>
                    <td>${dataProduct[i].discount}</td>
                    <td>${dataProduct[i].total}</td>
                    <td>${dataProduct[i].category}</td>
                    <td><button onclick="updateData(${i})" id="update">Update</button></td>
                    <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
                </tr>
                `        
            }
        }
    }
    document.getElementById('tbody').innerHTML = table;
}

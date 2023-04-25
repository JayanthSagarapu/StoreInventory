const form = document.getElementById('form');
const itemname = document.getElementById('item');
const description = document.getElementById('description');
const price = document.getElementById('price');
const quantity = document.getElementById('quantity');
const addbtn = document.getElementById('addbtn');
const list = document.getElementById('list')
const listItem = document.getElementById('list-item');

const obj={
    item : itemname.value,
    description : description.value,
    price : price.value,
    quantity : quantity.value,
}

addbtn.addEventListener('click',postItemtoCrud);

function postItemtoCrud(e){
     e.preventDefault();

    const obj={
        item : itemname.value,
        description : description.value,
        price : price.value,
        quantity : quantity.value,
    }
    
    // showOnScreen(obj)
    
    axios.post("https://crudcrud.com/api/1c5f91e05d944a738407fc318717e889/inventoryData",obj)
    .then((response) => {
        showOnScreen(response.data)
        console.log(response)
    })
    .catch((error) => {
        console.log(error)
    })
}

function showOnScreen(inputObject){

    const li = document.createElement('li');
    li.className = "list-group-item align-self-center w-100 mb-1 p-1 d-block"
    li.id = "list-item"
    li.textContent = inputObject.item +"  "+ inputObject.description +"  "+ inputObject.price +"  "+ inputObject.quantity
    
    
    const buy3btn = document.createElement('button');

    buy3btn.className = "btn btn-sm float-right border-dark mr-3"
    buy3btn.textContent = "Buy3";
    

    buy3btn.onclick = () =>{
        inputObject.quantity = inputObject.quantity-3;
        // if(inputObject.quantity>0){ 
        //     list.removeChild(li)
        //     showOnScreen(inputObject)
        // }
        // else{
        //     list.removeChild(li)
        // }

        buybtnsUpdate()      
    }

    const buy2btn = document.createElement('button');

    buy2btn.className = "btn btn-sm float-right border-dark mr-3"
    buy2btn.textContent = "Buy2";
    

    buy2btn.onclick = (e) =>{
        inputObject.quantity = inputObject.quantity-2;
        
        buybtnsUpdate()
    }


    const buy1btn = document.createElement('button');

    buy1btn.className = "btn btn-sm float-right border-dark mr-3"
    buy1btn.textContent = "Buy1";
    

    buy1btn.onclick = () =>{
        inputObject.quantity = inputObject.quantity-1;
        
        buybtnsUpdate()
    }

    function buybtnsUpdate(){
        if(inputObject.quantity>0){ 
                list.removeChild(li)
                showOnScreen(inputObject)
            }
            else{
                list.removeChild(li)
                axios.delete(`https://crudcrud.com/api/1c5f91e05d944a738407fc318717e889/inventoryData/${inputObject._id}`)
                .then((res)=>{console.log(res)})
                .catch((err)=>{console.log(err)})
            }
    

    }


    li.append(buy3btn)
    li.append(buy2btn)
    li.append(buy1btn)
    list.append(li)
    
    form.reset()


}

window.addEventListener('DOMContentLoaded',reloadpage);
        function reloadpage(){
          axios
          .get("https://crudcrud.com/api/1c5f91e05d944a738407fc318717e889/inventoryData")
          .then((response) => {
            for(var i=0; i< response.data.length;i++){
              showOnScreen(response.data[i])
            }
            console.log(response);
          })
          .catch((err) => {
            console.log(err);
          });

        }

const form = document.getElementById('form');
const itemname = document.getElementById('item');
const description = document.getElementById('description');
const price = document.getElementById('price');
const quantity = document.getElementById('quantity');
const addbtn = document.getElementById('addbtn');
const list = document.getElementById('list')
const listItem = document.getElementById('list-item');

const obj= {
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
    
    axios.post("https://crudcrud.com/api/cae6505e943b421e8f93fa6bf9c00e8c/inventoryData",obj)
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
    // li.className = "list-group-item align-self-center w-100 mb-1 p-1 d-block d-flex"
    li.id = "list-item"
    li.textContent = inputObject.item +"  "+ inputObject.description +"  "+ inputObject.price +"  "+ inputObject.quantity

    const errmsg = document.createElement('div')
    errmsg.className = "bg-danger w-75 d-none";
    errmsg.textContent = "Item Insufficient";
    list.append(errmsg)

    
    // const div = document.createElement('div1');
    // div.className="card card-body"
    // div.textContent=inputObject.item
    // li.append(div)
    
    // const div1 = document.createElement('div1');
    // div1.className="card card-body"
    // div1.textContent=inputObject.description
    // li.append(div1)
    // const div2 = document.createElement('div1');
    // div2.className="card card-body"
    // div2.textContent=inputObject.price
    // li.append(div2)
    // const div3 = document.createElement('div1');
    // div3.className="card card-body"
    // div3.textContent=inputObject.quantity
    // li.append(div3)
    
    const buy3btn = document.createElement('button');

    buy3btn.className = "btn btn-sm float-right border-dark mr-3"
    buy3btn.textContent = "Buy3";
    

    buy3btn.onclick = () =>{
        if(inputObject.quantity>3){
        inputObject.quantity = inputObject.quantity-3;
        buybtnsUpdate()
        }
        else{
            errmsg.className="bg-danger w-75 d-block";
            setTimeout(()=>{
                errmsg.className="bg-danger w-75 d-none";
            },1000)
        }
  
    }

    const buy2btn = document.createElement('button');

    buy2btn.className = "btn btn-sm float-right border-dark mr-3"
    buy2btn.textContent = "Buy2";
    

    buy2btn.onclick = (e) =>{
        if(inputObject.quantity>2){
            inputObject.quantity = inputObject.quantity-2;
            buybtnsUpdate()
            }
            else{
                errmsg.className="bg-danger w-75 d-block";
                setTimeout(()=>{
                    errmsg.className="bg-danger w-75 d-none";
                },1000)
            }
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
                axios.delete(`https://crudcrud.com/api/cae6505e943b421e8f93fa6bf9c00e8c/inventoryData/${inputObject._id}`)
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
          .get("https://crudcrud.com/api/cae6505e943b421e8f93fa6bf9c00e8c/inventoryData")
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

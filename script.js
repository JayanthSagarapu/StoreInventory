const form = document.getElementById('form');
const itemname = document.getElementById('item');
const description = document.getElementById('description');
const price = document.getElementById('price');
const quantity = document.getElementById('quantity');
const addbtn = document.getElementById('addbtn');
const list = document.getElementById('list')
const listItem = document.getElementById('list-item');
const container = document.getElementById('container')

const Item= {
    name : itemname.value,
    description : description.value,
    price : price.value,
    quantity : quantity.value,
}





addbtn.addEventListener('click',postItemtoCrud);

function postItemtoCrud(e){
     e.preventDefault();
    
     const Item= {
        name : itemname.value,
        description : description.value,
        price : price.value,
        quantity : quantity.value,
    }
    
    if(Item.name && Item.description && Item.price && Item.quantity){
        axios.post("https://crudcrud.com/api/724de6461bfc4cc9b5b1dec583330a6f/inventoryData",Item)
        .then((response) => {
            showOnScreen(response.data)
            console.log(response)
        })
        .catch((error) => {
            console.log(error)
        })
        }

    else{
        const errmsg = document.createElement('div')
        errmsg.className = "bg-danger w-75 ";
        errmsg.textContent = "Fill the details";
        container.append(errmsg)

        setTimeout(()=>{
            errmsg.className = "bg-danger w-75 d-none";
        },1000)
    }
    
}

function showOnScreen(inputObject){

    const li = document.createElement('li');
    li.className = "list-group-item align-self-center w-100 mb-1 p-1 d-block d-flex"
    li.id = "list-item"

    const errmsg = document.createElement('div')
    errmsg.className = "bg-danger w-75 d-none text-white";
    errmsg.textContent = "Required Quantity Not Available";
    list.append(errmsg)

    // let div=[]

    // for (var i=1;i<=4;i++){
    //     div[i] = document.createElement('div');
    //     div[i].className="card card-body"
    //     div[i].id=`div${i}`
    //     div[i].textContent=Object.values(inputObject)[i];
    //     li.append(div[i])
    // }

    const div0 = document.createElement('div');
    div0.className="card card-body"
    div0.id="div0"
    div0.textContent=inputObject.description
    li.append(div0) 

    const div1 = document.createElement('div');
    div1.className="card card-body"
    div1.id="div1"
    div1.textContent=inputObject.description
    li.append(div1)

    const div2 = document.createElement('div');
    div2.className="card card-body"
    div2.id="div2"
    div2.textContent=inputObject.price
    li.append(div2)

    const div3 = document.createElement('div');
    div3.className="card card-body"
    div3.id="div3"
    div3.textContent=inputObject.quantity
    li.append(div3)

    
    const buybtn1 = document.createElement('button');
    buybtn1.className = "btn btn-sm float-right border-dark mr-3 d-block";
    buybtn1.textContent = `Buy1`;
    li.append(buybtn1)
    

    buybtn1.onclick = () =>{
        var value = 1;
        if(inputObject.quantity>=value){
            inputObject.quantity = inputObject.quantity-1;
            buybtnsUpdate()
        }
        else{
            errmsg.className="bg-danger w-75 d-block text-white";
            setTimeout(()=>{
            errmsg.className="bg-danger w-75 d-none";
                },1000)
            }
            
        }
    
    

    const buybtn2 = document.createElement('button');
    buybtn2.className = "btn btn-sm float-right border-dark mr-3 d-block";
    buybtn2.textContent = "Buy2";
    li.append(buybtn2)

    buybtn2.onclick = () =>{
        if(inputObject.quantity>=2){
            inputObject.quantity = inputObject.quantity-2;
            buybtnsUpdate()
        }
        else{
            errmsg.className="bg-danger w-75 d-block text-white";
            setTimeout(()=>{
            errmsg.className="bg-danger w-75 d-none";
                },1000)            
        }
    }


    const buybtn3 = document.createElement('button');
    buybtn3.className = "btn btn-sm float-right border-dark mr-3 d-block";
    buybtn3.textContent = "Buy3";
    li.append(buybtn3)

    buybtn3.onclick = () =>{
        if(inputObject.quantity>=3){
            inputObject.quantity = inputObject.quantity-3;
            buybtnsUpdate()
        }
        else{
            errmsg.className="bg-danger w-75 d-block text-white";
            setTimeout(()=>{
            errmsg.className="bg-danger w-75 d-none";
                },1000)            
        }    
    }

    function buybtnsUpdate(){
        if(inputObject.quantity>0){ 
                let updatedItem={
                    name : inputObject.name,
                    description : inputObject.description,
                    price : inputObject.price,
                    quantity : inputObject.quantity,
                }
                
                axios.put(`https://crudcrud.com/api/724de6461bfc4cc9b5b1dec583330a6f/inventoryData/${inputObject._id}`,updatedItem)
                .then((res)=>{
                   
                    div3.textContent = updatedItem.quantity 
                   
                })
                .catch((error)=>{console.log(error)})
            }
            
            else{
                list.removeChild(li)
                axios.delete(`https://crudcrud.com/api/724de6461bfc4cc9b5b1dec583330a6f/inventoryData/${inputObject._id}`)
                .then((res)=>{console.log(res)})
                .catch((err)=>{console.log(err)})
            }
    }

    

    
    list.append(li)
    
    form.reset()
}

window.addEventListener('DOMContentLoaded',reloadpage);
        function reloadpage(){
          axios
          .get("https://crudcrud.com/api/724de6461bfc4cc9b5b1dec583330a6f/inventoryData")
          .then((response) => {
            for(let i=0; i< response.data.length;i++){
              showOnScreen(response.data[i])
            }
            console.log(response);
          })
          .catch((err) => {
            console.log(err);
          });

        }


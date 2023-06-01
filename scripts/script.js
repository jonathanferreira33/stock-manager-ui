class Product {
    constructor() {
        this.listProducts = [];
    }

    add() {
        let product = this.dados();
        if (this.validityFields(product)){
            this.addDb(product);
        }
        this.clear();
    }

    clear() {
        document.getElementById('product').value = '';
        document.getElementById('product-amount').value = '';
    }

    dados() {
        let product = {}
        
        product.Id = this.Id;
        product.ProductName = document.getElementById('product').value;
        product.ProductAmount = document.getElementById('product-amount').value;

        return product;
    }

    validityFields(product) {
        let msg = '';
        if(Object.keys(product.ProductName).length === 0){
            msg += 'Informe o nome do produto'
        }
        if(Object.keys(product.ProductAmount).length === 0){
            product.ProductAmount = 0;
        }

        if(msg != '') {
            return false;
        }

        return true;
    }

    addDb(product) {
        // this.Id++;

        const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                product_name: product.ProductName,
                amount: product.ProductAmount
            })
        };
        fetch('http://127.0.0.1:8000/products/', requestOptions)
            .then(response => response.json())
        
        reloadPage();
        
    }

    delete(id) {
        alert('tem certeza de deseja deletar: Produto id: ' + id);
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        };
            fetch(`http://127.0.0.1:8000/products/${id}`, requestOptions);

        
        reloadPage();
        
    }

    put(id, amount, newAmount){
        alert('PATCH' + id);

        var url = 'http://127.0.0.1:8000/products/' + id + '/';

        let table = document.querySelector("#allProductsDB");
        table.addEventListener("")

        const requestOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors',
            body: JSON.stringify({
                product_name: product.ProductName,
                amount: product.ProductAmount
            })
        };
        fetch(url, requestOptions)
            .then(response => response.json())

        
        reloadPage();
        
    }

    loadProductsBd() {
        this.getProductsDB();
        alert('aqui');
    }
}

window.onload = getProductsDB();

window.onclick = function(event) {
    
    // getProduct(8);
    
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


var modal = document.getElementById('id01');
var product = new Product();

function reloadPage(){
    setTimeout(() => {
        setTimeout(window.location.reload());
      }, 1500);
};

function getProduct(id) {
    const url = `http://127.0.0.1:8000/products/${id}`;
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    };
        fetch(url).then(function(response){
            response.json().then(function(data){
                productAtual(data);
            })
        });
}

function productAtual(product) {
    let containerModal = document.querySelector('#id02');
    containerModal.innerText = '';

    containerModal.innerHTML = `<h4>Id:${product.id}</h4> <br><h4>Produto: ${product.product_name}</h4>
                                <input type="number" id="productamount-update" required>
                                <button type="submit" onclick="product.put(${product.id}, ${product.amount}).value})">Atualizar</button>`;
}

function getProductsDB() {
 
    const url ='http://127.0.0.1:8000/products/';

    fetch(url).then(function(response){
        response.json().then(function(data) {
                getAllProdutos(data.results);
            });
    })
}

function getAllProdutos(dados) {

    let tbody = document.getElementById('tbody');
    tbody.innerText = '';

    dados.forEach(function(dado) {
        console.log(dado);

        let tr = tbody.insertRow();

        let td_id = tr.insertCell();
        let td_name = tr.insertCell();
        let td_amount = tr.insertCell();
        let td_actions = tr.insertCell();

        td_id.innerText = dado.id;
        td_id.setAttribute('id', dado.id);
        td_name.innerText = dado.product_name;
        td_amount.innerText = dado.amount;
        
        let imgEdit = document.createElement('img');
        let imgDelete = document.createElement('img');
        imgEdit.src = 'assets/img/edit-pencil-line-01-svgrepo-com.svg';
        
        imgEdit.setAttribute('onclick',"document.getElementById('id01').style.display='block'");
        imgEdit.setAttribute('name', `${dado.id}`);
        // imgEdit.setAttribute('onclick', `product.put(${dado.id})`);
        
        imgDelete.src = 'assets/img/delete-2-svgrepo-com.svg';
        imgDelete.setAttribute('onclick', `product.delete(${dado.id})`);
        
        
        td_actions.appendChild(imgEdit);
        
        td_actions.appendChild(imgDelete);
                
        // td_id.classList.add() 
        
    });       
}

function validar(idNomeProduto, idCodProduto, idQtidadeProduto) {
    let nome = document.getElementById(idNomeProduto).value;
    let codigo = document.getElementById(idCodProduto).value;
    let qtidade = document.getElementById(idQtidadeProduto).value;

    if (nome == "")
        alert("Nome do produto não pode estar em branco.");
    else if (codigo == "")
        alert("Código do produto não pode estar em branco.");
    else cadastrarProduto(nome, codigo, parseInt(qtidade));
}

function cadastrarProduto(produto, codig, qtidade) {
    let novoProduto = {nome:produto, codigo:codig, quantidade:qtidade};

    if (typeof(Storage) !== "undefined") {
        let produtos = localStorage.getItem("produtos");
        if (produtos == null) produtos = []; // Nenhum produto ainda foi cadastrado
        else produtos = JSON.parse(produtos);
        produtos.push(novoProduto); // Adiciona um novo produto
        localStorage.setItem("produtos",JSON.stringify(produtos))
        alert("Foram cadastradas com sucesso "+qtidade+" unidades do produto "+ produto+"!");
        atualizarLista("totalLista");
        location.reload();
    } 
}

function atualizarLista(idCampo) {
    localStorage.setItem("totalLista",++document.getElementById(idCampo).innerHTML)
}

function carregaLista(idCampo) {
    if (typeof(Storage) !== "undefined") {
        let totalLista = localStorage.getItem("totalLista");
        if (totalLista == null) totalLista = 0;
        document.getElementById(idCampo).innerHTML = totalLista;
    }
}


function listar() {
    if (typeof(Storage) !== "undefined") {
        let produtos = localStorage.getItem("produtos");
        document.write("<h1>Lista:</h1>")
        if (produtos == null)
            document.write("<h3>Ainda não há nenhum item na Lista</h3>");
        else {
            produtos = JSON.parse(produtos);
            produtos.forEach(produto => {
                document.write("<ul>");
                document.write("<li>Nome do produto: "+produto.nome+"</li>");
                document.write("<li>Código do produto: "+produto.codigo+"</li>");
                document.write("<li>Quantidade na Lista: "+produto.quantidade+"</li>");
                document.write("</ul>");
            });
            // Aqui tento criar um botão via script para retornar a tela, porem não deu certo
           //document.createElement(<input type="button" value="Tela Cadastro" onclick="window.open('cadastro.html','_self')">)
        }
    }   
}
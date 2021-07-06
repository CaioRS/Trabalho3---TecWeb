function validar(txtCodProduto, txtNomeProduto, unidade, qtidadeProduto, txtCodBarras, ativo) {
    let codigo = document.getElementById(txtCodProduto).value;
    let nome = document.getElementById(txtNomeProduto).value;
    let un = document.getElementById(unidade).value;
    let qtd = document.getElementById(qtidadeProduto).value;
    let qr = document.getElementById(txtCodBarras).value;
    let atv = document.getElementById(ativo).value;

    cadastrarProduto(parseInt(codigo), nome, un, parseInt(qtd), qr, atv);
}

function cadastrarProduto(produto, codig, nome, un, qtd, qr, atv) {
    let novoProduto = {
        nome: nome,
        codigo: codig,
        unidade: un,
        qtidadeProduto: qtd,
        txtCodBarras: qr,
        ativo: atv
    };

    if (typeof (Storage) !== "undefined") {
        let produtos = localStorage.getItem("produtos");
        if (produtos == null) produtos = []; // Nenhum produto ainda foi cadastrado
        else produtos = JSON.parse(produtos);
        produtos.push(novoProduto); // Adiciona um novo produto
        localStorage.setItem("listaProdutos", JSON.stringify(produtos))
        alert("Foram cadastradas com sucesso " + qtd + " unidades do produto " + produto + "!");

        atualizarLista("totalLista");
        location.reload();
    }
}

function atualizarLista(idCampo) {
    localStorage.setItem("totalLista", ++document.getElementById(idCampo).innerHTML)
}

function carregaLista(idCampo) {
    if (typeof (Storage) !== "undefined") {
        let totalLista = localStorage.getItem("totalLista");
        if (totalLista == null) totalLista = 0;
        document.getElementById(idCampo).innerHTML = totalLista;
    }
}

function coletar(params) {
    
}


function listar() {
    if (typeof (Storage) !== "undefined") {
        let produtos = localStorage.getItem("produtos");
        document.write("<h1>Lista:</h1>")
        if (produtos == null)
            document.write("<h3>Ainda não há nenhum item na Lista</h3>");
        else {
            produtos = JSON.parse(produtos);
            produtos.forEach(produto => {
                document.write("<ul>");
                document.write("<li>Nome do produto: " + produto.nome + "</li>");
                document.write("<li>Código do produto: " + produto.codigo + "</li>");
                document.write("<li>Quantidade na Lista: " + produto.unidade + "</li>");
                document.write("<li>Nome do produto: " + produto.qtidadeProduto + "</li>");
                document.write("<li>Código do produto: " + produto.txtCodBarras + "</li>");
                document.write("<li>Quantidade na Lista: " + produto.ativo + "</li>");
                document.write("</ul>");
            });
        }
    }
}
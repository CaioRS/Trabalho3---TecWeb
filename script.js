function validar(txtCodProduto, txtNomeProduto, unidade, qtidadeProduto, txtCodBarras, ativo) {
    let codigo = document.getElementById(txtCodProduto).value;
    let nome = document.getElementById(txtNomeProduto).value;
    let un = document.getElementById(unidade).value;
    let qtd = document.getElementById(qtidadeProduto).value;
    let qr = document.getElementById(txtCodProduto).value;
    let atv = document.getElementById(ativo).value;

    cadastrarProduto(parseInt(codigo), nome, un, parseInt(qtd), qr, atv);
}

function cadastrarProduto(codig, nome, un, qtd, qr, atv) {
    let novoProduto = {
        nome: nome,
        codigo: codig,
        unidade: un,
        qtidadeProduto: qtd,
        txtCodBarras: qr,
        ativo: atv
    };
    let Storage = localStorage;


    if (typeof (Storage) !== "undefined") {
        let produtos = localStorage.getItem("listaProdutos");
        if (produtos == null) produtos = []; // Nenhum produto ainda foi cadastrado
        else produtos = JSON.parse(produtos);
        produtos.push(novoProduto); // Adiciona um novo produto
        localStorage.setItem("listaProdutos", JSON.stringify(produtos));
        alert("Foram cadastradas com sucesso " + qtd + " unidades do produto " + nome + "!");
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
function limpar() {
    localStorage.clear();
    location.reload();
}

function coletar() {
    let produtos = JSON.parse(localStorage.getItem("listaProdutos"));
    let aColetar = [];
    var aux2 = 0;
    if (typeof (Storage) !== "undefined") {
        produtos.forEach(produto => {
            var qtdc = parseInt(document.getElementById(("qtdC" + aux2)).value);
            if (qtdc != 0) {
                let carrola = {
                    cod: produto.codigo,
                    qtd: qtdc
                };
                aColetar.push(carrola);
            }
            aux2++;
        });
        localStorage.setItem("listaCompras", JSON.stringify(aColetar));
        atualizarEstoque();
    }
}

function atualizarEstoque() {
    let produtos = JSON.parse(localStorage.getItem("listaProdutos"));
    let coletas = JSON.parse(localStorage.getItem("listaCompras"));
    produtos.forEach(function(produto,i) {
        coletas.forEach(coleta =>{
            if ((produto.codigo == coleta.cod) && (produto.qtidadeProduto <= coleta.qtd)) {
                var ctrl = "prod"+i;
                document.getElementById(ctrl).style.textDecoration = "line-through";
            }
        });
    });
}

function listar() {
    if (typeof (Storage) !== "undefined") {
        let produtos = localStorage.getItem("listaProdutos");
        document.write("<h1>Lista:</h1>")
        if (produtos == null)
            document.write("<h3>Ainda não há nenhum item na Lista</h3>");
        else {
            produtos = JSON.parse(produtos);
            var aux = 0;

            produtos.forEach(produto => {
                if (produto.ativo == "on") {
                    document.write("<div id='prod"+ aux + "'>");
                    document.write("<ul>");
                    document.write("<li>Código do produto: " + produto.codigo + "</li>");
                    document.write("<li>Nome do produto: " + produto.nome + "</li>");
                    document.write("<li>Unidade " + produto.unidade + "</li>");
                    document.write("<li>Quantidade na lista: " + produto.qtidadeProduto + "</li>");
                    document.write("<li>Quantidade Comprada:<input id='qtdC" + aux + "' type='number'><li>");
                    document.write("<li>Código do produto: " + produto.txtCodBarras + "</li>");
                    document.write("</ul>");
                    document.write("</div>");
                    aux++;
                }
            });
        }
    }
}
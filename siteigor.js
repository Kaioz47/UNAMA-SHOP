let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
let total = 0;

// Função para iniciar animação de transição
function iniciarTransicao() {
    const transicao = document.createElement('div');
    transicao.classList.add('transicao');
    transicao.innerHTML = '<div class="bolinha"></div><div class="bolinha"></div><div class="bolinha"></div>';
    document.body.appendChild(transicao);

    setTimeout(() => {
        transicao.classList.add('sumir');
        setTimeout(() => transicao.remove(), 500);
    }, 1000);
}

// Aplica a animação ao mudar de página
document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const href = e.target.href;
        iniciarTransicao();
        setTimeout(() => window.location.href = href, 800);
    });
});

function adicionarAoCarrinho(nome, preco) {
    const item = carrinho.find(item => item.nome === nome);
    if (item) {
        item.quantidade += 1;
    } else {
        carrinho.push({ nome, preco, quantidade: 1 });
    }
    salvarCarrinho();
    atualizarCarrinho();
}

function removerDoCarrinho(index) {
    carrinho.splice(index, 1);
    salvarCarrinho();
    atualizarCarrinho();
}

function salvarCarrinho() {
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
}

function atualizarCarrinho() {
    const listaCarrinho = document.getElementById("itens-carrinho");
    const totalElemento = document.getElementById("total");

    if (!listaCarrinho || !totalElemento) return; // Evita erros se elementos não estiverem na página

    listaCarrinho.innerHTML = "";
    total = 0;

    carrinho.forEach((item, index) => {
        let li = document.createElement("li");
        li.innerHTML = `${item.nome} (x${item.quantidade}) - R$ ${(item.preco * item.quantidade).toFixed(2)} <button onclick="removerDoCarrinho(${index})">Remover</button>`;
        listaCarrinho.appendChild(li);
        total += item.preco * item.quantidade;
    });

    totalElemento.innerText = `Total: R$ ${total.toFixed(2)}`;
}

// Carregar produtos em seções
function carregarProdutos(secao, produtos) {
    const container = document.querySelector(`#${secao} .carrossel`);
    if (!container) return;

    produtos.forEach(produto => {
        const divProduto = document.createElement('div');
        divProduto.classList.add('produto');

        let precoFinal = produto.desconto ? (produto.preco * (1 - produto.desconto / 100)).toFixed(2) : produto.preco.toFixed(2);
        let destaque = produto.desconto ? `<span class="desconto">-${produto.desconto}%</span>` : "";
        let estoqueInfo = `<p class="estoque">Estoque: ${produto.estoque}</p>`;

        divProduto.innerHTML = `
            <h3>${produto.nome}</h3>
            ${destaque}
            <p>De: R$ ${produto.preco.toFixed(2)}<br><strong>Por: R$ ${precoFinal}</strong></p>
            ${estoqueInfo}
            <button ${produto.estoque <= 0 ? "disabled" : ""} onclick="adicionarAoCarrinho('${produto.nome}', ${parseFloat(precoFinal)})">
                Adicionar ao Carrinho
            </button>
        `;

        container.appendChild(divProduto);
    });
}

// Efeitos de destaque nos produtos
function aplicarEfeitosProdutos() {
    document.querySelectorAll('.produto').forEach(produto => {
        produto.addEventListener('mouseenter', () => {
            produto.style.transform = 'scale(1.05)';
            produto.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.3)';
        });
        produto.addEventListener('mouseleave', () => {
            produto.style.transform = 'scale(1)';
            produto.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
        });
    });
}

// Carregamento da página do carrinho
document.addEventListener("DOMContentLoaded", function () {
    const btnFinalizar = document.getElementById("btnfinalizar");
    const itensCarrinho = document.getElementById("itens-carrinho");
    const totalElement = document.getElementById("total");

    function carregarCarrinho() {
        const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
        let total = 0;
        if (!itensCarrinho || !totalElement) return;

        itensCarrinho.innerHTML = "";

        carrinho.forEach((item, index) => {
            const li = document.createElement("li");
            li.innerHTML = `
                ${item.nome} - R$ ${item.preco.toFixed(2)} 
                <strong> (x${item.quantidade}) </strong>
                <button class="remover-item" data-index="${index}">Remover</button>
            `;
            itensCarrinho.appendChild(li);
            total += item.preco * item.quantidade;
        });

        totalElement.textContent = `Total: R$ ${total.toFixed(2)}`;

        document.querySelectorAll(".remover-item").forEach(button => {
            button.addEventListener("click", function () {
                removerItemCarrinho(this.getAttribute("data-index"));
            });
        });
    }

    function removerItemCarrinho(index) {
        let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
        carrinho.splice(index, 1);
        localStorage.setItem("carrinho", JSON.stringify(carrinho));
        carregarCarrinho();
    }

    if (btnFinalizar) {
        btnFinalizar.addEventListener("click", function (event) {
            event.preventDefault();
            if (itensCarrinho.children.length === 0) {
                alert("Seu carrinho está vazio! Adicione itens antes de finalizar a compra.");
            } else {
                window.location.href = "finalizarcompra.html";
            }
        });
    }

    carregarCarrinho();
});

// Página de pagamento
document.addEventListener("DOMContentLoaded", function () {
    const resumoCarrinho = document.getElementById("resumo-carrinho");
    const totalPagamento = document.getElementById("total-pagamento");
    const btnPagar = document.getElementById("btn-pagar");
    const metodoPagamento = document.getElementById("metodo-pagamento");
    const dadosCartao = document.getElementById("dados-cartao");
    const dadosPix = document.getElementById("dados-pix");

    function carregarResumo() {
        const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
        let total = 0;
        if (!resumoCarrinho || !totalPagamento) return;

        resumoCarrinho.innerHTML = "";
        carrinho.forEach(item => {
            const li = document.createElement("li");
            li.textContent = `${item.nome} - R$ ${item.preco.toFixed(2)} (x${item.quantidade})`;
            resumoCarrinho.appendChild(li);
            total += item.preco * item.quantidade;
        });

        totalPagamento.textContent = `Total: R$ ${total.toFixed(2)}`;
    }

    if (metodoPagamento) {
        metodoPagamento.addEventListener("change", function () {
            if (metodoPagamento.value === "cartao") {
                dadosCartao.style.display = "block";
                dadosPix.style.display = "none";
            } else if (metodoPagamento.value === "pix") {
                dadosPix.style.display = "block";
                dadosCartao.style.display = "none";
            } else {
                dadosCartao.style.display = "none";
                dadosPix.style.display = "none";
            }
        });
    }

    if (btnPagar) {
        btnPagar.addEventListener("click", function () {
            if (metodoPagamento.value === "cartao") {
                const numeroCartao = document.getElementById("numero-cartao").value.trim();
                const nomeCartao = document.getElementById("nome-cartao").value.trim();
                const validadeCartao = document.getElementById("validade-cartao").value.trim();
                const cvvCartao = document.getElementById("cvv-cartao").value.trim();

                if (!numeroCartao || !nomeCartao || !validadeCartao || !cvvCartao) {
                    alert("Preencha todos os campos do cartão!");
                    return;
                }

                if (!/^\d{4} \d{4} \d{4} \d{4}$/.test(numeroCartao)) {
                    alert("Número do cartão inválido! Use o formato: 0000 0000 0000 0000");
                    return;
                }

                if (!/^\d{2}\/\d{2}$/.test(validadeCartao)) {
                    alert("Data de validade inválida! Use o formato MM/AA.");
                    return;
                }

                if (!/^\d{3}$/.test(cvvCartao)) {
                    alert("CVV inválido! Deve ter 3 números.");
                    return;
                }
            }

            if (metodoPagamento.value === "pix") {
                const nomePix = document.getElementById("nome-pix").value.trim();
                const cpfPix = document.getElementById("cpf-pix").value.trim();

                if (!nomePix || !cpfPix) {
                    alert("Preencha todos os campos para o pagamento via PIX!");
                    return;
                }

                if (!/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpfPix)) {
                    alert("CPF inválido! Use o formato: 000.000.000-00");
                    return;
                }
            }

            alert("Pagamento realizado com sucesso! Obrigado por comprar conosco.");
            localStorage.removeItem("carrinho");
            window.location.href = "siteigor.html";
        });
    }

    carregarResumo();
});

window.onload = () => {
    iniciarTransicao();
    atualizarCarrinho();
    carregarProdutos('promocoes', produtosPromocoes);
    carregarProdutos('mais-vendidos', produtosMaisVendidos);
    setTimeout(aplicarEfeitosProdutos, 500);





    
};

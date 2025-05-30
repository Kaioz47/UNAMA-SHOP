# 🛒 UNAMA SHOP

UNAMA SHOP é um projeto de site de comércio eletrônico focado na venda de eletrodomésticos e eletrônicos. Este site foi desenvolvido com tecnologias de front-end como HTML, CSS e JavaScript, sem uso de back-end.

## 📄 Funcionalidades do Site

- Página inicial com carrossel de imagens promocionais
- Sistema de login e cadastro (simulado no front-end)
- Produtos com destaque e seções por categoria
- Carrinho de compras com armazenamento local
- Botão flutuante do carrinho
- Design responsivo

## 👨‍💻 Desenvolvedores do Projeto UNAMA SHOP

- **Kaio Márcio** – Desenvolvedor Front-End  
  Responsável pela construção das páginas HTML, estilização com CSS, animações, carrossel, carrinho de compras, e interações com JavaScript.

- **Anthony Cardoso** – Designer de Interface (UI/UX)  
  Responsável pela aparência do site, escolha de cores, responsividade e organização visual para melhor experiência do usuário.

- **Gabryela Gonçalves** – Organizadora de Conteúdo  
  Responsável pela criação e organização dos textos visíveis no site, como descrições de produtos, títulos de seções e informações das promoções.

- **Rafael Rocha** – Responsável pela Documentação do Projeto  
  Responsável por registrar todo o desenvolvimento do site, estrutura dos arquivos, funções do código e instruções de uso e manutenção.

## 📁 Tecnologias Utilizadas

- HTML
- CSS
- JavaScript 

---

© 2025 UNAMA SHOP. Todos os direitos reservados.



## Exemplos de Código

A seguir estão alguns trechos representativos do projeto:

### HTML - Carrossel de Produtos
```html
<!-- Exemplo de Carrossel de Produtos -->
<div class="carousel">
  <div class="slide active">
    <img src="img/produto1.jpg" alt="Produto 1">
  </div>
  <div class="slide">
    <img src="img/produto2.jpg" alt="Produto 2">
  </div>
</div>
```

### CSS - Botão Flutuante do Carrinho
```css
/* Estilização do botão flutuante do carrinho */
#cart-float {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #ff6600;
  color: white;
  padding: 15px;
  border-radius: 50%;
  cursor: pointer;
}
```

### JavaScript - Adicionar ao Carrinho
```javascript
// Função para adicionar produto ao carrinho
function adicionarAoCarrinho(idProduto) {
  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  carrinho.push(idProduto);
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  atualizarIconeCarrinho();
}
```



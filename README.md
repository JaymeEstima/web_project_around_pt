# Around The U.S.

Este é um projeto desenvolvido durante o curso de Engenharia de Software da TripleTen.

O projeto é uma página onde podemos adicionar fotos de lugares, curtir e excluir cartões, além de editar as informações do perfil. Os dados ficam salvos em um servidor.

## Funcionalidades

* Carregar o perfil e os cartões do servidor
* Editar o nome e a descrição do perfil
* Alterar a foto do perfil
* Adicionar novos cartões
* Curtir e descurtir os cartões
* Excluir cartões, com uma janela de confirmação
* Abrir as imagens em tamanho maior
* Fechar as janelas usando o botão, clicando fora delas ou apertando `Esc`
* Validar os campos dos formulários
* Mostrar "Salvando..." no botão enquanto os dados são enviados ao servidor

## Tecnologias utilizadas

* HTML
* CSS
* JavaScript
* Classes JavaScript
* Módulos JavaScript
* Programação orientada a objetos
* Herança entre classes
* Requisições a uma API (fetch e Promises)
* Flexbox
* Grid
* Design responsivo
* Metodologia BEM

Neste projeto também aprendi a organizar o código JavaScript usando arquivos separados, classes e módulos, e a conectar a página a um servidor.

## Estrutura do projeto

Os arquivos ficam dentro da pasta `src`. As classes ficam na pasta `src/components`, e cada uma cuida de uma tarefa:

* `Api.js`: faz as requisições ao servidor (perfil, cartões, curtidas e foto)
* `Card.js`: cria um cartão
* `FormValidator.js`: valida os campos de um formulário
* `Section.js`: coloca uma lista de elementos na página
* `Popup.js`: abre e fecha uma janela (popup)
* `PopupWithImage.js`: popup que mostra a imagem em tamanho maior
* `PopupWithForms.js`: popup com formulário (contém a classe `PopupWithForm`)
* `PopupWithConfirmation.js`: popup que pede confirmação antes de excluir um cartão
* `UserInfo.js`: lê e atualiza o nome e a descrição do perfil

O arquivo `src/pages/index.js` cria as instâncias das classes e liga tudo.

## Sobre o projeto

Os cartões e as informações do perfil são carregados de um servidor. As alterações feitas na página (editar o perfil, criar ou excluir um cartão, curtir e trocar a foto) também são enviadas para o servidor.

Também foi criada uma validação para os formulários, mostrando mensagens de erro quando os campos não são preenchidos corretamente.

O projeto foi desenvolvido seguindo o layout disponibilizado no Figma e funciona em diferentes tamanhos de tela.

## Como abrir o projeto

O projeto utiliza módulos JavaScript, então é necessário abrir através de um servidor local.

No VS Code, pode ser utilizado o **Live Server** para executar o projeto. Abra o arquivo `src/index.html` com ele.

### Projeto publicado

[Ver o projeto no GitHub Pages](https://jaymeestima.github.io/web_project_around_pt/)
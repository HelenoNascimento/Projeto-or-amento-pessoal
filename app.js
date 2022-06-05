class Despesa{
    constructor(ano, mes, dia, tipo, descricao, valor){
        this.ano = ano;
        this.mes = mes;
        this.dia = dia;
        this.tipo = tipo;
        this.descricao = descricao;
        this.valor = valor;
    }
    validarDados(){
        for(let i in this){
            if(this[i] == undefined || this[i] =='' || this[i]== null){
                return false
            }
         
        }
        return true;
    }

}
class Bd{

    constructor(){
        let id = localStorage.getItem('id');
        if(id === null){
            localStorage.setItem('id',0)
        }
    }

    getProximoId(){
        let proximoId = localStorage.getItem('id');
        return parseInt(proximoId)+1;
    }
    gravar(d){
       let id = this.getProximoId();
        localStorage.setItem(id,JSON.stringify(d))
        
        localStorage.setItem(id,JSON.stringify(d))
        localStorage.setItem('id',id);
    }
    /*************************LISTAR  DADOS DO LOCAL STORAGE *********/
    recuperarTodosRegistros(){

        //aray de despesas
        let despesas = Array();
        let id = localStorage.getItem('id');

        for(let i = 1; i<=id; i++){
            let despesa = JSON.parse(localStorage.getItem(i));
            console.log(i, despesa);

            //teste existe a possibilidade have indice que foram pulas ou removidos

            if(despesa === null){
                continue
            }
            despesa.id = i;
            despesas.push(despesa);
        }
        return(despesas);
    }

    /*************************REMOVER DADOS DO LOCAL STORAGE *********/
    remover(id){
        localStorage.removeItem(id);

       
      
    }

    /*************************PESQUISAR DADOS DO LOCAL STORAGE *********/
    pesquisar(despesa){
        let despesasFiltradas = Array();
        despesasFiltradas =  this.recuperarTodosRegistros();

        //ano
        if(despesa.ano != ''){
            despesasFiltradas =  despesasFiltradas.filter(d => d.ano == despesa.ano);
        }
    
        //mes
        if(despesa.mes != ''){
           console.log( despesasFiltradas =  despesasFiltradas.filter(d => d.mes == despesa.mes));
           despesasFiltradas =  despesasFiltradas.filter(d => d.mes == despesa.mes)
        }
        
        //dia
        if(despesa.dia != ''){
            console.log( despesasFiltradas =  despesasFiltradas.filter(d => d.dia == despesa.dia));
            despesasFiltradas =  despesasFiltradas.filter(d => d.dia == despesa.dia)
         }
        //tipo
        if(despesa.tipo != ''){
            console.log( despesasFiltradas =  despesasFiltradas.filter(d => d.tipo == despesa.tipo));
            despesasFiltradas =  despesasFiltradas.filter(d => d.tipo == despesa.tipo)
         }
        //descricao
        if(despesa.descricao != ''){
           console.log( despesasFiltradas =  despesasFiltradas.filter(d => d.descricao == despesa.descricao));
           despesasFiltradas =  despesasFiltradas.filter(d => d.descricao == despesa.descricao)
       }
       return despesasFiltradas;
    }

}

let bd = new Bd();

function cadastrarDespesa(){

    let ano = document.getElementById('ano');
    let mes = document.getElementById('mes');
    let dia = document.getElementById('dia');
    let tipo =  document.getElementById('tipo');
    let descricao =  document.getElementById('descricao');
    let valor =  document.getElementById('valor');

    let despesa = new Despesa(
        ano.value, 
        mes.value, 
        dia.value, 
        tipo.value,
         descricao.value,
          valor.value
    )
    if(despesa.validarDados()){


        document.getElementById('modal_titulo').innerHTML = 'Registro inserido com sucesso!!';
        document.getElementById('modal_titulo_div').className = 'modal-header text-success';
        document.getElementById('modal_conteudo').innerHTML = 'Existem campos obrigatorios que nao foram preenchidos'
        document.getElementById('modal_btn').innerHTML = 'Voltar'
        document.getElementById('modal_btn').className = 'btn btn-success'
        
        $('#registraDespesa').modal('show')
       bd.gravar(despesa);
       console.log('Dados validos')
            ano.value ='';
            mes.value = '';
            dia.value = '';;
            tipo.value = '';
            descricao.value = ''; 
            valor.value = '';
       
    }else{
        document.getElementById('modal_titulo').innerHTML = 'Erro na inclusao do registro'
        document.getElementById('modal_titulo_div').className = 'modal-header text-danger';
        document.getElementById('modal_conteudo').innerHTML = 'Verifique se todos os conteudos foram preenchidos';
        document.getElementById('modal_btn').innerHTML = 'Voltar e corrigir'
        document.getElementById('modal_btn').className = 'btn btn-danger'
        $('#registraDespesa').modal('show')
        console.log('Dados invalidos')
       
    }
    
    

}




function carregaListaDespesas(despesas = Array(), filtro = false){
    if(despesas.length == 0 && filtro == false){
        console.log('teste '+despesas)
        despesas = bd.recuperarTodosRegistros();
    }

    var listaDespesas = document.getElementById('listaDespesas');
    listaDespesas.innerHTML = '';


                // percorrer o array despesas, listando cada despesa de forma dinamica
   despesas.forEach(function(d){
            switch(d.tipo){
                case '1': d.tipo = 'Alimentação'
                break
                case '2': d.tipo = 'Educação'
                break
                case '3': d.tipo = 'Lazer'
                break
                case '4': d.tipo = 'Saude'
                break
                case '5': d.tipo = 'Transporte'
                break
            }
      
            //criando a linha (tr)
            let linha = listaDespesas.insertRow();

            //criar as colunas (td)
            linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`
            linha.insertCell(1).innerHTML = d.tipo;
            linha.insertCell(2).innerHTML = d.descricao;
            linha.insertCell(3).innerHTML = d.valor

            // criar o botao de exclusao
            let btn = document.createElement("button");
            btn.className = 'btn btn-danger';
            btn.innerHTML = '<i class="fas fa-times"> </i>'
            btn.id = `id_despesa_${d.id}`;

            btn.onclick = function() {
                //remove a despesa

                 // pega a string e rmeove a primeira parte
                let id = this.id.replace('id_despesa_', '');
                
                bd.remover(id);
                window.location.reload();
               
            }
            linha.insertCell(4).append(btn);      
            console.log(d)      
      })

                

}
function pesquisarDespesa(){
   let ano = document.getElementById('ano').value;
   let mes = document.getElementById('mes').value;
   let dia =  document.getElementById('dia').value;
   let tipo = document.getElementById('tipo').value;
   let descricao  = document.getElementById('descricao').value;
   let valor = document.getElementById('valor').value;

   let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor);
   let despesas = bd.pesquisar(despesa);

   this.carregaListaDespesas(despesas, true);
  
        
}
import axios from 'axios'
import { initialize, change } from 'redux-form'
import { showTabs, selectTab } from '../common/tab/tabActions'
import { toastr } from 'react-redux-toastr'
import { URL_API } from '../config'
import { handleTree } from './clientUtils';
import {
  CLIENT_FETCHED,
  CHANGE_MENU_TREEFORM,
  TREE_FETCHED
} from './actionTypes'


const INITIAL_VALUES = { treeClient: {} }
var idUser = {}
var nameUser = {}

var SetidUser = function (id) {
  idUser = id;
}

var SetnameUser = function (nome) {
  nameUser = nome;
}

export var usuario_roles = []

const initialTree = {
  "restricoes": {
    "rfaixa": null,
    "rdia": null
  },
  "encaminhamentos": {
    "efaixa": null,
    "edia": null
  },
  "transferencias": [{
    "nome": "transferencia1",
    "padrao": false,
    "numero": ""
  }],
  "versao": 0
}

export function getNumbers(data) { 
  return {
    type: CLIENT_FETCHED,
    payload: data
  }
}

export async function validaLogin(user) {
  try {
    const resp = await axios.post(`${URL_API}/clientes/validar`, user)   
    if (resp.data.status) {
      SetidUser(resp.data.id)
      localStorage.setItem('_SESSION_ID',resp.data.id)   
      SetnameUser(resp.data.nome)
    }
    return resp;
  }
  catch (e) {
    return null
  }       
}


export function getList() {
 return dispatch => {   

    if (idUser == null || idUser == '' || typeof(idUser) == "object"){
      const id_user = localStorage.getItem('_SESSION_ID')
      if (id_user != null && id_user != ''){
        SetidUser(id_user)
      }       
    }

    axios.get(`${URL_API}/numeroOrigem/porCliente/?idCliente=${idUser}`)
      .then(resp => {
        if (resp.data.resposta.status == 0) {
          SetidUser(resp.data.conteudo[0].idCliente)
          dispatch(getNumbers(resp.data.conteudo))
        } else if (resp.data.resposta.status == 404){
                SetidUser(resp.data.resposta.id)                
                dispatch(getNumbers(resp.data.conteudo))
            } else {
          toastr.error('Erro', resp.data.resposta.descricao);
        }
      })
      .catch(e => {
        toastr.error('Erro', 'Não foi possível conectar-se ao serviço')
      })
  }

}


export function initTree() {
  let tree = handleTree(initialTree)
  return {
    type: TREE_FETCHED,
    payload: tree
  }

}

export function create(values) {
  return submit(values, 'post')
}

export function saveTree(values) {

  const warnings = []

  let padraot = 0

  //validar transferencias
  for (let i = 0; i < values.transferencias.length; i++) {
    let numero = values.transferencias[i].numero;
    let padrao = values.transferencias[i].padrao;

    if(padrao)
      padraot++    

    if (!numero) {
      warnings.push({ title: 'Regeneração', message: 'informe o número da transferencia' })
    }
  }

  if(padraot == 0){
    warnings.push({ title: 'Regeneração', message: 'informe o número padrão da transferencia' })
  }

  if(padraot > 1){
    warnings.push({ title: 'Regeneração', message: 'selecione apenas um número padrão de transferencia' })
  }


  warnings.forEach(error => toastr.warning(error.title, error.message))

  if (values.encaminhamentos.efaixaToggle.ativo) {
    let efaixa = values.encaminhamentos.efaixa
    for (let i = 0; i < efaixa.length; i++) {
      if (!efaixa[i].transferencia ||
        efaixa[i].transferencia == 'Selecione' || !efaixa[i].prefixo) {
        warnings.push({
          title: 'Encaminhamento',
          message: 'Informe dados encaminhamento por Faixa'
        }
        )
      }
    }
  }




  //dia - se dia selecionado e !dia_inteiro validar transferencias
  if (values.encaminhamentos.ediaToggle.ativo) {
    let edia = values.encaminhamentos.edia
    for (let i = 0; i < edia.length; i++) {
      if (!edia[i].diaSemana || (edia[i].diaTodo && edia[i].transferencia == 'Selecione')) {
        warnings.push({
          title: 'Encaminhamento',
          message: 'Informe dados de Encaminhamento dia'
        }
        )
      }
      if (!edia[i].diaTodo && edia[i].intervalos) {

        for (let j = 0; j < edia[i].intervalos.length; j++) {
          if (!edia[i].intervalos[j].horaInicio ||
            !edia[i].intervalos[j].horaFim ||
            !edia[i].intervalos[j].transferencia ||
            edia[i].intervalos[j].transferencia == 'Selecione') {
            warnings.push({
              title: 'Encaminhamento',
              message: 'Informe dados de Encaminhamento dia'
            }
            )
          }
        }
      }
    }
  }

  //########################################
  // ################### restricao 
  //########################################

  //restricao Faixa Númerica

  if (values.restricoes.rfaixa.ativo) {
    let rfaixa = values.restricoes.rfaixa.faixas
    for (let i = 0; i < rfaixa.length; i++) {
      if (!rfaixa[i].prefixo) {
        warnings.push({
          title: 'Restrições',
          message: 'Informe dados restrição por Faixa'
        }
        )
      }
    }
  }

   //restricaço dia da semana
   let rdia = values.restricoes.rdia;

   if (rdia.ativo) {
 
     for (let i = 0; i < rdia.dias.length; i++) {
       if (!rdia.dias[i].diaSemana || rdia.dias[i].diaSemana == 'Selecione') {
         warnings.push({
           title: 'Restrições',
           message: 'Informe dados de restrição dia da semana'
         }
         )
       }
       if (!rdia.dias[i].diaTodo && rdia.dias[i].intervalos) {
 
         for (let j = 0; j < rdia.dias[i].intervalos.length; j++) {
           if (!rdia.dias[i].intervalos[j].horaInicio ||
             !rdia.dias[i].intervalos[j].horaFim) {
             warnings.push({
               title: 'Restrições',
               message: 'Informe dados de restrição dia da semana'
             }
             )
           }
         }
       }
     }
   } 


  warnings.forEach(error => toastr.warning(error.title, error.message))

  let cloneTree = JSON.parse(JSON.stringify(values));

  // encaminhamentos

  if (warnings.length == 0) {    
    if (!values.encaminhamentos.ediaToggle.ativo)
      cloneTree.encaminhamentos.edia = null;
    if (!values.encaminhamentos.efaixaToggle.ativo)
      cloneTree.encaminhamentos.efaixa = null;

    // Restrição
    if(!values.restricoes.rfaixa.ativo)
      cloneTree.restricoes.rfaixa = null;

    if(!values.restricoes.rdia.ativo)
      cloneTree.restricoes.rdia = null;
  }

  axios.defaults.headers.common['Content-Type'] = 'application/json'


  let { id, idArvore, ...posTree } = cloneTree 

  //####################cloneTree## 
  if (warnings.length == 0) {

    
    delete posTree.encaminhamentos.ediaToggle
    delete posTree.encaminhamentos.efaixaToggle

    return dispatch => {

      axios.post(`${URL_API}/arvores`, posTree)
        .then(resp => {
          toastr.success('Sucesso', 'Operação Realizada com sucesso.')
          dispatch(init())
        })
        .catch(e => {

          toastr.error('Erro', 'Não foi possível conectar-se ao serviço')

        })

    }  
  }
}


export function update(values) {
  return submit(values, 'put')
}

export function remove(values) {
  return del(values)
}

function submit(values, method) {

  if (values.status == "")
    values.status = true

  axios.defaults.headers.common['Content-Type'] = 'application/json'

  return dispatch => {
    let newValue = null

    if (method == 'post') {
      newValue = { ...values, idCliente: idUser, idArvore: null }
    } else {
      newValue = values
    }

    const { id, treeClient, ...rest } = newValue;
    const ident = id ? id : ''

    axios[method](`${URL_API}/numeroOrigem/${ident}`, rest)
      .then(resp => {
        if (resp.data.resposta.status == 0) {
          toastr.success('Sucesso', 'Operação Realizada com sucesso.')
          dispatch(init())
        } else {
          toastr.error('Erro', resp.data.resposta.descricao);

        }
      })
      .catch(e => {
        toastr.error('Erro', 'Não foi possível conectar-se ao serviço')
        toastr.error(e)

      })
  }
}

function del(values) {

  return dispatch => {
    const id = values.id ? values.id : ''
    axios({
      method: 'delete',
      url: `${URL_API}/numeroOrigem/${id}`,
      data: values
    }).then(resp => {
      toastr.success('Sucesso', 'Operação Realizada com sucesso.')
      dispatch(init())
    }).catch(e => {
      toastr.error('Erro', 'Não foi possível conectar-se ao serviço')
      toastr.error(e)

    })

  }

}

export function changeFormField(form, field, value) {
  return change(form, field, value)
}

export function showUpdate(client) {
  return [
    showTabs('tabUpdate'),
    selectTab('tabUpdate'),
    initialize('clientForm', client)
  ]
}

export function showDelete(client) {
  return [
    showTabs('tabDelete'),
    selectTab('tabDelete'),
    initialize('clientForm', client)
  ]
}

export function createTree(cliente) {

  if (cliente.idArvore != null) {
    return tree(cliente)
  }
  else {
    return newTree(cliente)
  }
}

export function newTree(cliente) {

  initialTree.id = cliente.id
  initialTree.idCliente = cliente.idCliente
  initialTree.idArvore = null
  initialTree.idNumeroOrigem = cliente.id

  let tree = handleTree(initialTree)

  initialTree.encaminhamentos.ediaToggle.ativo = false
  initialTree.encaminhamentos.efaixaToggle.ativo = false

  initialTree.restricoes.rfaixa.ativo = false
  initialTree.restricoes.rdia.ativo = false
  

  return dispatch => {
    dispatch([
      showTabs('tabTree'),
      selectTab('tabTree'),
      menuTreeForm('transfer'),
      initialize('treeForm', tree),
    ])
  }
}

export function tree(data) {

  let idArvore = data.idArvore

  return dispatch => {
    axios.get(`${URL_API}/arvores/${idArvore}`)
      .then(resp => {
        
        if (resp.data.resposta.status == 0) {
          
        
          let treeNew = handleTree(resp.data.conteudo)    

          dispatch([
            showTabs('tabTree'),
            selectTab('tabTree'),
            menuTreeForm('transfer'),
            initialize('treeForm', treeNew),
          ])
        }
      }).catch(e => {
        toastr.error('Erro', 'Não foi possível conectar-se ao serviço')
      })
  }
}


export function createMenu(list) {
  for (var i in list) {
    if (!list[i].menu) {
      list[i] = { ...list[i], menu: { opcoes: [{ numero: '', tipo: 'audio' }] } }
    }
  }
  return list;
}

export function menuTreeForm(menu) {

  return {
    type: CHANGE_MENU_TREEFORM,
    payload: menu
  }
}

export function init() {
  return [
    showTabs('tabList', 'tabCreate', 'tabTree'),
    selectTab('tabList'),
    getList(), //numeros
    initTree(), //arvore instanciada vazia
    initialize('clientForm', INITIAL_VALUES),
    initialize('treeForm', initialTree)
  ]
}


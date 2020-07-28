export function convertNumber(listNumber) {
    let list = []
    listNumber.forEach(elem => list.push(elem.numero))
    return list;
}


export function validateMenu(menu, warnings) {

    if (!menu.audio || !menu.audio.id)
        warnings.push({ title: 'URA', message: 'Informe áudio do menu' })

    let options = menu.opcoes;
    for (let i = 0; i < options.length; i++) {
        if (!options[i].numero)
            warnings.push({ title: 'URA', message: 'Informe o número da opção' })
        if (options[i].tipo == 'audio') {
            if (!options[i].audio || !options[i].audio.id)
                warnings.push({ title: 'URA', message: 'Informe áudio de opção da URA' })
        }
        if (options[i].tipo == 'transferencia') {
            if (!options[i].transferencia || options[i].transferencia == 'Selecione')
                warnings.push({ title: 'URA', message: 'Informe transferência de opção da URA' })
        }
        if (options[i].tipo == 'menu') {
            warnings = validateMenu(options[i].menu, warnings);
        }
    }
    return warnings;
}

export function orderTransfer(list) {
    for (let i = 0; i < list.length; i++) {
        if (list[i].numeros) {
            for (let j = 0; j < list[i].numeros.length; j++) {
                list[i].numeros[j].ordem = (j + 1)
            }
        }
    }
    return list;
}


export function handleTree(tree) {
    //restricões
    let restrictions = tree.restricoes; 
    
    if (!restrictions.rfaixa) {     
        restrictions.rfaixa = { faixas : [{}] }
        restrictions.rfaixa.ativo = false
    } else
        restrictions.rfaixa.ativo = true

    if (!restrictions.rdia) {
        restrictions.rdia = {
            dias: [{recorrente: false, diaTodo: false, intervalos:  [{}] }]            
        }
        restrictions.rdia.ativo = false
    } else
        restrictions.rdia.ativo = true

    //encaminhamentos
    let route = tree.encaminhamentos;

    route.efaixaToggle = { ativo: route.efaixa ? true : false }
    if (!route.efaixa) {
        route.efaixa = [{}]
    }

    route.ediaToggle = { ativo: route.edia ? true : false }
    if (!route.edia) {
        route.edia = [{ diaTodo: false, recorrente: false, intervalos: [{}] }]
    }

    //trasferencias 
    let transferencias = tree.transferencias;
    if (!transferencias) {
        transferencias = [{ nome: 'transferencia1', numero: [''], padrao: false }]
    }
   
    return tree;
}

export function convertRestrictionNumber(list) {
    return list.map((item) => (
        { numero: item }
    ))
}

export function convertRestrictionPrefixoBack(list) {

    return list.map((item) => (
         item.prefixo 
    ))
}

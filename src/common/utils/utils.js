import React from "react";

const range = len => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const newPerson = () => {
  const statusChance = Math.random();
  return {
    firstName: 'Carlos',
    lastName: 'Silva',
    age: Math.floor(Math.random() * 30),
    visits: Math.floor(Math.random() * 100),
    progress: Math.floor(Math.random() * 100),
    status:
      statusChance > 0.66
        ? "relationship"
        : statusChance > 0.33 ? "complicated" : "single"
  };
};

export function makeData(len = 5553) {
  return range(len).map(d => {
    return {
      ...newPerson(),
      children: range(10).map(newPerson)
    };
  });
}

export const Logo = () =>
  <div style={{ margin: '1rem auto', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
    For more examples, visit {''}
    <br />
    <a href="https://github.com/react-tools/react-table" target="_blank">
      <img
        src="https://github.com/react-tools/media/raw/master/logo-react-table.png"
        style={{ width: `150px`, margin: ".5em auto .3em" }}
      />
    </a>
  </div>;

export const Tips = () =>
  <div style={{ textAlign: "center" }}>
    <em>Tip: Hold shift when sorting to multi-sort!</em>
  </div>;


export const language_table = {
  // Text
  previousText: 'Anterior',
  nextText: 'Proximo',
  loadingText: 'Carregando...',
  noDataText: 'Não há registros',
  pageText: 'Pagina',
  ofText: 'de',
  rowsText: 'Registros',
}

export const customStylesModal = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.75)'
  },
  content: {
    position: 'absolute',
    top: '10%',
    left: '25%',
    right: '7%',

    bottom: '10%',
    border: '1px solid #ccc',
    background: '#fff',
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch',
    borderRadius: '4px',
    outline: 'none',
    padding: '20px',


  }
}


export const diaSemana = [
  {
    value: 'DOMINGO',
    label: 'Domingo'
  },
  {
    value: 'SEGUNDA',
    label: 'Segunda'
  }, {
    value: 'TERCA',
    label: 'Terça'
  }, {
    value: 'QUARTA',
    label: 'Quarta'
  }, {
    value: 'QUINTA',
    label: 'Quinta'
  }, {
    value: 'SEXTA',
    label: 'Sexta'
  }, {
    value: 'SABADO',
    label: 'Sábado'
  }

];

export const listTypeTransfer = [
  {
    value: 'SIMPLES',
    label: 'Simples'
  },
  {
    value: 'FILA',
    label: 'Atendimento sequêncial'
  },
  {
    value: 'PERCENTUAL',
    label: 'Distribuição percentual'
  },
  {
    value: 'TRANSBORDO',
    label: 'Transbordo (NR,LO)'
  },
  {
    value: 'AUDIO',
    label: 'Aúdio de bloqueio'
  }
];


export const switchStyle = {
  onColor:"#86d3ff",
  onHandleColor:"#2693e6",
  handleDiameter:20,
  uncheckedIcon:false,
  checkedIcon:false,
  boxShadow:"0px 1px 5px rgba(0, 0, 0, 0.6)",
  activeBoxShadow:"0px 0px 1px 10px rgba(0, 0, 0, 0.2)",
  height:10,
  width:32,
  className:"react-switch",
}


export const helpTooltip = {
  tipoTransferencia: '- Simples: É vinculado só um número;<br/>- Atendimento sequencial: Os números são chamados na ordem especificada em caso de ocupado; <br/>- Transbordo (NR, LO): Os números são chamados na ordem especificada caso haja qualquer falha de conexão;<br/>- Distribuição percentual: As chamadas são balanceadas nas proporções especificadas para cada número; <br/>- Áudio de bloqueio: Todas as chamadas não direcionadas em "encaminhamento" são bloqueadas com o áudio definido.',
  numeroTransferencia: 'Preencha o número no formato CN + N8 (ex: 3433001234). O CSP 12 e conversões locais serão feitos automaticamente.',
  efixoddd : "asdfasdfsadfas",
  ecelular : "asdfasdfsadfas",
  rcategoria: 'Restringe chamadas de origem em telefones públicos ou<br/> assinantes pré-pagos',
  rfixoddd: 'Restringe chamadas de origem fixa em CNs específicos.<br/>Para configurar  bloqueio para origem celular por CN use o componente <br/>"Celular por CN".',
  rcelular: 'Restringe chamadas de origem celular em CNs específicos.<br/>Para configurar bloqueio para origem fixa por CN use o componente "Fixo<br/> por CN". A opção "bloqueio total" restringe todas as chamadas móveis.',
  rdata: 'Restringe chamadas originadas em datas específicas. Dentro das datas<br/>selecionadas podem ser definidos intervalos onde será aplicada<br/> a restrição ou se valerá o dia todo.',
  rdia: 'Restringe chamadas originadas em dias específicos na semana, como fins<br/>de semana. Para os dias selecionados podem ser definidos<br/> intervalos onde será aplicada a restrição ou se valerá o dia todo.',
  rfixocnl: 'Restringe chamadas de origem fixa em CNLs de cidades específicas.<br/>Esse tipo de bloqueio não se aplica a celulares. Para bloquear<br/> áreas específicas para origem móvel use a restrição "celular por CN".',
  rsenha: 'Solicita uma senha para que a chamada prossiga. Só é chamada uma das<br/>ações de transferência se o código for digitado corretamente.<br/> Para alterar somente a senha pode ser usado o botão "SALVAR SENHA".',
  audioSolicitacao: 'O áudio que é tocado para solicitar a senha. É recomendável ser<br/>curto porque será repetido quando a senha for digitada <br/>incorretamente.',
  audioComparacao: 'O áudio que é tocado para informar que a senha digitada está incorreta.',
  audioBloqueio: 'O áudio que é tocado para informar que foi bloqueado por errar a senha 3 vezes',
  ecelular: 'Encaminha chamadas de origem móvel em <br/>CNs específicos para ações de transferência<br/>da aba "Regeneração"',
  efixoddd: 'Encaminha chamadas de origem fixa em<br/>CNs específicos para ações de transferência<br/>da aba "Regeneração". Para configurar<br/>encaminhamento para origem celular por<br/>CN use o componente "Celular por CN".',
  efixocnl: 'Encaminha chamadas de origem fixa em CNLs<br/>de cidades específicas para ações de<br/>transferência da aba "Regeneração". Esse tipo<br/>de bloqueio não se aplica a celulares. Para<br/>bloquear áreas específicas para origem móvel<br/>use a restrição "celular por CN".',
  edata: 'Encaminha chamadas originadas em datas<br/>específicas. Dentro das datas selecionadas<br/>podem ser definidos intervalos onde será<br/>aplicado o encaminhamento ou se valerá o dia todo.',
  edia: 'Encaminha chamadas originadas em dias específicos na<br/>semana, como fins de semana. Para os dias selecionados<br/>podem ser definidos intervalos onde será aplicado o<br/>encaminhamento ou se valerá o dia todo.',
  ura: 'Permite configurar atendimento automático com opções interativas<br/>com encaminhamentos específicos.<br/>Limitado a 9 opções de menu. Cada opção pode reproduzir um<br/>áudio específico, transferir para uma ação da aba REGENERAÇÃO<br/>específica ou acessar um sub-menu. As opções de menu não têm<br/>opções de áudios padrão.'
};
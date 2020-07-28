import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getList, showUpdate, showDelete, tree, initTree, createTree, clientEdit } from './clientActions'
import '../common/utils/table'
import { Tips, language_table } from '../common/utils/utils';

import ReactTable from 'react-table';

class ClientList extends Component {

    componentWillMount() {
        this.props.getList() //numeros
    }

    render() {  
        
        //const list = this.props.list.numeros || []
        const list = this.props.list || []
        return (
            <div>
                <ReactTable
                    {...language_table}
                    data={list}
                    //data={[{"id":21290,"idConta":401,"numero":"3432562550","descricao":"METODO TELECOMUNICACOES E COMERCIO LTDA ","idArvore":41871,"status":"ATIVO","usuario":null},{"id":32405,"idConta":401,"numero":"34998871234","descricao":"METODO TELECOMUNICACOES ","idArvore":36909,"status":"ATIVO","usuario":null},{"id":26009,"idConta":401,"numero":"16999652433","descricao":"GLOBO CLUBE DE BENEFICIOS","idArvore":29592,"status":"ATIVO","usuario":null}]}
                    filterable
                    defaultFilterMethod={(filter, row) =>
                        row[filter.id].toLowerCase().indexOf(filter.value.toLowerCase()) != -1}
                    columns={[
                        {
                            columns: [
                                {
                                    Header: 'Número',
                                    accessor: 'numero',
                                    id: 'numero'
                                }, {
                                    Header: 'Descricao',
                                    accessor: 'descricao',
                                    id: 'descricao'                                   
                                },
                                {
                                    Header: 'Status',
                                    accessor: 'status',
                                    id: 'status',
                                    width: 120,
                                    Cell: ({ value }) => (
                                        <div><span style={{
                                            color: value === 'INATIVO' ? '#ff2e00'
                                                : '#57d500',
                                            transition: 'all .3s ease'
                                        }}>
                                            &#x25cf;
                                          </span> {value}</div>),
                                    filterMethod: (filter, row) => {
                                        if (filter.value === 'all') {
                                            return true;
                                        }
                                        if (filter.value === 'true') {
                                            return row[filter.id] == 'ATIVO';
                                        }
                                        return row[filter.id] == 'INATIVO';
                                    },
                                    Filter: ({ filter, onChange }) =>
                                        <select
                                            onChange={event => onChange(event.target.value)}
                                            style={{ width: '100%' }}
                                            value={filter ? filter.value : 'all'}>
                                            <option value='all'>Selecione</option>
                                            <option value='true'>Ativo</option>
                                            <option value='false'>Inativo</option>
                                        </select>
                                }, {
                                    Header: 'Ações',
                                    width: 80,
                                    filterable:false,
                                    Cell: data => (
                                        <div>
                                            <button className='btn btn-sm btn-warning' onClick={() => this.props.showUpdate(data.original)}>
                                                <i className='fa fa-pencil'></i>
                                            </button>
                                            <button className='btn btn-sm btn-danger' onClick={() => this.props.showDelete(data.original)}>
                                                <i className='fa fa-trash-o'></i>
                                            </button>                                       
                                        </div>                                   
                                    )
                                }, {
                                    Header: 'Árvore',
                                    width: 50,
                                    filterable:false,
                                    Cell: data => (
                                        <div>                                      
                                            <button className='btn btn-sm btn-info' onClick={() => this.props.createTree(data.original)}>
                                                <i className='fa fa-code-fork'></i>
                                            </button>
                                        </div>
                                    )
                                }
                            ]
                        }
                    ]}
                    defaultPageSize={10}
                    className='-striped -highlight'
                />
            </div>
        )
    }
}

const mapStateToProps = state => ({ list: state.client.list })
const mapDispatchToProps = dispatch => bindActionCreators({ getList, initTree, showUpdate, showDelete, createTree, tree }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(ClientList)
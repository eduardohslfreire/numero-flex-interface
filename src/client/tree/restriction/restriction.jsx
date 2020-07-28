import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Grid from '../../../common/layout/grid'
import RestrictionType from './restrictionType'
import Row from '../../../common/layout/row'
import { init, menuTreeForm } from '../../clientActions'

class Restriction extends Component {

    render() {
        const { restrictions, idNumber } = this.props;
        return (
            <div>
                <Row>
                    <Grid cols='4'>
                        <RestrictionType
                            label={'Faixa Númerica'}
                            type={'rfaixa'}
                            idNumber={idNumber}
                            restriction={restrictions.rfaixa}
                            field={'restricoes.rfaixa'}
                        />
                    </Grid>
                    <Grid cols='2'></Grid>
                    <Grid cols='5'>
                        <RestrictionType
                            label={'Dia da semana/hora'}
                            type={'rdia'}
                            idNumber={idNumber}
                            restriction={restrictions.rdia}
                            field={'restricoes.rdia'} />
                    </Grid>
                </Row>


                <div className='box-footer pull-right'>
                    <button
                        type='button'
                        className='btn btn-default'
                        onClick={this.props.init}>Cancelar</button>

                    <button
                        type='button'
                        onClick={() => { this.props.menuTreeForm('route') }}
                        className={`btn btn-primary`}>
                        Próximo
                    </button>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    init,
    menuTreeForm
}, dispatch)
export default connect(null, mapDispatchToProps)(Restriction)
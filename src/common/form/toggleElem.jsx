import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { change } from 'redux-form'
import { switchStyle, helpTooltip } from '../utils/utils'
import Switch from 'react-switch';
import Tooltip from '../../common/widget/tooltip'


class ToggleElem extends Component {
    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(checked) {
        if (this.props.elem)
            this.props.change('treeForm', `${this.props.field}.ativo`, checked);
        else
            this.props.change('treeForm', `${this.props.field}`, { ativo: checked });
    }

    render() {
        const { elem } = this.props
        return (
            <label htmlFor='normal-switch'>
                <Switch
                    checked={(elem && elem.ativo) ? true : false}
                    onChange={this.handleChange}
                    {...switchStyle}
                />
                <span>{this.props.label}&nbsp;  
                {/* <Tooltip 
                    icon={'question-circle'}
                    text={this.props.tooltip}
                /> */}
                </span>

            </label>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({ change }, dispatch)
export default connect(null, mapDispatchToProps)(ToggleElem)


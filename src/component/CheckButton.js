import React, { Component } from 'react';
import classNames  from '../../node_modules/classnames'


class CheckButton extends Component {
    constructor(props) {
        super(props);

        this.state = {
            flag: "",
            viewFlag: false
        }
    }

    onClick() {
        var tmp = this.props.status.flag ? "V":"";

        this.setState({flag: tmp});
        this.setState({viewFlag: true})
    }

    render() {
        return (
        <div className={this.props.className}><p>
            <button 
                className={classNames("pure-button size", this.props.status.color)}
                onClick={()=>{this.onClick();}}
            >{this.state.viewFlag ? this.state.flag:""}</button>
        </p></div>
        );
    }
}

export default CheckButton;
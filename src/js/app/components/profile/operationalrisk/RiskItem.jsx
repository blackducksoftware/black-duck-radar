import React, { Component } from 'react';
import {
    itemBox,
    itemLabel,
} from 'css/risk/risk-item';

class RiskItem extends Component {
    createIcon() {
        console.error('CreateIcon called of RiskItem class');
    }

    getName() {
        console.error('getName called of RiskItem class');
    }

    getValue() {
        console.error('getValue called of RiskItem class');
    }

    getImageUrl(url) {
        return chrome.extension.getURL(url);
    }

    render() {
        return (
            <div className={itemBox}>
                <span className={itemLabel}>{this.getValue()}<br/>{this.getName()}</span>
                {this.createIcon()}
            </div>
        );
    }
}

export default RiskItem;

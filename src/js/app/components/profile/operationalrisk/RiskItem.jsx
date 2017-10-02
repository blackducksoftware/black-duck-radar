import React, { Component } from 'react';
import { itemBox, itemValueContainer, itemIconContainer, itemLabel, itemValue } from 'css/risk/risk-item';

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
                <div className={itemValueContainer}>
                    <div className={itemValue}>{this.getValue()}</div>
                    <div className={itemIconContainer}>
                        {this.createIcon()}
                    </div>
                </div>
                <div className={itemLabel}>{this.getName()}</div>
            </div>
        );
    }
}

export default RiskItem;

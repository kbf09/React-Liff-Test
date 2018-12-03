import React, { Component } from 'react';
import StartButton from '../component/StartButton';
import CheckButton from '../component/CheckButton';
import ShareButton from '../component/ShareButton';

const liff = window.liff;
const TOSEN = 7.4
const BUTTON_COUNT = 5;
// 0.48*0.03+0.39*0.05+0.08*0.55+0.04*0.9+0.01*1 = 0.1239
// この値はだいたい1/7.4に近いので良しとする。
const KAKURITSU = {
    BLUE  : 3,  
    GREEN : 5,  
    RED  : 50, 
    GOLD  : 92, 
    RAINBOW    : 100
}

const WARIAI = {
    BLUE: 48,
    GREEN: 39,
    RED: 8,
    GOLD: 4,
    RAINBOW: 1
}

class LiffContainer extends Component {
    constructor(props) {
        super(props);

        var checkButtons = [];
        for(var i = 0; i < BUTTON_COUNT; i++) {
            checkButtons.push({id: i , flag: false, color: ""})
        }

        this.state = {
            startFlag: false,
            checkButtons: checkButtons,
            staratButtonStatus: false,
        }
    }

    checkFraction(number) {
        // パーセント変換
        var parsent = 1/number*100;
        if (parsent >= this.getRandomInt(1, 101))
            return true
        else
            return false
    }

    checkShinrai(data) {
        var target = this.getRandomInt(1, 101)
        for(let i in data) {
            if(data[i] >= target) {
                return i;
            } else {
                target -= data[i]
            }
        }
    }

    checkPercent(number) {
        if (number >= this.getRandomInt(1, 101))
            return true
        else
            return false
    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);

        //The maximum is exclusive and the minimum is inclusive
        return Math.floor(Math.random() * (max - min)) + min; 
    }
    
    onClickStartButton() {
        this.setState({startFlag: true});
        this.setState({startButtonStatus: true});

        var checkButtons = this.state.checkButtons;

        for(let [i, checkButton] of checkButtons.entries()) {

            let color = this.checkShinrai(WARIAI);
            let flag  = this.checkPercent(KAKURITSU[color]);
            
            checkButton.color = color.toString().toLowerCase();
            checkButton.flag  = flag;

            checkButtons[i] = checkButton;
        }

        this.setState({checkButtons: checkButtons});
    }

    onClickCheckButton(abc) {
        console.log(abc)
        //if()
    }

    onClickShareButton() {
        var chkBtns = this.state.checkButtons;
        var returnText = "";
        for(let i in chkBtns) {
            var colors = {
                "blue": "青",
                "green": "緑",
                "red" : "赤",
                "gold": "金",
                "rainbow":"虹"
            }
            returnText += `${chkBtns[i].id+1}:${colors[chkBtns[i].color]}${chkBtns[i].flag?"V":""} `;
        }   

        liff.init();

        if(this.state.startFlag)
            liff.sendMessages([{type:'text', text: returnText}]);
        liff.closeWindow();
    }

    render() {
        return (
            <div className="center">
                <h3>最終決戦</h3>
                <StartButton 
                    disabled={this.state.startButtonStatus} 
                    onClick={()=>{this.onClickStartButton();}}
                />
                <div className="pure-g">
                    <CheckButton 
                        className="pure-u-1-3" 
                        status={this.state.checkButtons[0]}
                    />
                    <CheckButton 
                        className="pure-u-1-3" 
                        status={this.state.checkButtons[1]}
                    />
                    <CheckButton 
                        className="pure-u-1-3" 
                        status={this.state.checkButtons[2]}
                    />
                </div>
                <div className="pure-g">
                    <CheckButton 
                        className="pure-u-1-2" 
                        status={this.state.checkButtons[3]}
                    />
                    <CheckButton 
                        className="pure-u-1-2" 
                        status={this.state.checkButtons[4]}
                    />
                </div>
                <ShareButton onClick={()=>{this.onClickShareButton();}} />
                {this.state.test}
            </div>
        );
    }
}

export default LiffContainer
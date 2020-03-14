# Jackpot | An Ethereum Smart-Contract Game

Jackpot is an online betting game backed up by the power of the Ethereum Blockchain.

![Alt text](https://i.imgur.com/ouM7HLS.png)

## Installation

• Ensure that Metamask is installed and running the Rinkeby Test Network

• Ensure Python 3 is installed w/ environmental variables

• Host the website code by executing in the root directory

``` bash
python3 -m http.server 8080
```
• Visit http://localhost:8080/ and begin playing!

## Instructions
Each player can click the button to enter the jackpot, doing so costs 0.1 ETH. Upon clicking the button, a timer begins counting down from 5 minutes. If another player clicks the button, the jackpot is increased and the timer is reset at 5 minutes. If the timer completes, the last player to bet may claim their reward and win everything in the jackpot. Another game begins as soon as another player bets again!

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change. This was one of my first experiences creating a full-stack project so some of the front end may be somewhat sloppy.

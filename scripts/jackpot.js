function init () {
  let button1 = document.querySelector ("#button1");
  button1.addEventListener ("click", buttonPress);
  let button2 = document.querySelector ("#button2");
  button2.addEventListener ("click", cashout);

  // load Demo1.abi.json obtained from the Compiler tab of Remix
  // (click the ABI button and save the clipboard contents to the file)
  fetch ("../solidity/jackpot.abi.json")
    .then (function (response) {
      return response.json ();
    })
    .then (function (abi) {
      window.abi = abi;
    });
    countdownClock(0);
}
function getInstance () {
  let contractAddress = "0x959ff37e3b2B81135C2e60807044a5ec10aabb47";
  if (contractAddress === "") {
    console.err ("no contract address set");
  }
  let factory = web3.eth.contract (window.abi);
  let instance = factory.at (contractAddress);
  return instance;
}

function buttonPress(evt) {
  let instance = getInstance ();
  let sender = web3.eth.accounts[0];
  instance.buttonClick ({
      from : sender,
      value : 100000000000000000,
      gas : 200000
    },
    function (error, result) {
      if (!error) {
        let currentwinner = document.querySelector ("#currentwinner");
        if (sender == currentwinner.value){
          window.alert("Unable to process transaction: You are already winning!");
          console.log(result);
        }
        else{
          window.alert("Your button press has been processed!");
          console.log(result);
        }
      } else {
        console.error (`get error: ${error}`);
      }
    }
  );
  refresh();
}

function getTime(evt) {
  let instance = getInstance ();
  let sender = web3.eth.accounts[0];
  instance.winningTime ({
      from : sender,
      gas : 200000
    },
    function (error, result) {
      if (!error) {
        countdownClock(result);
        console.log(result);
      } else {
        console.error (`get error: ${error}`);
      }
    }
  );
}

function currentjackpot(evt) {
  let instance = getInstance ();
  let sender = web3.eth.accounts[0];
  instance.currentJackpot ({
      from : sender,
      gas : 200000
    },
    function (error, result) {
      if (!error) {
        result = result/1000000000000000000;
        let currentprize = document.querySelector ("#currentPrize");
        currentprize.value = result + " ETH";
        console.log(result);
      } else {
        console.error (`get error: ${error}`);
      }
    }
  );
}


function cashout(evt) {
  let instance = getInstance ();
  let sender = web3.eth.accounts[0];
  instance.claimPrize ({
      from : sender,
      gas : 200000
    },
    function (error, result) {
      let currentwinner = document.querySelector ("#currentwinner");
      if (!error) {
        if (currentwinner.value == sender){
          instance.howLong ({
              from : sender,
              gas : 200000
            },
            function (error, result2) {
              if (!error && result2 <= 0) {
                window.alert("Congrats! Money has been sent to your ETH address!");
              }
              else {
                window.alert("The game isn't over yet!");
                console.error (`get error: ${error}`);
              }
            }
          );
          console.log(result);
        }
        else{
          window.alert("You aren't the winner!");
          console.log(result);
        }
      } else {
        console.error (`get error: ${error}`);
      }
    }
  );
}

function currentWinner(evt) {
  let instance = getInstance ();
  let sender = web3.eth.accounts[0];
  instance.getLast ({
      from : sender,
      gas : 200000
    },
    function (error, result) {
      if (!error) {
        let currentwinner = document.querySelector ("#currentwinner");
        currentwinner.value = result;
        console.log(result);
      } else {
        console.error (`get error: ${error}`);
      }
    }
  );
}


function refresh(evt) {
  getTime();
  currentWinner();
  currentjackpot();
}

var intervalId;
function countdownClock(time){
  // Set the date we're counting down to
  var countDownDate = (time + "000");
  // clear the old one, if relevant
  if (intervalId)
    clearInterval(intervalId)
  intervalId = setInterval(function() {
    // Get today's date and time
    var now = new Date().getTime();

    // Find the distance between now and the count down date
    var distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    refresh(); // Checks to see if new user has entered the jackpot

    // Output the result in an element with id="demo"
    document.getElementById("timer").innerHTML = minutes + "m " + seconds + "s ";
    // If the count down is over, write some text
    if (distance < 0) {
      clearInterval(intervalId);
      document.getElementById("timer").innerHTML = "GAME OVER";
      countdownClock(0);
    }
  }, 1000);
}

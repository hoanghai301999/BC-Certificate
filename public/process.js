
$(document).ready(function(){
    var currentAccount = null;
    var abi = [
        {
            "inputs": [],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "_id",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "wallet",
                    "type": "address"
                }
            ],
            "name": "getevent",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "_id",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "internalType": "uint32",
                    "name": "newScore",
                    "type": "uint32"
                }
            ],
            "name": "updateScore",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_id",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "Cmnd",
                    "type": "string"
                }
            ],
            "name": "Dangky",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "index",
                    "type": "uint256"
                },
                {
                    "internalType": "uint32",
                    "name": "_newScore",
                    "type": "uint32"
                }
            ],
            "name": "ScoreUpdate",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "arrRegister",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "_ID",
                    "type": "string"
                },
                {
                    "internalType": "address",
                    "name": "wallet",
                    "type": "address"
                },
                {
                    "internalType": "string",
                    "name": "Cmnd",
                    "type": "string"
                },
                {
                    "internalType": "uint32",
                    "name": "score",
                    "type": "uint32"
                },
                {
                    "internalType": "bool",
                    "name": "hasdonetest",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "countRegister",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_ordering",
                    "type": "uint256"
                }
            ],
            "name": "getRegister",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                },
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                },
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                },
                {
                    "internalType": "uint32",
                    "name": "",
                    "type": "uint32"
                },
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address payable",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "transfer",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ];
        // question 

    const questions = [
            {
                question: "How many days makes a week ?",
                optionA: "10 days",
                optionB: "14 days",
                optionC: "5 days",
                optionD: "7 days",
                correctOption: "7 days"
            },
        
            {
                question: "How many players are allowed on a soccer pitch ?",
                optionA: "10 players",
                optionB: "11 players",
                optionC: "9 players",
                optionD: "12 players",
                correctOption: "11 players"
            },
        
            {
                question: "Who was the first President of USA ?",
                optionA: "Donald Trump",
                optionB: "Barack Obama",
                optionC: "Abraham Lincoln",
                optionD: "George Washington",
                correctOption: "George Washington"
            },
            {
                question: "Eighteen thousandths, written as a decimal, is: ",
                optionA: "0.0018",
                optionB: "0.018",
                optionC: "0.18",
                optionD: "1.8",
                correctOption: "0.0018"
            },
            {
                question: "The next number in the sequence 1, 3, 6, 10, is:",
                optionA: "12",
                optionB: "13",
                optionC: "14",
                optionD: "15",
                correctOption: "15"
            }
        ]   
    var addressSM= "0x5A121f4DafF2495DBabc8A0EaF198f3BBB22211d";
    $('.loader').hide();
    // $("#quizzpart").show();
    $("#quizzpart").hide(0); 
    $("#Submit").hide(0);
    var current_ID = "";
    var current_hash="";
    // Connect MMSM
    const web3 = new Web3(window.ethereum);
    window.ethereum.enable();
    var contract_MM = new web3.eth.Contract(abi,addressSM);
    console.log(contract_MM);


    // Connect Infura
    var provider = new Web3.providers.WebsocketProvider("wss://rinkeby.infura.io/ws/v3/f41cc23788d84ef3a4de42ea3a8398b3")
    var web3_infura = new Web3(provider);
    var contract_Infura = web3_infura.eth.Contract(abi,addressSM);
    console.log(contract_Infura);

    // get Event, and load Quizz
    contract_Infura.events.getevent({filter:{},fromBlock:'latest'},function(err,data){
        if(err){
            console.log("Error to get event from sm");

        }else{
            console.log("tu infura, nhan duoc id: "+data.returnValues[0]);
            $.post("/update",{
                thisid: data.returnValues[0],
                hashed: data.transactionHash
            },function(statusupload){
                if ( statusupload.ketqua == 1){
                    console.log(statusupload);
                    if(statusupload.maloi._id== current_ID){
                        console.log("Update success id: "+statusupload.maloi._id);
                        $('.loader').hide();
                        $("#quizzpart").show(0); 
                    }
                }
                else{
                    console.log("update error: "+ statusupload.maloi);
                }
            })
            
        }
    });

    // get Event, load score
    contract_Infura.events.updateScore({filter:{},fromBlock:'latest'},function(err,data){
        if(err){
            console.log("Error to get event from sm");
        }else{
            var infurascore = data.returnValues[1];
            $('.loader').hide();
            console.log("Finish update Score on Smart Contract!");
            $("#FinalScore").html("Your Quizz Score: "+ infurascore+" %");
            $("#Hash").html("Your #Hash: <a href='https://rinkeby.etherscan.io/tx/"+ current_hash+"'target='_blank'>  "+ current_hash +"</a><br>This is your Certificate Hash number, Please Save it!</br>");
           
        }   
    })
    $("#OpenQuizz").click(function(){
        loadquizz();
        $("#Submit").show(0); 
        $("#OpenQuizz").hide(0);
    })
    $("#connectMM").click(function(){
        connect_MetaMask()
        .then((data)=>{
            currentAccount = data[0];
            console.log("Current Account:"+currentAccount);
            maxLength = currentAccount.length;
            $("#connectMM").html(currentAccount.substr(0, 7)+"..."+currentAccount.substr(maxLength-4, maxLength));
        })
        .catch((err)=>{
            console.log(err);
        });
    });

    $("#btnDangKy").click(function(){
        
        if(currentAccount != null){
            let name = $("#txtName").val();
            let email = $("#txtEmail").val();
            let sdt = $("#txtSoDT").val();
            let Cmnds = $("#txtCmnd").val();
            let _id = "";
            $.post("/register",{
                Name: name,
                Address:currentAccount,
                Email:email,
                Phone: sdt,
                Cmnd: Cmnds
            },function(data){
                if(data.ketqua == 0){
                    alert("Error!, status: "+data.maloi) // save Db error 
                }
                else{
                    current_ID= data.maloi;
                    // send money to smart contract
                    contract_MM.methods.Dangky(current_ID,Cmnds).send({
                        from: currentAccount,
                        value: web3.utils.toWei("0.05",'ether')
                    },function(err,res){
                        if(err){
                            console.log("Error to send transaction");
                            $("#RegisterCom").show(0); 
                        }
                        else
                        {
                            console.log("Dang ky _id: "+ current_ID);
                            console.log(res); // return hash 
                            $("#RegisterCom").hide(0); 
                            $('.loader').show();
                        }
                    })
                }
            });         
      }
        else{
            alert("Please Connect to MetaMask!");
        }
    });
    // Check user change account or not 
    window.ethereum.on('accountsChanged',function(accounts){
        currentAccount = accounts[0];
        console.log("Current Account:"+currentAccount);
        maxLength = currentAccount.length
        $("#connectMM").html(currentAccount.substr(0, 7)+"..."+currentAccount.substr(maxLength-4, maxLength));
    })

 //   loadquizz();
    function loadquizz(){
        $("#frmQuiz").append(`<br><h2>Please Finish all the question!</h2></br><br><h5 id="middle">(don't change account or reload the page!)</h5></br> `)
        for (let i = 0 ; i < questions.length;i++){
              $("#frmQuiz").append(`
            <h3><p>`+ (i+1) +`) `+questions[i].question+`</p></h3>
            <p><input type ="radio" name ="question`+i+`" value ="`+questions[i].optionA+`">   `+questions[i].optionA+`</p>
            <p><input type ="radio" name ="question`+i+`"value ="`+questions[i].optionB+`">   `+questions[i].optionB+`</p>
            <p><input type ="radio" name ="question`+i+`"value ="`+questions[i].optionC+`">   `+questions[i].optionC+`</p>
            <p><input type ="radio" name ="question`+i+`" value ="`+questions[i].optionD+`">   `+questions[i].optionD+`</p>       
        `)
        }
    }

   $("#Submit").click(function(){
        if (confirm('Are you sure you want to submit the answer?')) {
            var score = calculategrade();
            var percentscore =  score/questions.length*100;
            console.log(score/questions.length*100);
           
            $.post("/update/grade",{
                id: current_ID,
                score: percentscore
            },function(data){
                current_hash = data.maloi.Hash;
                if(data.ketqua==1){  
                    contract_MM.methods.countRegister().call().then((datas)=>{
                        var tong =  web3.utils.hexToNumber(datas);
                        for(var n = 0; n<tong; n++){
                            contract_MM.methods.getRegister(n).call().then((register)=>{
                               // console.log(register[0] +" vs "+ current_ID);
                               if ( register[0] == current_ID){
                                    contract_MM.methods.ScoreUpdate(n-1,percentscore).send({from:currentAccount},function(err,res){
                                        if(err){
                                            console.log("error to submit");
                                        }
                                        else{
                                            $("#quizzpart").hide(0); 
                                            $('.loader').show();
                                        }
                                    }) // update grade
                               }
                            }).catch((err)=>{
                                console.log("error get register from SM");
                            })
                        }
                    }).catch((err)=>{})
                 }
                 else{
                     console.log(data.maloi);
                 }
            })
        } else {
            // Do nothing!
        }
    })

    function calculategrade(){
        var grade = 0;
        // calculate grade
            for(let i = 0; i < questions.length;i++ ){
                var checkedValue = null; 
                var inputElements = document.getElementsByName('question'+i);
                for(var n=0; inputElements[n]; ++n){
                    if(inputElements[n].checked){
                        checkedValue = inputElements[n].value;
                        break;
                    }
                }
                // get value checked
                if(checkedValue == questions[i].correctOption)   {
                    grade++;
                }
            }
         
            return grade;
    }

});
async function connect_MetaMask(){
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    return accounts
}
function check_MetaMask(){
    if (typeof window.ethereum !== 'undefined') {
        console.log('MetaMask is installed!');
    //    $("#mm").hide(0);
      //  $("#login").show(0);
      }else{
          console.log('MetaMask is not install!');
        //  $("#mm").show(0);
          //$("#login").hide(0);
      }
}

function once(fn, context) { 
    var result;
    return function() { 
        if (fn) {
            result = fn.apply(context || this, arguments);
            fn = null;
        }
        return result;
    };
}
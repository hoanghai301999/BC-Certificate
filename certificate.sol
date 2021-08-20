// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;


contract Certificate{
    address private owner;
    
    constructor(){
        owner = msg.sender;
    }
    
    Register[] public arrRegister; 
    
    struct Register{
        string _ID;
        address wallet;
        string Cmnd;
        uint32 score;
        bool hasdonetest;
    }
    
    event getevent(string _id, address wallet);
    
    event updateScore(string _id, uint32 newScore);
    
    function Dangky(string memory _id, string memory Cmnd) public payable{
        uint c = 0.05 ether;
        require(msg.value == c);
        Register memory newregister = Register(_id,msg.sender,Cmnd,0,false);
        arrRegister.push(newregister);
        emit getevent(_id,msg.sender);
        
    }

    function countRegister() public view returns(uint){
        return arrRegister.length;
    }
    
    function getRegister(uint _ordering) public view returns(string memory,address,string memory,uint32,bool){
        require(_ordering>=0 && _ordering< arrRegister.length && arrRegister.length>0);
        return (arrRegister[_ordering]._ID,arrRegister[_ordering].wallet,arrRegister[_ordering].Cmnd,arrRegister[_ordering].score,arrRegister[_ordering].hasdonetest);
    }

    function ScoreUpdate(uint index, uint32 _newScore) public{
        require(index >=0 && index < arrRegister.length && arrRegister.length>0);
        require(arrRegister[index].hasdonetest == false);
        arrRegister[index].hasdonetest = true;
        arrRegister[index].score = _newScore;
        emit updateScore(arrRegister[index]._ID, _newScore);
    }
    
     function transfer(address payable to, uint256 amount) public {
        require(msg.sender==owner);
        to.transfer(amount);
    }
}
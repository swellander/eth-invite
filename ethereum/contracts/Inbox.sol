pragma solidity ^0.4.17;

contract Inbox {
    string public message;

    event MessageChanged(string message);

    function Inbox(string initialMessage) public {
        message = initialMessage;
    }
    
    function setMessage(string newMessage) public {
        message = newMessage;
        MessageChanged(newMessage);
    }
}
pragma solidity ^0.4.0;

contract EventFactory {
    address[] public deployedEvents;
    
    function createEvent(uint stake, uint endDate) public returns (address) {
        address newEvent = new Event(stake, msg.sender, endDate);
        deployedEvents.push(newEvent);
        return newEvent;
    }

    function getDeployedEvents() public view returns(address[]) {
      return deployedEvents;
    }
}

contract Event {
  uint stake;
  uint endDate;
  address manager;
  uint creationDate;
  address[] attendees;
  struct Guest {
    uint stake;
    bool attended;
  }
  mapping(address => Guest) public guests;
    
  constructor(uint _stake, address _manager, uint _endDate) public {
    stake = _stake;
    creationDate = now;
    manager = _manager;
    endDate = _endDate;
  }
    
  function rsvp() public payable returns(bool) {
    require(guests[msg.sender].stake == 0 && msg.value == stake);
    /*require(guestAddresses.length < 101);*/
    guests[msg.sender] = Guest(msg.value, false);
  } 
   
  function confirmAttendance() public {
    require(guests[msg.sender].attended == false);
    guests[msg.sender].attended == true; 
    attendees.push(msg.sender);
  }
   
  function getTime() public view returns (uint) { 
    return now; 
  }

  // TODO: abstract manager check into a modifier
  function payconfirmedGuests() public {
    require(msg.sender == manager && now >= endDate);
    uint cut = address(this).balance / attendees.length;
    for (uint i = 0; i < attendees.length; i++) {
   		attendees[i].transfer(cut);	
   	}
  }
}
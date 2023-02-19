// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

contract test {

    string name = "choi";
    uint256 public total;

    function getName() public view returns(string memory) {
        return name;
    }

    function setName(string memory _name) public {
        name = _name;
    }

    function getMetic() public payable {
        uint256 amount = msg.value;
        total = total + amount;
    }

}
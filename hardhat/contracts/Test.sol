// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

contract Test {

    struct Clique {
        address addr;
        uint numMembers;
        string name; 
    }

    mapping(string => Clique) public cliques;

    function createClique(address _addr, string memory _name) public {
        cliques[_name].addr = _addr;
        cliques[_name].numMembers++;
        cliques[_name].name = _name;
    } 

    function getClique(string memory _name) public view returns(address, uint, string memory) {
        return(
            cliques[_name].addr,
            cliques[_name].numMembers,
            cliques[_name].name
        );
    }

}
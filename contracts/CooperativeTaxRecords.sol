// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract CooperativeTaxRecords {
    struct TaxEvent {
        address member;
        uint256 timestamp;
        string eventType;
        address tokenIn;
        address tokenOut;
        uint256 amountIn;
        uint256 amountOut;
        uint256 usdValue;
        uint256 costBasis;
    }
    
    mapping(address => TaxEvent[]) private memberTaxEvents;
    address public governance;
    
    event TaxEventRecorded(
        address indexed member,
        string eventType,
        uint256 usdValue,
        uint256 timestamp
    );
    
    constructor() {
        governance = msg.sender;
    }
    
    function recordTaxEvent(
        string memory eventType,
        address tokenIn,
        address tokenOut, 
        uint256 amountIn,
        uint256 amountOut,
        uint256 usdValue,
        uint256 costBasis
    ) external {
        TaxEvent memory newEvent = TaxEvent({
            member: msg.sender,
            timestamp: block.timestamp,
            eventType: eventType,
            tokenIn: tokenIn,
            tokenOut: tokenOut,
            amountIn: amountIn,
            amountOut: amountOut,
            usdValue: usdValue,
            costBasis: costBasis
        });
        
        memberTaxEvents[msg.sender].push(newEvent);
        emit TaxEventRecorded(msg.sender, eventType, usdValue, block.timestamp);
    }
    
    function getMemberTaxHistory(address member) 
        external view returns (TaxEvent[] memory) {
        return memberTaxEvents[member];
    }
    
    function getMemberTaxSummary(address member) external view returns (
        uint totalEvents,
        uint totalValue,
        uint lastActivity
    ) {
        TaxEvent[] memory events = memberTaxEvents[member];
        totalEvents = events.length;
        
        for(uint i = 0; i < events.length; i++) {
            totalValue += events[i].usdValue;
            if(events[i].timestamp > lastActivity) {
                lastActivity = events[i].timestamp;
            }
        }
    }
}
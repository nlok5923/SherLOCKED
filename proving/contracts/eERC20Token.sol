// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {IERC20} from "./ERC20/IERC20.sol";
import {IERC20Permit} from "./ERC20/extensions/IERC20Permit.sol";
import "./ERC20/ERC20.sol";
import "./ERC20/extensions/ERC20Permit.sol";

contract eERC20Token is ERC20, ERC20Permit {
    constructor(
        address initialOwner,
        IBonsaiRelay bonsaiRelay_,
        bytes32 erc20AddImageId_,
        bytes32 erc20SubImageId_
    ) ERC20("eERC20Token", "EE20", bonsaiRelay_, erc20AddImageId_, erc20SubImageId_) ERC20Permit("eERC20Token") {
        // _mint(msg.sender, 10000000 * 10 ** decimals());
    }

    function mint(address to, uint256 amount) public {
        // enabling public minting
        _mint(to, amount);
    }
}

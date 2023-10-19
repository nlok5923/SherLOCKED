// SPDX-License-Identifier: Apache-2.0

pragma solidity ^0.8.17;

import {Script} from "forge-std/Script.sol";
import {console2} from "forge-std/console2.sol";
import {IBonsaiRelay} from "bonsai/IBonsaiRelay.sol";
import {BonsaiCheats} from "bonsai/BonsaiCheats.sol";

import {BonsaiDeploy} from "./BonsaiDeploy.sol";
// import {BonsaiStarter} from "../contracts/BonsaiStarter.sol";
import {eERC20Token} from "../contracts/eERC20Token.sol";

/// @notice Deployment script for the BonsaiStarter project.
/// @dev Use the following environment variables to control the deployment:

contract Deploy is Script, BonsaiCheats, BonsaiDeploy {
    function run() external {
        startBroadcast();
        IBonsaiRelay bonsaiRelay = deployBonsaiRelay();
        uploadImages();
        address initialOwner = 0x540F4E54Ed96a4b9A7c53A81069C17c8251Bf164;

        // TEMPLATE: Modify this block to match your expected deployment.
        bytes32 imageIdForERC20Add = queryImageId("ERC20Add");
        bytes32 imageIdForERC20Sub = queryImageId("ERC20Sub");

        console2.log("Image ID for ERC20Add is ", vm.toString(imageIdForERC20Add));
        console2.log("Image ID for ERC20Sub is ", vm.toString(imageIdForERC20Sub));

        eERC20Token app = new eERC20Token(initialOwner, bonsaiRelay, imageIdForERC20Add, imageIdForERC20Sub);
        console2.log("Deployed eERC20Token contract to ", address(app));

        vm.stopBroadcast();
    }
}

// Copyright 2023 RISC Zero, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

#![no_main]

use std::io::Read;

use ethabi::{ethereum_types::U256, ethereum_types::Address, ParamType, Token};
use risc0_zkvm::guest::env;
use tracing::info;

risc0_zkvm::guest::entry!(main);

// fn ERC20Sub(user_previous_balance: U256, user_balance_spent: U256) -> U256 {
//     let ans: U256 = U256::from(10000);
//     ans
// }

fn ERC20Sub(user_previous_balance: U256, user_balance_spent: U256) -> U256 {

    let constant = U256::from_dec_str("73786976294838206464").unwrap(); // 2^66

    let normalized_prev_balance = user_previous_balance - constant;
    
    let normalized_new_balance = user_balance_spent - constant;

    let product =  normalized_prev_balance / normalized_new_balance;
    let encrypted_sum = product + constant;
    encrypted_sum
}

fn main() {
    // Read data sent from the application contract.
    let mut input_bytes = Vec::<u8>::new();
    env::stdin().read_to_end(&mut input_bytes).unwrap();
    // Type array passed to `ethabi::decode_whole` should match the types encoded in
    // the application contract.
    let input = ethabi::decode_whole(&[ParamType::Address, ParamType::Uint(256), ParamType::Uint(256)], &input_bytes).unwrap();
    let user_address: Address = input[0].clone().into_address().unwrap();
    let user_previous_balance: U256 = input[1].clone().into_uint().unwrap();
    let user_new_balance: U256 = input[2].clone().into_uint().unwrap();

    // Run the computation.
    let result = ERC20Sub(user_previous_balance, user_new_balance);

    // Commit the journal that will be received by the application contract.
    // Encoded types should match the args expected by the application callback.
    env::commit_slice(&ethabi::encode(&[Token::Address(user_address), Token::Uint(result)]));
}

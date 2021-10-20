import React, { Dispatch, SetStateAction, useState, useEffect } from "react";

import {
  NetworkType,
  BeaconEvent,
  defaultEventCallbacks
} from "@airgap/beacon-sdk";
import TransportU2F from "@ledgerhq/hw-transport-u2f";
import { LedgerSigner } from "@taquito/ledger-signer";
import { Navbar, Container, Nav, Button } from 'react-bootstrap';

// ----------------------------------------------------------

import { TezosToolkit } from '@taquito/taquito';
import { BeaconWallet } from "@taquito/beacon-wallet";

const ConnectButtonNew = () => {
    const Tezos = new TezosToolkit('https://api.tez.ie/rpc/granadanet');

    // const options = 
    const wallet = new BeaconWallet({
    name: 'cryptowill',
    preferredNetwork: NetworkType.GRANADANET,
    eventHandlers: {
        PERMISSION_REQUEST_SUCCESS: {
        handler: async (data: any) => {
            console.log('permission data:', data);
        },
        },
    },
    });

    // await wallet.requestPermissions({
    //     network: {
    //       type: NetworkType.GRANADANET,
    //     },
    //   });
    
    // const userAddress = await wallet.getPKH();

    Tezos.setWalletProvider(wallet);

    const connectWallet = async () => {
        try {
            await wallet.requestPermissions({
                network: {
                  type: NetworkType.GRANADANET,
                },
              });
            
            const userAddress = await wallet.getPKH();
            console.log(userAddress)
        } catch (error) {
            console.log(error);
          }
    };

    return (
        <div className="buttons">
            <Button 
                onClick={connectWallet} 
                variant="outline-secondary" 
                style={{
                color: "black", 
                fontFamily: 'Montserrat', 
                fontSize: "1.2em",
                fontWeight: "bold",
                width: "13em",
                borderRadius: "5%" }}>
                Connect with wallet
            </Button>{' '}
    </div>
    );

};

export default ConnectButtonNew;

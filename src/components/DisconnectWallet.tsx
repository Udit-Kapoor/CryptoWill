import React, { Dispatch, SetStateAction } from "react";
import { BeaconWallet } from "@taquito/beacon-wallet";
import { TezosToolkit } from "@taquito/taquito";
import { Navbar, Container, Nav, Button } from 'react-bootstrap';

interface ButtonProps {
  wallet: BeaconWallet | null;
  setPublicToken: Dispatch<SetStateAction<string | null>>;
  setUserAddress: Dispatch<SetStateAction<string>>;
  setUserBalance: Dispatch<SetStateAction<number>>;
  setWallet: Dispatch<SetStateAction<any>>;
  setTezos: Dispatch<SetStateAction<TezosToolkit>>;
  setBeaconConnection: Dispatch<SetStateAction<boolean>>;
}

const DisconnectButton = ({
  wallet,
  setPublicToken,
  setUserAddress,
  setUserBalance,
  setWallet,
  setTezos,
  setBeaconConnection
}: ButtonProps): JSX.Element => {
  const disconnectWallet = async (): Promise<void> => {
    //window.localStorage.clear();
    setUserAddress("");
    setUserBalance(0);
    setWallet(null);
    const tezosTK = new TezosToolkit("https://api.tez.ie/rpc/granadanet");
    setTezos(tezosTK);
    setBeaconConnection(false);
    setPublicToken(null);
    console.log("disconnecting wallet");
    if (wallet) {
      await wallet.client.removeAllAccounts();
      await wallet.client.removeAllPeers();
      await wallet.client.destroy();
    }
  };

  return (
    <div className="buttons">
      <Button 
        onClick={disconnectWallet} 
        variant="outline-secondary" 
        style={{
          color: "black", 
          fontFamily: 'Montserrat', 
          fontSize: "1.2em",
          fontWeight: "bold",
          width: "13em",
          borderRadius: "5%" }}>
        Disconnect wallet
      </Button>{' '}
      {/* <button className="button" onClick={disconnectWallet}>
        <i className="fas fa-times"></i>&nbsp; Disconnect wallet
      </button> */}
    </div>
  );
};

export default DisconnectButton;

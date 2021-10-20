import React, { useState } from "react";
import { TezosToolkit } from "@taquito/taquito";
import { BeaconWallet } from "@taquito/beacon-wallet";

import { InMemorySigner } from '@taquito/signer';
// import "./App.css";
import ConnectButton from "./ConnectWallet";
import DisconnectButton from "./DisconnectWallet";
import qrcode from "qrcode-generator";
import UpdateContract from "./UpdateContract";
import Transfers from "./Transfers";

import logo from '../assets/logo.svg';

import { Navbar, Container, Nav, Button } from 'react-bootstrap';

import {
  NetworkType,
  BeaconEvent,
  defaultEventCallbacks
} from "@airgap/beacon-sdk";



const NavbarMain = () => {
  const [Tezos, setTezos] = useState<TezosToolkit>(
    new TezosToolkit("https://api.tez.ie/rpc/granadanet")
  );
  const [contract, setContract] = useState<any>(undefined);
  const [publicToken, setPublicToken] = useState<string | null>("");
  const [wallet, setWallet] = useState<any>(null);
  const [userAddress, setUserAddress] = useState<string>("");
  const [userBalance, setUserBalance] = useState<number>(0);
  const [storage, setStorage] = useState<number>(0);
  const [copiedPublicToken, setCopiedPublicToken] = useState<boolean>(false);
  const [beaconConnection, setBeaconConnection] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("transfer");

  // Granadanet Increment/Decrement contract
  const contractAddress: string = "KT1K3XVNzsmur7VRgY8CAHPUENaErzzEpe4e";

  const loginWallet = new BeaconWallet({
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

    Tezos.setWalletProvider(loginWallet);


  if (publicToken && (!userAddress || isNaN(userBalance))) {
    return (
      
      <div>

      <Navbar bg="white" variant="dark">
      <Container>
          <Navbar.Brand href="/">
              <img alt=""
                  src={ logo }
                  width="60"
                  height="60"
                  className="d-inline-block align-top"
                  />{' '}
          </Navbar.Brand>
          <Nav className="me-auto">
              <Nav.Link href="/about" style={{
                      color: "black", 
                      fontFamily: 'Montserrat', 
                      fontSize: "1.2em",
                      fontWeight: "bold" }}
                  >About
              </Nav.Link>
              <Nav.Link href="/how-it-works" style={{
                      color: "black", 
                      fontFamily: 'Montserrat', 
                      fontSize: "1.2em",
                      fontWeight: "bold" }}
                  >How it works
              </Nav.Link>
              <Nav.Link href="/devs" style={{
                      color: "black", 
                      fontFamily: 'Montserrat', 
                      fontSize: "1.2em",
                      fontWeight: "bold" }}
                  >About the developers
              </Nav.Link>
          </Nav>
      </Container>
      <Container className="justify-content-end">
          <Nav>
              <Nav.Link>
              
                   <Button variant="outline-secondary" style={{
                      color: "black", 
                      fontFamily: 'Montserrat', 
                      fontSize: "1.2em",
                      fontWeight: "bold",
                      width: "13em",
                      borderRadius: "5%" }}>
                      Connecting...
                  </Button>{' '}
              </Nav.Link>
              <Nav.Link href="/setup">
                  <Button variant="danger" style={{
                      color: "white", 
                      fontFamily: 'Montserrat', 
                      fontSize: "1.2em",
                      fontWeight: "bold",
                      width: "13em",
                      borderRadius: "5%" }}>
                      Get Started
                  </Button>{' '}
              </Nav.Link>
          </Nav>
      </Container>
  </Navbar>



      </div>
    );
  } else if (userAddress && !isNaN(userBalance)) {
    



    return (

      <div>
        <Navbar bg="white" variant="dark">
            <Container>
                <Navbar.Brand href="/">
                    <img alt=""
                        src={ logo }
                        width="60"
                        height="60"
                        className="d-inline-block align-top"
                        />{' '}
                </Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/about" style={{
                            color: "black", 
                            fontFamily: 'Montserrat', 
                            fontSize: "1.2em",
                            fontWeight: "bold" }}
                        >About
                    </Nav.Link>
                    <Nav.Link href="/how-it-works" style={{
                            color: "black", 
                            fontFamily: 'Montserrat', 
                            fontSize: "1.2em",
                            fontWeight: "bold" }}
                        >How it works
                    </Nav.Link>
                    <Nav.Link href="/devs" style={{
                            color: "black", 
                            fontFamily: 'Montserrat', 
                            fontSize: "1.2em",
                            fontWeight: "bold" }}
                        >About the developers
                    </Nav.Link>
                </Nav>
            </Container>
            <Container className="justify-content-end">
                <Nav>
                    <Nav.Link>
                        <div style={{
                          color: "black",
                          fontFamily: 'Montserrat', 
                            fontSize: "1.2em",
                            fontWeight: "bold",
                            textAlign: "center",
                            marginTop: ".3em"
                        }}>
                            {userAddress.substring(0, 7) + "..." + userAddress.substring(userAddress.length - 4, userAddress.length)}
                        </div>                        
                    </Nav.Link>
                    <Nav.Link>
                      <DisconnectButton
                        wallet={wallet}
                        setPublicToken={setPublicToken}
                        setUserAddress={setUserAddress}
                        setUserBalance={setUserBalance}
                        setWallet={setWallet}
                        setTezos={setTezos}
                        setBeaconConnection={setBeaconConnection}
                      />
                    </Nav.Link>
                    <Nav.Link href="/setup">
                        <Button variant="danger" style={{
                            color: "white", 
                            fontFamily: 'Montserrat', 
                            fontSize: "1.2em",
                            fontWeight: "bold",
                            width: "13em",
                            borderRadius: "5%" }}>
                            Get Started
                        </Button>{' '}
                    </Nav.Link>
                </Nav>
            </Container>
        </Navbar>

      </div>


      // <div className="main-box">
      //   <h1>Taquito Boilerplate</h1>
      //   <div id="tabs">
      //     <div
      //       id="transfer"
      //       className={activeTab === "transfer" ? "active" : ""}
      //       onClick={() => setActiveTab("transfer")}
      //     >
      //       Make a transfer
      //     </div>
      //     <div
      //       id="contract"
      //       className={activeTab === "contract" ? "active" : ""}
      //       onClick={() => setActiveTab("contract")}
      //     >
      //       Interact with a contract
      //     </div>
      //   </div>
      //   <div id="dialog">
      //     <div id="content">
      //       {activeTab === "transfer" ? (
      //         <div id="transfers">
      //           <h3 className="text-align-center">Make a transfer</h3>
      //           <Transfers
      //             Tezos={Tezos}
      //             setUserBalance={setUserBalance}
      //             userAddress={userAddress}
      //           />
      //         </div>
      //       ) : (
      //         <div id="increment-decrement">
      //           <h3 className="text-align-center">
      //             Current counter: <span>{storage}</span>
      //           </h3>
      //           <UpdateContract
      //             contract={contract}
      //             setUserBalance={setUserBalance}
      //             Tezos={Tezos}
      //             userAddress={userAddress}
      //             setStorage={setStorage}
      //           />
      //         </div>
      //       )}
      //       <p>
      //         <i className="far fa-file-code"></i>&nbsp;
      //         <a
      //           href={`https://better-call.dev/granadanet/${contractAddress}/operations`}
      //           target="_blank"
      //           rel="noopener noreferrer"
      //         >
      //           {contractAddress}
      //         </a>
      //       </p>
      //       <p>
      //         <i className="far fa-address-card"></i>&nbsp; {userAddress}
      //       </p>
      //       <p>
      //         <i className="fas fa-piggy-bank"></i>&nbsp;
      //         {(userBalance / 1000000).toLocaleString("en-US")} ꜩ
      //       </p>
      //     </div>
      //     <DisconnectButton
      //       wallet={wallet}
      //       setPublicToken={setPublicToken}
      //       setUserAddress={setUserAddress}
      //       setUserBalance={setUserBalance}
      //       setWallet={setWallet}
      //       setTezos={setTezos}
      //       setBeaconConnection={setBeaconConnection}
      //     />
      //   </div>
      //   <div id="footer">
      //     <img src="built-with-taquito.png" alt="Built with Taquito" />
      //   </div>
      // </div>
    );
  } else if (!publicToken && !userAddress && !userBalance) {
    return (
    <div>
      <Navbar bg="white" variant="dark">
            <Container>
                <Navbar.Brand href="/">
                    <img alt=""
                        src={ logo }
                        width="60"
                        height="60"
                        className="d-inline-block align-top"
                        />{' '}
                </Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/about" style={{
                            color: "black", 
                            fontFamily: 'Montserrat', 
                            fontSize: "1.2em",
                            fontWeight: "bold" }}
                        >About
                    </Nav.Link>
                    <Nav.Link href="/how-it-works" style={{
                            color: "black", 
                            fontFamily: 'Montserrat', 
                            fontSize: "1.2em",
                            fontWeight: "bold" }}
                        >How it works
                    </Nav.Link>
                    <Nav.Link href="/devs" style={{
                            color: "black", 
                            fontFamily: 'Montserrat', 
                            fontSize: "1.2em",
                            fontWeight: "bold" }}
                        >About the developers
                    </Nav.Link>
                    <Nav.Link href="/interact/add" style={{
                            color: "black", 
                            fontFamily: 'Montserrat', 
                            fontSize: "1.2em",
                            fontWeight: "bold" }}
                        >Interact
                    </Nav.Link>
                </Nav>
            </Container>
            <Container className="justify-content-end">
                <Nav>
                    <Nav.Link>
                    <ConnectButton
            Tezos={Tezos}
            setContract={setContract}
            setPublicToken={setPublicToken}
            setWallet={setWallet}
            setUserAddress={setUserAddress}
            setUserBalance={setUserBalance}
            setStorage={setStorage}
            contractAddress={contractAddress}
            setBeaconConnection={setBeaconConnection}
            wallet={wallet}
          />
                        {/* <Button variant="outline-secondary" style={{
                            color: "black", 
                            fontFamily: 'Montserrat', 
                            fontSize: "1.2em",
                            fontWeight: "bold",
                            width: "13em",
                            borderRadius: "5%" }}>
                            Login
                        </Button>{' '} */}
                    </Nav.Link>
                    <Nav.Link href="/setup">
                        <Button variant="danger" style={{
                            color: "white", 
                            fontFamily: 'Montserrat', 
                            fontSize: "1.2em",
                            fontWeight: "bold",
                            width: "13em",
                            borderRadius: "5%" }}>
                            Get Started
                        </Button>{' '}
                    </Nav.Link>
                </Nav>
            </Container>
        </Navbar>


      {/* <div className="main-box">
        <div className="title">
          <h1>Taquito Boilerplate</h1>
          <a href="https://app.netlify.com/start/deploy?repository=https://github.com/ecadlabs/taquito-boilerplate">
            <img
              src="https://www.netlify.com/img/deploy/button.svg"
              alt="netlify-button"
            />
          </a>
        </div>
        <div id="dialog">
          <header>Welcome to Taquito Boilerplate App!</header>
          <div id="content">
            <p>Hello!</p>
            <p>
              This is a template Tezos dApp built using Taquito. It's a starting
              point for you to hack on and build your own dApp for Tezos.
              <br />
              If you have not done so already, go to the{" "}
              <a
                href="https://github.com/ecadlabs/taquito-boilerplate"
                target="_blank"
                rel="noopener noreferrer"
              >
                Taquito boilerplate Github page
              </a>{" "}
              and click the <em>"Use this template"</em> button.
            </p>
            <p>Go forth and Tezos!</p>
          </div>
          <ConnectButton
            Tezos={Tezos}
            setContract={setContract}
            setPublicToken={setPublicToken}
            setWallet={setWallet}
            setUserAddress={setUserAddress}
            setUserBalance={setUserBalance}
            setStorage={setStorage}
            contractAddress={contractAddress}
            setBeaconConnection={setBeaconConnection}
            wallet={wallet}
          />
        </div>
        <div id="footer">
          <img src="built-with-taquito.png" alt="Built with Taquito" />
        </div>
      </div> */}
      </div>
    );
  } else {
    return <div>An error has occurred</div>;
  }
};

export default NavbarMain;

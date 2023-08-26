import React, { useEffect, useState } from "react";
import "./mainPage.css";
import { FaHome, FaInfoCircle, FaFacebook, FaSearch, FaTwitter, FaLinkedin } from 'react-icons/fa';
export function MainPage() {
    const tokenAddrStr = "0x2170Ed0880ac9A755fd29B2688956BD959F933F8";
    const [pairResults, setPairResults] = useState();
    const [tokenResults, setTokenResults] = useState();
    const [searchTokenPair, setSearchTokenPair] = useState();
    const [tokenPairResults, setTokenPairResults] = useState();
    const [activeTokenPair, setActiveTokenPair] = useState("");
    useEffect(() => {
        tokenAddreesess();
    }, []);
    function tokenAddreesess() {
        fetch(`https://api.dexscreener.com/latest/dex/tokens/${tokenAddrStr}`)
            .then(response => {
                return response.json()
            })
            .then(data => {
                if (data) {
                    setTokenPairResults(data.pairs);
                }
            }).catch(error => {
                console.error(error);
            });
    }
    function searchTokenpairAddreesess() {
        fetch(`https://api.dexscreener.com/latest/dex/search/?q=/${searchTokenPair}`)
            .then(response => {
                return response.json()
            })
            .then(data => {
                if (data) {
                    if (activeTokenPair === "token") {
                        setTokenResults(data.pairs);
                    } else if(activeTokenPair === "pair") {
                        setPairResults(data.pairs);
                    }
                    setTokenPairResults(data.pairs);
                }
            }).catch(error => {
                console.error(error);
            });
    }
    const handleSearchTokenPair = () => {
        searchTokenpairAddreesess();
    }
    const handleSearchInput = (e) => {
        if (e.keyCode === 13) {
            handleSearchTokenPair();
        }
    }
    const handleNavBarClick = (menuName) => {
        setTokenPairResults(activeTokenPair === "token" ? tokenResults : activeTokenPair === "pair" ? pairResults : null);
        setActiveTokenPair(menuName);
        setSearchTokenPair("");
    }
    return (
        <React.Fragment>
            <nav className="mainPage">
                <div className="mainPage-heading">
                    <FaInfoCircle className="mainPage-navMenuIcon" />
                    <h2>nFTify</h2>
                </div>
                <ul className="mainPage-navMenu">
                    <li onClick={() => handleNavBarClick("token")} className={activeTokenPair === "token" ? "active" : ""}>
                        <FaHome className="mainPage-navMenuIcon" />Token Address
                    </li>
                    <li onClick={() => handleNavBarClick("pair")} className={activeTokenPair === "pair" ? "active" : ""}>
                        <FaHome className="mainPage-navMenuIcon" />Pair Address
                    </li>
                </ul>
                <div className="mainPage-icons">
                    <FaFacebook className="mainPage-navMenuBottomIcon" />
                    <FaLinkedin className="mainPage-navMenuBottomIcon" />
                    <FaTwitter className="mainPage-navMenuBottomIcon" />
                </div>
            </nav>
            <div className="container ml-3" >
                <div className="row" style={{ display: "flex" }}>
                    <div className="search-bar col-6">
                        <input type="text" placeholder="Search" value={searchTokenPair} onKeyUp={(e) => handleSearchInput(e)} onChange={(e) => setSearchTokenPair(e.target.value)} />
                        <FaSearch className="search-icon" onClick={() => handleSearchTokenPair()} />
                    </div>
                    <div className="connect-button col-6">
                        <button className="mainPageButton">Connect</button>
                    </div>
                </div>
                <div className="row">
                    {
                        (tokenPairResults && tokenPairResults.length > 0) &&
                        <>
                            <h3 className="results-head">
                                {activeTokenPair === "token" ? `Token Search Results` : activeTokenPair === "pair" ? `Pair Search Results` : ""}
                            </h3>
                            <div className="card-grid">
                                {tokenPairResults.map((tokenPair, index) => (
                                    <>
                                        <div className="card" key={"basic" + index}>
                                            <h5>Basic Info</h5>
                                            {
                                                tokenPair.pairCreatedAt &&
                                                <p>Pair Created at
                                                    <span style={{ float: "right" }}> {tokenPair.pairCreatedAt}</span>
                                                </p>
                                            }
                                            {
                                                tokenPair.chainId &&
                                                <p>Symbol
                                                    <span style={{ float: "right" }}> {tokenPair.chainId}</span>
                                                </p>
                                            }
                                            {
                                                tokenPair.dexId &&
                                                <p>Dex ID
                                                    <span style={{ float: "right" }}> #{tokenPair.dexId.length > 4 && (tokenPair.dexId).substring(0, 4)}</span>
                                                </p>

                                            }
                                            {
                                                tokenPair.pairAddress &&
                                                <p>Pair Address
                                                    <span style={{ float: "right" }}> #{(tokenPair.pairAddress).substring(0, 4)}</span>
                                                </p>
                                            }
                                        </div>
                                        {
                                            tokenPair.baseToken &&
                                            <div className="card" key={"basicTok" + index}>
                                                <h5>Base Token</h5>
                                                {
                                                    tokenPair.baseToken.name &&
                                                    <p>Name
                                                        <span style={{ float: "right" }}> {tokenPair.baseToken.name}</span>
                                                    </p>
                                                }
                                                {
                                                    tokenPair.baseToken.symbol &&
                                                    <p>Symbol
                                                        <span style={{ float: "right" }}> {tokenPair.baseToken.symbol}</span>
                                                    </p>
                                                }
                                                {
                                                    tokenPair.baseToken.address &&
                                                    <p>Address
                                                        <span style={{ float: "right" }}> #{(tokenPair.baseToken.address).substring(0, 4)}</span>
                                                    </p>
                                                }
                                            </div>
                                        }
                                        {
                                            tokenPair.quoteToken &&
                                            <div className="card" key={"quoteTok" + index}>
                                                <h5>Quote Token</h5>
                                                {
                                                    tokenPair.quoteToken.name &&
                                                    <p>Name
                                                        <span style={{ float: "right" }}> {tokenPair.quoteToken.name}</span>
                                                    </p>
                                                }
                                                {
                                                    tokenPair.quoteToken.symbol &&
                                                    <p>Symbol
                                                        <span style={{ float: "right" }}> {tokenPair.quoteToken.symbol}</span>
                                                    </p>
                                                }
                                                {
                                                    tokenPair.quoteToken.address &&
                                                    <p>Address
                                                        <span style={{ float: "right" }}> #{(tokenPair.quoteToken.address).substring(0, 4)}</span>
                                                    </p>
                                                }
                                            </div>
                                        }
                                        {
                                            <div className="card" key={"prc" + index}>
                                                <h5>Price</h5>
                                                {
                                                    tokenPair.priceNative &&
                                                    <p>Price Native
                                                        <span style={{ float: "right" }}> ETH {parseFloat(tokenPair.priceNative).toFixed(2)}</span>
                                                    </p>
                                                }
                                                {
                                                    tokenPair.priceUsd &&
                                                    <p>Price USD
                                                        <span style={{ float: "right" }}> {parseFloat(tokenPair.priceUsd).toFixed(1)}m</span>
                                                    </p>
                                                }
                                            </div>
                                        }
                                    </>
                                ))}
                            </div>
                        </>
                    }
                </div>
            </div>
            <footer className="mainFooter"> </footer>
        </React.Fragment>
    )
}
export default MainPage;
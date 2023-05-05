"use client"; // this is a client component 👈🏽

import { ethers } from "ethers";
import { useEffect } from "react";
import Web3Modal from "web3modal";

export default function Home() {
  const web3Modal = new Web3Modal({
    network: "rinkeby", //rinkeby | mainnet
    providerOptions: {},
  });

  async function init() {
    /** 1. 連接錢包 */
    const instance = await web3Modal.connect();
    /** 2. web3 provider */
    const provider = new ethers.providers.Web3Provider(instance);
    /** 3. 簽署交易的人 */
    const signer = provider.getSigner();
    /** 4. 簽署人的錢包地址 */
    const address = await signer.getAddress();
    /** 5. 以太幣餘額 */
    const balance = await provider.getBalance(address);
    /** 6. 以太幣餘額格式化 */
    const balanceFormat = `${ethers.utils.formatEther(balance)} ETH`;
    /** 7. 以太坊的 DNS，地址有註冊什麼域名(需購買) MetaMask 連到主網才能查詢的到，測試網會回傳 null */
    const ensAdress = await provider.lookupAddress(address);
    console.log({ address, balanceFormat ,ensAdress});
  }

  useEffect(() => {
    init();
  }, []);

  return <div>Hello Web3 !</div>;
}

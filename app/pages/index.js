import dynamic from 'next/dynamic';
import { ethers } from 'ethers';
import { Button, Input } from '@chakra-ui/react';
import { useState } from 'react';
import { TEST_ADDRESS, TEST_ABI } from '../constants';

const CliqueForm = dynamic(() => import("../components/CliqueForm"), {
  ssr: false,
});

const Navbar = dynamic(() => import("../components/Navbar"), {
  ssr: false,
});

const provider = new ethers.providers.JsonRpcProvider("https://8545-bravo1b9-bugfreebroccol-ghroaspf458.ws-eu67.gitpod.io");
const contract = new ethers.Contract(TEST_ADDRESS, TEST_ABI, provider);

export default function Home() {
  const [name, setName] = useState("");
  const [clique, setClique] = useState([]);

  const getClique = async () => {
    const result = await contract.getClique(name);
    setClique(result);
  };

  return (
    <>
      <Navbar />
      <h1>Clique Manager</h1>
      <Input type="text" onChange={(e) => setName(e.target.value)}></Input>
      <Button onClick={getClique}>Get Clique</Button>
      <p>Clique address: {clique[0]}</p>
      <p>Clique name: {clique[2]}</p>
      <CliqueForm />
    </>
  )
}

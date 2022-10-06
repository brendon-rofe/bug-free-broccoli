import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useState } from 'react';
import { ethers } from 'ethers';
import { TEST_ABI, TEST_ADDRESS } from '../constants';

const walletProvider =  new ethers.providers.Web3Provider(window.ethereum);
const rpcProvider = new ethers.providers.JsonRpcProvider("https://8545-bravo1b9-bugfreebroccol-ghroaspf458.ws-eu67.gitpod.io");
const walletSigner = walletProvider.getSigner();
const rpcSigner = rpcProvider.getSigner();
const privateKey = '0xdf57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e';
const wallet = new ethers.Wallet(privateKey, rpcProvider);
const contract = new ethers.Contract(TEST_ADDRESS, TEST_ABI, rpcProvider);

export default function CliqueForm() {
  const [ address, setAddress ] = useState("");
  const [ name, setName ] = useState("");

  const createClique = async () => {

    const contractWithWallet = contract.connect(walletSigner);
    const tx = await contractWithWallet.createClique(address, name);
    await tx.wait();
    console.log(tx);
    console.log(contractWithWallet);
  }

  const handleCliqueCreation = (event) => {
    event.preventDefault();
    createClique();
  }

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Create a new clique</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool <Link color={'blue.400'}>features</Link> ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <FormControl id="address">
              <FormLabel>clique address</FormLabel>
              <Input type="text" 
              onChange={(e) => setAddress(e.target.value)}/>
            </FormControl>
            <FormControl id="name">
              <FormLabel>clique name</FormLabel>
              <Input type="text" 
              onChange={(e) => setName(e.target.value)}/>
            </FormControl>
            <Stack spacing={10}>
              <Button onClick={handleCliqueCreation}
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
                Create
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
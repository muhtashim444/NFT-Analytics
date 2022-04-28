import * as React from 'react';
import { useState } from 'react';
import MoralisApiAccess from '../src/Service/MoralisApi'
import Collection from './Components/Collection'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { transformNfts } from './Service/utils'

function App() {

  const [ ethAddress, setEthAddress ] = useState("");
  const [ nfts, setNfts ] = useState([]);
  const [ chain, setChain ] = useState('rinkeby');

//Get NFTs associated with given ETH address
  const getNFTs = async () => {
    const moralis = new MoralisApiAccess(chain);
    const nfts = await moralis.getNftsByWalletAddress(ethAddress);
    const validNfts = transformNfts(nfts)
    setNfts([...validNfts])
  }

  const handleChange = (event) => {
    event.preventDefault();
    setEthAddress(event.target.value);
  }

  const handleChainChange = (event) => {
    event.preventDefault();
    setChain(event.target.value);
  }



  return (
  <>
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center', justifyContent: 'space-between', marginTop: 30}}>
    <ToggleButtonGroup
      color="primary"
      value={chain}
      exclusive
      onChange={handleChainChange}
    >
      <ToggleButton value="mainnet">Mainnet</ToggleButton>
      <ToggleButton value="rinkeby">Rinkeby</ToggleButton>

    </ToggleButtonGroup>
    <div style={{ width: '30%',}}>
      <TextField  
        variant="outlined" 
        placeholder="Enter ETH Address"
        value={ethAddress}
      fullWidth
        onChange={handleChange}

      />
    </div>
    <Button style={{marginTop:'10px'}} variant="contained" onClick={getNFTs}>Get NFTs</Button>
    </div>
    <Collection nfts = {nfts} chain={chain}/>
  </>
  );
}

export default App;

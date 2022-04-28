import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import MoralisApiAccess from '../Service/MoralisApi'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  height:680,
  overflow: "auto",
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


export default function BasicModal({ tokenId, contractAddress, open, handleClose, chain }) {

const [ transactions, setTransactions ] = useState([]);

//Fetch transactions records to get historical details about owners and prices
const getHistoricalInfo = async () => {
    const moralis = new MoralisApiAccess(chain);
    const txs = await moralis.getNftTransfersHistory(tokenId,contractAddress);
    setTransactions([...txs])
  }


useEffect( async ()=>{
    await getHistoricalInfo();
},[open])

  return (
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={style}>
          <Typography variant="h6" component="h2">
            NFT's Historical Details:
          </Typography>
          <Typography color="gray" variant="body2">
            Historical owners of this NFT
          </Typography>
          <Typography color="gray" variant="body2">
            Historical price associated with this NFT
          </Typography>
      
          <Grid container direction="column" style={{ margin: '5%'}} spacing={{ xs: 2, md: 2, lg: 2 }} columns={{ xs: 6, sm: 8, md: 12, lg: 12 }}>
          {transactions.map((tx, index) => (
          <Grid item xs={2} sm={4} md={4} lg={4} key={index}>
            <Card style={{ margin: '5px', background:'#F4F4F4'}} sx={{ maxWidth: 500 }} >
                <CardContent>
                    <Typography color="primary" variant="body2" >
                    {'Owner: '}{tx.to_address}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                    {'Price: '}{tx.value / 1000000000000000000} {' ETH'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                    {'Timestamp: '}{tx.block_timestamp}
                    </Typography>
                </CardContent>
            </Card>

          </Grid>
        ))}
      </Grid>
        </Box>
      </Modal>
  );
}
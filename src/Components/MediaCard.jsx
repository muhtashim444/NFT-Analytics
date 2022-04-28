import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from './Modal'

export default function MediaCard({title, description, image, tokenId, contractAddress, chain}) {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Card style={{ margin: '5px', background:'#F4F4F4'}} sx={{ maxWidth: 365 }} >
      <Modal open={open} handleClose={handleClose}  tokenId={tokenId} contractAddress={contractAddress} chain={chain}/>
      <CardMedia
        component="img"
        height="200"
        image={image}
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={handleOpen} size="small">View Historical Details</Button>
      </CardActions>
    </Card>
  );
}

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid white',
    'text-align': 'center',
    boxShadow: 24,
    p: 4,
  };


export default function MuiModal({ open, setOpen, title, text, submitFunction }: any) {

    const handleSubmit = () => {
        submitFunction()
        setOpen(false)
    }

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
        >
            <Box sx={{ ...style}}>
                <h2 id="parent-modal-title">{title}</h2>
                <br />
                <p id="parent-modal-description">
                    {text}
                </p>
                <br />
                <Button onClick={handleSubmit}>Подтвердить</Button>
            </Box>
        </Modal>
    );
}

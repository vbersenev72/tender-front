import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';

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


export default function MuiModal({ open, setOpen, title, text, submitFunction, buttonText, emailChange, showEmailInput, placeholder }: any) {

    const handleSubmit = () => {
        submitFunction()
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
            <Box sx={{ ...style }}>
                <h2 id="parent-modal-title">{title}</h2>
                <br />
                <p id="parent-modal-description">
                    {text}
                </p>
                {
                    showEmailInput
                    &&
                    <>

                        <br />
                        <TextField
                            id="standard-multiline-flexible"
                            label={!placeholder ? 'Email' : '' }
                            placeholder={!placeholder ? 'Введите email' : placeholder }
                            variant="standard"

                            style={{ width: '80%' }}
                            onChange={(e: any) => emailChange(e.target.value)}
                        />
                        <br />
                    </>
                }
                <br />
                <Button onClick={handleSubmit}>{buttonText}</Button>
            </Box>
        </Modal>
    );
}

'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { FormControl, FormLabel, Input, Stack } from '@mui/material';
import { CommentSchema } from '@/app/utils';
import { toast, Toaster } from 'sonner';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch } from '@/app/redux/hooks';
import { createComment } from '@/app/redux/thunks/comment.thunk';

type Comment = z.infer<typeof CommentSchema>;

export default function AddComment({ feedbackId }: { feedbackId: number }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useAppDispatch();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<Comment>({
    resolver: zodResolver(CommentSchema)
  });

  const submitData = (data: Comment) => {
    const feedback_id = Number(feedbackId);
    console.log(data); 
    dispatch(createComment({ ...data, feedback_id })).unwrap();
    toast.success("Comment created successfully!");
    reset();
  };

  return (
    <div>
      <Button variant='contained' onClick={handleOpen}>Add Comment</Button>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
            Add a Comment
          </Typography>
          <form onSubmit={handleSubmit(submitData)}>
            <Stack spacing={2}>
              <FormControl>
                <FormLabel>Comment</FormLabel>
                <Input
                  autoFocus
                  fullWidth
                  {...register("content")}
                  error={!!errors.content}
                />
                <Typography color="error" variant="caption">
                  {errors.content?.message}
                </Typography>
                <Button variant='contained' size='small' type='submit' sx={{ mt: 2 }}>Add</Button>
              </FormControl>
            </Stack>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormLabel, Input, Stack, TextField } from '@mui/material';
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

export default function AddComment({ feedbackId, open, onClose }: { feedbackId: number, open: boolean; onClose: () => void }) {

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
    <Dialog open={open} onClose={onClose}>
      <DialogTitle> Please enter your comment </DialogTitle>
      <DialogContent>

        <form onSubmit={handleSubmit(submitData)} id="login-form">
          <TextField
            id="outlined-multiline-flexible"
            label="comment"
            multiline
            maxRows={4}
          />

        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button type="submit" form="login-form">Add</Button>
      </DialogActions>
    </Dialog>
  );
}
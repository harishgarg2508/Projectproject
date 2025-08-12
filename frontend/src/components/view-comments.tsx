'use client';
import { useAppSelector } from '@/app/redux/hooks';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import React from 'react';
import { CommentSection } from 'react-comments-section';
import 'react-comments-section/dist/index.css';

const ViewComment = ({ open, onClose }: { open: boolean; onClose: () => void }) => {

    const user = useAppSelector((state) => state.user);

    const comments = useAppSelector((state) => state.feedback.feedbacks);
  const data = [
    {
      userId: '02b',
      comId: '017',
      fullName: 'Harish',
      userProfile: 'https://www.linkedin.com/in/riya-negi-8879631a9/',
      text: 'This is a test comment',
      timestamp: '2024-09-28T10:34:56Z',
      avatarUrl: 'https://ui-avatars.com/api/name=Lily&background=random',
      replies: [
        {
          userId: '03b',
          comId: '017',
          fullName: 'User2',
          userProfile: 'https://www.linkedin.com/in/riya-negi-8879631a9/',
          text: 'This is a nested comment',
          timestamp: '2024-09-28T10:34:56Z',
          avatarUrl: 'https://ui-avatars.com/api/name=Lily&background=random',
        }
      ],
    },
   
  ];

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Please enter your comment</DialogTitle>
      <DialogContent>
        <CommentSection
          currentUser={{
            currentUserId: user.userId,
            currentUserImg: 'https://ui-avatars.com/api/name=Riya&background=random',
            currentUserProfile: 'https://www.linkedin.com/in/riya-negi-8879631a9/',
            currentUserFullName: user.name,
          }}
          logIn={{
            onLogin: () => alert('Call login function'),
            signUpLink: 'http://localhost:3001/',
          }}
          commentData={data}
                placeHolder="Write a comment..."
          onSubmitAction={(comment:any) => console.log('check submit, ', comment)}
          currentData={(allData:any) => console.log('current data', allData)}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ViewComment;

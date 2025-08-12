'use client'
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import { Chip, FormControl, InputLabel, MenuItem, Paper, Select, Stack } from '@mui/material';
import { FeedbackInterface } from '@/app/redux/slices/feedback.slice';
import AddComment from './add-comment';
import { useAppDispatch, useAppSelector } from '@/app/redux/hooks';
import { upvoteDownvote } from '@/app/redux/thunks/vote.thunk';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useRouter } from 'next/navigation';
import LoginDialog from './login-dialog';
import { axiosInstance } from '@/app/utils';
import ViewComment from './view-comments';
import { set } from 'lodash';

export default function FeedBackCard(props: FeedbackInterface) {
    const router = useRouter()

    const { userId } = useAppSelector(state => state.user)
    const user_Id = Number(userId)
    const feedbacks = useAppSelector(state => state.feedback.feedbacks)

    const dispatch = useAppDispatch()
    const [open, setOpen] = React.useState(false);
    const [loginDialogOpen, setLoginDialogOpen] = React.useState(false);
    const [setStatus, setSetStatus] = React.useState(props.status);
    const [addCommentOpen, setAddCommentOpen] = React.useState(false);
    const [viewCommentOpen, setViewCommentOpen] = React.useState(false);
    const [feedbackScore, setFeedbackScore] = React.useState(props.score);

    const [loginDialog, setLoginDialog] = React.useState(false);
    const [voteStatus, setVoteStatus] = React.useState<null | 'UPVOTE' | 'DOWNVOTE'>(null);

    const handleUpvote = () => {
        if (!user_Id) {
            setLoginDialogOpen(true);
            return;
        }
        if (voteStatus === 'UPVOTE') return; 

        let newScore = feedbackScore;
        if (voteStatus === 'DOWNVOTE') {
            newScore += 2; 
        } else {
            newScore += 1;
        }
        setFeedbackScore(newScore);

        setVoteStatus('UPVOTE');
        dispatch(upvoteDownvote({ feedback_id: props.id, voteType: 'UPVOTE' }));
    };

    const handleDownvote = () => {
        if (!user_Id) {
            setLoginDialogOpen(true);
            return;
        }
        if (voteStatus === 'DOWNVOTE') return; 

        let newScore = feedbackScore;
        if (voteStatus === 'UPVOTE') {
            newScore -= 2; 
        } else {
            newScore -= 1;
        }
        setFeedbackScore(newScore);

        setVoteStatus('DOWNVOTE');
        dispatch(upvoteDownvote({ feedback_id: props.id, voteType: 'DOWNVOTE' }));
    };


    const { title, description, created_at, id, score, status, tags, user } = props

    const handleViewComments = () => {
        if (!user_Id) {
            setLoginDialogOpen(true);
        } else {
            setViewCommentOpen(true);
        }
    };

    const handleAddComments = () => {
        if (!user_Id) {
            setLoginDialogOpen(true);
        } else {
            setAddCommentOpen(true);
        }
    };




    const displayTime = () => {
        const date = new Date(created_at);
        const now = new Date();
        const diffInHours = Math.abs(now.getTime() - date.getTime()) / (60 * 60 * 1000);
        const hoursAgo = Math.floor(diffInHours);
        if (hoursAgo === 0) {
            return 'Just now'
        } else if (hoursAgo === 1) {
            return '1 hour ago'
        } else if (hoursAgo < 24) {
            return `${hoursAgo} hours ago`
        }
        return 'More than 24 hours ago';
    };


    const handleToggleStatus = async () => {

        if (setStatus === 'PUBLIC') {
            setSetStatus('PRIVATE')
            // await axiosInstance.put(`/feedbacks/${id}/status`, { status: setStatus })
        }
        else {
            setSetStatus('PUBLIC')
        }


    };


    return (

        <Stack direction={'row'} spacing={1} sx={{ padding: 5, margin: 5 }}>
            <Paper sx={{ width: '100%', bgcolor: 'grey', padding: 5 }}>


                <Stack direction={'row'} spacing={2}>
                    <Card sx={{ width: '100%', bgcolor: 'background.paper' }}>
                        <Stack direction={'row'} spacing={2}>

                            <Card sx={{ width: '160px', bgcolor: 'background.paper' }}>


                                <Stack direction={'column'} sx={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <Button
                                        onClick={handleUpvote}
                                        sx={{ padding: 0, margin: 0 }}
                                        disabled={voteStatus === 'UPVOTE'}
                                    >
                                        <ExpandLessIcon fontSize='large' sx={{ fontSize: '120px' }} />
                                    </Button>

                                    <Typography sx={{ padding: 2 }} variant="h1">
                                        {feedbackScore}
                                    </Typography>

                                    <Button
                                        onClick={handleDownvote}
                                        sx={{ padding: 0, margin: 0 }}
                                        disabled={voteStatus === 'DOWNVOTE'}
                                    >
                                        <ExpandMoreIcon fontSize='large' sx={{ fontSize: '120px' }} />
                                    </Button>

                                </Stack>


                            </Card>


                            <Card sx={{ width: '100%', minWidth: '500px', bgcolor: 'background.paper', padding: 4 }}>

                                {user_Id === user?.id && (
                                    <Typography
                                        gutterBottom
                                        variant="h5"
                                        sx={{ color: 'text.secondary', display: 'flex', justifyContent: 'flex-end' }}
                                    >
                                        <Typography onClick={handleToggleStatus} sx={{ cursor: 'pointer' }}>
                                            {setStatus}
                                        </Typography>
                                    </Typography>
                                )}




                                <CardContent>
                                    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>


                                        <ListItem>
                                            <ListItemAvatar>
                                                <Avatar>
                                                    <ImageIcon />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText primary={user?.username} secondary={displayTime()} />
                                        </ListItem>


                                    </List>


                                    <Typography gutterBottom variant="h5" >
                                        {title}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                        {description}
                                    </Typography>


                                </CardContent>



                                <Stack direction={'row'} spacing={2}>
                                    {tags.map((tag) => (
                                        <Chip color='default' sx={{ color: 'blue' }} key={tag.tag.id} label={tag.tag.name} />
                                    ))}
                                </Stack>


                                <CardActions sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <Button onClick={() => (handleAddComments())} size="large">Add comment</Button>
                                    <Button onClick={() => (handleViewComments())} size="large">View comments</Button>
                                </CardActions>


                            </Card>
                        </Stack>


                    </Card>

                </Stack>

            </Paper>
            <AddComment feedbackId={id} open={addCommentOpen} onClose={() => setAddCommentOpen(false)} />
            <ViewComment open={viewCommentOpen} onClose={() => setViewCommentOpen(false)} />
            <LoginDialog
                open={loginDialogOpen}
                onClose={() => setLoginDialogOpen(false)}
            />
        </Stack>


    );
}




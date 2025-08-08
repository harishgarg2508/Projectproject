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
import { Chip, Stack } from '@mui/material';
import { FeedbackInterface } from '@/app/redux/slices/feedback.slice';
import AddComment from './add-comment';
import { useAppDispatch } from '@/app/redux/hooks';
import { upvoteDownvote } from '@/app/redux/thunks/vote.thunk';

export default function FeedBackCard(props: FeedbackInterface) {


    const dispatch = useAppDispatch()
    const [open, setOpen] = React.useState(false);
    const handleUpvote = () => {
        const voteType = 'UPVOTE'
        dispatch(upvoteDownvote({ feedback_id: props.id, voteType }));
    };

      const handleDownvote = () => {
        const voteType = 'DOWNVOTE'
        dispatch(upvoteDownvote({ feedback_id: props.id, voteType }));
    };

    const { title, description, created_at, id, score, status, tags, user } = props
    return (
        <Card sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <CardContent>
                <List sx={{ width: '100%', maxWidth: '50%', bgcolor: 'background.paper' }}>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <ImageIcon />
                            </Avatar>
                        </ListItemAvatar>


                        <ListItemText primary={user?.username} secondary={created_at} />
                    </ListItem>
                    <Chip label={"Score: " + score} />

                </List>

                <Typography gutterBottom variant="h5" component="div">
                    {title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {description}
                </Typography>
            </CardContent>
            <Stack direction={'row'} spacing={2}>
                {tags.map((tag) => (

                    <Chip key={tag.tag.id} label={tag.tag.name} />
                ))}
            </Stack>
            <CardActions>
                <Button variant='contained' size="small">View comments</Button>
                <AddComment feedbackId={id} />

                <Stack direction={'row'} spacing={2}>
                    <Button onClick={handleUpvote} variant='contained' size="small">Upvote</Button>
                    <Button onClick={handleDownvote} variant='contained' size="small">Downvote</Button>

                </Stack>
            </CardActions>




        </Card>
    );
}
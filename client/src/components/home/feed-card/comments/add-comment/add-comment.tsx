'use client'
import { getErrorMessage } from "@/api/api";
import { addCommentAsync } from "@/features/comment/comment.action";
import { useAppDispatch } from "@/features/store";
import { Comment } from "@/type/comment.type";
import { IntegratedUser, User } from "@/type/user.type";
import { Box, Button, Divider, FormLabel, Stack, TextField, Typography } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { Dispatch, SetStateAction, useState } from "react";


type Prop = {
    feedbackId : number,
    parentId ?: number,
    user : IntegratedUser,
    setComments: Dispatch<SetStateAction<Comment[]>>
}
export default function AddComment ({feedbackId, user, parentId, setComments} : Prop) {
    const [text, setText] = useState<string>('')
    const dispatch = useAppDispatch()
    const handleAddComment = async() => {
        try {

            if(!text || text.length < 2) {
                enqueueSnackbar('Enter comment')
                return;
            }
            const result = await dispatch(addCommentAsync({text, feedbackId, parentId})).unwrap()
            setComments((prev)=> [...prev, result])
            enqueueSnackbar('comment has been posted', {variant : 'success'})
            setText('')
        } catch (error) {
            enqueueSnackbar(getErrorMessage(error))
        }
    }



    return (
        <Stack spacing={1}>
            <FormLabel>Reply to {user ? user.username : 'unknown'}</FormLabel>
            <TextField 
                multiline
                rows={4}
                fullWidth
                onChange={(e) => setText(e.target.value)}
            />
            <Box>
                <Button onClick={handleAddComment} variant="outlined">Send</Button>
            </Box>
            <Divider/>
        </Stack>
    )
}
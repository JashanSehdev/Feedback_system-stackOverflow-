"use client";
import { Avatar, Button, CircularProgress, Stack, Typography } from "@mui/material";
import styles from "./comments.module.css";
import AddComment from "./add-comment/add-comment";
import { IntegratedUser } from "@/type/user.type";
import { useAppDispatch } from "@/features/store";
import { Comment as CommentType } from "@/type/comment.type";
import { useEffect, useState } from "react";
import Comment from "./comment/comment";
import { enqueueSnackbar } from "notistack";
import { getErrorMessage } from "@/api/api";
import { getFeedCommentAsync } from "@/features/comment/comment.action";

type Prop = {
  user: IntegratedUser;
  feedbackId: number;
};
export default function Comments({ feedbackId, user }: Prop) {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [comments, setComments] = useState<CommentType[]>([]);
  const [showAddComment, setShowAddComment] = useState<boolean>(false);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true);
        const result = await dispatch(getFeedCommentAsync(feedbackId)).unwrap();
        setComments(result ?? []);
      } catch (error) {
        enqueueSnackbar(getErrorMessage(error), { variant: "error" });
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, []);
  return (
    <Stack direction={"column"} spacing={2} className={styles.container}>
        <Button onClick={() => setShowAddComment(!showAddComment)}>{showAddComment ? 'Discard Comment' : 'Add Comment'}</Button>
      {showAddComment && (
        <AddComment
          setComments={setComments}
          user={user}
          feedbackId={feedbackId}
        />
      )}

      {loading ? (
        <CircularProgress />
      ) : comments && comments.length > 0 ? (
        comments.map((item) => <Comment key={item.id} comment={item} />)
      ) : (
        <Typography>No Comments yet</Typography>
      )}
    </Stack>
  );
}

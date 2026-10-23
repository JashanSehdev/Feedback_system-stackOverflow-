import { Comment as Comment_type } from "@/type/comment.type";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Comment as CommentType } from "@/type/comment.type";
import { format } from "timeago.js";
import AddComment from "../add-comment/add-comment";
import styles from './comment.module.css'

type Prop = {
    comment: Comment_type;
};
export default function Comment({ comment }: Prop) {
  const [showAddComment, setShowAddComment] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [comments, setComments] = useState<CommentType[]>([]);
  console.log("comment: ",comment)
  return (
    <Stack className={styles.container}>
      <Stack spacing={2} direction="row" sx={{ alignItems: "center" }}>
        <Avatar>{comment.user.username.slice(0, 1)}</Avatar>
        <Stack>
          <Typography sx={{ fontWeight: 700 }}>
            {comment.user.username}
          </Typography>
          <Typography color="textSecondary">
            {format(comment.createdAt)}
          </Typography>
        </Stack>
      </Stack>
      <Typography>{comment.text}</Typography>

      <Stack>
        <Stack direction="row" spacing={1} sx={{ justifyContent: "end" }}>
          <Button size="small" variant="outlined">
            show Comment
          </Button>{" "}
          <Button size="small" variant="outlined"
            onClick={() => setShowAddComment(! showAddComment)}
          >
            {
                showAddComment ? 'Stash Comment' : 'Add Comment'
            }
          </Button>
        </Stack>
      </Stack>
      {showAddComment && (
        <AddComment
          setComments={setComments}
          user={comment.user}
          feedbackId={comment.feedbackId}
          parentId={comment.id}
        />
      )}

      <Box>
        {loading ? (
          <CircularProgress />
        ) : comments && comments.length > 0 ? (
          comments.map((item) => <Comment key={item.id} comment={item} />)
        ) : (
          <Typography>No Comments yet</Typography>
        )}
      </Box>
      <Divider />
    </Stack>
  );
}

"use client";
import {
  Avatar,
  Box,
  Button,
  Chip,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import styles from "./feed-card.module.css";
import { Feedback, VoteEnum } from "@/type/feedback.type";
import { format } from "timeago.js";
import { enqueueSnackbar } from "notistack";
import { useAppDispatch } from "@/features/store";
import { setVoteAsync } from "@/features/vote/handle-vote/vote.action";
import { getErrorMessage } from "@/api/api";
import { useState } from "react";
import Comments from "./comments/comments";

export default function FeedCard({ feed }: { feed: Feedback }) {
  const [score, setScore] = useState<number>(feed.score);
  const [showComments, setShowComments] = useState<boolean>(false)
  const dispatch = useAppDispatch();
  const handleUpVote = async () => {
    try {
      const result = await dispatch(
        setVoteAsync({ feedbackId: feed.id, voteType: VoteEnum.up }),
      ).unwrap();
      setScore(result.score);
      enqueueSnackbar(result.message);
    } catch (error) {
      enqueueSnackbar(getErrorMessage(error));
    }
  };

  const handleDownVote = async () => {
    try {
      const result = await dispatch(
        setVoteAsync({ feedbackId: feed.id, voteType: VoteEnum.down }),
      ).unwrap();
      setScore(result.score);
      enqueueSnackbar(result.message);
    } catch (error) {
      enqueueSnackbar(getErrorMessage(error));
    }
  };
  const time = format(feed.createdAt);
  return (
    <Paper className={styles.container}>
      <Stack direction="row" sx={{ alignItems: "center" }}>
        <Stack sx={{ alignItems: "center" }}>
          <IconButton>
            <ExpandLessIcon className={styles.icons} onClick={handleUpVote} />
          </IconButton>
          <Typography variant="h2">{score}</Typography>
          <IconButton>
            <KeyboardArrowDownIcon
              className={styles.icons}
              onClick={handleDownVote}
            />
          </IconButton>
        </Stack>
        <Stack spacing={2}>
          <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
            <Avatar>{feed.user.username.slice(0, 1)}</Avatar>
            <Stack>
              <Typography variant="h6" sx={{ fontWeight: "700" }}>
                {feed.user.username}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                {time}
              </Typography>
            </Stack>
          </Stack>

          <Typography variant="h6" sx={{ fontWeight: "800" }}>
            {feed.title}
          </Typography>
          <Typography className={styles.description}>
            {feed.description}
          </Typography>
          <Stack spacing={2}>
            {feed.tags?.map((item) => (
              <Chip
                key={item.tag.id}
                label={item.tag.name}
                className={styles.chips}
              />
            ))}
          </Stack>
        {/* comments below */}
        <Stack direction={'row'} spacing={2} sx={{justifyContent: 'end'}}>
            <Button onClick={() => setShowComments(!showComments)}>
              {showComments ? 'Hide comments' : 'Show comments'}
            </Button>
            
        </Stack>
        </Stack>
      </Stack>
      {
        showComments &&  <Comments user={feed.user} feedbackId={feed.id}/>
      }
      
    </Paper>
  );
}

"use client";
import { fetchFeedbacksAsync } from "@/features/feedback/handle-feedback/feedback.action";
import { useAppDispatch } from "@/features/store";
import { Feedback } from "@/type/feedback.type";
import { CircularProgress, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import FeedCard from "../feed-card/feed-card";

export default function FeedList() {
  const [feeds, setFeeds] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const fetchFeed = async () => {
      try {
        setLoading(true)
        const result = await dispatch(fetchFeedbacksAsync()).unwrap();
        setFeeds(result);
      } catch (error) {
        console.error(error);
      } finally{
        setLoading(false)
      }
    };

    fetchFeed()
  },[dispatch]);

  return (
    <Stack spacing={2}>
        { loading ? <CircularProgress/> :
            feeds.map((feed) => (
                <FeedCard feed={feed} key={feed.id} />
            ))
        }
    </Stack>
  )
}

import { Avatar, Box, Chip, IconButton, Stack, Typography } from "@mui/material";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import styles from "./feed-card.module.css";
import { Feedback } from "@/type/feedback.type";
import { format } from 'timeago.js';


export default function FeedCard({ feed }: { readonly feed: Feedback }) {

    if(!feed){
            return (<Box></Box>)
        }

        const time = format(feed.createdAt)
  return (
    <Box className={styles.container}>
      <Stack direction="row" sx={{ alignItems: "center" }}>
        <Stack sx={{ alignItems: "center" }}>
          <IconButton>
            <ExpandLessIcon className={styles.icons} />
          </IconButton>
          <Typography variant="h2">{feed.score}</Typography>
          <IconButton>
            <KeyboardArrowDownIcon className={styles.icons} />
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
          <Typography className={styles.description}>{feed.description}</Typography>
          <Stack spacing={2}>
            {
                feed.tags?.map((item) => (
                    <Chip key={item.tag.id} label={item.tag.name} className={styles.chips} />
                ))
            }
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}

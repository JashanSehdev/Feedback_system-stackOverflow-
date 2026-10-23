"use client";
import {
  Box,
  Button,
  Chip,
  FormControl,
  FormControlLabel,
  InputLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import styles from "./create-feedback.module.css";
import { FeedbackInputs, feedbackSchema, FeedStatus } from "./create-feedback.type";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TagsBox from "./tags-box/tags-box";
import { useState } from "react";
import { error } from "console";
import { useAppDispatch } from "@/features/store";
import { postFeedbackAsync } from "@/features/feedback/handle-feedback/feedback.action";
import { enqueueSnackbar } from "notistack";
import { useRouter } from "next/navigation";

export default function CreateFeedback() {
  const [search, setSearch] = useState<string>("");
  const router = useRouter()
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm<FeedbackInputs>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      status: FeedStatus.PUBLIC,
      tags: [],
    },
  });


  const handleCancel = () => {
    router.replace("/")
  }

  const onSubmit: SubmitHandler<FeedbackInputs> = async (data) => {
    try {
      const result = await dispatch(postFeedbackAsync(data)).unwrap();

      enqueueSnackbar("feedback posted", result.title);
      router.replace("/")
    } catch (error) {
      console.error("Error while fetching data", error);
    }
  };
  console.log(watch("tags"));
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
      <Stack spacing={2}>
        <Typography variant="h2">Ask Question</Typography>

        <Stack>
          <Typography variant="h6" sx={{ fontWeight: "700" }}>
            Title
          </Typography>
          <InputLabel>
            {`Be specific and imagine you’re asking a question to another person. Min 15 characters.`}
          </InputLabel>
          <TextField
            error={!!errors.title}
            helperText={errors.title?.message}
            {...register("title")}
          />
        </Stack>

        <Stack>
          <Typography variant="h6" sx={{ fontWeight: "700" }}>
            Description
          </Typography>
          <InputLabel>
            Include all the information someone would need to answer your question. Min 220
            characters.
          </InputLabel>
          <TextField
            multiline
            rows={7}
            error={!!errors.description}
            helperText={errors.description?.message}
            {...register("description")}
          />
        </Stack>

        <Stack>
          <Typography variant="h6" sx={{ fontWeight: "700" }}>
            Tags
          </Typography>
          <InputLabel>
            Add up tags to describe what your question is about. Start typing to see
            suggestions.
          </InputLabel>
          <TextField
            error={!!errors.tags}
            helperText={!!errors.tags?.message}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && <TagsBox search={search} watch={watch} setValue={setValue} />}
          {watch("tags") && (
            <Box>
              {watch("tags").map((tag) => (
                <Chip
                  key={tag.id}
                  label={tag.name}
                  onDelete={() =>
                    setValue(
                      "tags",
                      watch("tags").filter((prev) => prev.name !== tag.name),
                    )
                  }
                />
              ))}
            </Box>
          )}
        </Stack>

        <Stack>
          <Typography variant="h6" sx={{ fontWeight: "700" }}>
            Select where your question should be posted.
          </Typography>
          <InputLabel>
            {`You have an option to get community feedback to improve your question before it's
            publicly posted.`}
          </InputLabel>
          <FormControl>
            <FormControl>
              <Controller
                name="status"
                control={control} // Ensure you destructure 'control' from useForm() at the top
                render={({ field }) => (
                  <RadioGroup {...field}>
                    <FormControlLabel
                      value={FeedStatus.PRIVATE}
                      control={<Radio />}
                      label="Private"
                    />
                    <FormControlLabel
                      value={FeedStatus.PUBLIC}
                      control={<Radio />}
                      label="Public"
                    />
                  </RadioGroup>
                )}
              />
            </FormControl>
          </FormControl>
        </Stack>
        <Stack direction={'row'} spacing={3}>
                <Button variant="contained" className={styles.button} type="submit">
          Submit
        </Button>
        <Button variant="outlined" className={styles.button} onClick={handleCancel}>
          Cancel
        </Button>
        </Stack>
        
      </Stack>
    </form>
  );
}

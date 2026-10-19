"use client";
import { useAppDispatch } from "@/features/store";
import { createTagAsync, fetchTagsAsync } from "@/features/tag/tag.action";
import { Tag } from "@/type/tag.type";
import { Button, Chip, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { FeedbackInputs } from "../create-feedback.type";
import { UseFormSetValue, UseFormWatch } from "react-hook-form";
import styles from './tags-box.module.css'

type Prop = {
  setValue: UseFormSetValue<FeedbackInputs>;
  search: string;
  watch: UseFormWatch<FeedbackInputs>;
};
export default function TagsBox({ search, setValue, watch }: Prop) {
  const [tags, setTags] = useState<Tag[]>([]);

  const dispatch = useAppDispatch();
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const result = await dispatch(fetchTagsAsync(search)).unwrap();
        if (result && Array.isArray(result)) {
          setTags(result);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchTags();
  }, [search, dispatch]);

  const handleTags = (tag: Tag) => {
    if (watch("tags").some((item) => item.name === tag.name)) return;

    setValue("tags", [...watch("tags"), tag]);
  };

  const handleCreateTag = async() => {
    try {
      const result = await dispatch(createTagAsync(search)).unwrap()
      if(result) setTags((prev) => [...prev, result])
      
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <Paper className={styles.container} >
      { tags.length === 0 ? <Button variant="outlined" onClick={handleCreateTag}>Create Tag</Button>
      
       : tags.map((tag: Tag) => (
        <Chip key={tag.id} label={tag.name} clickable onClick={() => handleTags(tag)} />
      ))}
    </Paper>
  );
}

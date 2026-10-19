'use client'
import { Box, Button, Container } from "@mui/material";
import FeedList from "./feed-list/feed-list";
import {redirect} from 'next/navigation'
import { useAppSelector } from "@/features/store";
import { enqueueSnackbar } from "notistack";

export default function Feed () {
    const user = useAppSelector((state) => state.auth.user)
    const handleAsk = async() => {
        if (!user){
            enqueueSnackbar('Login required');
            redirect("/login")
        }

        redirect("/create")
    } 
    return (
        <Container sx={{mt:'4rem'}}>
            <Button size="large" variant="contained" onClick={handleAsk}>
                Ask
            </Button>
                <FeedList/>
        </Container>
    )
}
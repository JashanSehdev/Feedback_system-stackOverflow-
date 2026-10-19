"use client";
import { logoutMeAsync } from "@/features/auth/handle-auth/auth.action";
import { useAppDispatch, useAppSelector } from "@/features/store";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await dispatch(logoutMeAsync());

      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Box sx={{ mb: "1rem" }}>
      <Container>
        <Stack direction={"row"} sx={{ justifyContent: "space-between" }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700, cursor :'pointer' }} onClick={() => router.replace("/")}>
              STACK OVERFLOW
            </Typography>
          </Box>

          <Stack direction={"row"} sx={{ alignItems: "center" }} spacing={2}>
            {user ? (
              <>
                <Typography color="primary">{user.email}</Typography>
                <Button color="secondary" variant="contained" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href={"/login"}>
                  <Button variant="outlined" color="secondary">Login</Button>
                </Link>

                <Link href={"/register"}>
                  <Button variant="outlined">Register</Button>
                </Link>
              </>
            )}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}

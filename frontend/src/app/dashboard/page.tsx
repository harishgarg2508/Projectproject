'use client';

import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getFeedback } from "../redux/thunks/feedback.thunk";
import FeedBackCard from "@/components/feedback-card";
import {
  Box,
  CircularProgress,
  Stack,
  Card,
  CardContent,
  TextField,
  Button,
  Pagination,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import debounce from "lodash/debounce";
import { logout } from "../redux/slices/user.slice";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import AddTags from "@/components/add-tags";
import AddUsers from "@/components/add-users";
import CreateFeedback from "@/components/create-feedback";

export default function DashboardPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [openFeedbackDialog, setOpenFeedbackDialog] = useState(false);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    search: "",
    page: 1,
    orderby: "ASC",
  });

  const { feedbacks, totalCount, error, isLoading } = useAppSelector(
    (state) => state.feedback
  );
  const user = useAppSelector((state) => state.user.token);

  const totalPages = Math.ceil((totalCount || 0) / 10);

  useEffect(() => {
    setFilters((prev) => ({ ...prev, page }));
  }, [page]);

  useEffect(() => {
    dispatch(getFeedback(filters));
  }, [filters, dispatch]);

  const debouncedDispatch = useCallback(
    debounce((nextFilters) => {
      dispatch(getFeedback(nextFilters));
    }, 500),
    [dispatch]
  );

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value, page: 1 };
    setPage(1);
    setFilters(newFilters);
    debouncedDispatch(newFilters);
  };

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const handleLogout = () => {
    dispatch(logout());
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    router.push("/login");
    toast.success("Logged out successfully");
  };

  const signUp = () => router.push("/signup");
  const login = () => router.push("/login");

  return (
    <>
      <Box>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"

          mb={2}
        >
          <h1 style={{ textAlign: "center" }}>Dashboard</h1>
          <Stack direction="row" spacing={2}>
            {user && (
              <Button
                color="success"
                variant="contained"
                onClick={() => setOpenFeedbackDialog(true)}
              >
                Create Feedback
              </Button>
            )}
            {user && (
              <Button color="error" variant="contained" onClick={handleLogout}>
                LogOut
              </Button>
            )}
            {!user && (
              <>
                <Button color="success" variant="contained" onClick={signUp}>
                  SignUp
                </Button>
                <Button color="success" variant="contained" onClick={login}>
                  Login
                </Button>
              </>
            )}
          </Stack>
        </Stack>

        <Card variant="outlined" >
          <Stack direction={"row"} spacing={2}>

            <CardContent>
              <Stack
                direction={"row"}
                alignContent={"center"}
                spacing={2}
                sx={{ mt: 2, minWidth: "50%" }}
              >
                <TextField
                  name="search"
                  label="Search by Title"
                  variant="outlined"
                  size="small"
                  value={filters.search}
                  onChange={handleFilterChange}
                  sx={{ minWidth: "200px", flexGrow: 1 }}
                />
                <AddTags />
                <AddUsers />
              </Stack>


            </CardContent>
          </Stack>
        </Card>
      </Box>



      {isLoading ? (
        <Box display="flex" justifyContent="center" mt={5}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {error && <p style={{ color: "red" }}>{error}</p>}

          <Card variant="outlined" sx={{ width: "100%", p: 2 }}>
            <CardContent>
              <Stack
                direction="column"
                alignItems="center"
                justifyContent="center" 
                spacing={2}
                sx={{ padding: 2, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap"}}

              >
                {(feedbacks || []).map((feedback) => (
                  <FeedBackCard key={feedback.id} {...feedback} />
                ))}
              </Stack>
            </CardContent>
          </Card>

          {totalPages > 1 && (
            <Stack
              direction="row"
              justifyContent="center"
              spacing={2}
              mt={4}
            >
              <Pagination
                count={totalPages}
                page={page}
                color="primary"
                onChange={handlePageChange}
              />
            </Stack>
          )}
        </>
      )}

      <Dialog
        open={openFeedbackDialog}
        onClose={() => setOpenFeedbackDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Create Feedback</DialogTitle>
        <DialogContent>
          <CreateFeedback />
        </DialogContent>
      </Dialog>
    </>
  );
}

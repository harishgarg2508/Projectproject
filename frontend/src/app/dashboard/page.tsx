'use client'
import Pagination from "@mui/material/Pagination";

import { use, useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getFeedback } from "../redux/thunks/feedback.thunk";
import FeedBackCard from "@/components/feedback-card";
import { Box, CircularProgress, Stack, Card, CardContent, TextField, Button, } from "@mui/material";
import debounce from "lodash/debounce";
import { logout } from "../redux/slices/user.slice";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function DashboardPage() {

  const[page, setPage] = useState(1)
  const router = useRouter()

  const dispatch = useAppDispatch()
   const [filters, setFilters] = useState({
    search: "",
    page,
  });
  const user = useAppSelector(state => state.user.token)

    useEffect(() => {
    dispatch(getFeedback(filters));
  }, []);

   const debouncedDispatch = useCallback(
    debounce((queryFilters) => {
      const combinedFilters = {
        ...queryFilters,
        
      };
      dispatch(getFeedback(combinedFilters));
    }, 500),
    [page,dispatch]
  );

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value, page: 1 };
    setFilters(newFilters);
    debouncedDispatch(newFilters);
  };

    const defaultFilters = {
    search: "",
    startTime: "",
    endTime: "",
    page: 1,
  };

  const { feedbacks, error, isLoading } = useAppSelector(state => state.feedback)
  console.log(feedbacks);

  const count = feedbacks.length;
  const totalPages = Math.ceil(count / 10);

  const handleLogout = () => {
    dispatch(logout());
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    router.push("/login");
    toast.success("Logged out successfully");
  };
  const signUp = () => {
    router.push("/signup");
  };

  const login = () => {
    router.push("/login");
  };

  return (
    <>

      <Box>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
          <h1 style={{ textAlign: "center" }}>Dashboard</h1>
          <Stack direction="row" spacing={2}>
         {user && <Button color="error" variant="contained" onClick={handleLogout}>
            LogOut
          </Button>}
           <Button color="success" variant="contained" onClick={signUp}>
            SignUp
          </Button>
           <Button color="success" variant="contained" onClick={login}>
            Login
          </Button>

            </Stack>
        </Stack>
        <h1 style={{ textAlign: "center" }}>Dashboard</h1>
       

        <Card>
          <CardContent>
            <TextField
              name="search"
              label="Search by Title"
              variant="outlined"
              size="small"
              value={filters.search}
              onChange={handleFilterChange}
              sx={{ minWidth: "200px", flexGrow: 1 }}
            />
          </CardContent>
        </Card>

      </Box>
      {isLoading ? (
        <Box display="flex" justifyContent="center" mt={5}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {error && <p>{error}</p>}
          <Card variant="outlined" sx={{width: "100%", mb: 4, p: 2 }}>
            <CardContent>

              <Stack direction={'column'} spacing={2} sx={{ width: "40%", xs: "column", md: "row", padding: 2, mb: 5 }} flexWrap="wrap">
                {feedbacks.map((feedback) => (
                  <FeedBackCard key={feedback.id} {...feedback} />
                ))}
              </Stack>
               {feedbacks.length > 0 && totalPages > 1 && (
            <Stack direction="row" justifyContent="center" spacing={2} mt={4}>
              <Pagination
                count={totalPages}
                page={6}
                color="primary"
              />
            </Stack>
          )}



            </CardContent>
          </Card>
        </>

      )}
    </>
  );
}
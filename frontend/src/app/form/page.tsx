"use client";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
// import { useAppDispatch } from "@/app/redux/hooks";
// import { createTask } from "@/app/redux/thunks/createTask.thunk";
import { toast } from "sonner";

const taskSchema = z
  .object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    startTime: z
      .string()
      .min(1, "Start time is required")
      .refine(
        (val) => new Date(val) >= new Date(),
        { message: "Start time cannot be in the past" }
      ),
    endTime: z.string().min(1, "End time is required"),
  })
  .refine(
    (data) => new Date(data.endTime) >= new Date(data.startTime),
    {
      message: "End time must be after start time",
      path: ["endTime"],
    }
  );

  type TaskFormType = z.infer<typeof taskSchema>;

interface CreateTaskDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function CreateTaskDialog({
  open,
  onClose,
}: CreateTaskDialogProps) {
  // const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TaskFormType>({
    resolver: zodResolver(taskSchema),
  });

  const handleCloseDialog = () => {
    reset();
    onClose();
  };

  const onSubmit = async (data: TaskFormType) => {
    try {
      console.log("Creating task with data:", data);

      // await dispatch(createTask(data)).unwrap();
      // toast.success("Task created successfully!");
      // You can reload or refetch tasks after dispatch
      handleCloseDialog();
    } catch (error) {
      toast.error("Failed to create task.");
    }
  };

  return (
    <Dialog open={open} onClose={handleCloseDialog} fullWidth maxWidth="sm">
      <DialogTitle>Create New Task</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Stack spacing={2} pt={1}>
            <TextField
              label="Title"
              {...register("title")}
              error={!!errors.title}
              helperText={errors.title?.message}
              fullWidth
            />
            <TextField
              label="Description"
              {...register("description")}
              error={!!errors.description}
              helperText={errors.description?.message}
              fullWidth
            />
            <TextField
              type="datetime-local"
              label="Start Time"
              {...register("startTime")}
              error={!!errors.startTime}
              helperText={errors.startTime?.message}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
            <TextField
              type="datetime-local"
              label="End Time"
              {...register("endTime")}
              error={!!errors.endTime}
              helperText={errors.endTime?.message}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create Task"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

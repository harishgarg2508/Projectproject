"use client";
import {
  Box,
  Modal,
  Typography,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

const taskSchema = z
  .object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    startTime: z
      .string()
      .min(1, "Start time is required")
      .refine((val) => new Date(val) >= new Date(), {
        message: "Start time cannot be in the past",
      }),
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

interface CreateTaskModalProps {
  open: boolean;
  onClose: () => void;
}

export default function CreateTaskModal({ open, onClose }: CreateTaskModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TaskFormType>({
    resolver: zodResolver(taskSchema),
  });

  const onSubmit = async (data: TaskFormType) => {
    try {
      console.log("Creating task with data:", data);
      toast.success("Task created successfully!");
      reset();
      onClose();
    } catch (error) {
      toast.error("Failed to create task.");
    }
  };

  const style = {
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style} component="form" onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h6" mb={2}>
          Create New Task
        </Typography>

        <Stack spacing={2}>
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

        <Stack direction="row" justifyContent="flex-end" mt={3} spacing={2}>
          <Button onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create Task"}
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
}

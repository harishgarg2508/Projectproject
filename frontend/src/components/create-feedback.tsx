'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { feedbackSchema } from '@/app/utils';
import { z } from 'zod';
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select as MUISelect,
  TextField,
  Typography,
  Button,
} from '@mui/material';
import CreatableSelect from 'react-select/creatable';
import makeAnimated from 'react-select/animated';
import { useAppDispatch, useAppSelector } from '@/app/redux/hooks';
import { getTags } from '@/app/redux/thunks/tags.thunk';
import { useEffect, useMemo, useState } from 'react';
import { createFeedback } from '@/app/redux/thunks/add-feedback.thunk';
import { useRouter } from 'next/navigation';

type TagOption = {
  label: string;
  value: string;
};

type FeedbackFormValues = z.infer<typeof feedbackSchema>;

const animatedComponents = makeAnimated();

export default function CreateFeedback() {
  const dispatch = useAppDispatch();
  const { tags, isLoading } = useAppSelector((state) => state.tags);

  const router = useRouter()
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<FeedbackFormValues>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      tagNames: [],
    },
  });

  useEffect(() => {
    dispatch(getTags());
  }, [dispatch]);

  const tagOptions: TagOption[] = useMemo(
    () =>
      tags.map((tag) => ({
        value: tag.name,
        label: tag.name,
      })),
    [tags]
  );

  const onSubmit = (data: FeedbackFormValues) => {
    dispatch(createFeedback(data))
    console.log('Form Values:', data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 2,
        }}
      >
        <TextField
          {...register('title')}
          label="Title *"
          fullWidth
          margin="normal"
          error={!!errors.title}
          helperText={errors.title?.message}
          placeholder="Enter title"
        />

        <TextField
          {...register('description')}
          label="Description *"
          fullWidth
          margin="normal"
          error={!!errors.description}
          helperText={errors.description?.message}
          placeholder="Enter description"
        />

        <Controller
          control={control}
          name="status"
          render={({ field }) => (
            <FormControl fullWidth margin="normal" error={!!errors.status}>
              <InputLabel>Status </InputLabel>
              <MUISelect {...field} label="Status" defaultValue='PUBLIC'>
                <MenuItem value="PUBLIC">PUBLIC</MenuItem>
                <MenuItem value="PRIVATE">PRIVATE</MenuItem>
              </MUISelect>
              {errors.status && (
                <Typography variant="caption" color="error">
                  {errors.status.message}
                </Typography>
              )}
            </FormControl>
          )}
        />

        <Controller
          control={control}
          name="tagNames"
          render={({ field: { onChange, value, ref } }) => (
            <CreatableSelect<TagOption, true>
              isMulti
              isLoading={isLoading}
              closeMenuOnSelect={false}
              components={animatedComponents}
              options={tagOptions}
              value={value?.map((tagName) => ({ label: tagName, value: tagName })) || []}
              onChange={(selected) => {
                const tagNames = selected.map((tag) => tag.value);
                onChange(tagNames); // Pass string[] to form state
              }}
              placeholder="Select or create tags"
            />
          )}
        />
      </Box>

      <Box mt={2}>
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </Box>
    </form>
  );
}

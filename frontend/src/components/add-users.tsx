'use client'

import { useAppDispatch, useAppSelector } from '@/app/redux/hooks';
import { useEffect, useMemo, useState } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { Button, Stack } from '@mui/material';
import { getFeedback } from '@/app/redux/thunks/feedback.thunk';
import { getUsers } from '@/app/redux/thunks/user.thunk';

const animatedComponents = makeAnimated();

export default function AddUsers() {
  const dispatch = useAppDispatch();

  const { users, isLoading } = useAppSelector((state) => state.userData);

  const [selectedOptions, setSelectedOptions] = useState<any[]>([]);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const userData = useMemo(
    () =>
      users.map((user) => ({
        value: user.id,
        label: user.username,
      })),
    [users]
  );

  useEffect(() => {
    if (userData.length >= 0) {
      setSelectedOptions([]);
    }
  }, [userData]);

  const handleSubmit = () => {
    const selectedIds = selectedOptions.map((opt) => opt.value);
    const commaSeparated = selectedIds.join(',');

   dispatch(getFeedback({ authorIds: commaSeparated }));   

   
  };

  return (
    <Stack spacing={2} sx={{ minWidth: '50%' }}>
      <Select
        isMulti
        isLoading={isLoading}
        closeMenuOnSelect={false}
        components={animatedComponents}
        options={userData}
        value={selectedOptions}
        onChange={(selected) => setSelectedOptions(selected as any[])}
      />

      <Button size='small' variant="contained" onClick={handleSubmit}>
        Apply
      </Button>
    </Stack>
  );
}

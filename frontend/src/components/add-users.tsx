'use client'

import { useAppDispatch, useAppSelector } from '@/app/redux/hooks';
import { useEffect, useMemo, useState } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { Box, Button, Stack } from '@mui/material';
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
    <Stack direction={'row'} spacing={2} sx={{ minWidth: '100%' }}>


      <Select
        isMulti
        placeholder="Filter By Users"
        isLoading={isLoading}
        closeMenuOnSelect={false}
        components={animatedComponents}
        options={userData}
        value={selectedOptions}
        menuPortalTarget={document.body}
        styles={{
          menuPortal: (base) => ({ ...base, zIndex: 9999 }),
        }}
        onChange={(selected) => setSelectedOptions(selected as any[])}
      />

      <Button size='small' variant="contained" onClick={handleSubmit}>
        Apply
      </Button>
    </Stack>
  );
}

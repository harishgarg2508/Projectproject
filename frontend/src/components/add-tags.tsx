'use client'

import { useAppDispatch, useAppSelector } from '@/app/redux/hooks';
import { getTags } from '@/app/redux/thunks/tags.thunk';
import { useEffect, useMemo, useState } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { Button, Stack } from '@mui/material';
import { getFeedback } from '@/app/redux/thunks/feedback.thunk';

const animatedComponents = makeAnimated();

export default function AddTags() {
  const dispatch = useAppDispatch();

  const { tags, isLoading } = useAppSelector((state) => state.tags);

  const [selectedOptions, setSelectedOptions] = useState<any[]>([]);

  useEffect(() => {
    dispatch(getTags());
  }, [dispatch]);

  const tagOptions = useMemo(
    () =>
      tags.map((tag) => ({
        value: tag.id,
        label: tag.name,
      })),
    [tags]
  );

  useEffect(() => {
    if (tagOptions.length >= 0) {
      setSelectedOptions([]);
    }
  }, [tagOptions]);

  const handleSubmit = () => {
    const selectedIds = selectedOptions.map((opt) => opt.value);
    const commaSeparated = selectedIds.join(',');

   dispatch(getFeedback({ tagIds: commaSeparated }));   

   
  };

  return (
    <Stack direction={'row'} spacing={2} sx={{ minWidth: '100%', zIndex: 10 }}>
      <Select
        isMulti
        placeholder="Filter By Tags"
        isLoading={isLoading}
        closeMenuOnSelect={false}
        components={animatedComponents}
        options={tagOptions}
        value={selectedOptions}
         menuPortalTarget={document.body}
        styles={{
          menuPortal: (base) => ({ ...base, zIndex: 9999 }),
        }}
        onChange={(selected) => setSelectedOptions(selected as any[])}
      />

      <Button size='small'  variant="contained" onClick={handleSubmit}>
        Apply
      </Button>
    </Stack>
  );
}

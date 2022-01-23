import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useAppSelector } from '../app/hooks';
import { getIsLoading } from "../features/UserList/userListSlice";

interface LayoutProps  {
  children: JSX.Element;
}

export const ContentLoading = ({ children }: LayoutProps) => {
  const isLoading = useAppSelector(getIsLoading);

  return isLoading ? (
    <Box sx={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
      <CircularProgress />
    </Box>  ) : children;
};

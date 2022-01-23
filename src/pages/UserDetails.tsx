import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router";
import { Layout } from "../components/Layout";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  getSelectedUser,
  loadUser,
  loadUsers,
  removeUser,
  setSelectedUserId
} from "../features/UserList/userListSlice";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { DeleteModal } from "../components/DeleteModal";
import { CreateUserForm } from "../components/CreateUserForm";

export const UserDetails = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  const [isEditModeOn, setEditMode] = useState(false);

  const userId = useParams().userId?.slice(5) || 0;
  const selectedUser: User | null = useAppSelector(getSelectedUser);

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleDeleteUser = async () => {
    await dispatch(removeUser(+userId));
    navigate('/');
  };

  const closeEditMode = () => {
    setEditMode(false);
  }

  useEffect(() => {
    dispatch(loadUser(+userId));
    dispatch(setSelectedUserId(+userId));
  }, []);

  return (
    <Layout>
      <DeleteModal isOpen={isModalOpen} onClose={closeModal} onDelete={handleDeleteUser} />
      {isEditModeOn ? (
        <CreateUserForm user={selectedUser} isEdit={true} ofEditMode={closeEditMode}/>
      ) : (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Box sx={{ maxWidth: 600, width: '100%' }}>
            <Box sx={headerStyle}>
              <h1>User Details</h1>
              <Box sx={{ display: 'flex', gap: '10px' }}>
                <Button
                  variant="outlined" sx={buttonStyle}
                  onClick={(e) => setEditMode(true)}
                >
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  sx={buttonStyle}
                  onClick={() => setModalOpen(true)}
                >
                  Delete
                </Button>
              </Box>
            </Box>
            <Box sx={fieldStyle}>
              <h2>Full name:</h2>
              <Box sx={userInfoStyle}>{`${selectedUser?.first_name} ${selectedUser?.last_name}`}</Box>
            </Box>
            <Box sx={fieldStyle}>
              <h2>Gender:</h2>
              <Box sx={userInfoStyle}>{selectedUser?.gender}</Box>
            </Box>
            <Box sx={fieldStyle}>
              <h2>Date of birth:</h2>
              <Box sx={userInfoStyle}>{selectedUser?.birth_date}</Box>
            </Box>
            <Box sx={fieldStyle}>
              <h2>Role:</h2>
              <Box sx={userInfoStyle}>{selectedUser?.job}</Box>
            </Box>
            <Box sx={{
              ...fieldStyle,
              flexDirection: 'column',
              alignItems: 'start',
              gap: '10px'}
            }>
              <h2>Biography:</h2>
              <Box sx={userInfoStyle}>{selectedUser?.biography}</Box>
            </Box>
            <Box sx={fieldStyle}>
              <h2>Active:</h2>
              <Box sx={userInfoStyle}>{selectedUser?.is_active.toString()}</Box>
            </Box>
          </Box>
        </Box>
      )}
    </Layout>
  );
};

export const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexDirection: { xs: 'column', sm: 'row' },
  gap: { sm: '40px' },
};

export const fieldStyle = {
  display: 'flex',
  gap: '20px',
  alignItems: 'center',
};

export const userInfoStyle = {
  display:'flex',
  alignItems: 'center',
  fontSize: '20px',
};

export const buttonStyle = {
  width: '80px',
};

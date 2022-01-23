import React, { useState } from 'react';
import Box from "@mui/material/Box";
import { buttonStyle, fieldStyle, headerStyle } from "../pages/UserDetails";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Checkbox from "@mui/material/Checkbox";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useAppDispatch } from "../app/hooks";
import { addUser, loadUsers, updateUser } from "../features/UserList/userListSlice";

type CreateUserFormProps = {
  user: User | null;
  isEdit: boolean;
  ofEditMode?: () => void;
};

export const CreateUserForm: React.FC<CreateUserFormProps> = ({ user, isEdit, ofEditMode }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { register, handleSubmit } = useForm();
  const [formErrors, setError] = useState({
    firstName: false,
    lastName: false,
    dob: false,
    job: false,
    biography: false,
  })

  const errorMessage = '256-character limit exceeded';

  // @ts-ignore
  const onSubmit = async (data) => {
    if (validateForm(data)) {
      if (isEdit) {
        await dispatch(updateUser({ userId: user?.id || 0, editedFields: data }));
        navigate('/');
      } else {
        await dispatch(addUser(data));
        navigate('/');
      }
    }
  };

  const validateForm = (data: User) => {
    let isValid = true;
    const dateFormatRegex = /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/g;
    const dateValidation = dateFormatRegex.test(data.birth_date);
    if (data.first_name.length > 256) {
      isValid = false;
      setError(prevState => ({ ...prevState, firstName: true }));
    } else {
      setError(prevState => ({ ...prevState, firstName: false }));
    }

    if (data.last_name.length > 256) {
      isValid = false;
      setError(prevState => ({ ...prevState, lastName: true }));
    } else {
      setError(prevState => ({ ...prevState, lastName: false }));
    }

    if (data.job.length > 256) {
      isValid = false;
      setError(prevState => ({ ...prevState, job: true }));
    } else {
      setError(prevState => ({ ...prevState, job: false }));
    }

    if (!dateValidation) {
      isValid = false;
      setError(prevState => ({ ...prevState, dob: true }));
    } else {
      setError(prevState => ({ ...prevState, dob: false }));
    }

    return isValid;
  };

  const cancelHandler = () => {
    if (isEdit && ofEditMode) {
      ofEditMode();
    } else {
      navigate('/')
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box sx={{ maxWidth: 600, width: '100%' }}>
          <Box sx={headerStyle}>
            <h1>Create User</h1>
            <Box sx={{ display: 'flex', gap: '10px' }}>
              <Button
                variant="outlined"
                sx={buttonStyle}
                onClick={cancelHandler}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="outlined"
                color="error"
                sx={buttonStyle}
              >
                {isEdit ? 'Save' : 'Create'}
              </Button>
            </Box>
          </Box>
          <Box sx={{ ...fieldStyle, justifyContent: 'space-between' }}>
            <h2>First name:</h2>
            <TextField
              error={formErrors.firstName}
              helperText={formErrors.firstName ? errorMessage : ''}
              required
              id="outlined-basic"
              label="First name"
              variant="outlined"
              defaultValue={user?.first_name}
              {...register("first_name")}
            />
          </Box>
          <Box sx={{ ...fieldStyle, justifyContent: 'space-between' }}>
            <h2>Last name:</h2>
            <TextField
              error={formErrors.lastName}
              helperText={formErrors.firstName ? errorMessage : ''}
              required
              id="outlined-basic"
              label="Last name"
              variant="outlined"
              defaultValue={user?.last_name}
              {...register("last_name")}
            />
          </Box>
          <Box sx={{ ...fieldStyle, justifyContent: 'space-between' }}>
            <h2>Gender:</h2>
            <Select
              required
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Gender"
              defaultValue={user?.gender || 'male'}
              {...register("gender")}
            >
              <MenuItem value="male" defaultChecked={true}>Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
            </Select>
          </Box>
          <Box sx={{ ...fieldStyle, justifyContent: 'space-between' }}>
            <h2>Date of birth:</h2>
            <TextField
              required
              error={formErrors.dob}
              helperText={formErrors.dob ? 'Incorrect date format' : ''}
              id="outlined-basic"
              label="Date of birth"
              variant="outlined"
              defaultValue={user?.birth_date}
              {...register("birth_date")}
            />
          </Box>
          <Box sx={{ ...fieldStyle, justifyContent: 'space-between' }}>
            <h2>Role:</h2>
            <TextField
              error={formErrors.job}
              helperText={formErrors.firstName ? errorMessage : ''}
              required
              id="outlined-basic"
              label="Role"
              variant="outlined"
              defaultValue={user?.job}
              {...register("job")}

            />
          </Box>
          <Box sx={{
            ...fieldStyle,
            flexDirection: 'column',
            alignItems: 'start',
            gap: '10px'}
          }>
            <h2>Biography:</h2>
            <TextareaAutosize
              aria-label="minimum height"
              minRows={3}
              placeholder="Biography..."
              style={{ width: '100%' }}
              defaultValue={user?.biography}
              {...register("biography", { maxLength: 1024 })}
            />
          </Box>
          <Box sx={{ ...fieldStyle, justifyContent: 'space-between' }}>
            <h2>Active:</h2>
            <Checkbox
              defaultChecked={user?.is_active || false}
              {...register("is_active")}
            />
          </Box>
        </Box>
      </Box>
    </form>
  );
}
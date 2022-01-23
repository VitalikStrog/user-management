import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import AddIcon from '@mui/icons-material/Add';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';

export const SidebarMenu = () => {
  const [state, setState] = React.useState(false);

  const toggleDrawer =
    (open: boolean) =>
      (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
          event &&
          event.type === 'keydown' &&
          ((event as React.KeyboardEvent).key === 'Tab' ||
            (event as React.KeyboardEvent).key === 'Shift')
        ) {
          return;
        }

        setState(open);
      };

  const list = () => (
    <Box
      sx={{ width:  250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <StyledListItem>
          <HomeIcon />
          <SidebarMenuLink to='/'>Home</SidebarMenuLink>
        </StyledListItem>
        <StyledListItem>
          <AddIcon />
          <SidebarMenuLink to='/create-user'>Create user</SidebarMenuLink>
        </StyledListItem>
      </List>
    </Box>
  );

  return (
    <div>
      <Button onClick={toggleDrawer(true)}>
        <MenuIcon />
      </Button>
      <SwipeableDrawer
        anchor={'left'}
        open={state}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        {list()}
      </SwipeableDrawer>
    </div>
  );
}

const StyledListItem = styled(ListItem)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: 5,
}));

const SidebarMenuLink = styled(Link)(() => ({
  color: '#000',
  textDecoration: 'none',
}));

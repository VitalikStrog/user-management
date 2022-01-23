import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import {ContentLoading} from "./ContentLoading";
import { Header } from "./Header";

export const Layout = ({ children }) => (
  <>
    <CssBaseline />
    <Header />
    <Container maxWidth="lg" height="100vh">
      <ContentLoading>
        {children}
      </ContentLoading>
    </Container>
  </>
);

import React from 'react';
import { Layout } from "../components/Layout";
import { CreateUserForm } from "../components/CreateUserForm";

export const CreateUser: React.FC = () => {
  return (
    <Layout>
      <CreateUserForm  user={null} isEdit={false} />
    </Layout>
  );
}

import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getSearchInputValue, getUsersList, loadUsers, setSelectedUserId } from "../features/UserList/userListSlice";
import { Layout } from "../components/Layout";
import { UserCard } from "../components/UserCard";
import styled from 'styled-components';

export const UsersList: React.FC = () => {
  const filterValue = useAppSelector(getSearchInputValue).toLowerCase();
  const usersList = useAppSelector(getUsersList);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadUsers());
    dispatch(setSelectedUserId(0));
  }, []);

  const visibleUsersList: User[] = usersList.filter((user: User) =>
    user.first_name.toLowerCase().includes(filterValue)
    || user.last_name.toLowerCase().includes(filterValue)
    || user.job.toLowerCase().includes(filterValue)
  );

  return (
    <Layout>
      <CardsWrapper>
        {visibleUsersList.map((user: User) => (
          <React.Fragment key={user.id}>
            <UserCard
              id={user.id}
              name={`${user.first_name} ${user.last_name}`}
              job={user.job}
              dob={user.birth_date}
              gender={user.gender}
            />
          </React.Fragment>
        ))}
      </CardsWrapper >
    </Layout>
  );
};

const CardsWrapper = styled.div`
  width: 100%;
  flex-wrap: wrap;
  margin-top: 10px;
  display: flex;
  gap: 42px;
  @media (max-width: 600px) {
    justify-content: center;
  }
`;
import React from 'react';
import cx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
// @ts-ignore
import { useFadedShadowStyles } from '@mui-treasury/styles/shadow/faded';
// @ts-ignore
import { useGutterBorderedGridStyles } from '@mui-treasury/styles/grid/gutterBordered';
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";

const StyledCard = styled(Card)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
}));

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
}));

const StyledCardContent = styled(CardContent)(({ theme}) => ({
  maxWidth: 256,
}))

const useStyles = makeStyles(({ palette }) => ({
  card: {
    borderRadius: 12,
    minWidth: 256,
    height: 220,
    textAlign: 'center',
    '&:hover': {
      boxShadow: '-1px 10px 29px 0px rgba(0,0,0,0.8)',
    },
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: '0.5px',
    marginTop: 8,
    marginBottom: 0,
    maxWidth: 256,
  },
  subheader: {
    maxWidth: 256,
    fontSize: 14,
    color: palette.grey[500],
    marginBottom: '0.875em',
  },
  statLabel: {
    fontSize: 12,
    color: palette.grey[500],
    fontWeight: 500,
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    margin: 0,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
    letterSpacing: '1px',
  },
}));

type UserCardProps = {
  id: number,
  name: string,
  job: string,
  dob: string,
  gender: string,
}

export const UserCard: React.FC<UserCardProps> = ({
  id,
  name,
  job,
  dob,
  gender ,
}) => {
  const styles = useStyles();
  const shadowStyles = useFadedShadowStyles();
  const borderedGridStyles = useGutterBorderedGridStyles({
    borderColor: 'rgba(0, 0, 0, 0.08)',
    height: '50%',
  });

  return (
    <StyledLink to={`users/user-${id}`}>
      <StyledCard className={cx(styles.card, shadowStyles.root)}>
        <StyledCardContent>
          <h3 className={styles.heading}>{name}</h3>
          <span className={styles.subheader}>{job}</span>
        </StyledCardContent>
        <Divider light />
        <Box display={'flex'}>
          <Box p={2} flex={'auto'} className={borderedGridStyles.item}>
            <p className={styles.statLabel}>Date of birth</p>
            <p className={styles.statValue}>{dob}</p>
          </Box>
          <Box p={2} flex={'auto'} className={borderedGridStyles.item}>
            <p className={styles.statLabel}>Gender</p>
            <p className={styles.statValue}>{gender}</p>
          </Box>
        </Box>
      </StyledCard>
    </StyledLink>
);
};

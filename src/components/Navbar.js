import React, {useContext}  from 'react';
import { Context } from '../../context/Context';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link'
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }),
);

export default function Navbar() {
    const {user} = useContext(Context)
    const classes = useStyles();

    return (
        <div className={classes.root}>
        <AppBar position="static">
            <Toolbar>
            <Typography variant="h6" className={classes.title}>
                <Link component={NavLink} to="/" color="inherit" style={{ textDecoration: 'none' }}>
                    Home
                </Link>
            </Typography>
            {user.isAuth ?
            <>
            <Typography variant="h6">
                <Link component={NavLink} to="/admin" color="inherit" style={{ marginRight: '2rem' }}>
                    Admin panel
                </Link>
            </Typography>
            <Typography variant="h6">
                <Link component={NavLink} to="/registration" color="inherit" style={{ marginRight: '2rem' }}>
                    Register
                </Link>
            </Typography>
            <Typography variant="h6">
                <Link component={NavLink} to="/login" color="inherit">
                    Login
                </Link>
            </Typography>
            </>
            :
            <>
            <Typography variant="h6">
                <Link component={NavLink} to="/admin" color="inherit" style={{ marginRight: '2rem' }}>
                    Admin panel
                </Link>
            </Typography>
            <Typography variant="h6">
                <Link component={NavLink} to="/registration" color="inherit" style={{ marginRight: '2rem' }}>
                    Register
                </Link>
            </Typography>
            <Typography variant="h6">
                <Link component={NavLink} to="/login" color="inherit">
                    Login
                </Link>
            </Typography>
            </>
          }
            </Toolbar>
        </AppBar>
    </div>
    )
}

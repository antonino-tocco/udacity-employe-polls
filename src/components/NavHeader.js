import * as React from 'react';

import {connect} from 'react-redux';
import {
    AppBar, Avatar,
    Box,
    Button,
    IconButton,
    Menu,
    MenuItem,
    styled,
    Toolbar,
    Typography
} from '@mui/material';

import {
    Menu as MenuIcon
} from '@mui/icons-material';
import {useNavigate} from 'react-router';

import {handleLogout} from '../actions/auth';

const MenuButton = styled(Button)({
    color: '#fff'
})


const NavHeader = ({isUserLogged, authedUser, pages, handleLogout}) => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUserNav, setAnchorElUserNav] = React.useState(null);

    const navigate = useNavigate();

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.target);
    }

    const handleOpenUserMenu = (event) => {
        setAnchorElUserNav(event.target);
    }

    const handleCloseNavMenu = () => {
        setAnchorElUserNav(null);
    }

    const _handleLogout = () => {
        handleLogout();
        handleCloseNavMenu();
    }

    const navigateToPage = (page) => {
        navigate(page?.path);
        handleCloseNavMenu();
    }

    return (isUserLogged ? <AppBar position='sticky'>
        <Toolbar variant='dense'>
            <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}
                    color="inherit"
                >
                    <MenuIcon />
                </IconButton>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                    sx={{
                        display: { xs: 'block', md: 'none' },
                    }}
                >
                    {pages.map((item) => (
                        <MenuItem key={item?.key} onClick={() => navigateToPage(item)}>
                            <Typography textAlign="center">{item?.label}</Typography>
                        </MenuItem>
                    ))}
                </Menu>
            </Box>
            <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                {pages?.map((item) => (
                    <MenuButton key={item.key} variant='text' onClick={() => navigateToPage(item)}>
                        <Typography textAlign='center'>{item.label}</Typography>
                    </MenuButton>)
                )}
            </Box>
            <Box sx={{display: 'flex', alignItems: 'center'}}>
                <div style={{float: 'left'}}>
                    <Typography>{authedUser?.id}</Typography>
                </div>
                <IconButton onClick={handleOpenUserMenu}>
                    <Avatar src={authedUser?.avatarURL}/>
                </IconButton>
                <Menu
                    id='menu-appbar'
                    anchorEl={anchorElUserNav}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right'
                    }}
                    open={Boolean(anchorElUserNav)}
                    transformOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}>
                    <MenuItem key='logout' onClick={() => _handleLogout()}>
                        <Typography textAlign='center'>Logout</Typography>
                    </MenuItem>
                </Menu>
            </Box>
        </Toolbar>

    </AppBar> : null);
};

const mapDispatchToProps = (dispatch) => ({
    handleLogout: () => dispatch(handleLogout())
})

export default connect(null, mapDispatchToProps)(NavHeader);
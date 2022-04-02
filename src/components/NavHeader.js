import * as React from 'react';

import {connect} from 'react-redux';
import {
    AppBar,
    Box,
    Button,
    Container,
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
import {useNavigate} from "react-router";

const MenuButton = styled(Button)({
    color: '#fff'
})


const NavHeader = ({isUserLogged, loggedUser, pages}) => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);

    const navigate = useNavigate();

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.target);
    }

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    }

    const navigateToPage = (page) => {
        navigate(page?.path);
    }

    return (<AppBar position='sticky'>
        <Toolbar variant='dense'>
            <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
                            <MenuItem key={item?.key} onClick={handleCloseNavMenu}>
                                <Typography textAlign="center">{item?.label}</Typography>
                            </MenuItem>
                        ))}
                    </Menu>
                </Box>
            </Box>
            <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                {pages?.map((item) => (
                    <MenuButton key={item.key} variant='text' onClick={() => navigateToPage(item)}>
                        <Typography textAlign='center'>{item.label}</Typography>
                    </MenuButton>)
                )}
            </Box>
        </Toolbar>

    </AppBar>);
};

const mapStateToProps = ({users}) => ({
    isUserLogged: !!users.loggedUser,
    loggedUser: users?.loggedUser ?? null
});

const mapDispatchToProps = ({}) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(NavHeader);
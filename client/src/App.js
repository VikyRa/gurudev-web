import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PrivateRoute from './components/HOC/PrivateRoute';
import { isUserLoggedIn } from './actions';
import './App.css';
import { Home } from './containers/page/home';
import { About } from './containers/page/about';
import { Contact } from './containers/page/contact';
import { Product } from './containers/page/product';
import { ProductDetails } from './containers/page/productdetails/productDetails';
import { UserLogin } from './containers/user/auth/login';
import { UserSignup } from './containers/user/auth/signup';
import store from './store';
import { UserProfile } from './containers/user/profile';
import { Success } from './containers/user/success';
import { Fail } from './containers/user/fail';

import { AstrologerSignup } from './containers/astrologer/auth/signup';
import { AstrologerLogin } from './containers/astrologer/auth/login';
import { AstrologerProfile } from './containers/astrologer/profile';
import { Wallet } from './containers/user/walletuser';
import { MainChat } from './containers/chat/main';
import { AstrologerList } from './containers/page/astrologer';
import { Cart } from './containers/page/cart/cart';
import { Shipping } from './containers/page/cart/shipping';
import { ConfirmOrder } from './containers/page/cart/confirmorder';
import { Blog } from './containers/page/blog/bloglist';
import { BlogDetail } from './containers/page/blog/blogDetail';

import { SnackbarProvider } from 'notistack';
import { createMuiTheme } from '@material-ui/core/styles';
import { MuiThemeProvider } from "@material-ui/core";
import ChatHome from './pages/Home';

import Login from "./pages/Login";
import Signup from "./pages/Signup";

// import { Rolelist } from './containers/adminrole/Rolelist';
// import { Addrole } from './containers/adminrole/add';
// import { EditRole } from './containers/adminrole/edit';

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, user, loading, role } = useSelector(state => state.auth);
  // console.log(isAuthenticated)
  useEffect(() => {
    if (!isAuthenticated) {
      console.log(isAuthenticated)
      dispatch(isUserLoggedIn());
    }
  }, [isAuthenticated]);


  let theme = createMuiTheme({
    overrides: {
      MuiOutlinedInput: {
        root: {
          "& $notchedOutline": {
            borderColor: "white"
          },
          "&:hover $notchedOutline": {
            borderColor: "white"
          },
          "&$focused $notchedOutline": {
            borderColor: "white"
          }
        }
      }
    },
    palette: {
      primary: {
        light: '#4791db',
        main: '#3a8dff',
        dark: '#115293',
        black: "black",
        gray: "#BFC9DB"
      },
      secondary: {
        light: '#ffd95a',
        main: '#f9a825',
        dark: '#c17900',
        contrastText: '#212121',
      },
      message: {
        bubble: "#f4f6fa",
        messageBubbleLeft: `linear-gradient(225deg, #6cc1ff 0%, #3a8dff 100%)`,
        messageBubbleText: "#91a3c0",
        label: "#BECCE2"
      },
      background: {
        default: '#ffffff',
      },
      icon: {
        default: '#D1D9E6',
        online: "#1CED84"
      },
      notification: {
        default: "#3F92FF"
      }
    },
    typography: {
      useNextVariants: true,
      button: {
        textTransform: 'none'
      },
      h4: {
        fontSize: 26,
      },
      subtitle1: {
        fontSize: 19
      }
    },
    buttonHeader: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      flexDirection: 'column',
      bgcolor: 'background.paper',
      minHeight: '100vh',
      paddingTop: 23
    },
    box: {
      padding: 24,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      flexDirection: 'column',
      maxWidth: 900,
      margin: 'auto'
    },
    noAccBtn: {
      color: '#b0b0b0',
      fontWeight: 400,
      textAlign: 'center',
      marginRight: 21,
      whiteSpace: 'nowrap'
    },
    welcome: {
      paddingBottom: 20,
      color: '#000000',
      fontWeight: 500
    },
  });


  return (
    <MuiThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={1} autoHideDuration={3000}>
        <Switch>

          {/* <Route path="/" exact component={Home} />
      <Route path="/about-us" exact component={About} />
      <Route path='/contact-us' exact component={Contact} /> */}
          <Route path='/' exact component={Home} />
          <Route path='/about-us' exact component={About} />
          <Route path="/contact-us" exact component={Contact} />
          <Route path='/product' exact component={Product} />
          <Route path='/product/:id' exact component={ProductDetails} />
          <Route path='/astrologer' exact component={AstrologerList} />
          <Route path='/blog' exact component={Blog} />
          <Route path='/blog/:slug' exact component={BlogDetail} />

          {/* USER ROUTE */}
          <Route path="/user/login" exact component={UserLogin} />
          <Route path="/user/signup" exact component={UserSignup} />
          <PrivateRoute path="/user/account" exact component={UserProfile} />
          <PrivateRoute path="/user/wallet" exact component={Wallet} />

          {/* ASTROLOGER ROUTE */}
          <Route path="/astrologer/signup" exact component={AstrologerSignup} />
          <Route path="/astrologer/login" exact component={AstrologerLogin} />
          <PrivateRoute path="/astrologer/account" exact component={AstrologerProfile} />

          <Route path='/cart' exact component={Cart} />
          <PrivateRoute path='/shipping' exact component={Shipping} />
          <PrivateRoute path='/order/confirm' exact component={ConfirmOrder} />


          <Route path='/success/:id' exact component={Success} />
          <Route path='/error/:id' exact component={Fail} />

          <Route path='/chats' exact component={ChatHome} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />


        </Switch>
      </SnackbarProvider>
    </MuiThemeProvider>

  );
}

export default App;

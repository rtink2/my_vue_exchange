import Vue from 'vue';
import Router from 'vue-router';

import firebase from 'firebase/app';
import 'firebase/auth';

import AboutPage from '@/pages/About';
import FaqPage from '@/pages/Faq';
import HomePage from '@/pages/Home';
import LoginPage from '@/pages/Login';
import LogoutPage from '@/pages/Logout';
import ProfilePage from '@/pages/Profile';
import RegisterPage from '@/pages/Register';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage
    },
    {
      path: '/about',
      name: 'AboutPage',
      component: AboutPage
    },
    {
      path: '/faq',
      name: 'FaqPage',
      component: FaqPage
    },
    {
      path: '/login',
      name: 'LoginPage',
      component: LoginPage,
      meta: { onlyGuestUser: true }
    },
    {
      path: '/logout',
      name: 'LogoutPage',
      component: LogoutPage
    },
    {
      path: '/register',
      name: 'RegisterPage',
      component: RegisterPage,
      meta: { onlyGuestUser: true }
    },
    {
      path: '/users/me',
      name: 'ProfilePage',
      component: ProfilePage,
      meta: { onlyAuthUser: true }
    }
  ]
});

router.beforeEach((to, from, next) => {
  const authenticatedUser = firebase.auth().currentUser;

  if (to.meta.onlyAuthUser) {
    if (authenticatedUser) {
      next();
    } else {
      // TODO: navigate to page for non auth user
      next({ name: 'LoginPage' });
    }
  } else if (to.meta.onlyGuestUser) {
    if (authenticatedUser) {
      next({ name: 'HomePage' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;

import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { authSelectors, authActions } from '@Core/redux/auth';
import { currentUserActions, currentUserSelectors } from '@Core/redux/user';
import { useSnackbar } from 'notistack';

export const useAuth = () => {
  const isLogin = useSelector(authSelectors.selectIsLogin);
  const userId = useSelector(authSelectors.selectCurrentUserId);
  const permission = useSelector(authSelectors.selectCurrentUserPermissions);
  const authLoading = useSelector(authSelectors.selectAuthLoadingStatus);
  const user = useSelector(currentUserSelectors.selectUserInfo);

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    if (isLogin && !user) {
      dispatch(currentUserActions.getCurrentUser({ id: userId }));
    }
  }, [userId, isLogin]);

  useEffect(() => {
    // For relogin need cookie for keep signin
    if (!isLogin && user === null) {
      dispatch(authActions.reLogin());
    }
  }, []);

  const signOut = useCallback(() => {
    dispatch(authActions.logOut());
    enqueueSnackbar('Đăng xuất thành công!', { variant: 'success' });
  });

  const signIn = useCallback((data) => {
    // Data is email and password we will destructure it later
    dispatch(authActions.userLogin(data));
  }, []);

  return {
    isLogin,
    userId,
    permission,
    authLoading,
    ...user,
    signOut,
    signIn,
  };
};

import React, { createRef } from 'react';
import { App } from './App';
import { Message } from '@Components/Message';
import {
  Button,
  ThemeProvider as MaterialThemeProvider,
} from '@material-ui/core';
import { ThemeProvider as StyledComponnentProvider } from 'styled-components';
import { Provider as ReduxProvider } from 'react-redux';
import theme from './theme';
import { store } from '@Core/redux/store';
import { ErrorBoundary } from '@Components/ErrorBoundary/ErrorBoundary';
import { SnackbarProvider, useSnackbar } from 'notistack';
import { SVGIcon } from '@Components/shared/SvgIcon/Icon';
export const AppWithContexts = () => {
  // Some context below return
  const notistackRef = createRef();
  const onClickDismiss = (key) => () => {
    notistackRef.current.closeSnackbar(key);
  };
  return (
    <>
      <MaterialThemeProvider theme={theme}>
        <StyledComponnentProvider theme={theme}>
          <ReduxProvider store={store}>
            <ErrorBoundary>
              <SnackbarProvider
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                action={(key) => (
                  <Button onClick={onClickDismiss(key)} styleType="link">
                    <SVGIcon name="close" style={{ fill: '#fff' }} />
                  </Button>
                )}
                ref={notistackRef}
              >
                <App title="Hello world" />
              </SnackbarProvider>
              {/* <Message message="View web pack config for this example import @Component" /> */}
            </ErrorBoundary>
          </ReduxProvider>
        </StyledComponnentProvider>
      </MaterialThemeProvider>
    </>
  );
};

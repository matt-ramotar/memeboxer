import { StylesProvider, ThemeProvider } from "@material-ui/core";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRoutes } from "react-router";
import validateToken, { ValidateTokenSuccess } from "./lib/validateToken";
import routes from "./routes";
import { setEmail, setGoogleId, setId, setName, setPicture, setTemplateIds, setToken, setUsername, setUsersFollowedByIds, setUsersFollowingIds } from "./store/user";
import useTheme from "./theme";
import { User } from "./types";

export default function AppContainer(): JSX.Element | null {
  const dispatch = useDispatch();
  const [isValidated, setIsValidated] = useState<boolean | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const localToken = localStorage.getItem("TOKEN");

    if (localToken) {
      validateTokenAsync(localToken);
    } else {
      setIsValidated(false);
    }
  }, []);

  async function validateTokenAsync(localToken: string) {
    try {
      const { user, token }: ValidateTokenSuccess = await validateToken(localToken);
      setUser(user);
      setIsValidated(true);
      dispatch(setToken(token));
    } catch (error) {
      setIsValidated(false);
    }
  }

  if (isValidated == null) return null;
  return <App user={user} />;
}

interface Props {
  user: User | null;
}

function App(props: Props): JSX.Element {
  const dispatch = useDispatch();
  const isLoggedIn = Boolean(props.user);
  const routing = useRoutes(routes(isLoggedIn, props.user));

  TimeAgo.addDefaultLocale(en);
  TimeAgo.addLocale(en);

  useEffect(() => {
    if (props.user) {
      dispatch(setId(props.user.id));
      dispatch(setEmail(props.user.email));
      dispatch(setUsername(props.user.username));
      dispatch(setName(props.user.name));
      dispatch(setGoogleId(props.user.googleId));
      dispatch(setPicture(props.user.picture));

      if (props.user.usersFollowingIds) {
        dispatch(setUsersFollowingIds(props.user.usersFollowingIds));
      }

      if (props.user.usersFollowedByIds) {
        dispatch(setUsersFollowedByIds(props.user.usersFollowedByIds));
      }

      if (props.user.templateIds) {
        dispatch(setTemplateIds(props.user.templateIds));
      }
    }
  }, [dispatch, props.user]);

  return (
    <ThemeProvider theme={useTheme()}>
      <StylesProvider injectFirst>{routing}</StylesProvider>
    </ThemeProvider>
  );
}

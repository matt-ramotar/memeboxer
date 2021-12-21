import { StylesProvider, ThemeProvider } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRoutes } from "react-router";
import validateToken, { ValidateTokenSuccess } from "./lib/validateToken";
import routes from "./routes";
import { setEmail, setGoogleId, setId, setName, setPicture, setUsername } from "./store/user";
import useTheme from "./theme";
import { User } from "./types";

export default function AppContainer(): JSX.Element | null {
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
      const { user }: ValidateTokenSuccess = await validateToken(localToken);
      setUser(user);
      setIsValidated(true);
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

  useEffect(() => {
    if (props.user) {
      dispatch(setId(props.user.id));
      dispatch(setEmail(props.user.email));
      dispatch(setUsername(props.user.username));
      dispatch(setName(props.user.name));
      dispatch(setGoogleId(props.user.googleId));
      dispatch(setPicture(props.user.picture));
    }
  }, [dispatch, props.user]);

  return (
    <ThemeProvider theme={useTheme()}>
      <StylesProvider injectFirst>{routing}</StylesProvider>
    </ThemeProvider>
  );
}

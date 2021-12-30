import { Grid, Typography, useTheme } from "@material-ui/core";
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from "react-google-login";
import Memeboxer from "../../assets/Memeboxer.png";
import extractUsername from "../../helpers/extractUsername";
import { continueWithGoogle } from "../../lib/auth";
import { GOOGLE_CLIENT_ID } from "../../util/secrets";
import styles from "./login.module.scss";

interface ProfileObj {
  googleId: string;
  imageUrl: string;
  email: string;
  name: string;
  givenName: string;
  familyName: string;
}

export default function Login(): JSX.Element {
  const theme = useTheme();
  const handleLogin = async (data: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    if ("code" in data) return;

    const { name, email, googleId, imageUrl: picture } = data.profileObj as ProfileObj;

    const username = extractUsername(email);

    const { token } = await continueWithGoogle(email, username, name, googleId, picture);

    localStorage.setItem("TOKEN", token);
    window.location.reload();
  };

  return (
    <Grid container className={styles.root}>
      <Grid container className={styles.modal}>
        <Typography variant="h4" style={{ fontFamily: "Space Grotesk", fontWeight: "bold", color: theme.palette.background.paper }}>
          memeboxer
        </Typography>
        <img src={Memeboxer} alt="component box" />

        <GoogleLogin clientId={GOOGLE_CLIENT_ID ?? ""} onSuccess={handleLogin} onFailure={handleLogin} cookiePolicy={"single_host_origin"} theme="dark" className={styles.button} icon={true}>
          <Typography style={{ fontFamily: "Space Grotesk", fontWeight: "bold" }}>Log in</Typography>
        </GoogleLogin>
      </Grid>
    </Grid>
  );
}

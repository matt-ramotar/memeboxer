import { Box, Grid, Typography } from "@material-ui/core";
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from "react-google-login";
import extractUsername from "../../helpers/extractUsername";
import dropbox from "../../images/dropbox.png";
import continueWithGoogle from "../../lib/continueWithGoogle";
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
  const handleLogin = async (data: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    if ("code" in data) return;

    const { name, email, googleId, imageUrl: picture } = data.profileObj as ProfileObj;

    const username = extractUsername(email);

    const { token } = await continueWithGoogle(email, username, name, googleId, picture);

    localStorage.setItem("TOKEN", token);
    window.location.reload();
  };

  return (
    <Grid className={styles.root}>
      <Box className={styles.modal}>
        <img src={dropbox} alt="component box" />
        <Typography variant="h5" className={styles.text}>
          Welcome!
        </Typography>

        <GoogleLogin clientId={GOOGLE_CLIENT_ID ?? ""} buttonText="SSO" onSuccess={handleLogin} onFailure={handleLogin} cookiePolicy={"single_host_origin"} theme="dark" className={styles.button} />
      </Box>
    </Grid>
  );
}

import { Grid, Typography } from "@material-ui/core";
import styles from "./main.module.scss";

export default function Support(): JSX.Element {
  return (
    <Grid className={styles.root}>
      <Typography className={styles.title} variant="h6">
        Support
      </Typography>
    </Grid>
  );
}

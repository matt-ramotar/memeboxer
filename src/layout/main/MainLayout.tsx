import loadable from "@loadable/component";
import { Box, Grid } from "@material-ui/core";
import styles from "./MainLayout.module.scss";

interface Props {
  pageName: string;
}

export default function MainLayout(props: Props): JSX.Element {
  const Page = loadable(() => import(`../../pages/Main/${props.pageName}`));
  return (
    <Grid className={styles.root}>
      <Box className={styles.container}>
        <Box className={styles.main}>
          <Page />
        </Box>
      </Box>
    </Grid>
  );
}

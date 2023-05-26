import { makeStyles } from "@material-ui/core";
import { Container, Drawer } from "@mui/material";

type Props = {
  open?: boolean | any;
  onClose: () => void;
};
const EmailDrawer = ({ open, onClose }: Props) => {
  const useStyles = makeStyles((theme) => ({
    container: {
      width: "100vw",
      [theme.breakpoints.up("sm")]: {
        maxWidth: "50vw",
      },
      [theme.breakpoints.up("md")]: {
        maxWidth: "80vw",
      },
      [theme.breakpoints.up("lg")]: {
        maxWidth: "30vw",
      },
    },
  }));
  const classes = useStyles();
  return (
    <Drawer anchor="right" open={open} onClose={() => onClose && onClose()}>
      <Container style={{ marginTop: "1rem" }} className={classes.container}>
        <section>
          <h1>Select Email Template</h1>
        </section>
      </Container>
    </Drawer>
  );
};

export default EmailDrawer;

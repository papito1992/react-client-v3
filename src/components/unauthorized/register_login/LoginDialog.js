import React, {useState, useCallback, useRef, Fragment, useContext} from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withRouter } from "react-router-dom";
import {
  TextField,
  Button,
  Checkbox,
  Typography,
  FormControlLabel,
  withStyles,
} from "@material-ui/core";
import FormDialog from "../../shared/FormDialog";
import VisibilityPasswordTextField from "../../shared/VisibilityPasswordTextField";
import {useForm} from "../../../hooks/form-hook";
import {useHttpClient} from "../../../hooks/http-hook";
import {AuthContext} from "../../../context/auth-context";
import ButtonCircularProgress from "../../shared/ButtonCircularProgress";

const styles = (theme) => ({
  forgotPassword: {
    marginTop: theme.spacing(2),
    color: theme.palette.primary.main,
    cursor: "pointer",
    "&:enabled:hover": {
      color: theme.palette.primary.dark,
    },
    "&:enabled:focus": {
      color: theme.palette.primary.dark,
    },
  },
  disabledText: {
    cursor: "auto",
    color: theme.palette.text.disabled,
  },
  formControlLabel: {
    marginRight: 0,
  },
});

function LoginDialog(props) {
  const {
    setStatus,
    history,
    classes,
    onClose,
    openChangePasswordDialog,
    status,
  } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const loginEmail = useRef('megaUser@megaUser.com');
  const loginPassword = useRef('megaUser');
  const auth = useContext(AuthContext);
  const {isLoadingTemp, error, sendRequest, clearError} = useHttpClient();

  // const login = useCallback(() => {
  //   setIsLoading(true);
  //   setStatus(null);
  //   if (loginEmail.current.value !== "test@web.com") {
  //     setTimeout(() => {
  //       setStatus("invalidEmail");
  //       setIsLoading(false);
  //     }, 1500);
  //   } else if (loginPassword.current.value !== "HaRzwc") {
  //     setTimeout(() => {
  //       setStatus("invalidPassword");
  //       setIsLoading(false);
  //     }, 1500);
  //   } else {
  //     setTimeout(() => {
  //       history.push("/c/dashboard");
  //     }, 150);
  //   }
  // }, [setIsLoading, loginEmail, loginPassword, history, setStatus]);
  const authSubmitHandler = async event => {
    event.preventDefault();
    setIsLoading(true);
    // setStatus(null);
    try {
      const responseData = await sendRequest(
          'http://localhost:8080/api/auth/signin',
          'POST',
          JSON.stringify({
            // username: loginEmail.current.value,
            // password: loginPassword.current.value
            username: "megaUser@megaUser.com",
            password: "megaUser"
          }),
          {
            'Content-Type': 'application/json'
          }
      );
      console.log(responseData)
      auth.login(responseData.id, responseData.token);
      history.push("/admin/customers")
    } catch (err) {
    }
    setIsLoading(isLoadingTemp);
  };
  return (
    <Fragment>
      <FormDialog
        open
        onClose={onClose}
        loading={isLoading}
        onFormSubmit={authSubmitHandler}
        hideBackdrop
        headline="Login"
        content={
          <Fragment>
            <TextField
              variant="outlined"
              margin="normal"
              error={status === "invalidEmail"}
              // required
              fullWidth
              label="Email Address"
              inputRef={loginEmail}
              autoFocus
              autoComplete="off"
              type="email"
              onChange={() => {
                if (status === "invalidEmail") {
                  setStatus(null);
                }
              }}
              helperText={
                status === "invalidEmail" &&
                "This email address isn't associated with an account."
              }
              FormHelperTextProps={{ error: true }}
            />
            <VisibilityPasswordTextField
              variant="outlined"
              margin="normal"
              // required
              fullWidth
              error={status === "invalidPassword"}
              label="Password"
              inputRef={loginPassword}
              autoComplete="off"
              onChange={() => {
                if (status === "invalidPassword") {
                  setStatus(null);
                }
              }}
              helperText={
                status === "invalidPassword" ? (
                  <span>
                    Incorrect password. Try again, or click on{" "}
                    <b>&quot;Forgot Password?&quot;</b> to reset it.
                  </span>
                ) : (
                  ""
                )
              }
              FormHelperTextProps={{ error: true }}
              onVisibilityChange={setIsPasswordVisible}
              isVisible={isPasswordVisible}
            />
            <FormControlLabel
              className={classes.formControlLabel}
              control={<Checkbox color="primary" />}
              label={<Typography variant="body1">Remember me</Typography>}
            />
            {/*{status === "verificationEmailSend" ? (*/}
            {/*  <HighlightedInformation>*/}
            {/*    We have send instructions on how to reset your password to your*/}
            {/*    email address*/}
            {/*  </HighlightedInformation>*/}
            {/*) : (*/}
            {/*  <HighlightedInformation>*/}
            {/*    Email is: <b>test@web.com</b>*/}
            {/*    <br />*/}
            {/*    Password is: <b>HaRzwc</b>*/}
            {/*  </HighlightedInformation>*/}
            {/*)}*/}
          </Fragment>
        }
        actions={
          <Fragment>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              disabled={isLoading}
              size="large"
            >
              Login
              {isLoading && <ButtonCircularProgress />}
            </Button>
            <Typography
              align="center"
              className={classNames(
                classes.forgotPassword,
                isLoading ? classes.disabledText : null
              )}
              color="primary"
              onClick={isLoading ? null : openChangePasswordDialog}
              tabIndex={0}
              role="button"
              onKeyDown={(event) => {
                // For screenreaders listen to space and enter events
                if (
                  (!isLoading && event.keyCode === 13) ||
                  event.keyCode === 32
                ) {
                  openChangePasswordDialog();
                }
              }}
            >
              Forgot Password?
            </Typography>
          </Fragment>
        }
      />
    </Fragment>
  );
}

LoginDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  setStatus: PropTypes.func.isRequired,
  openChangePasswordDialog: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  status: PropTypes.string,
};

export default withRouter(withStyles(styles)(LoginDialog));

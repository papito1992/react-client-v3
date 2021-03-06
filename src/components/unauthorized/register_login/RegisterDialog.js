import React, {Fragment, useContext, useRef, useState} from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  TextField,
  Typography,
  withStyles,
} from "@material-ui/core";
import FormDialog from "../../shared/FormDialog";
import VisibilityPasswordTextField from "../../shared/VisibilityPasswordTextField";
import {AuthContext} from "../../../context/auth-context";
import {useHttpClient} from "../../../hooks/http-hook";
import ButtonCircularProgress from "../../shared/ButtonCircularProgress";

const styles = (theme) => ({
    link: {
        transition: theme.transitions.create(["background-color"], {
            duration: theme.transitions.duration.complex,
            easing: theme.transitions.easing.easeInOut,
        }),
        cursor: "pointer",
        color: theme.palette.primary.main,
        "&:enabled:hover": {
            color: theme.palette.primary.dark,
        },
        "&:enabled:focus": {
            color: theme.palette.primary.dark,
        },
    },
});

function RegisterDialog(props) {
    const {history, setStatus, classes, openTermsDialog, theme, onClose, status} = props;
    const [isLoading, setIsLoading] = useState(false);
    const [hasTermsOfServiceError, setHasTermsOfServiceError] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const registerTermsCheckbox = useRef();
    const registerPassword = useRef();
    const registerEmail = useRef();
    const registerPasswordRepeat = useRef();
    const auth = useContext(AuthContext);
    const {isLoadingTemp, sendRequest} = useHttpClient();
    const register = async event => {
        event.preventDefault();
        if (!registerTermsCheckbox.current.checked) {
            setHasTermsOfServiceError(true);
            return;
        }
        if (
            registerPassword.current.value !== registerPasswordRepeat.current.value
        ) {
            setStatus("passwordsDontMatch");
            return;
        }
        if (
            registerPassword.current.value.length < 8
        ) {
            setStatus("passwordTooShort");
            return;
        }
        setStatus(null);
        setIsLoading(true);
        try {
            const responseData = await sendRequest(
                process.env.REACT_APP_BACKEND_URL+'api/auth/signup',
                'POST',
                JSON.stringify({
                    username: registerEmail.current.value,
                    role: [],
                    password: registerPassword.current.value
                }),
                {
                    'Content-Type': 'application/json'
                }
            ).then();
          let userId=responseData.id
          auth.login(userId, responseData.token);
          history.push("/admin/customers")
        } catch (err) {
        }
        setIsLoading(isLoadingTemp);
    };

    return (
        <FormDialog
            loading={isLoading}
            onClose={onClose}
            open
            headline="Register"
            onFormSubmit={register}
            hideBackdrop
            hasCloseIcon
            content={
                <Fragment>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        error={status === "invalidEmail"}
                        label="Email Address"
                        autoFocus
                        autoComplete="off"
                        type="email"
                        inputRef={registerEmail}
                        onChange={() => {
                            if (status === "invalidEmail") {
                                setStatus(null);
                            }
                        }}
                        FormHelperTextProps={{error: true}}
                    />
                    <VisibilityPasswordTextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        error={
                            status === "passwordTooShort" || status === "passwordsDontMatch"
                        }
                        label="Password"
                        inputRef={registerPassword}
                        autoComplete="off"
                        onChange={() => {
                            if (
                                status === "passwordTooShort" ||
                                status === "passwordsDontMatch"
                            ) {
                                setStatus(null);
                            }
                        }}
                        helperText={(() => {
                            if (status === "passwordTooShort") {
                                return "Create a password at least 8 characters long.";
                            }
                            if (status === "passwordsDontMatch") {
                                return "Your passwords dont match.";
                            }
                            return null;
                        })()}
                        FormHelperTextProps={{error: true}}
                        isVisible={isPasswordVisible}
                        onVisibilityChange={setIsPasswordVisible}
                    />
                    <VisibilityPasswordTextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        error={
                            status === "passwordTooShort" || status === "passwordsDontMatch"
                        }
                        label="Repeat Password"
                        inputRef={registerPasswordRepeat}
                        autoComplete="off"
                        onChange={() => {
                            if (
                                status === "passwordTooShort" ||
                                status === "passwordsDontMatch"
                            ) {
                                setStatus(null);
                            }
                        }}
                        helperText={(() => {
                            if (status === "passwordTooShort") {
                                return "Create a password at least 8 characters long.";
                            }
                            if (status === "passwordsDontMatch") {
                                return "Your passwords dont match.";
                            }
                        })()}
                        FormHelperTextProps={{error: true}}
                        isVisible={isPasswordVisible}
                        onVisibilityChange={setIsPasswordVisible}
                    />
                    <FormControlLabel
                        style={{marginRight: 0}}
                        control={
                            <Checkbox
                                color="primary"
                                inputRef={registerTermsCheckbox}
                                onChange={() => {
                                    setHasTermsOfServiceError(false);
                                }}
                            />
                        }
                        label={
                            <Typography variant="body1">
                                I agree to the
                                <span
                                    className={classes.link}
                                    onClick={isLoading ? null : openTermsDialog}
                                    tabIndex={0}
                                    role="button"
                                    onKeyDown={(event) => {
                                        if (
                                            (!isLoading && event.keyCode === 13) ||
                                            event.keyCode === 32
                                        ) {
                                            openTermsDialog();
                                        }
                                    }}
                                >
                  {" "}
                                    terms of service
                </span>
                            </Typography>
                        }
                    />
                    {hasTermsOfServiceError && (
                        <FormHelperText
                            error
                            style={{
                                display: "block",
                                marginTop: theme.spacing(-1),
                            }}
                        >
                            In order to create an account, you have to accept our terms of
                            service.
                        </FormHelperText>
                    )}

                </Fragment>
            }
            actions={
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    size="large"
                    color="secondary"
                    disabled={isLoading}
                >
                    Register
                    {isLoading && <ButtonCircularProgress />}
                </Button>
            }
        />
    );
}

RegisterDialog.propTypes = {
    theme: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
    openTermsDialog: PropTypes.func.isRequired,
    status: PropTypes.string,
    setStatus: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles, {withTheme: true})(RegisterDialog));

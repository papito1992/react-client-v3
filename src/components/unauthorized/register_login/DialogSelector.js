import React, {Fragment, useCallback, useState} from "react";
import PropTypes from "prop-types";
import RegisterDialog from "./RegisterDialog";
import LoginDialog from "./LoginDialog";

function DialogSelector(props) {
    const {
        dialogOpen,
        openTermsDialog,
        openChangePasswordDialog,
        onClose
    } = props;
    const [loginStatus, setLoginStatus] = useState(null);
    const [registerStatus, setRegisterStatus] = useState(null);

    const _onClose = useCallback(() => {
        setLoginStatus(null);
        setRegisterStatus(null);
        onClose();
    }, [onClose, setLoginStatus, setRegisterStatus]);

    const printDialog = useCallback(() => {
        switch (dialogOpen) {
            case "register":
                return (
                    <RegisterDialog
                        onClose={_onClose}
                        openTermsDialog={openTermsDialog}
                        status={registerStatus}
                        setStatus={setRegisterStatus}
                    />
                );
            case "login":
                return (
                    <LoginDialog
                        onClose={_onClose}
                        status={loginStatus}
                        setStatus={setLoginStatus}
                        openChangePasswordDialog={openChangePasswordDialog}
                    />
                );
            default:
        }
    }, [
        dialogOpen,
        openChangePasswordDialog,
        openTermsDialog,
        _onClose,
        loginStatus,
        registerStatus,
        setLoginStatus,
        setRegisterStatus,
    ]);

    return (
        <Fragment>
            {printDialog()}
        </Fragment>
    );
}

DialogSelector.propTypes = {
    dialogOpen: PropTypes.string,
    openLoginDialog: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    openTermsDialog: PropTypes.func.isRequired,
    openRegisterDialog: PropTypes.func.isRequired,
    openChangePasswordDialog: PropTypes.func.isRequired,
};

export default DialogSelector;

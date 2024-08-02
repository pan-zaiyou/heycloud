import React from "react";
import lo from "lodash-es";

// material-ui
import { Dialog, DialogContent, DialogTitle, InputAdornment } from "@mui/material";
import { useSnackbar } from "notistack";

// third party
import ReCaptcha from "react-google-recaptcha";
import { Trans, useTranslation } from "react-i18next";

// project import
import IconButton from "@/components/@extended/IconButton";
import { useGetGuestConfigQuery, useSendEmailVerifyMutation, useCheckAccountExistsMutation } from "@/store/services/api";

// assets
import { SendOutlined } from "@ant-design/icons";
import ReactGA from "react-ga4";

// ============================|| AUTH - SEND EMAIL VERIFY ||============================ //

export interface SendMailButtonProps {
  email: string;
}

export const SendMailWithCaptchaButton: React.FC<SendMailButtonProps> = ({ email }) => {
  const { data: guestConfig } = useGetGuestConfigQuery();
  const [sendEmailVerify, { isLoading: isSending }] = useSendEmailVerifyMutation();
  const [checkAccountExists, { isLoading: isChecking }] = useCheckAccountExistsMutation();
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();

  const [open, setOpen] = React.useState(false);

  const handleSendEmail = (token: string | null) => {
    if (lo.isNull(token)) {
      enqueueSnackbar(t("auth.captcha.error_null_token"), { variant: "error" });
      return;
    }

    checkAccountExists({ email })
      .unwrap()
      .then((exists) => {
        if (exists) {
          sendEmailVerify({ email, recaptcha_data: token! })
            .unwrap()
            .then(() => {
              enqueueSnackbar(t("auth.captcha.success"), { variant: "success" });
              ReactGA.event("send_email_verify", {
                category: "auth",
                label: "send_email_verify",
                email: email,
                success: true,
              });
            })
            .catch((err) => {
              console.error(err);
              enqueueSnackbar(t("auth.captcha.error"), { variant: "error" });
              ReactGA.event("send_email_verify", {
                category: "auth",
                label: "send_email_verify",
                email: email,
                success: false,
                error: err,
              });
            })
            .finally(() => {
              setOpen(false);
            });
        } else {
          enqueueSnackbar(t("auth.account_not_found"), { variant: "error" });
        }
      })
      .catch((err) => {
        console.error(err);
        enqueueSnackbar(t("auth.check_account_error"), { variant: "error" });
      });
  };

  return (
    <>
      <InputAdornment position="end">
        <IconButton
          aria-label="send email code"
          onClick={() => setOpen(true)}
          edge="end"
          color="secondary"
          disabled={isSending || isChecking}
        >
          <SendOutlined />
        </IconButton>
      </InputAdornment>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>
          <Trans i18nKey={"auth.captcha.title"}>Captcha</Trans>
        </DialogTitle>
        <DialogContent>
          <ReCaptcha
            sitekey={guestConfig?.recaptcha_site_key!}
            onChange={handleSendEmail}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

const SendMailButton: React.FC<SendMailButtonProps> = ({ email }) => {
  const [sendMail, { isLoading: isSending }] = useSendEmailVerifyMutation();
  const [checkAccountExists, { isLoading: isChecking }] = useCheckAccountExistsMutation();
  const { data: siteConfig } = useGetGuestConfigQuery();
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();

  const handleSendEmailCode = () => {
    console.log("send email code");

    checkAccountExists({ email })
      .unwrap()
      .then((exists) => {
        if (exists) {
          sendMail({ email })
            .unwrap()
            .then(() => {
              enqueueSnackbar(t("auth.captcha.success"), { variant: "success" });
            })
            .catch((err) => {
              console.error(err);
              enqueueSnackbar(t("auth.captcha.error"), { variant: "error" });
            });
        } else {
          enqueueSnackbar(t("auth.account_not_found"), { variant: "error" });
        }
      })
      .catch((err) => {
        console.error(err);
        enqueueSnackbar(t("auth.check_account_error"), { variant: "error" });
      });
  };

  if (siteConfig?.is_recaptcha === 1) {
    return <SendMailWithCaptchaButton email={email} />;
  } else {
    return (
      <InputAdornment position="end">
        <IconButton
          aria-label="send email code"
          onClick={handleSendEmailCode}
          edge="end"
          color="secondary"
          disabled={isSending || isChecking}
        >
          <SendOutlined />
        </IconButton>
      </InputAdornment>
    );
  }
};

export default SendMailButton;

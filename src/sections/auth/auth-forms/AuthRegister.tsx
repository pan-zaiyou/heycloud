import React, { SyntheticEvent, useEffect, useMemo, useState } from "react";
import lo from "lodash-es";
import { Link as RouterLink, useNavigate } from "react-router-dom";

// material-ui
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
  Stack,
  Typography
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

// third party
import * as Yup from "yup";
import { Formik } from "formik";
import { Trans, useTranslation } from "react-i18next";
import OtpInput from "react18-input-otp";
import { useSnackbar } from "notistack";
import { useUnmountedRef } from "ahooks";
import ReactGA from "react-ga4";

// project import
import IconButton from "@/components/@extended/IconButton";
import AnimateButton from "@/components/@extended/AnimateButton";
import SendMailButton from "@/sections/auth/auth-forms/SendMailButton";
import { useGetGuestConfigQuery, useRegisterMutation } from "@/store/services/api";
import { strengthColor, strengthIndicator } from "@/utils/password-strength";
import useQuery from "@/hooks/useQuery";

// types
import { StringColorProps } from "@/types/password";
import { RegisterPayload } from "@/model/register";

// assets
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";

// ============================|| FIREBASE - REGISTER ||============================ //

const AuthRegister = () => {
  const theme = useTheme();
  const scriptedRef = useUnmountedRef();
  const navigate = useNavigate();
  const { t } = useTranslation("common");
  const { enqueueSnackbar } = useSnackbar();
  const query = useQuery();

  const [register] = useRegisterMutation();
  const { data: siteConfig } = useGetGuestConfigQuery();

  const [level, setLevel] = useState<StringColorProps>();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: SyntheticEvent) => {
    event.preventDefault();
  };

  const handlePasswordChange = (value: string) => {
    const temp = strengthIndicator(value);
    setLevel(strengthColor(temp));
  };

  useEffect(() => {
    handlePasswordChange("");
  }, []);

  const validationSchema = useMemo(
    () =>
      Yup.object().shape({
        email: Yup.string()
          .email(t("register.email_invalid").toString())
          .max(255, t("register.email_max", { count: 255 }).toString())
          .required(t("register.email_required").toString()),
        password: Yup.string()
          .min(8, t("register.password_min", { count: 8 }).toString())
          .max(255, t("register.password_max", { count: 255 }).toString())
          .required(t("register.password_required").toString()),
        password_confirm: Yup.string()
          .oneOf([Yup.ref("password"), null], t("register.password_confirm_invalid").toString())
          .required(t("register.password_confirm_required").toString()),
        invite_code: siteConfig?.is_invite_force
          ? Yup.string()
            .max(8, t("register.invite_code_max").toString())
            .required(t("register.invite_code_required").toString())
          : Yup.string().max(8, t("register.invite_code_max").toString()),
        email_code: siteConfig?.is_email_verify
          ? Yup.string()
            .max(6, t("register.email_code_max").toString())
            .required(t("register.email_code_required").toString())
          : Yup.string().max(6, t("register.email_code_max").toString())
      }),
    [t, siteConfig?.is_invite_force, siteConfig?.is_email_verify]
  );

  return (
    <>
      <Formik
        initialValues={{
          email: "",
          password: "",
          password_confirm: "",
          invite_code: query.get("code") ?? "",
          email_code: "",
          agree: false,
          submit: null
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          if (!values.agree) {
            setStatus({ success: false });
            setErrors({ submit: t("register.agree_required").toString() });
            setSubmitting(false);
            return;
          }

          try {
            await register({
              email: values.email,
              password: values.password,
              invite_code: values.invite_code,
              email_code: siteConfig?.is_email_verify ? values.email_code : ""
            } as RegisterPayload)
              .unwrap()
              .then(
                () => {
                  setStatus({ success: true });
                  enqueueSnackbar(t("notice::register_success"), { variant: "success" });
                  navigate("/dashboard", { replace: true });
                  ReactGA.event("register", {
                    category: "auth",
                    label: "register",
                    method: "email",
                    success: true,
                    email: values.email,
                    password_strength: level?.label,
                    invite_code: values.invite_code
                  });
                },
                (error) => {
                  setStatus({ success: false });
                  // Ensure errors are properly set for fields as well as the global error
                  setErrors(lo.isEmpty(error.errors) ? { submit: error.message } : error.errors);
                  enqueueSnackbar(error.message, { variant: "error" }); // Show API error message at the top
                  ReactGA.event("register", {
                    category: "auth",
                    label: "register",
                    method: "email",
                    success: false,
                    error: error.message,
                    email: values.email,
                    values
                  });
                }
              );
          } catch (err: any) {
            console.error(err);
            if (scriptedRef.current) {
              setStatus({ success: false });
              setErrors(lo.isEmpty(err.errors) ? { submit: err.message } : err.errors);
              enqueueSnackbar(t("notice::register_failed"), { variant: "error" }); // Show a general error message at the top
            }
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, setValues }) => (
          <Box component={"form"} onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              {/* Email */}
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="email">
                    <Trans>{"register.email"}</Trans>
                  </InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.email && errors.email)}
                    id="email"
                    type="email"
                    value={values.email}
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="user@example.com"
                    inputProps={{}}
                    endAdornment={
                      siteConfig?.is_email_verify === 1 ? <SendMailButton email={values.email} /> : undefined
                    }
                  />
                  {touched.email && errors.email && (
                    <FormHelperText error id="helper-text-email-signup">
                      {errors.email}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              {siteConfig?.is_email_verify === 1 && (
                <>
                  {/* Email Code */}
                  <Grid item xs={12}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="email-code-signup">
                        <Trans>{"register.email_code"}</Trans>
                      </InputLabel>
                      <OtpInput
                        value={values.email_code}
                        onChange={(otp: string) => {
                          setValues((prev) => ({
                            ...prev,
                            email_code: otp
                          }));
                        }}
                        numInputs={6}
                        containerStyle={{ justifyContent: "space-between" }}
                        inputStyle={{
                          width: "100%",
                          margin: "8px",
                          padding: "10px",
                          border: `1px solid ${theme.palette.mode === "dark" ? theme.palette.grey[200] : theme.palette.grey[300]
                            }`,
                          borderRadius: 4,
                          ":hover": {
                            borderColor: theme.palette.primary.main
                          }
                        }}
                        focusStyle={{
                          outline: "none",
                          boxShadow: theme.customShadows.primary,
                          border: `1px solid ${theme.palette.primary.main}`
                        }}
                      />
                      {touched.email_code && errors.email_code && (
                        <FormHelperText error id="helper-text-email-code-signup">
                          {errors.email_code}
                        </FormHelperText>
                      )}
                    </Stack>
                  </Grid>
                </>
              )}
              {/* Password */}
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="password-signup">
                    <Trans>{"register.password"}</Trans>
                  </InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.password && errors.password)}
                    id="password-signup"
                    type={showPassword ? "text" : "password"}
                    value={values.password}
                    name="password"
                    onBlur={handleBlur}
                    onChange={(e) => {
                      handleChange(e);
                      handlePasswordChange(e.target.value);
                    }}
                    placeholder="Password"
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          edge="end"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  {touched.password && errors.password && (
                    <FormHelperText error id="helper-text-password-signup">
                      {errors.password}
                    </FormHelperText>
                  )}
                </Stack>
                <Stack spacing={1}>
                  {values.password && (
                    <Box sx={{ mb: 1 }}>
                      <Typography variant="subtitle2">{t("register.password_strength")}</Typography>
                      <Stack direction="row" alignItems="center" spacing={1.5}>
                        <Box
                          sx={{
                            width: `${level?.progress ?? 0}%`,
                            height: 4,
                            borderRadius: "4px",
                            backgroundColor: level?.color
                          }}
                        />
                        <Typography variant="caption">{t(level?.label)}</Typography>
                      </Stack>
                    </Box>
                  )}
                </Stack>
              </Grid>
              {/* Confirm Password */}
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="password-confirm-signup">
                    <Trans>{"register.password_confirm"}</Trans>
                  </InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.password_confirm && errors.password_confirm)}
                    id="password-confirm-signup"
                    type="password"
                    value={values.password_confirm}
                    name="password_confirm"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Confirm Password"
                  />
                  {touched.password_confirm && errors.password_confirm && (
                    <FormHelperText error id="helper-text-password-confirm-signup">
                      {errors.password_confirm}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              {siteConfig?.is_invite_force && (
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="invite-code-signup">
                      <Trans>{"register.invite_code"}</Trans>
                    </InputLabel>
                    <OutlinedInput
                      fullWidth
                      error={Boolean(touched.invite_code && errors.invite_code)}
                      id="invite-code-signup"
                      type="text"
                      value={values.invite_code}
                      name="invite_code"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Invite Code"
                    />
                    {touched.invite_code && errors.invite_code && (
                      <FormHelperText error id="helper-text-invite-code-signup">
                        {errors.invite_code}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
              )}
              <Grid item xs={12}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={values.agree}
                        onChange={handleChange}
                        name="agree"
                        color="primary"
                      />
                    }
                    label={
                      <Typography variant="body2">
                        {t("register.agree_text")}
                        <Link component={RouterLink} to="/terms" variant="body2">
                          {t("register.terms")}
                        </Link>
                        {t("register.and")}
                        <Link component={RouterLink} to="/privacy" variant="body2">
                          {t("register.privacy")}
                        </Link>
                      </Typography>
                    }
                  />
                  {touched.agree && errors.agree && (
                    <FormHelperText error id="helper-text-agree">
                      {errors.agree}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <AnimateButton>
                  <Button
                    disableElevation
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting && (
                      <CircularProgress size={24} color="inherit" sx={{ position: "absolute" }} />
                    )}
                    {t("register.signup")}
                  </Button>
                </AnimateButton>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" align="center">
                  <Trans>
                    Already have an account?{" "}
                    <Link component={RouterLink} to="/auth/login">
                      Login
                    </Link>
                  </Trans>
                </Typography>
              </Grid>
            </Grid>
          </Box>
        )}
      </Formik>
    </>
  );
};

export default AuthRegister;

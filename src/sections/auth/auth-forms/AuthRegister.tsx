import React, { SyntheticEvent, useState, useEffect, useMemo, useCallback } from "react";
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
  const navigate = useNavigate();
  const { t } = useTranslation("common");
  const { enqueueSnackbar } = useSnackbar();
  const query = useQuery();

  const [register] = useRegisterMutation();
  const { data: siteConfig } = useGetGuestConfigQuery();

  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<StringColorProps>();

  const handlePasswordChange = (value: string) => {
    setPasswordStrength(strengthColor(strengthIndicator(value)));
  };

  useEffect(() => {
    handlePasswordChange("");
  }, []);

  const handleClickShowPassword = () => setShowPassword(prev => !prev);

  const validationSchema = useMemo(() => Yup.object().shape({
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
          .matches(/^\d{6}$/, t("register.email_code_invalid").toString())
          .required(t("register.email_code_required").toString())
      : Yup.string().notRequired()
  }), [t, siteConfig?.is_invite_force, siteConfig?.is_email_verify]);

  const handleSubmit = async (values, { setErrors, setStatus, setSubmitting }) => {
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
              password_strength: passwordStrength?.label,
              invite_code: values.invite_code
            });
          },
          (error) => {
            setStatus({ success: false });
            setErrors(error.errors || { submit: error.message });
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
    } catch (err) {
      console.error(err);
      setStatus({ success: false });
      setErrors({ submit: err.message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
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
      onSubmit={handleSubmit}
    >
      {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, setValues }) => (
        <Box component="form" onSubmit={handleSubmit}>
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
                  endAdornment={
                    siteConfig?.is_email_verify === 1 ? <SendMailButton email={values.email} /> : null
                  }
                />
                {touched.email && errors.email && (
                  <FormHelperText error>{errors.email}</FormHelperText>
                )}
              </Stack>
            </Grid>
            {siteConfig?.is_email_verify && (
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="email-code-signup">
                    <Trans>{"register.email_code"}</Trans>
                  </InputLabel>
                  <OtpInput
                    value={values.email_code}
                    onChange={otp => setValues(prev => ({ ...prev, email_code: otp }))}
                    numInputs={6}
                    containerStyle={{ justifyContent: "space-between" }}
                    inputStyle={{
                      width: "100%",
                      margin: "8px",
                      padding: "10px",
                      border: `1px solid ${theme.palette.grey[300]}`,
                      borderRadius: 4
                    }}
                    focusStyle={{
                      outline: "none",
                      boxShadow: theme.customShadows.primary,
                      border: `1px solid ${theme.palette.primary.main}`
                    }}
                  />
                  {touched.email_code && errors.email_code && (
                    <FormHelperText error>{errors.email_code}</FormHelperText>
                  )}
                </Stack>
              </Grid>
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
                  onChange={e => {
                    handleChange(e);
                    handlePasswordChange(e.target.value);
                  }}
                  autoComplete="new-password"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                        color="secondary"
                      >
                        {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                      </IconButton>
                    </InputAdornment>
                  }
                  placeholder="******"
                />
                {touched.password && errors.password && (
                  <FormHelperText error>{errors.password}</FormHelperText>
                )}
                <FormControl fullWidth sx={{ mt: 2 }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item>
                      <Box sx={{ bgcolor: passwordStrength?.color, width: 85, height: 8, borderRadius: "7px" }} />
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1" fontSize="0.75rem">
                        {t("register.password_strength", { context: passwordStrength?.label })}
                      </Typography>
                    </Grid>
                  </Grid>
                </FormControl>
              </Stack>
            </Grid>
            {/* Password Confirm */}
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="password-confirm">
                  <Trans>{"register.password_confirm"}</Trans>
                </InputLabel>
                <OutlinedInput
                  fullWidth
                  error={Boolean(touched.password_confirm && errors.password_confirm)}
                  id="password-confirm"
                  type={showPassword ? "text" : "password"}
                  value={values.password_confirm}
                  name="password_confirm"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  autoComplete="new-password"
                  placeholder="******"
                />
                {touched.password_confirm && errors.password_confirm && (
                  <FormHelperText error>{errors.password_confirm}</FormHelperText>
                )}
              </Stack>
            </Grid>
            {/* Invite Code */}
            {siteConfig?.is_invite_force && (
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="invite-code-signup" required>
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
                    required
                    placeholder={t("register.invite_code_placeholder", { context: "required" })}
                    disabled={query.get("code") !== null}
                  />
                  {touched.invite_code && errors.invite_code && (
                    <FormHelperText error>{errors.invite_code}</FormHelperText>
                  )}
                </Stack>
              </Grid>
            )}
            {/* Agree Terms */}
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox sx={{ marginRight: 1 }} />}
                name="agree"
                onBlur={handleBlur}
                onChange={handleChange}
                required
                label={
                  <Typography variant="body2">
                    <Trans i18nKey="register.license_agree">
                      <Link id="terms-of-service" variant="subtitle2" component={RouterLink} to="/terms-of-service" />
                      <Link id="privacy-policy" variant="subtitle2" component={RouterLink} to="/privacy-policy" />
                    </Trans>
                  </Typography>
                }
              />
            </Grid>
            {/* Submit Button */}
            {errors.submit && (
              <Grid item xs={12}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Grid>
            )}
            <Grid item xs={12}>
              <AnimateButton>
                <Button
                  disableElevation
                  disabled={isSubmitting}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  {isSubmitting ? <CircularProgress size={24} color="inherit" /> : <Trans>{"register.submit"}</Trans>}
                </Button>
              </AnimateButton>
            </Grid>
          </Grid>
        </Box>
      )}
    </Formik>
  );
};

export default AuthRegister;

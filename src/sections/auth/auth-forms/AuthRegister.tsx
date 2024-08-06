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
              .matches(/^\d{6}$/, t("register.email_code_invalid").toString())
              .required(t("register.email_code_required").toString())
          : Yup.string().notRequired()
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
                  setErrors(lo.isEmpty(error.errors) ? { submit: error.message } : error.errors);
                  enqueueSnackbar(error.message, { variant: "error" }); // 添加此行
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
              enqueueSnackbar(err.message, { variant: "error" }); // 添加此行
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
                          border: `1px solid ${
                            theme.palette.mode === "dark" ? theme.palette.grey[200] : theme.palette.grey[300]
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
                        <FormHelperText error id="helper-text-email-signup">
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
                    autoComplete={"new-password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          size="large"
                        >
                          {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                        </IconButton>
                      </InputAdornment>
                    }
                    placeholder={t("register.password_placeholder").toString()}
                  />
                  {touched.password && errors.password && (
                    <FormHelperText error id="helper-text-password-signup">
                      {errors.password}
                    </FormHelperText>
                  )}
                </Stack>
                {values.password && (
                  <FormControl fullWidth sx={{ mt: 2 }}>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item>
                        <Box
                          sx={{
                            bgcolor: level?.color,
                            width: 85,
                            height: 8,
                            borderRadius: "7px"
                          }}
                        />
                      </Grid>
                      <Grid item>
                        <Typography variant="subtitle1" fontSize="0.75rem">
                          {level?.label}
                        </Typography>
                      </Grid>
                    </Grid>
                  </FormControl>
                )}
              </Grid>
              {/* Confirm Password */}
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="password_confirm-signup">
                    <Trans>{"register.password_confirm"}</Trans>
                  </InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.password_confirm && errors.password_confirm)}
                    id="password_confirm-signup"
                    type={showPassword ? "text" : "password"}
                    value={values.password_confirm}
                    name="password_confirm"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder={t("register.password_confirm_placeholder").toString()}
                    inputProps={{}}
                  />
                  {touched.password_confirm && errors.password_confirm && (
                    <FormHelperText error id="helper-text-password_confirm-signup">
                      {errors.password_confirm}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              {/* Invite Code */}
              {siteConfig?.is_invite_force === 1 && (
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="invite_code-signup">
                      <Trans>{"register.invite_code"}</Trans>
                    </InputLabel>
                    <OutlinedInput
                      fullWidth
                      error={Boolean(touched.invite_code && errors.invite_code)}
                      id="invite_code-signup"
                      type="text"
                      value={values.invite_code}
                      name="invite_code"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder={t("register.invite_code_placeholder").toString()}
                      inputProps={{}}
                    />
                    {touched.invite_code && errors.invite_code && (
                      <FormHelperText error id="helper-text-invite_code-signup">
                        {errors.invite_code}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
              )}
              {/* Agree Terms */}
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={values.agree}
                      onChange={handleChange}
                      name="agree"
                      color="primary"
                      size="small"
                    />
                  }
                  label={
                    <Typography variant="h6">
                      <Trans i18nKey="register.agree_text">
                        {"I agree to the "}
                        <Link variant="h6" component={RouterLink} to="/terms" target="_blank">
                          Terms and Conditions
                        </Link>
                      </Trans>
                    </Typography>
                  }
                />
                {touched.agree && errors.agree && (
                  <FormHelperText error>{errors.agree}</FormHelperText>
                )}
              </Grid>
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
                    {isSubmitting ? <CircularProgress size="1.5rem" /> : t("register.submit")}
                  </Button>
                </AnimateButton>
              </Grid>
              <Grid item xs={12}>
                <Grid item container direction="column" alignItems="center" xs={12}>
                  <Typography component={Link} to="/login" variant="subtitle1" sx={{ textDecoration: "none" }}>
                    <Trans>{"register.have_account"}</Trans>
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        )}
      </Formik>
    </>
  );
};

export default AuthRegister;

import React, { useState } from "react";
import { Button, CircularProgress } from "@mui/material";
import { useSnackbar } from "notistack";
import { useCheckEmailExistsMutation, useSendVerificationCodeMutation } from "@/store/services/api"; // 假设你有这些 API hooks

const SendMailButton = ({ email }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [isChecking, setIsChecking] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const [checkEmailExists] = useCheckEmailExistsMutation(); // 验证邮箱是否存在的 API
  const [sendVerificationCode] = useSendVerificationCodeMutation(); // 发送验证码的 API

  const handleSendCode = async () => {
    setIsChecking(true);
    try {
      const emailExists = await checkEmailExists({ email }).unwrap();
      if (emailExists) {
        setIsSending(true);
        await sendVerificationCode({ email }).unwrap();
        enqueueSnackbar("验证码已发送至您的邮箱", { variant: "success" });
      } else {
        enqueueSnackbar("邮箱不存在，请检查后重试", { variant: "error" });
      }
    } catch (error) {
      enqueueSnackbar("发送验证码时出错，请稍后再试", { variant: "error" });
    } finally {
      setIsChecking(false);
      setIsSending(false);
    }
  };

  return (
    <Button
      onClick={handleSendCode}
      disabled={isChecking || isSending || !email} // 禁用按钮直到检查和发送完成
    >
      {isChecking || isSending ? <CircularProgress size={24} /> : "发送验证码"}
    </Button>
  );
};

export default SendMailButton;

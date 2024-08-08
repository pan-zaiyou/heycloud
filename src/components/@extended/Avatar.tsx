import { ReactNode } from "react";

// material-ui
import { styled, useTheme, Theme } from "@mui/material/styles";
import MuiAvatar from "@mui/material/Avatar";
import { AvatarProps } from "@mui/material";

// project import
import getColors from "@/utils/getColors";

// types
import { AvatarTypeProps, ColorProps, ExtendedStyleProps, SizeProps } from "@/types/extended";

// 图像路径
import avatar1 from "@/assets/images/users/avatar-1.png";
import avatar2 from "@/assets/images/users/avatar-2.png";
import avatar3 from "@/assets/images/users/avatar-3.png";
import avatar4 from "@/assets/images/users/avatar-4.png";
import avatar5 from "@/assets/images/users/avatar-5.png";

// ==============================|| AVATAR - COLOR STYLE ||============================== //

interface AvatarStyleProps extends ExtendedStyleProps {
  variant?: AvatarProps["variant"];
  type?: AvatarTypeProps;
}

function getColorStyle({ variant, theme, color, type }: AvatarStyleProps) {
  const colors = getColors(theme, color);
  const { lighter, light, main, contrastText } = colors;

  switch (type) {
    case "filled":
      return {
        color: contrastText,
        backgroundColor: main
      };
    case "outlined":
      return {
        color: main,
        border: "1px solid",
        borderColor: main,
        backgroundColor: "transparent"
      };
    case "combined":
      return {
        color: main,
        border: "1px solid",
        borderColor: light,
        backgroundColor: lighter
      };
    default:
      return {
        color: main,
        backgroundColor: lighter
      };
  }
}

// ==============================|| AVATAR - SIZE STYLE ||============================== //

function getSizeStyle(size?: SizeProps) {
  switch (size) {
    case "badge":
      return {
        border: "2px solid",
        fontSize: "0.675rem",
        width: 20,
        height: 20
      };
    case "xs":
      return {
        fontSize: "0.75rem",
        width: 24,
        height: 24
      };
    case "sm":
      return {
        fontSize: "0.875rem",
        width: 32,
        height: 32
      };
    case "lg":
      return {
        fontSize: "1.2rem",
        width: 52,
        height: 52
      };
    case "xl":
      return {
        fontSize: "1.5rem",
        width: 64,
        height: 64
      };
    case "md":
    default:
      return {
        fontSize: "1rem",
        width: 40,
        height: 40
      };
  }
}

// ==============================|| STYLED - AVATAR ||============================== //

interface StyleProps {
  color: ColorProps;
  variant?: AvatarProps["variant"];
  type?: AvatarTypeProps;
  theme: Theme;
  size?: SizeProps;
}

const AvatarStyle = styled(MuiAvatar, {
  shouldForwardProp: (prop) => prop !== "color" && prop !== "type" && prop !== "size"
})(({ theme, variant, color, type, size }: StyleProps) => ({
  ...getSizeStyle(size),
  ...getColorStyle({ variant, theme, color, type }),
  ...(size === "badge" && {
    borderColor: theme.palette.background.default
  })
}));

// ==============================|| EXTENDED - AVATAR ||============================== //

export interface Props extends AvatarProps {
  color?: ColorProps;
  children?: ReactNode | string;
  type?: AvatarTypeProps;
  size?: SizeProps;
  imagePath?: "avatar-1" | "avatar-2" | "avatar-3" | "avatar-4" | "avatar-5";
}

export default function Avatar({
  variant = "circular",
  children,
  color = "primary",
  type,
  size = "md",
  imagePath,
  ...others
}: Props) {
  const theme = useTheme();

  // 根据 imagePath 选择图像
  const imageSources: Record<string, string> = {
    "avatar-1": avatar1,
    "avatar-2": avatar2,
    "avatar-3": avatar3,
    "avatar-4": avatar4,
    "avatar-5": avatar5
  };

  // 获取图像路径
  const imgSrc = imagePath ? imageSources[imagePath] : undefined;

  return (
    <AvatarStyle variant={variant} theme={theme} color={color} type={type} size={size} {...others}>
      {imgSrc ? (
        <img src={imgSrc} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      ) : (
        children
      )}
    </AvatarStyle>
  );
}

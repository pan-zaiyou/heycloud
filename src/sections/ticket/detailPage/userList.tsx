import React, { useCallback } from "react";

// third-party
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

// material-ui
import { useTheme } from "@mui/material/styles";
import { Avatar, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Stack, Typography } from "@mui/material";

// project imports
import Dot from "@/components/@extended/Dot";
import { useTicketContext } from "./context";
import { TicketLevel, TicketReplyStatus, TicketStatus } from "@/model/ticket";
import { makeStyles } from "@/themes/hooks";

// assets
import { CheckOutlined, CommentOutlined, MessageOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles()((theme) => ({
  listItemButton: {
    paddingLeft: theme.spacing(1),
  },
  text: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  iconAvatar: {
    width: theme.spacing(4.5),
    height: theme.spacing(4.5),
    fontSize: "1rem",
  },
}));

const UserList = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const { tickets, currentId, setCurrentId, closeMenu } = useTicketContext(); // 获取 closeMenu 函数
  const { classes } = useStyles();
  const navigate = useNavigate();

  const getDateDiff = useCallback(
    (unix: number, key: string) => {
      const diffSec = dayjs().diff(dayjs.unix(unix), "second");
      const formatDate = (context: string, count: number) =>
        t(key, { context, count });

      if (diffSec < 60) return formatDate("just_now", 0);
      if (diffSec < 3600) return formatDate("minute", dayjs().diff(dayjs.unix(unix), "minute"));
      if (diffSec < 86400) return formatDate("hour", dayjs().diff(dayjs.unix(unix), "hour"));
      if (diffSec < 2592000) return formatDate("day", dayjs().diff(dayjs.unix(unix), "day"));
      if (diffSec < 31536000) return formatDate("month", dayjs().diff(dayjs.unix(unix), "month"));
      return formatDate("year", dayjs().diff(dayjs.unix(unix), "year"));
    },
    [t]
  );

  const getColorClass = useCallback(
    (level: TicketLevel) => {
      switch (level) {
        case TicketLevel.Medium:
          return {
            color: theme.palette.warning.main,
            backgroundColor: theme.palette.warning.lighter,
          };
        case TicketLevel.High:
          return {
            color: theme.palette.error.main,
            backgroundColor: theme.palette.error.lighter,
          };
        case TicketLevel.Low:
        default:
          return {
            color: theme.palette.success.main,
            backgroundColor: theme.palette.success.lighter,
          };
      }
    },
    [theme.palette]
  );

  return (
    <List component="nav">
      {tickets.map((ticket) => (
        <ListItem key={ticket.id} disablePadding divider>
          <ListItemButton
            className={classes.listItemButton}
            selected={ticket.id === currentId}
            onClick={() => {
              setCurrentId(ticket.id);
              navigate(`/ticket/${ticket.id}`);
              closeMenu(); // 点击时关闭菜单
            }}
          >
            <ListItemAvatar>
              <Avatar
                style={getColorClass(ticket.level)}
                className={classes.iconAvatar}
              >
                {ticket.reply_status === TicketReplyStatus.Replied ? <MessageOutlined /> : <CommentOutlined />}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={
                <Stack component="span" direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
                  <Typography variant="h5" color="inherit" className={classes.text}>
                    {ticket.subject}
                  </Typography>
                  <Typography component="span" color="textSecondary" variant="caption">
                    {t("ticket.drawer.reply_status", {
                      context:
                        ticket.status === TicketStatus.Closed
                          ? "closed"
                          : ticket.reply_status === TicketReplyStatus.Replied
                          ? "replied"
                          : "pending"
                    })}
                  </Typography>
                </Stack>
              }
              secondary={
                <Stack component="span" direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
                  <Typography variant="caption" color="textSecondary" className={classes.text}>
                    {getDateDiff(ticket.updated_at, "ticket.drawer.updated_at")}
                  </Typography>
                  {ticket.status === TicketStatus.Open ? (
                    <Dot color="primary" />
                  ) : (
                    <CheckOutlined style={{ color: theme.palette.primary.main }} />
                  )}
                </Stack>
              }
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default UserList;

// project import
import { NavItemType } from "@/types/menu";
import {
  DashboardOutlined,
  MonitorOutlined,
  ReadOutlined,
  ShoppingOutlined,
  UnorderedListOutlined
} from "@ant-design/icons";

// ==============================|| MENU ITEMS ||============================== //

const menuItems: { items: NavItemType[] } = {
  items: [
    {
      id: "app",
      title: "app",
      type: "group",
      children: [
        {
          id: "dashboard",
          title: "dashboard",
          type: "item",
          url: "/dashboard",
          icon: DashboardOutlined
        },
        {
          id: "knowledge",
          title: "knowledge",
          type: "item",
          url: "/knowledge",
          icon: ReadOutlined
        }
      ]
    },
    {
      id: "subscription",
      title: "subscription",
      type: "group",
      children: [
        {
          id: "buy-plan",
          title: "buy-plan",
          type: "item",
          url: "/plan/buy",
          icon: ShoppingOutlined
        },
        {
          id: "node-status",
          title: "node-status",
          type: "item",
          url: "/node/status",
          icon: MonitorOutlined
        }
      ]
    },
    {
      id: "billing",
      title: "billing",
      type: "group",
      children: [
        {
          id: "order-list",
          title: "order-list",
          type: "item",
          url: "/order",
          icon: UnorderedListOutlined
        }
      ]
    }
  ]
};

export default menuItems;

import { Avatar, Dropdown, Button } from 'antd';
import { DownOutlined, LogoutOutlined } from '@ant-design/icons';
import { useAppSelector, useAppDispatch } from 'redux/hooks';
import { deleteUser } from 'redux/actions/user';
import './style.css';

const Navbar = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const dropdownAccountMenu = (
    <>
      <div className="user-info">
        <Avatar size={64} shape="circle" src={user.images[0].url} />
        <div className="user-info-name">
          <div className="user-info-display-name">{user.displayName}</div>
          <div>{user.id}</div>
        </div>
      </div>
      <Button
        className="logout-button"
        block
        danger
        icon={<LogoutOutlined />}
        onClick={() => dispatch(deleteUser())}
      >
        Logout
      </Button>
    </>
  );

  return (
    <div className="navbar-container">
      <Dropdown
        overlay={dropdownAccountMenu}
        overlayClassName="dropdown-account-content"
        placement="bottomRight"
      >
        <Button type="text" className="dropdown-account-trigger" size="large">
          {user.displayName}
          <DownOutlined />
        </Button>
      </Dropdown>
    </div>
  );
};

export default Navbar;

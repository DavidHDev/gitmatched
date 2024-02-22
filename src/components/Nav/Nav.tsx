import { Button, Group, Image, Text } from "@mantine/core";
import { useNavigate } from "react-router-dom";

import logo from '../../assets/applogo.svg';
import './nav.scss';

const Nav = () => {
  const navigate = useNavigate();

  return (
    <nav className="nav">
      <Group>
        <Image onClick={() => navigate('/')} className="logo" src={logo} />
        <Text size="sm" style={{color: '#c029df'}} fw={800}>GitMatched</Text>
      </Group>

      <Button onClick={() => navigate('/matches')} className="my-likes-btn">
        <i className="fa fa-heart"></i> My Matches
      </Button>

    </nav>
  );
}

export default Nav;
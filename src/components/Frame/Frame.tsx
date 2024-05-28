import React, { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import {
  Container,
  Sidebar,
  Sidenav,
  Content,
  Nav,
  DOMHelper,
  Header as RHeader,
  Navbar
} from 'rsuite';
import { Outlet } from 'react-router-dom';
import NavToggle from './NavToggle';
import Header from '../Header';
import NavLink from '../NavLink';
import Brand from '../Brand';
import { useHover } from 'react-use';
import { Icon } from '@rsuite/icons';
import { Logo,CatIcon } from '@/components/CustomIcons';

const { getHeight, on } = DOMHelper;

const NavItem = props => {
  const { title, eventKey, ...rest } = props;
  return (
    <Nav.Item eventKey={eventKey} as={NavLink} {...rest}>
      {title}
    </Nav.Item>
  );
};

export interface NavItemData {
  eventKey: string;
  title: string;
  icon?: any;
  to?: string;
  target?: string;
  children?: NavItemData[];
  type?: string;
}

export interface FrameProps {
  navs: NavItemData[];
  children?: React.ReactNode;
}

const Frame = (props: FrameProps) => {
  const { navs } = props;
  const [expand, setExpand] = useState(true);
  const [windowHeight, setWindowHeight] = useState(getHeight(window));
  const navBodyStyle: React.CSSProperties = expand
    ? { height: windowHeight - 112, overflow: 'auto' }
    : {};
  const [hoverable, hoverd] = useHover(() => (
    <Sidenav.Body style={navBodyStyle}>
      <Nav>
        {navs.map(item => {
          const { children, ...rest } = item;
          if (children) {
            return (
              <Nav.Menu key={item.eventKey} placement="rightStart" trigger="hover" {...rest}>
                {children.map(child => {
                  return <NavItem key={child.eventKey} {...child} />;
                })}
              </Nav.Menu>
            );
          }
          if (rest.type === 'label') {
            return (
              <div className={classNames('nav-item-label', { line: !expand })} key={item.eventKey}>
                {!expand ? '' : item.title}
              </div>
            );
          }
          if (rest.target === '_blank') {
            return (
              <Nav.Item key={item.eventKey} {...rest}>
                {item.title}
              </Nav.Item>
            );
          }

          return <NavItem key={rest.eventKey} {...rest} />;
        })}
      </Nav>
    </Sidenav.Body>
  ));

  useEffect(() => {
    setWindowHeight(getHeight(window));
    const resizeListenner = on(window, 'resize', () => setWindowHeight(getHeight(window)));

    return () => {
      resizeListenner.off();
    };
  }, []);

  const containerClasses = classNames('page-container', {
    'container-full': !expand
  });

  const memoExpand = useMemo(() => expand || (!expand && hoverd), [expand, hoverd]);
  return (
    <Container>
      <RHeader className='frame-header'>
        <Navbar>
          <Nav>
            <CatIcon/>
          </Nav>
          <Navbar.Brand>
            <Icon as={Logo} style={{width:'90px',height:'32px'}} />
          </Navbar.Brand>
          <Nav pullRight>
          < Header />
          </Nav>
        </Navbar>
      </RHeader>
      <Container className="frame">
        <Sidebar
          style={{ display: 'flex', flexDirection: 'column' }}
          width={memoExpand ? 260 : 56}
          collapsible
        >
          <Sidenav.Header>
            <Brand onlyIcon={memoExpand} />
          </Sidenav.Header>
          <Sidenav expanded={memoExpand} appearance="subtle" defaultOpenKeys={['2', '3']}>
            {hoverable}
          </Sidenav>
          <NavToggle expand={memoExpand} onChange={() => setExpand(!expand)} />
        </Sidebar>

        <Container className={containerClasses}>
          {/* <Header /> */}
          <Content>
            <Outlet />
          </Content>
        </Container>
      </Container>
    </Container>
  );
};

export default Frame;

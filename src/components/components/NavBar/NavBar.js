import { HomeModal } from '@Components/components/Modals/HomeModal';
import { CNButton } from '@Components/shared/CNButton/CNButton';
import { SVGIcon } from '@Components/shared/SvgIcon/Icon';
import useMediaQuery from '@Core/hooks/useMediaQuery';
import React, { useState } from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import './NavBar.css';
import { SmallScreenNavBar } from './SmallScreenNavBar';
import { UserInfo } from './UserInfo';
const NavBarContainer = styled.section`
  display: flex;
  width: 100%;
  justify-content: space-between;
  background-color: transparent;
  align-items: center;
  position: absolute;
  top: 0;

  border-bottom: 1px solid
    ${(props) => {
      return props.isSmallVer ? props.theme.border.main : 'transparent';
    }};
  padding: 15px 0px;
  z-index: 10;
`;

const Logo = styled.div`
  width: 15%;
  margin-right: 80px;
  svg > path:last-child {
    fill: ${(props) => (props.pathname === '/home' ? '#fff' : '#484848')};
  }
`;

const ListContainer = styled.ul`
  list-style-type: none;
  display: flex;
  align-items: center;

  margin-right: 15px;
  padding-inline-start: 0px;
`;

const BaseText = styled.div`
  color: ${(props) => props.theme.palette.text.secondary};
  font-family: ${(props) => props.theme.typography.fontFamily};
  font-size: 23px;
  cursor: pointer;
  &:hover {
    color: ${(props) => props.theme.palette.primary.main};
  }
`;

const BaseItem = css`
  padding: 15px;
  cursor: pointer;
  display: flex;
  position: relative;
  align-items: center;
  color: black;
  font-family: ${(props) => props.theme.typography.fontFamily};
  font-weight: 600;
`;

const BaseDropDown = css`
  border-radius: 4px;
  background-color: ${(props) => props.theme.palette.text.secondary};
  transform: rotateX(-90deg);
  border-radius: 4px;
  transition: all 0.2s ease-in-out;
  min-width: 217px;
  position: absolute;
  list-style-type: none;
`;

const SubDropDown = styled.ul`
  ${BaseDropDown}
  left:calc(100% - 10px);
  padding: 10px;
  top: 0;
`;
const ArrowDown = styled(SVGIcon)`
  fill: currentColor;
`;

const DropDown = styled.ul`
  ${BaseDropDown}
  display:flex;
  flex-direction: column;
  padding-inline-start: 0px;
  padding: 10px;
  margin-top: 15px;
  &:before {
    content: '';
    position: absolute;
    top: -10px;
    width: 0;
    height: 0;
    border-left: 13px solid transparent;
    border-right: 13px solid transparent;
    border-bottom: 15px solid #fff;
    z-index: 10;
  }
`;

const Item = styled.li`
  ${BaseItem}
  justify-content:space-between;
  background-color: ${(props) => props.theme.palette.text.secondary};
  transition: all 0.3s;

  &:not(:last-child) {
    border-bottom: 1px solid ${(props) => props.theme.border.main};
  }

  &:hover {
    color: ${(props) => props.theme.palette.primary.main};
    transform: rotateX(0deg);
  }
  &:hover {
    transform: translateX(10px);
    & > ${SubDropDown} {
      color: ${(props) => props.theme.palette.primary.main};
      transform: rotateX(0);
    }
  }
`;

const Linka = styled.div`
  ${BaseItem}
  &:not(:last-child) {
    border-bottom: 1px solid ${(props) => props.theme.border.main};
  }
  &:hover {
    color: ${(props) => props.theme.palette.primary.main};
    transform: rotateX(0deg);
  }
`;

const RootItem = styled.li`
  padding: 5px 15px;
  font-family: ${(props) => props.theme.typography.fontFamily};
  font-weight: 600;
  cursor: pointer;
  font-size: 23px;
  position: relative;

  color: ${(props) => {
    return props.active
      ? props.theme.palette.primary.main
      : props.pathname === '/home'
      ? '#fff'
      : '#484848';
  }};

  &:hover {
    color: ${(props) => props.theme.palette.primary.main};
  }
  &:hover ${DropDown} {
    color: ${(props) => props.theme.palette.primary.main};
    transform: rotateX(0);
  }

  &:last-child {
    border-right: 1px solid ${(props) => props.theme.border.main};
  }
`;

const ModifiedButton = styled(CNButton)`
  background-color: ${(props) =>
    props.pathname === '/home'
      ? props.theme.palette.text.secondary
      : '#24334A'}!important;
  color: ${(props) =>
    props.pathname === '/home'
      ? props.theme.palette.primary.main
      : '#fff'}!important;
  border-radius: 50px 50px 50px 50px !important;
  padding: 11px 30px 11px 30px !important;
  height: 65px !important;
  width: 270px !important;
  box-sizing: border-box;
  border: none;
  font-size: 19px !important;
  &:hover {
    background-color: ${(props) =>
      props.pathname === '/home'
        ? props.theme.palette.primary.main
        : '#fff'}!important;
    color: ${(props) =>
      props.pathname === '/home' ? '#fff' : '#24334A'}!important;
  }
`;

const RegisterTextContainer = styled(BaseText)`
  display: flex;
  margin-right: 20px;
  font-weight: bold;
`;

const RegisterText = styled.div`
  display: inline-block;
  &:hover {
    color: ${(props) => props.theme.palette.primary.main};
  }
`;

const RecursiveNav = ({ data, index }) => {
  if (data === undefined) return null;

  if (index !== 0) {
    return (
      <>
        <SubDropDown>
          {data.map((item, index) => {
            return (
              <div key={index}>
                {item.type === 'link' ? (
                  <Linka>{item.title}</Linka>
                ) : (
                  <Item>
                    {item.title}
                    <SVGIcon name="arrowright" width="12" height="12" />
                    <RecursiveNav data={item.children} index={index + 1} />
                  </Item>
                )}
              </div>
            );
          })}
        </SubDropDown>
      </>
    );
  } else {
    return (
      <>
        {data.map((item, index) => {
          return (
            <div key={index}>
              {item.type === 'link' ? (
                <Linka>{item.title}</Linka>
              ) : (
                <Item>
                  {item.title}
                  <SVGIcon name="arrowright" width="12" height="12" />
                  <RecursiveNav data={item.children} index={index + 1} />
                </Item>
              )}
            </div>
          );
        })}
      </>
    );
  }
};

export const NavBar = (props) => {
  const { mediaScreenTrue } = useMediaQuery('(min-width:1400px)');
  const { currentTab, setCurrentTab } = props;
  const [selectedTab, setSelectedTab] = useState(currentTab);
  const [homeModalOpen, setHomeModalOpen] = useState(false);
  const [selectedHomeModal, setSelectedHomeModal] = useState('login');
  const location = useLocation();
  setCurrentTab(location.pathname.slice(1));

  const handleOver = (selectTab) => (event) => {
    setSelectedTab(selectTab);
  };

  const handleMouseOut = (event) => {
    setSelectedTab(currentTab);
  };

  const mockData = {
    home: [],
    properties: [
      {
        type: 'parent',
        title: 'Grid',
        children: [
          {
            type: 'parent',
            link: '',
            title: 'Grid V1',
            children: [
              { type: 'link', title: 'List 1', link: '' },
              { type: 'link', title: 'List 2', link: '' },
              { type: 'link', title: 'List 3', link: '' },
              { type: 'link', title: 'List 4', link: '' },
              { type: 'link', title: 'List 5', link: '' },
            ],
          },
          { type: 'link', link: '', title: 'Grid V2' },
          { type: 'link', link: '', title: 'Grid V3' },
          { type: 'link', link: '', title: 'Grid V4' },
          { type: 'link', link: '', title: 'Grid V5' },
        ],
      },
      {
        type: 'parent',
        title: 'List',
        children: [
          { type: 'link', title: 'List 1', link: '' },
          { type: 'link', title: 'List 2', link: '' },
          { type: 'link', title: 'List 3', link: '' },
          { type: 'link', title: 'List 4', link: '' },
          { type: 'link', title: 'List 5', link: '' },
        ],
      },
      { type: 'link', title: 'Link1' },
    ],
    members: [
      {
        type: 'parent',
        title: 'Grid',
        children: [
          { type: 'link', link: '', title: 'Grid V1' },
          { type: 'link', link: '', title: 'Grid V2' },
          { type: 'link', link: '', title: 'Grid V3' },
          { type: 'link', link: '', title: 'Grid V4' },
          { type: 'link', link: '', title: 'Grid V5' },
        ],
      },
      {
        type: 'parent',
        title: 'List',
        children: [
          { type: 'link', title: 'List 1', link: '' },
          { type: 'link', title: 'List 2', link: '' },
          { type: 'link', title: 'List 3', link: '' },
          { type: 'link', title: 'List 4', link: '' },
          { type: 'link', title: 'List 5', link: '' },
        ],
      },
      { type: 'link', title: 'Link1' },
    ],
    pages: [
      {
        type: 'parent',
        title: 'Blog',
        children: [
          { type: 'link', link: '', title: 'Blog List' },
          { type: 'link', link: '', title: 'Blog-Grid 1' },
          { type: 'link', link: '', title: 'Blog-Grid 2' },
          { type: 'link', link: '', title: 'Blog Detail' },
        ],
      },
      { type: 'link', title: 'Shop' },
    ],
    contact: [],
  };

  const rootItemData = [
    { id: 'home', content: 'Home' },
    { id: 'properties', content: 'Properties' },
    { id: 'members', content: 'Members' },
    { id: 'pages', content: 'Pages' },
    { id: 'contact', content: 'Contact' },
  ];

  return (
    <>
      {!mediaScreenTrue ? (
        <>
          <SmallScreenNavBar data={mockData}></SmallScreenNavBar>
        </>
      ) : (
        <>
          <NavBarContainer isSmall={mediaScreenTrue}>
            <Link to={'/home'}>
              <Logo pathname={location.pathname}>
                <SVGIcon name="logo" width="200" height="60" />
              </Logo>
            </Link>

            <ListContainer>
              {rootItemData.map((item, index) => {
                return (
                  <Link key={index} className={'listLink'} to={`/${item.id}`}>
                    <RootItem
                      pathname={location.pathname}
                      active={currentTab === item.id}
                      onClick={handleOver(item.id)}
                      onMouseOver={handleOver(0)}
                    >
                      {item.content}
                      {mockData[item.id].length > 0 && (
                        <ArrowDown
                          name="arrowDown"
                          width="10"
                          height="10"
                          style={{ marginTop: 3, marginLeft: 5 }}
                        />
                      )}
                      {mockData[item.id].length > 0 && (
                        <DropDown className={selectedTab == 0 ? 'active' : ''}>
                          <RecursiveNav data={mockData[item.id]} index={0} />
                        </DropDown>
                      )}
                    </RootItem>
                  </Link>
                );
              })}

              <RegisterTextContainer style={{ color: '#fff' }}>
                <UserInfo
                  pathname={location.pathname}
                  setSelectedHomeModal={setSelectedHomeModal}
                  setHomeModalOpen={setHomeModalOpen}
                />
              </RegisterTextContainer>

              <ModifiedButton
                pathname={location.pathname}
                startIcon={
                  <SVGIcon
                    name="plus"
                    style={{ fill: 'currentColor', maxWidth: '100%' }}
                  />
                }
              >
                Submit Property
              </ModifiedButton>
            </ListContainer>
          </NavBarContainer>

          <HomeModal
            selectedModal={selectedHomeModal}
            showModal={homeModalOpen}
            setShowModal={setHomeModalOpen}
            setSelectedHomeModal={setSelectedHomeModal}
          />
        </>
      )}
    </>
  );
};

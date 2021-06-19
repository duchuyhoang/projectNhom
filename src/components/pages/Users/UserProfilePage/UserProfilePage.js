import React, { useState } from 'react';
import { useAuth } from '@Core/hooks/useAuth';
import { useLocationNameByCoordinate } from '@Core/hooks/useLocationNameByCoordinate';
import { CNLoading } from '@Components/shared/CNLoading/CNLoading';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core';
import { CNTab } from '@Components/shared/CNTab/CNTab';
import { UserProfile } from '@Components/components/UserProfile/UserProfile';
import { SearchRoom } from '@Components/components/SearchRoom/SearchRoom';
import { ContactForm } from '@Components/components/ContactForm/ContactForm';
import { ReviewForm } from '@Components/components/ReviewForm/ReviewForm';
import { Map } from '@Components/components/Map/Map';
import { useUserProfile } from './useUserProfile';
import  PageNotFoundComponent  from '@Components/components/PageNotFoundComponent/PageNotFoundComponent';
// styled components
const Wrapper = styled.div`
  overflow: hidden;
  background-color: #f7f7f7;
  font-family: ${(props) => props.theme.typography.fontFamily};
`;
const Container = styled.div`
  padding-top: 100px;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  box-sizing: border-box;
  > * {
    box-sizing: border-box;
  }
  background-color: #f7f7f7;
`;
//Left content
const LeftContainer = styled.div`
  width: 66.67%;
  margin-right: 15px;
`;
const BreadCrumbContainer = styled.div`
  margin-bottom: 45px;
`;
const BreadCrumbRouter = styled.div`
  margin-bottom: 20px;
`;
const BreadCrumbTitle = styled.h3``;
const UserProfileWrapper = styled.div`
  margin-bottom: 30px;
`;
const TabWrapper = styled.div``;
const addtionalInfo = styled.div``;
// Right Content
const RightContainer = styled.div`
  flex: 1;
  margin-left: 15px;
`;
const SearchPropertiesWrapper = styled.div``;
const ContactFormWrapper = styled.div``;
// For Oberview

const Introduction = styled.div`
  margin-bottom: 30px;
  & > p {
    margin-bottom: 20px;
    font-size: 16px;
  }
`;
const LocationWrapper = styled.div``;
const LocationHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;
const LocationTitle = styled.h3`
  font-size: 20px;
  font-weight: bold;
`;
const LocationName = styled.h3`
  font-size: 14px;
  color: ${(props) => props.theme.palette.primary.main};
  font-weight: 400;
`;
const Mapwrapper = styled.div`
  & > div {
    width: 100%;
  }
`;
const defaultTarget = {
  latitude: 20.981056,
  longtitude: 105.787139,
};
const OverViewComponent = () => {
  const locationName = useLocationNameByCoordinate({ ...defaultTarget });
  const [routingAddress, setRoutingAddress] = useState({
    latitude: null,
    longtitude: null,
  });

  return (
    <>
      <Introduction>
        <p>
          Evans Tower very high demand corner junior one bedroom plus a large
          balcony boasting full open NYC views. You need to see the views to
          believe them. Mint condition with new hardwood floors. Lots of closets
          plus washer and dryer.
        </p>
        <p>
          Fully furnished. Elegantly appointed condominium unit situated on
          premier location. PS6. The wide entry hall leads to a large living
          room with dining area. This expansive 2 bedroom and 2 renovated marble
          bathroom apartment has great windows. Despite the interior views, the
          apartments Southern and Eastern exposures allow for lovely natural
          light to fill every room. The master suite is surrounded by
          handcrafted milkwork and features incredible walk-in closet and
          storage space.
        </p>
        <p>
          The second bedroom is a corner room with double windows. The kitchen
          has fabulous space, new appliances, and a laundry area. Other features
          include rich herringbone floors, crown moldings and coffered ceilings
          throughout the apartment. 1049 5th Avenue is a classic pre-war
          building located across from Central Park, the reservoir and The
          Metropolitan Museum. Elegant lobby and 24 hours doorman. This is a
          pet-friendly building.
        </p>
      </Introduction>
      <LocationWrapper>
        <LocationHeader>
          <LocationTitle>Location</LocationTitle>
          <LocationName>{locationName}</LocationName>
        </LocationHeader>
        <Mapwrapper>
          <Map
            defaultTarget={defaultTarget}
            currentTarget={defaultTarget}
            isRoute={true}
            currentTarget={routingAddress}
            setCurrentTarget={setRoutingAddress}
          />
        </Mapwrapper>
      </LocationWrapper>
    </>
  );
};

const ReviewComponent = () => {
  return <ReviewForm />;
};
const tabList = [
  { label: 'Overviews', component: <OverViewComponent /> },

  { label: 'Reviews', component: <ReviewComponent /> },
];
const UserProfilePage = () => {
  const { isLogin ,userId,permission} = useAuth();
  const { id_user, userInfo, loading } = useUserProfile();
console.log("âda");
  return (
    <>
      {loading == 'pending' ? (
        <CNLoading />
      ) : loading == 'error' ? (
        <PageNotFoundComponent />
      ) : (
        <Wrapper>
          <Container>
            <LeftContainer>
              <BreadCrumbContainer>
                <BreadCrumbRouter>
                  Home {'>'} Agents {'>'} {name}
                </BreadCrumbRouter>
                <BreadCrumbTitle>{name}</BreadCrumbTitle>
              </BreadCrumbContainer>
              <UserProfileWrapper>
                {
                  <UserProfile
                    avatar={userInfo?.avatar}
                    name={userInfo?.name}
                    job={'Developer'}
                    phone={userInfo?.phone}
                    fax={'unavailable'}
                    email={userInfo?.email}
                    website={'unavailable'}
                    quantityProperty={2}
                  />
                }
              </UserProfileWrapper>
              <TabWrapper>
                <CNTab tabList={tabList} />
              </TabWrapper>
            </LeftContainer>
            <RightContainer>
              <ContactFormWrapper>
                <ContactForm name={name} />
              </ContactFormWrapper>
              <SearchPropertiesWrapper>
                <SearchRoom
                  type="properties"
                  needRedirect={true}
                  isLogin={isLogin}
                />
              </SearchPropertiesWrapper>
            </RightContainer>
          </Container>
        </Wrapper>
      )}
    </>
  );
};

export default UserProfilePage;

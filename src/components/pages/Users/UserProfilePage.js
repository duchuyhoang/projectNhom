import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useAuth } from '@Core/hooks/useAuth';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core';
import {CNTab} from '@Components/shared/CNTab/CNTab'
import {UserProfile} from '@Components/components/UserProfile/UserProfile'
import {SearchRoom} from '@Components/components/SearchRoom/SearchRoom'
import { currentUserSelectors, currentUserActions } from '@Core/redux/user';
import {ContactForm} from '@Components/components/ContactForm/ContactForm'
import { ReviewForm } from '@Components/components/ReviewForm/ReviewForm';
const useUserProfilePageStyles = makeStyles((theme) =>({
    container:{

    }
}))
// styled components
const Wrapper = styled.div`
background-color:#F7F7F7;
font-family: ${(props) => props.theme.typography.fontFamily};
`
const Container = styled.div`
    max-width:1200px;
    margin: 0 auto;
    display: flex;
    box-sizing: border-box;
    > *{
        box-sizing: border-box;
    }
    background-color:#F7F7F7;
`
//Left content 
const LeftContainer = styled.div`
    width: 66.67% ;
    margin-right: 15px;
`
const BreadCrumbContainer = styled.div`
    margin-bottom: 45px;
`
const BreadCrumbRouter = styled.div`
`
const BreadCrumbTitle = styled.h3`

`
const UserProfileWrapper = styled.div`
    margin-bottom:30px;
`
const TabWrapper = styled.div``
const addtionalInfo = styled.div``
// Right Content
const RightContainer = styled.div`
    flex: 1;
    margin-left: 15px;
`
const SearchPropertiesWrapper = styled.div``
const ContactFormWrapper = styled.div``
const OverViewComponent = () => {
    return(
        <div>ABC</div>
    )
}
const PropertiesComponent = () => {
    return (
        <div>ABC</div>
    )
}

const ReviewComponent = () => {
    return(
        <ReviewForm/>
    )
}
const tabList = [
    {label: 'Overviews', component: <OverViewComponent/>},
    {label: 'Properties', component: <PropertiesComponent/>},
    {label: 'Reviews', component: <ReviewComponent/>}
]
export const UserProfilePage = () => {
    const userProfilePageStyles = useUserProfilePageStyles();
    const currentUserInfo = useSelector(currentUserSelectors.selectUserInfo)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(currentUserActions.getCurrentUser({id: 1}))
    },[])
    console.log(currentUserInfo)
    return (
                <Wrapper>
            <Container >
                <LeftContainer>
                    <BreadCrumbContainer>
                        <BreadCrumbRouter>
                        Home > Agents > {currentUserInfo?.name}
                        </BreadCrumbRouter>
                        <BreadCrumbTitle>{currentUserInfo?.name}</BreadCrumbTitle>
                    </BreadCrumbContainer>
                    <UserProfileWrapper>
                    {currentUserInfo && (<UserProfile
                    avatar={currentUserInfo.avatar}
        
                    name={currentUserInfo.name}
                    job={currentUserInfo.job ? currentUserInfo.job : "Unknown" }
                    phone={currentUserInfo.phone}
                    fax={currentUserInfo.fax ? currentUserInfo.fax : "unavailable"}
                    email={currentUserInfo.fax ? currentUserInfo.email : "unavailable"}
                    website={currentUserInfo.website ? currentUserInfo.website : "unavailable"}
                    />)}
                    </UserProfileWrapper>
                    <TabWrapper>
                        <CNTab tabList= {tabList}/>
                    </TabWrapper>
                </LeftContainer>
                <RightContainer>
                    <ContactFormWrapper>
                        <ContactForm/>
                    </ContactFormWrapper>
                    <SearchPropertiesWrapper>
                        <SearchRoom type="properties" />
                    </SearchPropertiesWrapper>
                </RightContainer>
            </Container>
            </Wrapper>
    )
}


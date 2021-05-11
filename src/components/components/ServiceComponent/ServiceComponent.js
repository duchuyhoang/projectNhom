import React from 'react'
import styled, { css } from 'styled-components'
import { makeStyles } from "@material-ui/core"
import { CNCard } from '@Components/shared/CNCard/CNCard'
import useIsMobile from "@Core/hooks/useIsMobile"
import { SVGIcon } from "@Components/shared/SvgIcon/Icon";
const useServiceComponentStyles = makeStyles((theme) => ({
    cardContainer: (props) => ({
        width: props.isMobile ? "100%" : "20%",
        padding: "40px 45px 35px",
        borderRadius: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        cursor: "pointer",
        marginBottom: 20,
        margin: "0 20px 20px 20px",
        minHeight: "10px !important",
        "&:hover": {
            backgroundColor: `${theme.palette.primary.main}`,
            "& $SVGContainer": {
                backgroundColor: "#fff",
                transition: ".2s"
            },
            "& $CardTitle": {
                color: "#fff",
                transition: ".3s",
                transitionDelay: ".2s"
            },
            "& $CardInfo": {
                color: "#fff",
                transition: ".3s",
                transitionDelay: ".4s"
            },


        },


    }),
    SVGContainer: (props) => ({

    }),
    SVGStyles: (props) => ({
        fill: `${theme.palette.primary.main}`
    }),
    CardTitle: (props) => ({

    }),
    CardInfo: (props) => ({

    })

}))
const alignCenter = css`
display: flex;
justify-content:center;
align-items:center;
`
const Background = styled.div`
    width: 100%;
    background-color: #f7f7f7;
    display: flex;
    justify-content: center;
`
const Container = styled.div`
   
    padding: 60px 0;
    font-family: ${props => props.theme.typography.fontFamily};
    max-width:1200px;
    width:100%;
    text-align: center;
    
`
const ContainerHeading = styled.h3`
    color: ${props => props.theme.palette.text.primary};
    font-size: 30px;
    text-transform: capitalize;
    margin-bottom: 16px;
    margin-top:0;
    font-weight: 500;
`
const ContainerDescription = styled.p`
    font-size: 16px;
     color: ${props => props.theme.palette.text.primary};
    margin-bottom: 16px;
    font-weight: 300;
`
const ContainerCardList = styled.div`
${alignCenter};
justify-content: center;
align-items: stretch ;
flex-wrap: wrap;
width:100%;
`
const SVGContainer = styled.div`
    
    border-radius:100%;
    height: 160px;
    width:160px;
    background-color:#FFE8E9;
    display: flex;
    align-items:center;
    justify-content: center;
`




const CardTitle = styled.h3`
    font-size:20px;
    font-weight:800;
    text-transform:capitalize;
    color: ${props => props.theme.palette.text.primary};
`
const CardInfo = styled.p`
font-size:14px;
color: ${props => props.theme.palette.text.primary};
`
export const ServiceComponent = ({ cardList, setCardList }) => {
    const { isMobile } = useIsMobile();
    const serviceComponentStyles = useServiceComponentStyles({ isMobile });


    return (
        <Background>
            <Container>
                <ContainerHeading>Why Choose Us</ContainerHeading>
                <ContainerDescription>We provide full service at every step</ContainerDescription>
                <ContainerCardList>

                    {cardList.map((item) => {
                        return <CNCard isMobile={isMobile}
                            className={serviceComponentStyles.cardContainer}
                            headerComponent={
                                <SVGContainer className={serviceComponentStyles.SVGContainer}>
                                    <SVGIcon className={serviceComponentStyles.SVGStyles} name={item.SVGIcon} width="80px" height="80px" /></SVGContainer>
                            }
                            bodyComponent={
                                <>
                                    <CardTitle className={serviceComponentStyles.CardTitle}>{item.title}</CardTitle>
                                    <CardInfo className={serviceComponentStyles.CardInfo}>{item.description}</CardInfo>
                                </>
                            }
                            footerComponent={false} />
                    })}
                </ContainerCardList>
            </Container>
        </Background>
    )
}
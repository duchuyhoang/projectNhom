import React from 'react'
import {
    makeStyles, 
    TableContainer  ,
    Table, 
    TableBody ,
    TableCell,
    TableHead ,
    TableRow,
    Paper,
    FormControl, 
    FormHelperText
 } from '@material-ui/core';
 import styled from 'styled-components';
 import {SVGIcon} from '@Components/shared/SvgIcon/Icon';
 import { CNButton } from '@Components/shared/CNButton/CNButton';
 import { Controller, useForm } from 'react-hook-form';
 import { yupResolver } from '@hookform/resolvers/yup';
 import * as yup from 'yup';
 import {CNTextField} from '@Components/shared/CNTextField/CNTextField';

 const usePromotionRequestStyles = makeStyles(theme => ({
        mainForm:{
            display: "flex",
            alignItems: "center"
        },
        formControl:{
            position: 'relative'
        },
        tableContainer: {
            backgroundColor: theme.palette.background.secondary
        },
        actions: {
           "& > button":{
               display: "block"
           }
        },
        tablehead:{
            backgroundColor: '#24334A'
        },
        tableCell:{
            fontWeight: 700,
            fontSize: 18
        },
        declineButton:{
            backgroundColor: '#24334A',
            transition: '.3s all',
            '&:hover':{
                backgroundColor: theme.palette.background.secondary
            }
        },
        buttonSearch: {
            marginLeft: 20
        },
        helperText:{
            color: theme.palette.primary.main,
            position: 'absolute',
            bottom: -20
        }
 }))
 // styled components
 const Wrapper = styled.div`
 background-color:#F7F7F7;
 font-family: ${(props) => props.theme.typography.fontFamily};
 min-height: 100vh;
 `
 const Container = styled.div`
 padding-top: 100px;
    max-width:1200px;
     margin: 0 auto;
     display: flex;
     flex-direction: column;
     box-sizing: border-box;
     > *{
         box-sizing: border-box;
     }
     background-color:#F7F7F7;
 `
 const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 30px;
 `
const Title = styled.h3`
    text-transform: Uppercase;
    color: ${props => props.theme.palette.primary.main};
    font-weight: bold;
    font-size: 24px;
`
// RoomInfoMationComponent
// Styled for RoomInformation
const ContainerRoomInfo = styled.div`
display: flex;
align-items: center;
font-family: ${(props) => props.theme.typography.fontFamily};
`
const LeftContainerRoomInfo = styled.div`
    flex: 1;
    width: 200px;
    margin-right: 10px;
    & > img {
        width: 100%;
        height: 200px;
        border-radius: 6px;
    }
`
const RightContainerRoomInfo = styled.div`
     flex: 1;
     margin-left: 10px;
`
const RoomName = styled.h3`
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 4px;
`
const RoomInfoItem = styled.p`
    margin-bottom:4px;
    font-size: 16px;
   
`
const RoomAddres = styled.div`
display: flex;
align-items: center;
margin-bottom: 4px;
font-size: 16px;
& > svg {
    margin-right: 5px;
}
`
const UserInfo = styled.div`
    display: flex;
    align-items: center;
   
    & > img {
        height: 40px;
        width: 40px;
        border-radius: 100%;
        margin-right: 10px;
    }
    margin-bottom: 4px;
`
 const RoomInfomation = ({roomData})=>{
     return(
            <ContainerRoomInfo>
                <LeftContainerRoomInfo>
                    <img src = {roomData?.image}/>
                </LeftContainerRoomInfo>
                <RightContainerRoomInfo>
                    <RoomName>{roomData?.name}</RoomName>
                    <RoomInfoItem>Area : <strong>{roomData?.acreage} m<sup style={{fontSize: 10}}>2</sup></strong></RoomInfoItem>
                    <RoomInfoItem>
                        Capacity: <strong>{roomData?.capacity} people</strong>
                    </RoomInfoItem>
                    <RoomInfoItem>
                        Price: <strong>{new Intl.NumberFormat('ve-VE', {
                    style: 'currency',
                    currency: 'VND',
                  }).format(roomData?.price)}</strong>
                    </RoomInfoItem>
                    <RoomAddres>
                        <SVGIcon name ="location" /> 
                        <strong>{roomData?.wardName}
                        {', '}
                        {roomData?.districtName}
                        {', '}
                        {roomData?.cityName}</strong>
                    </RoomAddres>
                    <UserInfo>
                        <img src={roomData?.user_avatar}/>
                        <h3>{roomData?.user_name}</h3>
                    </UserInfo>
                    <RoomInfoItem>
                        Phone : <strong>{roomData?.user_phone}</strong>
                    </RoomInfoItem>
                </RightContainerRoomInfo>
            </ContainerRoomInfo>
     )
 }
export const PromotionRequest = ({listRoomRequest}) => {
    const promotionRequestStyles = usePromotionRequestStyles();
    const defaultValues = {
        name: ''
    }
    const schema = yup.object().shape({
        name: yup.string().required('Vui lòng nhập từ khóa')
    })
    const {handleSubmit,control, formState} = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        defaultValues,
        resolver: yupResolver(schema)
    })
    const searchHandler = (values) => {
        console.log(values)
    }
    return (
        <Wrapper>
            <Container>
                <Header>
                    <Title>List Room Request</Title>
                    <form className={promotionRequestStyles.mainForm} onSubmit={handleSubmit(searchHandler)}>
                        <Controller
                        name = 'name'
                        control={control}
                        render={({ field: { onChange, value}})=>(
                            <FormControl className={promotionRequestStyles.formControl}>
                                <CNTextField
                                    placeholder = "Enter your keyword"
                                    value={value ? value : ''}
                                    error ={!!formState.errors['name']}
                                    inputChange = {e => {
                                        onChange(e);
                                    }}
                                />
                                  <FormHelperText className={promotionRequestStyles.helperText}>
                                    {formState.errors['name']?.message}
                                </FormHelperText>
                            </FormControl>
                          
                        )}
                        />
                        <CNButton className={promotionRequestStyles.buttonSearch} type="submit" buttonType="main" >Search</CNButton>
                    </form>
                </Header>
               {listRoomRequest.length > 0 ?  (<TableContainer className={promotionRequestStyles.tableContainer} component={Paper}>
                 <Table>
                     <TableHead >
                         <TableRow className={promotionRequestStyles.tableHead}>
                             <TableCell className={promotionRequestStyles.tableCell} align="center">STT</TableCell>  
                             <TableCell className={promotionRequestStyles.tableCell}  align="center">Room Infomation</TableCell>
                             <TableCell className={promotionRequestStyles.tableCell}  align="center">Date Summited</TableCell>
                             <TableCell className={promotionRequestStyles.tableCell}  align="center">Actions</TableCell>  
                         </TableRow>
                     </TableHead>
                     {/* Table Boday */}
                     <TableBody>
                        {listRoomRequest.map((roomData,index) => (
                            <TableRow>
                                <TableCell className={promotionRequestStyles.tableCell}  align="center">{index + 1}</TableCell>
                                <TableCell >
                                    <RoomInfomation roomData={roomData}/>
                                </TableCell>
                                <TableCell className={promotionRequestStyles.tableCell}  align="center">{roomData?.dateCreated}</TableCell>
                                <TableCell className={promotionRequestStyles.actions} align="center">
                                    <CNButton buttonType="main" fullWidth>Approve</CNButton>
                                    <CNButton className={promotionRequestStyles.declineButton}  buttonType="main" fullWidth>Decline</CNButton>
                                </TableCell>
                            </TableRow>
                        ))}
                     </TableBody>
                 </Table>
                </TableContainer>) : <h1 style={{margin: '0 auto'}}>List pending rooms is empty</h1>}
            </Container>
        </Wrapper>
    )
}



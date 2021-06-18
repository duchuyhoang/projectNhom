import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Stretcher } from '@Components/components/Stretcher/Stretcher';
import { Footer } from '@Components/components/Footer/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '@Core/redux/auth';
import { roomSelectors, roomActions } from '@Core/redux/room'
import { createSelector } from "reselect";
import {SearchRoom} from '../components/components/SearchRoom/SearchRoom'
import {Map} from "@Components/components/Map/Map";
import {ForgetPasswordForm} from '@Components/components/ForgetPasswordForm/ForgetPasswordForm'
import { PromotionRequest } from './pages/Users/PromotionRequest';
import { ListUserRequest } from './pages/Users/ListUserRequest';


const RoomDataList = [{}]

const Message = ({ message }) => {
const dispatch = useDispatch();

useEffect(()=>{
  dispatch(roomActions.getPendingRoom());
},[])

 const pendingRoom= useSelector(roomSelectors.pendingRoomSelectAll)


 const RawTableData = [
   {
  name: 'Quất Lâm Resort',
  image: 'https://lh3.googleusercontent.com/proxy/D754QmPYpTCFU6HnPNAuh_eI25XSagb7K8Wxps9LWOTuDMdIrUspBf-8qhvEMNHZgH7U7JZ5BTBxJqRuiYoPU1aGAQt9MVdOv_5FvN4k',
  acreage: 300,
  capacity: 5,
  price: 30000000,
  cityName: 'Nam Định',
  districtName: 'Giao Thủy',
  wardName: 'Giao Xuân',
  user_name: 'Đinh Văn Đô',
  user_phone: '0394337996',
  user_avatar: 'https://techkalzen.com/wp-content/uploads/2020/02/tron-bo-nhung-hinh-anh-dep-buon-mang-tam-trang-suy-tu.jpg',
  dateCreated: new Date().toLocaleDateString()
},
{
  name: 'Quất Lâm Resort',
  image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_LnC7PHubOtoplXt_DCJoTiH21DgY3tFRzg&usqp=CAU',
  acreage: 300,
  capacity: 5,
  price: 30000000,
  cityName: 'Nam Định',
  districtName: 'Giao Thủy',
  wardName: 'Giao Xuân',
  user_name: 'Đinh Văn Đô',
  user_phone: '0394337996',
  user_avatar: 'https://techkalzen.com/wp-content/uploads/2020/02/tron-bo-nhung-hinh-anh-dep-buon-mang-tam-trang-suy-tu.jpg',
  dateCreated: new Date().toLocaleDateString()
},
{
  name: 'Quất Lâm Resort',
  image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2fjPMB_dsLf9bSwDnImRMb2tPw9hcTSi-Cg&usqp=CAU',
  acreage: 300,
  capacity: 5,
  price: 30000000,
  cityName: 'Nam Định',
  districtName: 'Giao Thủy',
  wardName: 'Giao Xuân',
  user_name: 'Đinh Văn Đô',
  user_phone: '0394337996',
  user_avatar: 'https://techkalzen.com/wp-content/uploads/2020/02/tron-bo-nhung-hinh-anh-dep-buon-mang-tam-trang-suy-tu.jpg',
  dateCreated: new Date().toLocaleDateString()
},
{
  name: 'Quất Lâm Resort',
  image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDkBbP3cKxDLyi4EuChYLiS_l2XKOheHamg8xpGEKjVQ8dPRavYHjFTc3X8b8yP3kAH8E&usqp=CAU',
  acreage: 300,
  capacity: 5,
  price: 30000000,
  cityName: 'Nam Định',
  districtName: 'Giao Thủy',
  wardName: 'Giao Xuân',
  user_name: 'Đinh Văn Đô',
  user_phone: '0394337996',
  user_avatar: 'https://techkalzen.com/wp-content/uploads/2020/02/tron-bo-nhung-hinh-anh-dep-buon-mang-tam-trang-suy-tu.jpg',
  dateCreated: new Date().toLocaleDateString()
},
{
  name: 'Quất Lâm Resort',
  image: 'https://i2.wp.com/theluxurytravelexpert.com/wp-content/uploads/2014/04/star-sanctuary-jade-mountain-st-lucia.jpg?fit=970%2C545&ssl=1',
  acreage: 300,
  capacity: 5,
  price: 30000000,
  cityName: 'Nam Định',
  districtName: 'Giao Thủy',
  wardName: 'Giao Xuân',
  user_name: 'Đinh Văn Đô',
  user_phone: '0394337996',
  user_avatar: 'https://techkalzen.com/wp-content/uploads/2020/02/tron-bo-nhung-hinh-anh-dep-buon-mang-tam-trang-suy-tu.jpg',
  dateCreated: new Date().toLocaleDateString()
},
   {
  name: 'Quất Lâm Resort',
  image: 'https://lh3.googleusercontent.com/proxy/D754QmPYpTCFU6HnPNAuh_eI25XSagb7K8Wxps9LWOTuDMdIrUspBf-8qhvEMNHZgH7U7JZ5BTBxJqRuiYoPU1aGAQt9MVdOv_5FvN4k',
  acreage: 300,
  capacity: 5,
  price: 30000000,
  cityName: 'Nam Định',
  districtName: 'Giao Thủy',
  wardName: 'Giao Xuân',
  user_name: 'Đinh Văn Đô',
  user_phone: '0394337996',
  user_avatar: 'https://techkalzen.com/wp-content/uploads/2020/02/tron-bo-nhung-hinh-anh-dep-buon-mang-tam-trang-suy-tu.jpg',
  dateCreated: new Date().toLocaleDateString()
},
{
  name: 'Quất Lâm Resort',
  image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_LnC7PHubOtoplXt_DCJoTiH21DgY3tFRzg&usqp=CAU',
  acreage: 300,
  capacity: 5,
  price: 30000000,
  cityName: 'Nam Định',
  districtName: 'Giao Thủy',
  wardName: 'Giao Xuân',
  user_name: 'Đinh Văn Đô',
  user_phone: '0394337996',
  user_avatar: 'https://techkalzen.com/wp-content/uploads/2020/02/tron-bo-nhung-hinh-anh-dep-buon-mang-tam-trang-suy-tu.jpg',
  dateCreated: new Date().toLocaleDateString()
},
{
  name: 'Quất Lâm Resort',
  image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2fjPMB_dsLf9bSwDnImRMb2tPw9hcTSi-Cg&usqp=CAU',
  acreage: 300,
  capacity: 5,
  price: 30000000,
  cityName: 'Nam Định',
  districtName: 'Giao Thủy',
  wardName: 'Giao Xuân',
  user_name: 'Đinh Văn Đô',
  user_phone: '0394337996',
  user_avatar: 'https://techkalzen.com/wp-content/uploads/2020/02/tron-bo-nhung-hinh-anh-dep-buon-mang-tam-trang-suy-tu.jpg',
  dateCreated: new Date().toLocaleDateString()
},
{
  name: 'Quất Lâm Resort',
  image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDkBbP3cKxDLyi4EuChYLiS_l2XKOheHamg8xpGEKjVQ8dPRavYHjFTc3X8b8yP3kAH8E&usqp=CAU',
  acreage: 300,
  capacity: 5,
  price: 30000000,
  cityName: 'Nam Định',
  districtName: 'Giao Thủy',
  wardName: 'Giao Xuân',
  user_name: 'Đinh Văn Đô',
  user_phone: '0394337996',
  user_avatar: 'https://techkalzen.com/wp-content/uploads/2020/02/tron-bo-nhung-hinh-anh-dep-buon-mang-tam-trang-suy-tu.jpg',
  dateCreated: new Date().toLocaleDateString()
},
{
  name: 'Quất Lâm Resort',
  image: 'https://i2.wp.com/theluxurytravelexpert.com/wp-content/uploads/2014/04/star-sanctuary-jade-mountain-st-lucia.jpg?fit=970%2C545&ssl=1',
  acreage: 300,
  capacity: 5,
  price: 30000000,
  cityName: 'Nam Định',
  districtName: 'Giao Thủy',
  wardName: 'Giao Xuân',
  user_name: 'Đinh Văn Đô',
  user_phone: '0394337996',
  user_avatar: 'https://techkalzen.com/wp-content/uploads/2020/02/tron-bo-nhung-hinh-anh-dep-buon-mang-tam-trang-suy-tu.jpg',
  dateCreated: new Date().toLocaleDateString()
},
   {
  name: 'Quất Lâm Resort',
  image: 'https://lh3.googleusercontent.com/proxy/D754QmPYpTCFU6HnPNAuh_eI25XSagb7K8Wxps9LWOTuDMdIrUspBf-8qhvEMNHZgH7U7JZ5BTBxJqRuiYoPU1aGAQt9MVdOv_5FvN4k',
  acreage: 300,
  capacity: 5,
  price: 30000000,
  cityName: 'Nam Định',
  districtName: 'Giao Thủy',
  wardName: 'Giao Xuân',
  user_name: 'Đinh Văn Đô',
  user_phone: '0394337996',
  user_avatar: 'https://techkalzen.com/wp-content/uploads/2020/02/tron-bo-nhung-hinh-anh-dep-buon-mang-tam-trang-suy-tu.jpg',
  dateCreated: new Date().toLocaleDateString()
},
{
  name: 'Quất Lâm Resort',
  image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_LnC7PHubOtoplXt_DCJoTiH21DgY3tFRzg&usqp=CAU',
  acreage: 300,
  capacity: 5,
  price: 30000000,
  cityName: 'Nam Định',
  districtName: 'Giao Thủy',
  wardName: 'Giao Xuân',
  user_name: 'Đinh Văn Đô',
  user_phone: '0394337996',
  user_avatar: 'https://techkalzen.com/wp-content/uploads/2020/02/tron-bo-nhung-hinh-anh-dep-buon-mang-tam-trang-suy-tu.jpg',
  dateCreated: new Date().toLocaleDateString()
},
{
  name: 'Quất Lâm Resort',
  image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2fjPMB_dsLf9bSwDnImRMb2tPw9hcTSi-Cg&usqp=CAU',
  acreage: 300,
  capacity: 5,
  price: 30000000,
  cityName: 'Nam Định',
  districtName: 'Giao Thủy',
  wardName: 'Giao Xuân',
  user_name: 'Đinh Văn Đô',
  user_phone: '0394337996',
  user_avatar: 'https://techkalzen.com/wp-content/uploads/2020/02/tron-bo-nhung-hinh-anh-dep-buon-mang-tam-trang-suy-tu.jpg',
  dateCreated: new Date().toLocaleDateString()
},
{
  name: 'Quất Lâm Resort',
  image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDkBbP3cKxDLyi4EuChYLiS_l2XKOheHamg8xpGEKjVQ8dPRavYHjFTc3X8b8yP3kAH8E&usqp=CAU',
  acreage: 300,
  capacity: 5,
  price: 30000000,
  cityName: 'Nam Định',
  districtName: 'Giao Thủy',
  wardName: 'Giao Xuân',
  user_name: 'Đinh Văn Đô',
  user_phone: '0394337996',
  user_avatar: 'https://techkalzen.com/wp-content/uploads/2020/02/tron-bo-nhung-hinh-anh-dep-buon-mang-tam-trang-suy-tu.jpg',
  dateCreated: new Date().toLocaleDateString()
},
{
  name: 'Quất Lâm Resort',
  image: 'https://i2.wp.com/theluxurytravelexpert.com/wp-content/uploads/2014/04/star-sanctuary-jade-mountain-st-lucia.jpg?fit=970%2C545&ssl=1',
  acreage: 300,
  capacity: 5,
  price: 30000000,
  cityName: 'Nam Định',
  districtName: 'Giao Thủy',
  wardName: 'Giao Xuân',
  user_name: 'Đinh Văn Đô',
  user_phone: '0394337996',
  user_avatar: 'https://techkalzen.com/wp-content/uploads/2020/02/tron-bo-nhung-hinh-anh-dep-buon-mang-tam-trang-suy-tu.jpg',
  dateCreated: new Date().toLocaleDateString()
},
   {
  name: 'Quất Lâm Resort',
  image: 'https://lh3.googleusercontent.com/proxy/D754QmPYpTCFU6HnPNAuh_eI25XSagb7K8Wxps9LWOTuDMdIrUspBf-8qhvEMNHZgH7U7JZ5BTBxJqRuiYoPU1aGAQt9MVdOv_5FvN4k',
  acreage: 300,
  capacity: 5,
  price: 30000000,
  cityName: 'Nam Định',
  districtName: 'Giao Thủy',
  wardName: 'Giao Xuân',
  user_name: 'Đinh Văn Đô',
  user_phone: '0394337996',
  user_avatar: 'https://techkalzen.com/wp-content/uploads/2020/02/tron-bo-nhung-hinh-anh-dep-buon-mang-tam-trang-suy-tu.jpg',
  dateCreated: new Date().toLocaleDateString()
},
{
  name: 'Quất Lâm Resort',
  image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_LnC7PHubOtoplXt_DCJoTiH21DgY3tFRzg&usqp=CAU',
  acreage: 300,
  capacity: 5,
  price: 30000000,
  cityName: 'Nam Định',
  districtName: 'Giao Thủy',
  wardName: 'Giao Xuân',
  user_name: 'Đinh Văn Đô',
  user_phone: '0394337996',
  user_avatar: 'https://techkalzen.com/wp-content/uploads/2020/02/tron-bo-nhung-hinh-anh-dep-buon-mang-tam-trang-suy-tu.jpg',
  dateCreated: new Date().toLocaleDateString()
},
{
  name: 'Quất Lâm Resort',
  image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2fjPMB_dsLf9bSwDnImRMb2tPw9hcTSi-Cg&usqp=CAU',
  acreage: 300,
  capacity: 5,
  price: 30000000,
  cityName: 'Nam Định',
  districtName: 'Giao Thủy',
  wardName: 'Giao Xuân',
  user_name: 'Đinh Văn Đô',
  user_phone: '0394337996',
  user_avatar: 'https://techkalzen.com/wp-content/uploads/2020/02/tron-bo-nhung-hinh-anh-dep-buon-mang-tam-trang-suy-tu.jpg',
  dateCreated: new Date().toLocaleDateString()
},
{
  name: 'Quất Lâm Resort',
  image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDkBbP3cKxDLyi4EuChYLiS_l2XKOheHamg8xpGEKjVQ8dPRavYHjFTc3X8b8yP3kAH8E&usqp=CAU',
  acreage: 300,
  capacity: 5,
  price: 30000000,
  cityName: 'Nam Định',
  districtName: 'Giao Thủy',
  wardName: 'Giao Xuân',
  user_name: 'Đinh Văn Đô',
  user_phone: '0394337996',
  user_avatar: 'https://techkalzen.com/wp-content/uploads/2020/02/tron-bo-nhung-hinh-anh-dep-buon-mang-tam-trang-suy-tu.jpg',
  dateCreated: new Date().toLocaleDateString()
},
{
  name: 'Quất Lâm Resort',
  image: 'https://i2.wp.com/theluxurytravelexpert.com/wp-content/uploads/2014/04/star-sanctuary-jade-mountain-st-lucia.jpg?fit=970%2C545&ssl=1',
  acreage: 300,
  capacity: 5,
  price: 30000000,
  cityName: 'Nam Định',
  districtName: 'Giao Thủy',
  wardName: 'Giao Xuân',
  user_name: 'Đinh Văn Đô',
  user_phone: '0394337996',
  user_avatar: 'https://techkalzen.com/wp-content/uploads/2020/02/tron-bo-nhung-hinh-anh-dep-buon-mang-tam-trang-suy-tu.jpg',
  dateCreated: new Date().toLocaleDateString()
},
   {
  name: 'Quất Lâm Resort',
  image: 'https://lh3.googleusercontent.com/proxy/D754QmPYpTCFU6HnPNAuh_eI25XSagb7K8Wxps9LWOTuDMdIrUspBf-8qhvEMNHZgH7U7JZ5BTBxJqRuiYoPU1aGAQt9MVdOv_5FvN4k',
  acreage: 300,
  capacity: 5,
  price: 30000000,
  cityName: 'Nam Định',
  districtName: 'Giao Thủy',
  wardName: 'Giao Xuân',
  user_name: 'Đinh Văn Đô',
  user_phone: '0394337996',
  user_avatar: 'https://techkalzen.com/wp-content/uploads/2020/02/tron-bo-nhung-hinh-anh-dep-buon-mang-tam-trang-suy-tu.jpg',
  dateCreated: new Date().toLocaleDateString()
},
{
  name: 'Quất Lâm Resort',
  image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_LnC7PHubOtoplXt_DCJoTiH21DgY3tFRzg&usqp=CAU',
  acreage: 300,
  capacity: 5,
  price: 30000000,
  cityName: 'Nam Định',
  districtName: 'Giao Thủy',
  wardName: 'Giao Xuân',
  user_name: 'Đinh Văn Đô',
  user_phone: '0394337996',
  user_avatar: 'https://techkalzen.com/wp-content/uploads/2020/02/tron-bo-nhung-hinh-anh-dep-buon-mang-tam-trang-suy-tu.jpg',
  dateCreated: new Date().toLocaleDateString()
},
{
  name: 'Quất Lâm Resort',
  image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2fjPMB_dsLf9bSwDnImRMb2tPw9hcTSi-Cg&usqp=CAU',
  acreage: 300,
  capacity: 5,
  price: 30000000,
  cityName: 'Nam Định',
  districtName: 'Giao Thủy',
  wardName: 'Giao Xuân',
  user_name: 'Đinh Văn Đô',
  user_phone: '0394337996',
  user_avatar: 'https://techkalzen.com/wp-content/uploads/2020/02/tron-bo-nhung-hinh-anh-dep-buon-mang-tam-trang-suy-tu.jpg',
  dateCreated: new Date().toLocaleDateString()
},
{
  name: 'Quất Lâm Resort',
  image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDkBbP3cKxDLyi4EuChYLiS_l2XKOheHamg8xpGEKjVQ8dPRavYHjFTc3X8b8yP3kAH8E&usqp=CAU',
  acreage: 300,
  capacity: 5,
  price: 30000000,
  cityName: 'Nam Định',
  districtName: 'Giao Thủy',
  wardName: 'Giao Xuân',
  user_name: 'Đinh Văn Đô',
  user_phone: '0394337996',
  user_avatar: 'https://techkalzen.com/wp-content/uploads/2020/02/tron-bo-nhung-hinh-anh-dep-buon-mang-tam-trang-suy-tu.jpg',
  dateCreated: new Date().toLocaleDateString()
},
{
  name: 'Quất Lâm Resort',
  image: 'https://i2.wp.com/theluxurytravelexpert.com/wp-content/uploads/2014/04/star-sanctuary-jade-mountain-st-lucia.jpg?fit=970%2C545&ssl=1',
  acreage: 300,
  capacity: 5,
  price: 30000000,
  cityName: 'Nam Định',
  districtName: 'Giao Thủy',
  wardName: 'Giao Xuân',
  user_name: 'Đinh Văn Đô',
  user_phone: '0394337996',
  user_avatar: 'https://techkalzen.com/wp-content/uploads/2020/02/tron-bo-nhung-hinh-anh-dep-buon-mang-tam-trang-suy-tu.jpg',
  dateCreated: new Date().toLocaleDateString()
},
   {
  name: 'Quất Lâm Resort',
  image: 'https://lh3.googleusercontent.com/proxy/D754QmPYpTCFU6HnPNAuh_eI25XSagb7K8Wxps9LWOTuDMdIrUspBf-8qhvEMNHZgH7U7JZ5BTBxJqRuiYoPU1aGAQt9MVdOv_5FvN4k',
  acreage: 300,
  capacity: 5,
  price: 30000000,
  cityName: 'Nam Định',
  districtName: 'Giao Thủy',
  wardName: 'Giao Xuân',
  user_name: 'Đinh Văn Đô',
  user_phone: '0394337996',
  user_avatar: 'https://techkalzen.com/wp-content/uploads/2020/02/tron-bo-nhung-hinh-anh-dep-buon-mang-tam-trang-suy-tu.jpg',
  dateCreated: new Date().toLocaleDateString()
},
{
  name: 'Quất Lâm Resort',
  image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_LnC7PHubOtoplXt_DCJoTiH21DgY3tFRzg&usqp=CAU',
  acreage: 300,
  capacity: 5,
  price: 30000000,
  cityName: 'Nam Định',
  districtName: 'Giao Thủy',
  wardName: 'Giao Xuân',
  user_name: 'Đinh Văn Đô',
  user_phone: '0394337996',
  user_avatar: 'https://techkalzen.com/wp-content/uploads/2020/02/tron-bo-nhung-hinh-anh-dep-buon-mang-tam-trang-suy-tu.jpg',
  dateCreated: new Date().toLocaleDateString()
},
{
  name: 'Quất Lâm Resort',
  image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2fjPMB_dsLf9bSwDnImRMb2tPw9hcTSi-Cg&usqp=CAU',
  acreage: 300,
  capacity: 5,
  price: 30000000,
  cityName: 'Nam Định',
  districtName: 'Giao Thủy',
  wardName: 'Giao Xuân',
  user_name: 'Đinh Văn Đô',
  user_phone: '0394337996',
  user_avatar: 'https://techkalzen.com/wp-content/uploads/2020/02/tron-bo-nhung-hinh-anh-dep-buon-mang-tam-trang-suy-tu.jpg',
  dateCreated: new Date().toLocaleDateString()
},
{
  name: 'Quất Lâm Resort',
  image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDkBbP3cKxDLyi4EuChYLiS_l2XKOheHamg8xpGEKjVQ8dPRavYHjFTc3X8b8yP3kAH8E&usqp=CAU',
  acreage: 300,
  capacity: 5,
  price: 30000000,
  cityName: 'Nam Định',
  districtName: 'Giao Thủy',
  wardName: 'Giao Xuân',
  user_name: 'Đinh Văn Đô',
  user_phone: '0394337996',
  user_avatar: 'https://techkalzen.com/wp-content/uploads/2020/02/tron-bo-nhung-hinh-anh-dep-buon-mang-tam-trang-suy-tu.jpg',
  dateCreated: new Date().toLocaleDateString()
},
{
  name: 'Quất Lâm Resort',
  image: 'https://i2.wp.com/theluxurytravelexpert.com/wp-content/uploads/2014/04/star-sanctuary-jade-mountain-st-lucia.jpg?fit=970%2C545&ssl=1',
  acreage: 300,
  capacity: 5,
  price: 30000000,
  cityName: 'Nam Định',
  districtName: 'Giao Thủy',
  wardName: 'Giao Xuân',
  user_name: 'Đinh Văn Đô',
  user_phone: '0394337996',
  user_avatar: 'https://techkalzen.com/wp-content/uploads/2020/02/tron-bo-nhung-hinh-anh-dep-buon-mang-tam-trang-suy-tu.jpg',
  dateCreated: new Date().toLocaleDateString()
},
   {
  name: 'Quất Lâm Resort',
  image: 'https://lh3.googleusercontent.com/proxy/D754QmPYpTCFU6HnPNAuh_eI25XSagb7K8Wxps9LWOTuDMdIrUspBf-8qhvEMNHZgH7U7JZ5BTBxJqRuiYoPU1aGAQt9MVdOv_5FvN4k',
  acreage: 300,
  capacity: 5,
  price: 30000000,
  cityName: 'Nam Định',
  districtName: 'Giao Thủy',
  wardName: 'Giao Xuân',
  user_name: 'Đinh Văn Đô',
  user_phone: '0394337996',
  user_avatar: 'https://techkalzen.com/wp-content/uploads/2020/02/tron-bo-nhung-hinh-anh-dep-buon-mang-tam-trang-suy-tu.jpg',
  dateCreated: new Date().toLocaleDateString()
},
{
  name: 'Quất Lâm Resort',
  image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_LnC7PHubOtoplXt_DCJoTiH21DgY3tFRzg&usqp=CAU',
  acreage: 300,
  capacity: 5,
  price: 30000000,
  cityName: 'Nam Định',
  districtName: 'Giao Thủy',
  wardName: 'Giao Xuân',
  user_name: 'Đinh Văn Đô',
  user_phone: '0394337996',
  user_avatar: 'https://techkalzen.com/wp-content/uploads/2020/02/tron-bo-nhung-hinh-anh-dep-buon-mang-tam-trang-suy-tu.jpg',
  dateCreated: new Date().toLocaleDateString()
},
{
  name: 'Quất Lâm Resort',
  image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2fjPMB_dsLf9bSwDnImRMb2tPw9hcTSi-Cg&usqp=CAU',
  acreage: 300,
  capacity: 5,
  price: 30000000,
  cityName: 'Nam Định',
  districtName: 'Giao Thủy',
  wardName: 'Giao Xuân',
  user_name: 'Đinh Văn Đô',
  user_phone: '0394337996',
  user_avatar: 'https://techkalzen.com/wp-content/uploads/2020/02/tron-bo-nhung-hinh-anh-dep-buon-mang-tam-trang-suy-tu.jpg',
  dateCreated: new Date().toLocaleDateString()
},
{
  name: 'Quất Lâm Resort',
  image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDkBbP3cKxDLyi4EuChYLiS_l2XKOheHamg8xpGEKjVQ8dPRavYHjFTc3X8b8yP3kAH8E&usqp=CAU',
  acreage: 300,
  capacity: 5,
  price: 30000000,
  cityName: 'Nam Định',
  districtName: 'Giao Thủy',
  wardName: 'Giao Xuân',
  user_name: 'Đinh Văn Đô',
  user_phone: '0394337996',
  user_avatar: 'https://techkalzen.com/wp-content/uploads/2020/02/tron-bo-nhung-hinh-anh-dep-buon-mang-tam-trang-suy-tu.jpg',
  dateCreated: new Date().toLocaleDateString()
},
{
  name: 'Quất Lâm Resort',
  image: 'https://i2.wp.com/theluxurytravelexpert.com/wp-content/uploads/2014/04/star-sanctuary-jade-mountain-st-lucia.jpg?fit=970%2C545&ssl=1',
  acreage: 300,
  capacity: 5,
  price: 30000000,
  cityName: 'Nam Định',
  districtName: 'Giao Thủy',
  wardName: 'Giao Xuân',
  user_name: 'Đinh Văn Đô',
  user_phone: '0394337996',
  user_avatar: 'https://techkalzen.com/wp-content/uploads/2020/02/tron-bo-nhung-hinh-anh-dep-buon-mang-tam-trang-suy-tu.jpg',
  dateCreated: new Date().toLocaleDateString()
},
   {
  name: 'Quất Lâm Resort',
  image: 'https://lh3.googleusercontent.com/proxy/D754QmPYpTCFU6HnPNAuh_eI25XSagb7K8Wxps9LWOTuDMdIrUspBf-8qhvEMNHZgH7U7JZ5BTBxJqRuiYoPU1aGAQt9MVdOv_5FvN4k',
  acreage: 300,
  capacity: 5,
  price: 30000000,
  cityName: 'Nam Định',
  districtName: 'Giao Thủy',
  wardName: 'Giao Xuân',
  user_name: 'Đinh Văn Đô',
  user_phone: '0394337996',
  user_avatar: 'https://techkalzen.com/wp-content/uploads/2020/02/tron-bo-nhung-hinh-anh-dep-buon-mang-tam-trang-suy-tu.jpg',
  dateCreated: new Date().toLocaleDateString()
},
{
  name: 'Quất Lâm Resort',
  image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_LnC7PHubOtoplXt_DCJoTiH21DgY3tFRzg&usqp=CAU',
  acreage: 300,
  capacity: 5,
  price: 30000000,
  cityName: 'Nam Định',
  districtName: 'Giao Thủy',
  wardName: 'Giao Xuân',
  user_name: 'Đinh Văn Đô',
  user_phone: '0394337996',
  user_avatar: 'https://techkalzen.com/wp-content/uploads/2020/02/tron-bo-nhung-hinh-anh-dep-buon-mang-tam-trang-suy-tu.jpg',
  dateCreated: new Date().toLocaleDateString()
}


]

  return (
    <>
   
    <PromotionRequest roomData={RawTableData}/>
    </>

  );
};


export default Message
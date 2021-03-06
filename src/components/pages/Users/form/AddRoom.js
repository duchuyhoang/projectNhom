import { useEffect } from 'react';
import { CNButton } from '@Components/shared/CNButton/CNButton';
import { CNCheckBox } from '@Components/shared/CNCheckBox/CNCheckBox';
import { CNSelect } from '@Components/shared/CNSelect/CNSelect';
import { CNTextField } from '@Components/shared/CNTextField/CNTextField';
import { CNSnackBar } from '@Components/shared/CNSnackBar/CNSnackBar';
import { Map } from '@Components/components/Map/Map';
import { useLocationSearch } from '@Core/hooks/useLocationSearch';
import { useListUltilities } from '@Core/hooks/useListUltilities';
import { useListImages } from '@Core/hooks/useListImages';
import { useAuth } from '@Core/hooks/useAuth';
import { axiosApi } from '@Core/api/axiosApi';
import { CNPreviewImage } from '@Components/shared/CNPreviewImage/CNPreviewImage';
import NumberFormat from 'react-number-format';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  FormControl,
  FormHelperText,
  makeStyles,
  TextareaAutosize,
} from '@material-ui/core';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import styled from 'styled-components';
import * as yup from 'yup';
import './styles.css';

const useStyled = makeStyles((theme) => ({
  formControl: {
    marginBottom: '20px',
    '& > label > span': {
      color: 'red',
    },
  },
  textArial: {
    padding: '6px 20px',
    fontSize: 18,
    fontWeight: 500,
  },
  selectStyles: {
    marginBottom: '20px',
    '& > label > span': {
      color: 'red',
    },
  },
  boxRow: {
    '& > *': {
      width: 'calc(100% / 3 - 20px)',
    },
  },
  helperTextStyles: {
    color: 'red',
    position: 'absolute',
    bottom: '-18px',
  },
  buttonStyles: {},
}));

const Wrapper = styled.div`
  background-color: #f7f7f7;
  width: 100vw;
  height: auto;
  margin-top: 100px;
  font-family: 'Nunito', Arial, sans-serif;
`;
const Container = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 1170px;
  overflow: hidden;
  position: relative;
  padding: 15px;
`;
const Title = styled.h1`
  font-weight: 700;
  color: #484848;
  font-size: 30px;
  margin: 28px 0;
`;
const TitleBox = styled.h5`
  font-weight: 700;
  color: #484848;
  font-size: 20px;
  margin-bottom: 20px;
`;
const Content = styled.div`
  width: 100%;
`;
const Box = styled.div`
  background-color: #fff;
  padding: 30px;
  margin-bottom: 30px;
  border-radius: 6px;
  border: 1px solid #ebebeb;
`;
const BoxRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`;
const Label = styled.label`
  color: #222;
  font-weight: '600';
`;
const Linear = styled.div`
  width: 100%;
  border: 1px solid #ebebeb;
  margin: 25px 0;
`;

const ImageList = styled.div`
  display: flex;
`;

function AddRoom(props) {
  const classes = useStyled();

  const { userId } = useAuth();
  const {
    listProvince,
    listDistrict,
    listWard,
    selectedProvince,
    selectedDistrict,
    selectedWard,
    setSelectedProvince,
    setSelectedDistrict,
    setSelectedWard,
  } = useLocationSearch();

  const [selectLocation, setSelectLocation] = useState({
    latitude: 21.046816934751238,
    longtitude: 105.79207492501563,
  });
  const { listUltility } = useListUltilities();

  const { listImages, setAddListImages, deleteAnImage } = useListImages();

  const [checkboxData, setCheckboxState] = useState([]);

  useEffect(() => {
    if (listUltility)
      setCheckboxState(
        listUltility.map((ultility) => ({
          label: ultility.label,
          value: ultility.value,
          id: ultility.value,
          isChecked: false,
        }))
      );
  }, [listUltility]);

  const defaultValues = {
    name: '',
    capacity: '',
    acreage: '',
    overview: '',
    house_number: '',
    alley: '',
    street: '',
    ward: null,
    district: null,
    city: null,
    rent_or_sale: 0,
    price: '',
    utility_bill: '',
    water_bill: '',
  };

  const schema = yup.object().shape({
    name: yup.string().required('Vui l??ng nh???p t??n ph??ng'),
    capacity: yup
      .string()
      .required('Vui l??ng nh???p s???c ch???a')
      .matches(/^[0-9]+$/, 'S???c ch???a kh??ng h???p l???'),
    acreage: yup
      .string()
      .required('Vui l??ng nh???p di???n t??ch ph??ng')
      .matches(/^[0-9]+$/, 'S???c ch???a kh??ng h???p l???'),
    house_number: yup
      .string()
      .required('Vui l??ng s??? nh??')
      .matches(/^[0-9]+$/, 'S??? nh?? kh??ng h???p l???'),
    street: yup.string().required('Vui l??ng nh???p t??n ???????ng'),
    ward: yup
      .string()
      .required('Vui l??ng ch???n ph?????ng')
      .nullable('Vui l??ng ch???n ph?????ng'),
    district: yup
      .string()
      .required('Vui l??ng ch???n qu???n')
      .nullable('Vui l??ng ch???n qu???n'),
    city: yup
      .string()
      .required('Vui l??ng ch???n th??nh ph???')
      .nullable('Vui l??ng ch???n th??nh ph???'),
    price: yup
      .string()
      .required('Vui l??ng nh???p gi?? ph??ng')
      .matches(/^[0-9]+$/, 'Gi?? ph??ng kh??ng h???p l???'),
    utility_bill: yup
      .string()
      .required('Vui l??ng nh???p gi?? ??i???n')
      .matches(/^[0-9]+$/, 'Gi?? ??i???n kh??ng h???p l???'),
    water_bill: yup
      .string()
      .required('Vui l??ng nh???p gi?? n?????c')
      .matches(/^[0-9]+$/, 'Gi?? n?????c kh??ng h???p l???'),
  });

  const { control, handleSubmit, formState } = useForm({
    mode: 'onSubmit',
    defaultValues,
    resolver: yupResolver(schema),
  });
  const [isOpen, setIsOpen] = useState();
  const handleCloseSnackBar = () => {
    setIsOpen(false);
  };
  const handleAddSubmit = (values) => {

    var roomForm = new FormData();
    roomForm.append('belongTo', userId);

    // For data
    for (let key in values) {
      if (key == 'overview') {
        roomForm.append(key, values[key].replace(/\n/g, '<br />'));
      } else if (key !== 'image') {
        roomForm.append(key, values[key]);
      }
    }

    roomForm.append('latitude', selectLocation.latitude);
    roomForm.append('longtitude', selectLocation.longtitude);

    // For images

    if (listImages.length === 1) {
      roomForm.append('singleImage', listImages[0].toUpload);
    } else if (listImages.length > 1) {
      listImages.forEach((image, index) => {
        roomForm.append('multipleRoomImage', image.toUpload);
      });
    }

    // For ultility
    checkboxData.forEach((ultility, index) => {
      if (ultility.isChecked) {
        roomForm.append('ultilities', JSON.stringify({ id: ultility.value }));
      }
    });

    axiosApi
      .post('/room/uploadARoom', roomForm)
      .then((value) => {
        console.log('ok');
      })
      .catch((err) => {
        console.log(err);
      });
    setIsOpen(true);
  };

  return (
    <Wrapper>
      <CNSnackBar
        severity="success"
        isOpen={isOpen}
        onClose={handleCloseSnackBar}
      >
        B??i ????ng c???a b???n s??? s???m ???????c ????ng n???u kh??ng c?? sai ph???m!
      </CNSnackBar>
      <Container>
        <Title>Add Room</Title>
        <Content>
          <form onSubmit={handleSubmit(handleAddSubmit)}>
            <Box>
              <TitleBox>Th??ng tin c?? b???n</TitleBox>
              <Controller
                name="name"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <FormControl className={classes.formControl} fullWidth>
                    <Label htmlFor="form-add-name">
                      T??n ph??ng tr???<span> *</span>
                    </Label>
                    <CNTextField
                      id="form-add-name"
                      fullWidth
                      type="text"
                      error={!!formState.errors['name']}
                      value={value ? value : ''}
                      inputChange={(e) => {
                        onChange(e);
                      }}
                    />
                    <FormHelperText className={classes.helperTextStyles}>
                      {formState.errors['name']?.message}
                    </FormHelperText>
                  </FormControl>
                )}
              />
              <Controller
                name="capacity"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <FormControl className={classes.formControl} fullWidth>
                    <Label htmlFor="form-add-capacity">
                      {`S???c ch???a(ng?????i)`}
                      <span> *</span>
                    </Label>
                    <CNTextField
                      id="form-add-capacity"
                      fullWidth
                      type="text"
                      error={!!formState.errors['capacity']}
                      value={value ? value : ''}
                      inputChange={(e) => {
                        onChange(e);
                      }}
                    />
                    <FormHelperText className={classes.helperTextStyles}>
                      {formState.errors['capacity']?.message}
                    </FormHelperText>
                  </FormControl>
                )}
              />
              <Controller
                name="acreage"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <FormControl className={classes.formControl} fullWidth>
                    <Label htmlFor="form-add-acreage">
                      {'Di???n t??ch(\u33A1)'}
                      <span> *</span>
                    </Label>
                    <CNTextField
                      id="form-add-acreage"
                      fullWidth
                      type="text"
                      error={!!formState.errors['acreage']}
                      value={value ? value : ''}
                      inputChange={(e) => {
                        onChange(e);
                      }}
                    />
                    <FormHelperText className={classes.helperTextStyles}>
                      {formState.errors['acreage']?.message}
                    </FormHelperText>
                  </FormControl>
                )}
              />
              <Controller
                name="image"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <FormControl className={classes.formControl} fullWidth>
                    <Label htmlFor="form-add-image">
                      ???nh<span> *</span>
                    </Label>
                    <input
                      id="dd"
                      type="file"
                      accept="image/png, image/jpeg, image/jpg"
                      onChange={(e) => {
                        setAddListImages(e.target.files);
                        onChange(e);
                      }}
                      multiple
                      name="upload_file"
                    />
                  </FormControl>
                )}
              />
              {/* <section> */}
              <ImageList>
                {listImages.map((image) => (
                  <CNPreviewImage
                    src={image.previewSrc}
                    key={image.id}
                    handleClose={() => {
                      deleteAnImage(image.id);
                    }}
                  />
                  // <img
                  //   src={image.previewSrc}
                  //   style={{ height: 100, width: 100 }}
                  //   key={image.id}
                  // />
                ))}
              </ImageList>
              {/* </section> */}
              <Controller
                name="overview"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <FormControl className={classes.formControl} fullWidth>
                    <Label htmlFor="form-add-overview">Overview</Label>
                    <TextareaAutosize
                      id="form-add-overview"
                      rowsMin={8}
                      rowsMax={10}
                      value={value ? value : ''}
                      onChange={onChange}
                      className={classes.textArial}
                    />
                  </FormControl>
                )}
              />
            </Box>
            <Box>
              <TitleBox>?????a ch???</TitleBox>
              <BoxRow className={classes.boxRow}>
                <Controller
                  name="house_number"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <FormControl className={classes.formControl}>
                      <Label htmlFor="form-add-house-number">
                        S??? nh??<span> *</span>
                      </Label>
                      <CNTextField
                        id="form-add-house-number"
                        type="text"
                        error={!!formState.errors['house_number']}
                        fullWidth
                        value={value ? value : ''}
                        inputChange={(e) => {
                          onChange(e);
                        }}
                      />
                      <FormHelperText className={classes.helperTextStyles}>
                        {formState.errors['house_number']?.message}
                      </FormHelperText>
                    </FormControl>
                  )}
                />
                <Controller
                  name="alley"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <FormControl className={classes.formControl}>
                      <Label htmlFor="form-add-alley">Ng?? ng??ch</Label>
                      <CNTextField
                        id="form-add-alley"
                        type="text"
                        error={!!formState.errors['alley']}
                        fullWidth
                        value={value ? value : ''}
                        inputChange={(e) => {
                          onChange(e);
                        }}
                      />
                      <FormHelperText className={classes.helperTextStyles}>
                        {formState.errors['alley']?.message}
                      </FormHelperText>
                    </FormControl>
                  )}
                />
                <Controller
                  name="street"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <FormControl className={classes.formControl}>
                      <Label htmlFor="form-add-street">
                        ???????ng<span> *</span>
                      </Label>
                      <CNTextField
                        id="form-add-street"
                        type="text"
                        error={!!formState.errors['street']}
                        fullWidth
                        value={value ? value : ''}
                        inputChange={(e) => {
                          onChange(e);
                        }}
                      />
                      <FormHelperText className={classes.helperTextStyles}>
                        {formState.errors['street']?.message}
                      </FormHelperText>
                    </FormControl>
                  )}
                />
                <Controller
                  name="city"
                  control={control}
                  render={({ field: { onChange, value, name } }) => (
                    <FormControl className={classes.formControl}>
                      <Label htmlFor="form-add-acreage">
                        Th??nh ph???<span> *</span>
                      </Label>
                      <CNSelect
                        name={name}
                        options={listProvince}
                        fullWidth
                        placeholder="Ch???n th??nh ph???"
                        width={'100%'}
                        value={selectedProvince}
                        onChange={(e) => {
                          setSelectedProvince(e === null ? e : e);
                          onChange(e ? e.value : null);
                        }}
                      />
                      <FormHelperText className={classes.helperTextStyles}>
                        {formState.errors['city']?.message}
                      </FormHelperText>
                    </FormControl>
                  )}
                />

                <Controller
                  name="district"
                  control={control}
                  render={({ field: { onChange, value, name } }) => (
                    <FormControl className={classes.selectStyles}>
                      <Label>
                        Qu???n<span> *</span>
                      </Label>
                      <CNSelect
                        name={name}
                        value={selectedDistrict}
                        options={listDistrict}
                        fullWidth
                        placeholder="Ch???n qu???n"
                        width={'100%'}
                        onChange={(e) => {
                          setSelectedDistrict(e);
                          onChange(e ? e.value : null);
                        }}
                      />
                      <FormHelperText className={classes.helperTextStyles}>
                        {formState.errors['district']?.message}
                      </FormHelperText>
                    </FormControl>
                  )}
                />
                <Controller
                  name="ward"
                  control={control}
                  render={({ field: { onChange, value, name } }) => (
                    <FormControl className={classes.formControl}>
                      <Label htmlFor="form-add-ward">
                        Ph?????ng<span> *</span>
                      </Label>
                      <CNSelect
                        name={name}
                        fullWidth
                        value={selectedWard}
                        options={listWard}
                        placeholder="Ch???n ph?????ng"
                        width={'100%'}
                        onChange={(e) => {
                          setSelectedWard(e);
                          onChange(e ? e.value : null);
                        }}
                      />
                      <FormHelperText className={classes.helperTextStyles}>
                        {formState.errors['ward']?.message}
                      </FormHelperText>
                    </FormControl>
                  )}
                />
              </BoxRow>
            </Box>
            <Box>
              <Box>
                <TitleBox>Ch???n v??? tr?? qua b???n ?????</TitleBox>
                <Map
                  isRoute={false}
                  currentTarget={selectLocation}
                  setCurrentTarget={setSelectLocation}
                />
              </Box>
              <TitleBox>Gi??</TitleBox>
              <BoxRow className={classes.boxRow}>
                <Controller
                  name="price"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <FormControl className={classes.formControl}>
                      <Label htmlFor="form-add-house-number">
                        {`Gi?? thu?? nh??(theo th??ng)`}
                        <span> *</span>
                      </Label>

                      <NumberFormat
                        id="form-add-house-number"
                        type="text"
                        error={!!formState.errors['price']}
                        fullWidth
                        value={value ? value : ''}
                        
                        customInput={CNTextField}
                        value={value}
                        thousandSeparator={","}
                        onValueChange={({value}) => {
                          onChange(value);
                        }}
                      />
                      <FormHelperText className={classes.helperTextStyles}>
                        {formState.errors['price']?.message}
                      </FormHelperText>
                    </FormControl>
                  )}
                />
                <Controller
                  name="utility_bill"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <FormControl className={classes.formControl}>
                      <Label htmlFor="price-electric">
                        {`Gi?? ??i???n(kWh)`}
                        <span> *</span>
                      </Label>

                      <NumberFormat 
                       id="price-electric"
                       type="text"
                       error={!!formState.errors['utility_bill']}
                       fullWidth
                       customInput={CNTextField}
                       value={value}
                       thousandSeparator={","}
                       onValueChange={({value}) => {
                         onChange(value);
                       }}
                      />
                      <FormHelperText className={classes.helperTextStyles}>
                        {formState.errors['utility_bill']?.message}
                      </FormHelperText>
                    </FormControl>
                  )}
                />
                <Controller
                  name="water_bill"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <FormControl className={classes.formControl}>
                      <Label htmlFor="price-water">
                        {'Gi?? n?????c sinh ho???t'}
                        <span> *</span>
                      </Label>
                      <NumberFormat 
                      id="price-water"
                      type="text"
                      error={!!formState.errors['water_bill']}
                      fullWidth
                       customInput={CNTextField}
                       value={value}
                       thousandSeparator={","}
                       onValueChange={({value}) => {
                         onChange(value);
                       }}
                      />
                      <FormHelperText className={classes.helperTextStyles}>
                        {formState.errors['water_bill']?.message}
                      </FormHelperText>
                    </FormControl>
                  )}
                />
              </BoxRow>
            </Box>
            <Box>
              <TitleBox>Ti???n ??ch</TitleBox>
              <BoxRow className={classes.boxRow}>
                {checkboxData.map((item) => (
                  <CNCheckBox
                    label={item.label}
                    data={item}
                    key={item.id}
                    checkBoxState={checkboxData}
                    setCheckBoxState={setCheckboxState}
                  />
                ))}
              </BoxRow>
            </Box>
            <Linear />
            <CNButton
              buttonType="main"
              type="submit"
              className={classes.buttonStyles}
            >
              L??u
            </CNButton>
          </form>
        </Content>
      </Container>
    </Wrapper>
  );
}

export default AddRoom;

import React, { useState, useEffect } from 'react';
import { useLocationSearch } from '@Core/hooks/useLocationSearch';
import { useListUltilities } from '@Core/hooks/useListUltilities';
import { useGetAreaAndPriceRange } from '@Core/hooks/useGetAreaAndPriceRange';
import styled from 'styled-components';
import {
  makeStyles,
  FormControl,
  FormHelperText,
  Hidden,
} from '@material-ui/core';
import { SVGIcon } from '@Components/shared/SvgIcon/Icon';
import { CNButton } from '@Components/shared/CNButton/CNButton';
import { CNTextField } from '@Components/shared/CNTextField/CNTextField';
import { CNSelect } from '@Components/shared/CNSelect/CNSelect';
import { CNCheckBox } from '@Components/shared/CNCheckBox/CNCheckBox';
import { CNSlider } from '@Components/shared/CNSlider/CNSlider';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { roomActions, roomSelectors } from '@Core/redux/room';

const useSearchRoomStyles = makeStyles((theme) => ({
  mainForm: (props) => ({
    position: 'relative',
    width: props.type === 'properties' ? '100%' : '',
    backgroundColor:
      props.type === 'properties' ? '' : 'rgba(255, 255, 255, 0.2)',
  }),
  //   mainInput: (props) => ({
  //     width: props.type === 'properties' ? '100%' : '250px',
  //     fontSize: 18,
  //   }),
  //   selectInput: (props) => ({
  //     width: props.type === 'properties' ? '100%' : '165px',
  //     fontSize: 18,
  //   }),
  '@keyframes fadeIn': {
    '0%': {
      //   transform: 'translateY(-30px)',
      opacity: 0,
    },
    '100%': {
      //   transform: 'translateY(0)',
      opacity: 1,
    },
  },
  fadeIn: {
    display: 'block',
    transition: '.3s all',
    animation: '$fadeIn .3s linear',
  },
  fadeInNested: {
    transition: '.5s all ease-in-out',
    maxHeight: ' 500px !important',
    opacity: 1,
    visibility: 'visible',
  },
  active: {
    color: theme.palette.primary.main,
    '& > svg': {
      fill: theme.palette.primary.main,
    },
  },
  searchButton: (props) => ({
    fontSize: 16,
    fontWeight: 900,
    marginTop: '0',
    marginBottom: '0',
    textTransform: 'capitalize',
    width: props.type === 'properties' ? '100%' : '',
    marginLeft: props.type === 'properties' ? '0' : '20px',
  }),
  checkBox: (props) => ({
    '& span': {
      fontSize: 14,
    },
    '& .MuiSvgIcon-root': {
      width: '23px',
      height: '21px',
      display: 'inline-block',
    },
    width: props.type === 'properties' ? '50%' : '',
    margin: props.type === 'properties' ? '0' : '',
    // justifyContent: props.type === 'properties' ? 'flex-start' : '',
  }),
  // validate
  formControl: (props) => ({
    position: 'relative',
    marginRight: props.type === 'properties' ? '0px' : '20px',
    marginBottom: props.type === 'properties' ? '20px' : '0px',
    width: props.type === 'properties' ? '100%' : '250px',
    height: '50px',
    '& > div': {
      width: '100%',
      height: '100%',
    },
    '& > div > input': {
      fontSize: '14px',
      color: '#484848',
    },
    '& > div > input::placeholder': {
      fontSize: '14px',
      color: '#484848',
      opacity: '1',
    },
  }),
  formControlSelect: (props) => ({
    position: 'relative',
    marginRight: props.type === 'properties' ? '0px' : '20px',
    marginBottom: props.type === 'properties' ? '20px' : '0px',
    width: props.type === 'properties' ? '100%' : '165px',
    '& > div': {
      width: '100%',
    },
  }),
  helperText: {
    color: theme.palette.primary.main,
    fontSize: 14,
    position: 'absolute',
    bottom: -22,
  },
  selectStyles: {
    '&::placeholder': {
      color: '#484848',
    },
  },
  slider: {
    '& > .MuiSlider-root': {
      width: '100%!important',
    },
    width: '100%!important',
  },
}));

const Container = styled.div`
  font-family: ${(props) => props.theme.typography.fontFamily};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  max-width: 1170px;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.75;
  color: #484848;
`;
const Title = styled.h1`
  font-size: 55px;
  font-weight: 700;
  color: ${(props) => props.theme.palette.text.secondary};
  display: ${(props) => (props.type === 'properties' ? 'none' : '')};
`;
const AdvancedTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  align-self: flex-start;
  margin-bottom: ${(props) => (props.type === 'properties' ? '20px' : '0')};
  display: ${(props) => (props.type === 'properties' ? 'block' : 'none')};
`;
const Description = styled.p`
  font-size: 18px;
  line-height: 1;
  color: ${(props) => props.theme.palette.text.secondary};
  margin-bottom: 60px;
  font-weight: 600;
  display: ${(props) => (props.type === 'properties' ? 'none' : '')};
`;
const SearchFormMain = styled.div`
  margin: ${(props) => (props.type === 'properties' ? '0' : '10px')};
  display: flex;
  padding: 20px;
  background-color: ${(props) => props.theme.palette.background.secondary};
  border-radius: 6px;
  border: 1px solid
    ${(props) => (props.type === 'properties' ? '#ebebeb' : '#fff')};
  align-items: center;
  /* box-shadow:  */
  flex-direction: ${(props) =>
    props.type === 'properties' ? 'column' : 'row'};
`;
const AdvancedOptions = styled.div`
  display: flex;
  cursor: pointer;
  align-items: center;
  font-size: 14px;
  transition: all 0.2s;
  font-weight: 700;
  margin-bottom: ${(props) => (props.type === 'properties' ? '20px' : '0')};
  align-self: ${(props) =>
    props.type === 'properties' ? 'flex-start' : 'center'};
  &:hover {
    color: ${(props) => props.theme.palette.primary.main};
    & > svg {
      fill: ${(props) => props.theme.palette.primary.main};
    }
  }
`;

const SearchAdvanced = styled.div`
  position: absolute;
  width: 60%;
  top: 100%;
  left: 50%;
  padding: 20px;
  margin-top: 30px;
  transform: translateX(-50%);
  background-color: ${(props) => props.theme.palette.background.secondary};
  border-radius: 6px;
  box-sizing: border-box;
  display: none;
`;
const SearchAdvancedNested = styled.div`
  position: ${(props) => (props.type === 'properties' ? 'static' : 'absolute')};
  visibility: hidden;

  opacity: 0;
  max-height: 0;
  display: ${(props) => (props.type === 'properties' ? '' : 'none')};
  transition: min-height 0.5s all;
`;
const UtilitiesWrapper = styled.div`
  border-bottom: 1px solid ${(props) => props.theme.border.main};

  > label {
    width: calc(100% / 4);
    margin-right: 10px;
    margin-bottom: 12px;
  }
`;
const UtilitiesWrapperNested = styled.div``;
const SliderOptionsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
`;
const SliderItem = styled.div`
  width: calc(50% - 30px);
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const SliderItemNested = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;
const SliderTitle = styled.h3`
  font-size: 14px;
  text-align: center;
  font-weight: 700;
`;
var maxArea,
  maxPrice,
  first = true;
export const SearchRoom = ({
  type,
  items_per_page,
  page_index,
  setPageIndex,
}) => {
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
  const {
    areaRange,
    priceRange,
    setAreaRange,
    setPriceRange,
  } = useGetAreaAndPriceRange();
  if (areaRange && priceRange && first) {
    maxArea = areaRange[1];
    maxPrice = priceRange[1];
    first = false;
  }

  const dispatch = useDispatch();

 

  const { listUltility } = useListUltilities();
  const modifiedListUltility = listUltility.map((utility) => {
    return {
      label: utility.label,
      value: utility.value,
      id: utility.value,
      isChecked: false,
    };
  });
  const [uitilitiesList, setUitilitiesList] = useState(null);
  const [isAdvancedOptionsOpen, setIsAdvancedOptionsOpen] = useState(false);
  const [areaSliderValue, setAreaSliderValue] = useState([0, 100]);
  const [priceSliderValue, setPriceSliderValue] = useState([0, 100]);

  useEffect(() => {
    setUitilitiesList(modifiedListUltility);
  }, [listUltility]);

  const areaChangeHandler = (event, newValue) => {
    setAreaSliderValue(newValue);
    setAreaRange([
      Math.floor(newValue[0] / 100) * maxArea,
      Math.floor((newValue[1] / 100) * maxArea),
    ]);
  };

  const priceChangeHandler = (event, newValue) => {
    setPriceSliderValue(newValue);
    setPriceRange([
      Math.floor((newValue[0] / 100) * maxPrice),
      Math.floor((newValue[1] / 100) * maxPrice),
    ]);
  };
  const showAdvancedOptionsHandler = () => {
    setIsAdvancedOptionsOpen((preStatus) => !preStatus);
  };
  const searchFromStyles = useSearchRoomStyles({ type });
  const defaultValues = {
    name: '',
    city: null,
    district: null,
    ward: null,
  };
  const schema = yup.object().shape({
    name: yup.string().required('Vui lòng nhập từ khóa'),
  });
  const { control, handleSubmit, formState } = useForm({
    mode: 'onSubmit',
    defaultValues,
    resolver: yupResolver(schema),
  });

  const handleSearchSubmit = (values) => {
    let uitilitiesArray = [];

    uitilitiesList.forEach((utility) => {
      if (utility.isChecked) uitilitiesArray.push(utility.value);
    });

    const resObject = {
      name: values.name,
      city: values.city,
      district: values.district,
      ward: values.ward,
      utilities: uitilitiesArray.join(','),
      min_acreage: areaRange[0],
      max_acreage: areaRange[1],
      min_price: priceRange[0],
      max_price: priceRange[1],
    };
    for (const key in resObject) {
      if ((!resObject[key] && resObject[key] !== 0) || resObject[key] === '') {
        delete resObject[key];
      }
    }

    setPageIndex(1);
    dispatch(roomActions.getRoomsSearched({ items_per_page, ...resObject }));
  };

  const searchRoomCondition=useSelector(roomSelectors.searchRoomCondition)

  useEffect(() => {
console.log("hê");
    // get room 
    dispatch(roomActions.getRoomsSearched({items_per_page,page_index,...searchRoomCondition}));
  },[items_per_page,page_index]);

  return (
    <Container>
      <Title type={type}>Find Your Dream Home</Title>
      <Description type={type}>
        From as low as $10 per day with limited time offer discounts
      </Description>
      <form
        className={searchFromStyles.mainForm}
        onSubmit={handleSubmit(handleSearchSubmit)}
      >
        <SearchFormMain type={type}>
          <AdvancedTitle type={type}>Advanced Search</AdvancedTitle>
          <Controller
            name="name"
            control={control}
            render={({ field: { onChange, value } }) => (
              <FormControl className={searchFromStyles.formControl}>
                <CNTextField
                  placeholder="Enter keyword..."
                  error={!!formState.errors['name']}
                  values={value ? value : ''}
                  inputChange={(e) => {
                    onChange(e);
                  }}
                />
                <FormHelperText className={searchFromStyles.helperText}>
                  {formState.errors['name']?.message}
                </FormHelperText>
              </FormControl>
            )}
          />
          <Controller
            name="city"
            control={control}
            render={({ field: { onChange, value } }) => (
              <FormControl className={searchFromStyles.formControlSelect}>
                <CNSelect
                  value={selectedProvince}
                  onChange={(e) => {
                    setSelectedProvince(e);
                    onChange(e ? e.value : null);
                  }}
                  className={searchFromStyles.selectStyles}
                  options={listProvince}
                  placeholder="Select Province"
                />
              </FormControl>
            )}
          />
          <Controller
            name="district"
            control={control}
            render={({ field: { onChange, value } }) => (
              <FormControl className={searchFromStyles.formControlSelect}>
                <CNSelect
                  value={selectedDistrict}
                  onChange={(e) => {
                    setSelectedDistrict(e);
                    onChange(e ? e.value : null);
                  }}
                  className={searchFromStyles.selectStyles}
                  options={listDistrict}
                  placeholder="Select District"
                />
              </FormControl>
            )}
          />
          <Controller
            name="ward"
            control={control}
            render={({ field: { onChange, value } }) => (
              <FormControl className={searchFromStyles.formControlSelect}>
                <CNSelect
                  value={selectedWard}
                  onChange={(e) => {
                    setSelectedWard(e);
                    onChange(e ? e.value : null);
                  }}
                  options={listWard}
                  className={searchFromStyles.selectStyles}
                  placeholder="Select Ward"
                />
              </FormControl>
            )}
          />

          <AdvancedOptions
            type={type}
            className={isAdvancedOptionsOpen ? searchFromStyles.active : ''}
            onClick={showAdvancedOptionsHandler}
          >
            Advanced
            <SVGIcon name="more" style={{ marginLeft: '15px' }} />
          </AdvancedOptions>
          <SearchAdvancedNested
            type={type}
            className={
              isAdvancedOptionsOpen && type === 'properties'
                ? searchFromStyles.fadeInNested
                : ''
            }
          >
            <UtilitiesWrapperNested
              style={{
                display: uitilitiesList !== null && uitilitiesList.length > 0,
              }}
            >
              {uitilitiesList &&
                uitilitiesList.map((utility) => {
                  return (
                    <CNCheckBox
                      className={searchFromStyles.checkBox}
                      key={utility.id}
                      label={utility.label}
                      data={utility}
                      checkBoxState={uitilitiesList}
                      setCheckBoxState={setUitilitiesList}
                    />
                  );
                })}
            </UtilitiesWrapperNested>

            <SliderItemNested>
              {areaRange && (
                <SliderTitle>
                  {' '}
                  Home Area (Sqft){' '}
                  {new Intl.NumberFormat('ve-VE', { style: 'decimal' }).format(
                    areaRange[0]
                  )}{' '}
                  -{' '}
                  {new Intl.NumberFormat('ve-VE', { style: 'decimal' }).format(
                    areaRange[1]
                  )}{' '}
                </SliderTitle>
              )}
              <CNSlider
                value={areaSliderValue}
                handleChange={areaChangeHandler}
              />
            </SliderItemNested>
            <SliderItemNested>
              {priceRange && (
                <SliderTitle>
                  {' '}
                  From{' '}
                  {new Intl.NumberFormat('ve-VE', {
                    style: 'currency',
                    currency: 'VND',
                  }).format(priceRange[0])}{' '}
                  to{' '}
                  {new Intl.NumberFormat('ve-VE', {
                    style: 'currency',
                    currency: 'VND',
                  }).format(priceRange[1])}{' '}
                </SliderTitle>
              )}
              <CNSlider
                value={priceSliderValue}
                handleChange={priceChangeHandler}
              />
            </SliderItemNested>
          </SearchAdvancedNested>
          <CNButton
            type="submit"
            className={searchFromStyles.searchButton}
            buttonType="main"
          >
            Search
          </CNButton>
        </SearchFormMain>

        <SearchAdvanced
          className={
            isAdvancedOptionsOpen && type !== 'properties'
              ? searchFromStyles.fadeIn
              : ''
          }
        >
          <UtilitiesWrapper
            style={{
              display:
                uitilitiesList !== null && uitilitiesList.length > 0
                  ? 'flex'
                  : 'none',
            }}
          >
            {uitilitiesList &&
              uitilitiesList.map((utility) => {
                return (
                  <CNCheckBox
                    className={searchFromStyles.checkBox}
                    key={utility.id}
                    label={utility.label}
                    data={utility}
                    checkBoxState={uitilitiesList}
                    setCheckBoxState={setUitilitiesList}
                  />
                );
              })}
          </UtilitiesWrapper>
          <SliderOptionsWrapper>
            <SliderItem>
              {areaRange && (
                <SliderTitle>
                  {' '}
                  Home Area (Sqft){' '}
                  {new Intl.NumberFormat('ve-VE', { style: 'decimal' }).format(
                    areaRange[0]
                  )}{' '}
                  -{' '}
                  {new Intl.NumberFormat('ve-VE', { style: 'decimal' }).format(
                    areaRange[1]
                  )}{' '}
                </SliderTitle>
              )}
              <CNSlider
                value={areaSliderValue}
                handleChange={areaChangeHandler}
                className={searchFromStyles.slider}
              />
            </SliderItem>
            <SliderItem>
              {priceRange && (
                <SliderTitle>
                  {' '}
                  From{' '}
                  {new Intl.NumberFormat('ve-VE', {
                    style: 'currency',
                    currency: 'VND',
                  }).format(priceRange[0])}{' '}
                  to{' '}
                  {new Intl.NumberFormat('ve-VE', {
                    style: 'currency',
                    currency: 'VND',
                  }).format(priceRange[1])}{' '}
                </SliderTitle>
              )}
              <CNSlider
                value={priceSliderValue}
                handleChange={priceChangeHandler}
                className={searchFromStyles.slider}
              />
            </SliderItem>
          </SliderOptionsWrapper>
        </SearchAdvanced>
      </form>
    </Container>
  );
};

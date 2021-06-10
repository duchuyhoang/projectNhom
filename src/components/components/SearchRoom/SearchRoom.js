import React, { useState, useEffect } from 'react';
import { useLocationSearch } from '@Core/hooks/useLocationSearch'
import { useListUltilities } from '@Core/hooks/useListUltilities'
import { useGetAreaAndPriceRange } from '@Core/hooks/useGetAreaAndPriceRange'
import styled from "styled-components"
import { makeStyles, FormControl, FormHelperText } from "@material-ui/core"
import { SVGIcon } from "@Components/shared/SvgIcon/Icon";
import { CNButton } from '@Components/shared/CNButton/CNButton'
import { CNTextField } from '@Components/shared/CNTextField/CNTextField'
import { CNSelect } from '@Components/shared/CNSelect/CNSelect'
import { CNCheckBox } from '@Components/shared/CNCheckBox/CNCheckBox'
import { CNSlider } from '@Components/shared/CNSlider/CNSlider'
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const useSearchRoomStyles = makeStyles((theme) => ({
    mainForm: (props) => ({
        width: props.type === 'properties' ? '100%' : '',
    }),
    mainInput: (props) => ({
        width: props.type === 'properties' ? '100%' : '280px',
        fontSize: 18,

    }),
    selectInput: (props) => ({
        width: props.type === 'properties' ? '100%' : '280px',
        fontSize: 18
    }),
    "@keyframes fadeIn": {
        "0%": {

            transform: "translateY(-30px)",
            opacity: 0

        },
        "100%": {
            transform: "translateY(0)",
            opacity: 1


        }
    }
    ,
    fadeIn: {
        display: "block",
        transition: ".3s all",
        animation: "$fadeIn .3s linear",
    },
    fadeInNested: {
        transition: ".5s all ease-in-out",
        maxHeight: " 500px !important",
        opacity: 1,
        visibility: 'visible',

    },
    active: {
        color: theme.palette.primary.main,
        "& > svg": {
            fill: theme.palette.primary.main
        }
    },
    searchButton: (props) => ({
        fontSize: 18,
        fontWeight: 900,
        marginLeft: 20,
        width: props.type === 'properties' ? '100%' : '',
        marginLeft: props.type === 'properties' ? '0' : '20px'
    }),
    checkBox: (props) => ({
        "& span": {
            fontSize: 18
        },
        width: props.type === 'properties' ? '50%' : '',
        margin: props.type === 'properties' ? '0' : '',
        justifyContent: props.type === 'properties' ? 'flex-start' : '',

    }),
    // validate
    formControl: (props) => ({
        position: "relative",
        marginRight: props.type === 'properties' ? '0px' : '20px',
        marginBottom: props.type === 'properties' ? '30px' : '0px',
        width: props.type === 'properties' ? '100%' : '280px',
        "& > div": {
            width: props.type === 'properties' ? '100%' : '280px',
        }
    }),
    helperText: {
        color: theme.palette.primary.main,
        fontSize: 14,
        position: "absolute",
        bottom: -22
    }
}));

const Container = styled.div`
    font-family: ${props => props.theme.typography.fontFamily};
    display: flex;
    flex-direction: column;
    justify-content:center;
    align-items: center;
    margin: 0 auto;
    box-sizing: border-box;
   
`
const Title = styled.h1`
    font-size: 55px;
    color: ${props => props.theme.palette.text.secondary};
    display: ${props => props.type === 'properties' ? 'none' : ''};
`
const AdvancedTitle = styled.h3`
    font-size: 18px;
    font-weight: bold;
    align-self: flex-start;
    margin-bottom: 30px;
    display: ${props => props.type === 'properties' ? 'block' : 'none'};
`
const Description = styled.p`
    font-size:18px;
    color: ${props => props.theme.palette.text.secondary};
    margin-bottom:30px;
    font-weight:bold;
    display: ${props => props.type === 'properties' ? 'none' : ''};
`
const SearchFormMain = styled.div`
    background-color:${props => props.theme.palette.background.secondary};
    display: flex;
    padding: 30px;
    background-color: ${props => props.theme.palette.background.secondary};
    border-radius: 6px;
    border: 1px solid   ${props => props.theme.palette.background.secondary};
    align-items:center;
    /* box-shadow:  */
    flex-direction: ${props => props.type === 'properties' ? 'column' : 'row'};
`
const AdvancedOptions = styled.div`
    display: flex;
    cursor: pointer;
    align-items: center;
    font-size: 18px;
    transition: all .2s;
    font-weight: bold;
    align-self: ${props => props.type === 'properties' ? 'flex-start' : 'center'};
    &:hover {
        color: ${props => props.theme.palette.primary.main};
        & > svg {
            fill: ${props => props.theme.palette.primary.main};
        } 
    }
`

const SearchAdvanced = styled.div`
    background-color:${props => props.theme.palette.background.secondary};
    border-radius:6px;
    margin-top: 30px;
    box-sizing: border-box;
    display: none;   
`
const SearchAdvancedNested = styled.div`
    visibility: hidden;
    opacity:0;
    max-height:0;
    display: ${props => props.type === 'properties' ? '' : 'none'};
    transition: min-height .5s all;

`
const UtilitiesWrapper = styled.div`
    border-bottom: 1px solid ${props => props.theme.border.main};
    padding: 20px;
    display: flex;
    justify-content:space-around;
`
const UtilitiesWrapperNested = styled.div`
   display: flex;
   justify-content:flex-start;
   flex-wrap: wrap;
    margin-top: 10px;
    margin-bottom: 20px;
`
const SliderOptionsWrapper = styled.div`
    display: flex;
    justify-content:center;
    margin: 30px 0 30px;
`
const SliderItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 30px;
`
const SliderItemNested = styled.div`
   display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
`
const SliderTitle = styled.h3`
    font-size:16px;
    text-align:center;
`
var maxArea, maxPrice, first = true;
export const SearchRoom = ({ type }) => {

    const {
        listProvince,
        listDistrict,
        listWard,
        selectedProvince,
        selectedDistrict,
        selectedWard,
        setSelectedProvince,
        setSelectedDistrict,
        setSelectedWard } =
        useLocationSearch();
    const {
        areaRange,
        priceRange,
        setAreaRange,
        setPriceRange } = useGetAreaAndPriceRange();
    if (areaRange && priceRange && first) {
        maxArea = areaRange[1];
        maxPrice = priceRange[1];
        first = false;
    }

    const { listUltility } = useListUltilities();
    const modifiedListUltility = listUltility.map((utility) => {
        return {
            label: utility.label,
            value: utility.value,
            id: utility.value,
            isChecked: false
        }
    })
    const [uitilitiesList, setUitilitiesList] = useState(null);

    const [isAdvancedOptionsOpen, setIsAdvancedOptionsOpen] = useState(false);
    const [areaSliderValue, setAreaSliderValue] = useState([0, 100])
    const [priceSliderValue, setPriceSliderValue] = useState([0, 100])
    useEffect(() => {
        setUitilitiesList(modifiedListUltility)
    }, [listUltility])
    const areaChangeHandler = (event, newValue) => {
        setAreaSliderValue(newValue);
        setAreaRange([Math.floor(newValue[0] / 100) * maxArea, Math.floor(newValue[1] / 100 * maxArea)])

    }
    const priceChangeHandler = (event, newValue) => {
        setPriceSliderValue(newValue);
        setPriceRange([Math.floor((newValue[0] / 100) * maxPrice), Math.floor((newValue[1] / 100) * maxPrice)])
    }
    const showAdvancedOptionsHandler = () => {
        setIsAdvancedOptionsOpen(preStatus => !preStatus)
    }
    const searchFromStyles = useSearchRoomStyles({ type });
    const defaultValues = {
        name: '',
        city: null,
        district: null,
        ward: null
    }
    const schema = yup.object().shape({
        name: yup.string().required('Vui lòng nhập từ khóa'),
    })
    const { control, handleSubmit, formState } = useForm({
        mode: 'onSubmit',
        defaultValues,
        resolver: yupResolver(schema),
    });
    const handleSearchSubmit = (values) => {

        let uitilitiesArray = [];

        uitilitiesList.forEach(utility => {
            if (utility.isChecked)
                uitilitiesArray.push(utility.value)
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
            max_price: priceRange[1]
        }
        for (const key in resObject) {
            if (!resObject[key] || resObject[key] === "") {
                delete resObject[key];
            }

        }
        console.log(resObject)

    }
    return (

        <Container>
            <Title type={type}>Find Your Dream Home</Title>
            <Description type={type}>
                From as low as $10 per day with limited time offer discounts</Description>
            <form className={searchFromStyles.mainForm} onSubmit={handleSubmit(handleSearchSubmit)}>
                <SearchFormMain type={type} className={searchFromStyles.main}>
                    <AdvancedTitle type={type}>Advanced Search</AdvancedTitle>
                    <Controller
                        name="name"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <FormControl className={searchFromStyles.formControl}>
                                <CNTextField className={searchFromStyles.mainInput}
                                    placeholder="Enter keyword..."
                                    error={!!formState.errors['name']}
                                    values={value ? value : ''}
                                    inputChange={e => {
                                        onChange(e)
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
                            <FormControl className={searchFromStyles.formControl}>
                                <CNSelect className={searchFromStyles.selectInput} value={selectedProvince}
                                    onChange={e => {
                                        setSelectedProvince(e)
                                        onChange(e ? e.value : null)

                                    }}
                                    options={listProvince}
                                    placeholder="Select Province" />

                            </FormControl>
                        )}
                    />
                    <Controller
                        name="district"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <FormControl className={searchFromStyles.formControl}>
                                <CNSelect className={searchFromStyles.selectInput} value={selectedDistrict}
                                    onChange={e => {
                                        setSelectedDistrict(e)
                                        onChange(e ? e.value : null)

                                    }}
                                    options={listDistrict}
                                    placeholder="Select District" />

                            </FormControl>
                        )}
                    />
                    <Controller
                        name="ward"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <FormControl className={searchFromStyles.formControl}>
                                <CNSelect className={searchFromStyles.selectInput} value={selectedWard}
                                    onChange={e => {
                                        setSelectedWard(e)
                                        onChange(e ? e.value : null)

                                    }}
                                    options={listWard}
                                    placeholder="Select Ward" />

                            </FormControl>
                        )}
                    />
                    <AdvancedOptions type={type} className={isAdvancedOptionsOpen ? searchFromStyles.active : ""} onClick={showAdvancedOptionsHandler}
                    >
                        Advanced
                <SVGIcon name="more" />
                    </AdvancedOptions>
                    <SearchAdvancedNested type={type} className={isAdvancedOptionsOpen && type === 'properties' ? searchFromStyles.fadeInNested : ""}>
                        <UtilitiesWrapperNested>

                            {uitilitiesList && uitilitiesList.map((utility) => {
                                return (
                                    <CNCheckBox
                                        className={searchFromStyles.checkBox}
                                        key={utility.id}
                                        label={utility.label}
                                        data={utility}
                                        checkBoxState={uitilitiesList}
                                        setCheckBoxState={setUitilitiesList}
                                    />
                                )
                            })}
                        </UtilitiesWrapperNested>

                        <SliderItemNested>
                            {areaRange && <SliderTitle> Home Area (Sqft) {new Intl.NumberFormat('ve-VE', { style: 'decimal' }).format(areaRange[0])} - {new Intl.NumberFormat('ve-VE', { style: 'decimal' }).format(areaRange[1])} </SliderTitle>}
                            <CNSlider value={areaSliderValue} handleChange={areaChangeHandler} />
                        </SliderItemNested>
                        <SliderItemNested>
                            {priceRange && <SliderTitle> From {new Intl.NumberFormat('ve-VE', { style: 'currency', currency: 'VND' }).format(priceRange[0])} to {new Intl.NumberFormat('ve-VE', { style: 'currency', currency: 'VND' }).format(priceRange[1])} </SliderTitle>}
                            <CNSlider value={priceSliderValue} handleChange={priceChangeHandler} />
                        </SliderItemNested>
                    </SearchAdvancedNested>
                    <CNButton type="submit" className={searchFromStyles.searchButton} buttonType="main">Search</CNButton>
                </SearchFormMain>

            </form>
            <SearchAdvanced
                className={isAdvancedOptionsOpen && type !== 'properties' ? searchFromStyles.fadeIn : ""}
            >
                <UtilitiesWrapper>

                    {uitilitiesList && uitilitiesList.map((utility) => {
                        return (
                            <CNCheckBox
                                // className={searchPropertiesStyles.checkBox}
                                key={utility.id}
                                label={utility.label}
                                data={utility}
                                checkBoxState={uitilitiesList}
                                setCheckBoxState={setUitilitiesList}
                            />
                        )
                    })}
                </UtilitiesWrapper>
                <SliderOptionsWrapper>
                    <SliderItem>
                        {areaRange && <SliderTitle> Home Area (Sqft) {new Intl.NumberFormat('ve-VE', { style: 'decimal' }).format(areaRange[0])} - {new Intl.NumberFormat('ve-VE', { style: 'decimal' }).format(areaRange[1])} </SliderTitle>}
                        <CNSlider value={areaSliderValue} handleChange={areaChangeHandler} />
                    </SliderItem>
                    <SliderItem>
                        {priceRange && <SliderTitle> From {new Intl.NumberFormat('ve-VE', { style: 'currency', currency: 'VND' }).format(priceRange[0])} to {new Intl.NumberFormat('ve-VE', { style: 'currency', currency: 'VND' }).format(priceRange[1])} </SliderTitle>}
                        <CNSlider value={priceSliderValue} handleChange={priceChangeHandler} />
                    </SliderItem>
                </SliderOptionsWrapper>
            </SearchAdvanced>
        </Container>

    )
}
import React, { useState, useEffect } from 'react';
import { useLocationSearch } from '@Core/hooks/useLocationSearch'
import { useListUltilities } from '@Core/hooks/useListUltilities'
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

    mainInput: {
        width: 280,
        fontSize: 18,

    },
    selectInput: {
        width: "280px !important",
        fontSize: 18
    },
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
    active: {
        color: theme.palette.primary.main,
        "& > svg": {
            fill: theme.palette.primary.main
        }
    },
    searchButton: {
        fontSize: 18,
        fontWeight: 900,
        marginLeft: 20
    },
    checkBox: {
        "& span": {
            fontSize: 18
        }
    },
    // validate
    formControl: {
        position: "relative",
        marginRight: 20

    },
    helperText: {
        color: theme.palette.primary.main,
        fontSize: 14,
        position: "absolute",
        bottom: -22
    }
}))
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
    color: ${props => props.theme.palette.text.secondary}
`
const Description = styled.p`
    font-size:18px;
    color: ${props => props.theme.palette.text.secondary};
    margin-bottom:30px;
    font-weight:bold;
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
`
const AdvancedOptions = styled.div`
    display: flex;
    cursor: pointer;
    align-items: center;
    font-size: 18px;
    transition: all .2s;
    font-weight: bold;
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
const UtilitiesWrapper = styled.div`
    border-bottom: 1px solid ${props => props.theme.border.main};
    padding: 20px;
    display: flex;
    justify-content:space-around;

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
const SliderTitle = styled.h3`

`

export const SearchRoom = () => {

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
    const [squareRange, setSquareRange] = useState([0, 800])
    const [priceRange, setPriceRange] = useState([0, 800])
    const [isAdvancedOptionsOpen, setIsAdvancedOptionsOpen] = useState(false);
    useEffect(() => {
        setUitilitiesList(modifiedListUltility)
    }, [listUltility])
    const squareChangeHandler = (event, newValue) => {
        setSquareRange(newValue);
    }
    const priceChangeHandler = (event, newValue) => {
        setPriceRange(newValue);
    }
    const showAdvancedOptionsHandler = () => {
        setIsAdvancedOptionsOpen(preStatus => !preStatus)
    }
    const searchFromStyles = useSearchRoomStyles();
    const defaultValues = {
        keyword: '',
        province: null,
        district: null,
        ward: null
    }
    const schema = yup.object().shape({
        keyword: yup.string().required('Vui lòng nhập từ khóa'),
        province: yup.number().required('Vui lòng chọn tỉnh/thành phố').nullable('Vui lòng chọn tỉnh/thành phố')
    })
    const { control, handleSubmit, formState } = useForm({
        mode: 'onSubmit',
        defaultValues,
        resolver: yupResolver(schema),
    });
    const handleSearchSubmit = (values) => {
        console.log(values)
    }
    return (

        <Container>
            <Title>Find Your Dream Home</Title>
            <Description>
                From as low as $10 per day with limited time offer discounts</Description>
            <form onSubmit={handleSubmit(handleSearchSubmit)}>
                <SearchFormMain className={searchFromStyles.main}  >
                    <Controller
                        name="keyword"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <FormControl className={searchFromStyles.formControl}>
                                <CNTextField className={searchFromStyles.mainInput}
                                    placeholder="Enter keyword..."
                                    error={!!formState.errors['keyword']}
                                    values={value ? value : ''}
                                    inputChange={e => {
                                        onChange(e)
                                    }}
                                />
                                <FormHelperText className={searchFromStyles.helperText}>
                                    {formState.errors['keyword']?.message}
                                </FormHelperText>
                            </FormControl>
                        )}
                    />
                    <Controller
                        name="province"
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
                                <FormHelperText className={searchFromStyles.helperText}>
                                    {formState.errors['province']?.message}
                                </FormHelperText>
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



                    <AdvancedOptions className={isAdvancedOptionsOpen ? searchFromStyles.active : ""} onClick={showAdvancedOptionsHandler}
                    >
                        Advanced
                <SVGIcon name="more" />
                    </AdvancedOptions>
                    <CNButton type="submit" className={searchFromStyles.searchButton} buttonType="main">Search</CNButton>
                </SearchFormMain>
            </form>
            <SearchAdvanced className={isAdvancedOptionsOpen ? searchFromStyles.fadeIn : ""}>
                <UtilitiesWrapper>

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
                </UtilitiesWrapper>
                <SliderOptionsWrapper>
                    <SliderItem>
                        <SliderTitle> Home Area (Sqft) {squareRange[0]} - {squareRange[1]} </SliderTitle>
                        <CNSlider value={squareRange} handleChange={squareChangeHandler} />
                    </SliderItem>
                    <SliderItem>
                        <SliderTitle> From {priceRange[0]} to {priceRange[1]} </SliderTitle>
                        <CNSlider value={priceRange} handleChange={priceChangeHandler} />
                    </SliderItem>

                </SliderOptionsWrapper>
            </SearchAdvanced>
        </Container>

    )
}
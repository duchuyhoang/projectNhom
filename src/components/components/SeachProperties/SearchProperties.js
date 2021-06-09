import React, { useState, useEffect } from 'react';
import { useLocationSearch } from '@Core/hooks/useLocationSearch'
import { useListUltilities } from '@Core/hooks/useListUltilities'
import styled from "styled-components"
import { SVGIcon } from "@Components/shared/SvgIcon/Icon";
import { CNButton } from '@Components/shared/CNButton/CNButton'
import { CNTextField } from '@Components/shared/CNTextField/CNTextField'
import { CNSelect } from '@Components/shared/CNSelect/CNSelect'
import { CNCheckBox } from '@Components/shared/CNCheckBox/CNCheckBox'
import { CNSlider } from '@Components/shared/CNSlider/CNSlider'
// Validate
import { yupResolver } from '@hookform/resolvers/yup';
import {
    FormControl,
    FormHelperText,
    makeStyles,
    TextareaAutosize,
} from '@material-ui/core';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
const useSearchPropertiesStyles = makeStyles((theme) => ({
    mainForm: {
        "& > div": {
            width: '100%'
        }
    },
    input: {
        width: "100% !important",
        marginBottom: 30,
        fontSize: 18,
        transition: "all .3s",
        "&:hover": {
            "& > svg": {
                fill: theme.palette.primary.main
            }
        }

    },
    fadeIn: {

        transition: ".5s all ease-in-out",
        maxHeight: " 500px !important",
        opacity: 1,
        visibility: "visible"
    },
    active: {
        color: theme.palette.primary.main,
        "& > svg": {
            fill: theme.palette.primary.main
        }
    },
    checkBox: {
        width: "50%",
        boxSizing: "border-box",
        margin: 0,
        "& span": {
            fontSize: 18
        },
        justifyContent: "flex-start",
    },
    // validates
    helperText: {
        color: theme.palette.primary.main,
        position: "absolute",
        bottom: 10,
        fontSize: 14
    },
    controller: {
        position: "relative",
    }

}))
const Container = styled.div`
    font-family: ${props => props.theme.typography.fontFamily};
    padding:30px;
    background-color: ${props => props.theme.palette.background.secondary};
    border-radius: 6px;
    border: 1px solid ${props => props.theme.palette.border}
`
const Title = styled.div`
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 30px;
`
const SearchFormMain = styled.div`

`
const SliderItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom:30px;
`
const SliderTitle = styled.h3`

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
    max-height: 0px;
    opacity: 0;
    visibility: hidden;
    transition: max-height .5s all ease-in-out;
`
const UtilitiesWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 30px;
   
`
export const SearchProperties = () => {
    const searchPropertiesStyles = useSearchPropertiesStyles();
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
    // validate 
    const defaultValues = {
        keyword: '',
        province: null,
        district: null,
        ward: null,
    }
    const schema = yup.object().shape({
        keyword: yup.string().required('Vui lòng nhập tên từ khóa'),
        province: yup
            .string()
            .required('Vui lòng chọn tỉnh/thành phố')
            .nullable('Vui lòng chọn tỉnh/thành phố'),
    })
    const { control, handleSubmit, formState } = useForm({
        mode: 'onSubmit',
        defaultValues,
        resolver: yupResolver(schema),
    })
    const handleSearchProperties = (values) => {
        console.log(values)
    }
    return (
        <Container>
            <Title>Advanced Search</Title>
            <form onSubmit={handleSubmit(handleSearchProperties)}>
                <SearchFormMain className={searchPropertiesStyles.mainForm}>
                    <Controller fullWidth className={searchPropertiesStyles.controller}
                        name="keyword"
                        control={control}
                        render={
                            ({ field: { value, onChange } }) => (
                                <FormControl>
                                    <CNTextField className={searchPropertiesStyles.input}
                                        placeholder="Keyword"
                                        fullWidth
                                        endAdornment={<SVGIcon name="search" width="20px" height="20px" />}
                                        errors={!!formState.errors['keyword']}
                                        value={value ? value : ''}
                                        inputChange={(e) => {
                                            onChange(e);
                                        }}
                                    />
                                    <FormHelperText className={searchPropertiesStyles.helperText}>
                                        {formState.errors['keyword']?.message}
                                    </FormHelperText>
                                </FormControl>
                            )
                        }
                    />

                    <Controller
                        name="province"
                        control={control}
                        render={
                            ({ field: { onChange, value } }) => (
                                <FormControl>
                                    <CNSelect className={searchPropertiesStyles.input}
                                        value={selectedProvince}
                                        onChange={(e) => {
                                            setSelectedProvince(e);
                                            onChange(e ? e.value : null)
                                        }} options={listProvince} placeholder="Select Province" />
                                    <FormHelperText className={searchPropertiesStyles.helperText}>
                                        {formState.errors['province']?.message}
                                    </FormHelperText>
                                </FormControl>
                            )
                        }
                    />
                    <Controller
                        name="district"
                        control={control}
                        render={
                            ({ field: { onChange, value } }) => (
                                <FormControl>
                                    <CNSelect className={searchPropertiesStyles.input}
                                        value={selectedDistrict}
                                        onChange={(e) => {
                                            setSelectedDistrict(e);
                                            onChange(e ? e.value : null)
                                        }} options={listDistrict} placeholder="Select District" />
                                </FormControl>
                            )
                        }
                    />
                    <Controller
                        name="ward"
                        control={control}
                        render={
                            ({ field: { onChange, value } }) => (
                                <FormControl>
                                    <CNSelect className={searchPropertiesStyles.input}
                                        value={selectedWard} onChange={(e) => {
                                            setSelectedWard(e);
                                            onChange(e ? e.value : null)
                                        }} options={listWard} placeholder="Select Ward" />
                                </FormControl>
                            )
                        }
                    />
                    <SliderItem>
                        <SliderTitle> From ${priceRange[0]} to ${priceRange[1]} </SliderTitle>
                        <CNSlider value={priceRange} handleChange={priceChangeHandler} />
                    </SliderItem>
                    <AdvancedOptions className={isAdvancedOptionsOpen ? searchPropertiesStyles.active : ""} onClick={showAdvancedOptionsHandler}
                    >
                        Advanced
                <SVGIcon name="more" />
                    </AdvancedOptions>
                </SearchFormMain>
                <SearchAdvanced className={isAdvancedOptionsOpen ? searchPropertiesStyles.fadeIn : ""}>
                    <UtilitiesWrapper>

                        {uitilitiesList && uitilitiesList.map((utility) => {
                            return (
                                <CNCheckBox
                                    className={searchPropertiesStyles.checkBox}
                                    key={utility.id}
                                    label={utility.label}
                                    data={utility}
                                    checkBoxState={uitilitiesList}
                                    setCheckBoxState={setUitilitiesList}
                                />
                            )
                        })}
                    </UtilitiesWrapper>

                    <SliderItem>
                        <SliderTitle> Home Area (Sqft) {squareRange[0]} - {squareRange[1]} </SliderTitle>
                        <CNSlider value={squareRange} handleChange={squareChangeHandler} />
                    </SliderItem>



                </SearchAdvanced>
                <CNButton type="submit" fullWidth buttonType="main" >Find Property</CNButton>
            </form>

        </Container>
    )
}
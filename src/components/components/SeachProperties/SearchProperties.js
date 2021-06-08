import React, { useState, useEffect } from 'react';
import { useLocationSearch } from '@Core/hooks/useLocationSearch'
import { useListUltilities } from '@Core/hooks/useListUltilities'
import styled from "styled-components"
import { makeStyles } from "@material-ui/core"
import clsx from 'clsx'
import { SVGIcon } from "@Components/shared/SvgIcon/Icon";
import { CNButton } from '@Components/shared/CNButton/CNButton'
import { CNTextField } from '@Components/shared/CNTextField/CNTextField'
import { CNSelect } from '@Components/shared/CNSelect/CNSelect'
import { CNCheckBox } from '@Components/shared/CNCheckBox/CNCheckBox'
import { CNSlider } from '@Components/shared/CNSlider/CNSlider'

const useSearchPropertiesStyles = makeStyles((theme) => ({
    input: {
        width: "100% !important",
        marginBottom: 30,
        fontSize: 18,
        transition: "all .3s",
        "&:hover":{
            "& > svg":{
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

    const changeProvinceHandler = (e) => {
        console.log(e)
        if (e === null) {
            setSelectedProvince(null)
            setSelectedDistrict(null)
            setSelectedWard(null)
        } else
            setSelectedProvince(e)

    }
    const changeDistrictHandler = (e) => {
        if (e === null) {
            setSelectedDistrict(null)
            setSelectedWard(null)
        } else
            setSelectedDistrict(e)
    }
    const changeWardHandler = (e) => {
        setSelectedWard(e);
    }
    const squareChangeHandler = (event, newValue) => {
        setSquareRange(newValue);
    }
    const priceChangeHandler = (event, newValue) => {
        setPriceRange(newValue);
    }
    const showAdvancedOptionsHandler = () => {
        setIsAdvancedOptionsOpen(preStatus => !preStatus)
    }
    return (
        <Container>
            <Title>Advanced Search</Title>
            <SearchFormMain>
                <CNTextField className={searchPropertiesStyles.input}
                    placeholder="Keyword" fullWidth
                    endAdornment={<SVGIcon name="search" width="20px" height="20px" />}
                />
                <CNSelect className={searchPropertiesStyles.input} value={selectedProvince} onChange={changeProvinceHandler} options={listProvince} placeholder="Select Province" />
                <CNSelect className={searchPropertiesStyles.input} value={selectedDistrict} onChange={changeDistrictHandler} options={listDistrict} placeholder="Select District" />
                <CNSelect className={searchPropertiesStyles.input} value={selectedWard} onChange={changeWardHandler} options={listWard} placeholder="Select Ward" />
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
            <CNButton fullWidth buttonType="main" >Find Property</CNButton>
        </Container>
    )
}
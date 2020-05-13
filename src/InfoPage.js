import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import Header from './components/Header';
import Button from './components/Button';
import BankTypeList from './components/BankTypeList';
import IconButton from './components/IconButton';
import Container from './components/Container';
import ListContainer from './components/ListContainer';
import BankItemDetails from './components/BankItemDetails';
import InputClear from './components/InputClear';

const StyledParagraph = styled.p`
    padding: 10px;
    margin: 0px;

    & > a {
        color: lightblue;
    }
`;

const InfoPage = ({onClickBack, onClickBank, onClickTierList}) => {
    return (
        <ListContainer>
            <Header showBank={onClickBank} showTierList={onClickTierList}/>
            <Container>
                <Button onClick={onClickBack}>Back</Button>
                
                <h3>Info</h3>
                <StyledParagraph>Just a basic web app that will work offline, designed to make it quick and easy to check how good a weapon is, as well as keeping track of all items stored in the bank.</StyledParagraph> 
                <StyledParagraph>I tried to make it as quick and easy to add items to the bank as I could, so it should be faster than using a spreadsheet (which is what I used to do).</StyledParagraph>

                <h3>Credits</h3>
                <StyledParagraph>Tier List created by: <a href='https://docs.google.com/spreadsheets/d/1-Uv7rBP_MD_khcTunos9Xv4N4ezYmrTGftlkzaTguF8/edit#gid=1163577598'>DanSkinnyYo</a></StyledParagraph>
                <StyledParagraph>Item Details are from: <a href='https://docs.google.com/spreadsheets/d/1fkCwu0zeX1BBGcNEzWGZDr2kQ0IOPSoZQK2FD-zpw1M/htmlview?pru=AAABcg5ugY4*nnRUpY7QV_ZNcPP6SlK1bA#gid=0'>Google Sheet</a></StyledParagraph>
                <StyledParagraph>Class Mod Icons: <a href='https://borderlands.fandom.com/wiki/Class_Mod_(Borderlands_3)'>Borderlands Wiki</a></StyledParagraph>
                <StyledParagraph>Grenade Effects: <a href='https://forums.gearboxsoftware.com/t/grenade-features-in-bl3/4064626'>Gearbox Forum Post</a></StyledParagraph>
                <StyledParagraph>Shield Effects: <a href='https://docs.google.com/spreadsheets/d/e/2PACX-1vRJ8R2-nBod9Y3nUmDW1uH_j7v0hq9dpQcSozGk1BuBuEvyqa8zKJxdFtKReL3WisUT2_ojPluqhBLi/pubhtml#'>Google Sheet</a></StyledParagraph>
                <StyledParagraph>Annointments: <a href='https://borderlands.fandom.com/wiki/Anointed_(item_bonus)'>Borderlands Wiki</a></StyledParagraph>
                <StyledParagraph>Artifact Details: <a href='https://www.reddit.com/r/borderlands3/comments/ddu4s0/artifact_guide_for_borderlands_3/'>DetectivePieholes (Reddit)</a></StyledParagraph>
                <StyledParagraph>Mod Details: <a href='https://www.reddit.com/r/borderlands3/comments/dh0a2a/class_mod_guide_for_borderlands_3/'>DetectivePieholes (Reddit)</a></StyledParagraph>
            </Container>
        </ListContainer>
    );
};

export default InfoPage;
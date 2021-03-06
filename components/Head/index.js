import React, {Component, useEffect, useState} from 'react';
import {
  Container,
  Header,
  Title,
  Content,
  Footer,
  FooterTab,
  Button,
  Left,
  Right,
  Body,
  Icon,
  Text,
} from 'native-base';

export default Head = props => {
  const canGoBack = props.navigation.canGoBack();

  return (
    <Header>
      {canGoBack && (
        <Left>
          <Button transparent onPress={() => props.navigation.goBack()}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
      )}

      <Body>
        <Title>{props.title}</Title>
      </Body>

      {props.tools && (
        <Right>
          <Button transparent onPress={() => props.navigation.push("configuracao")}>
            <Icon
              name="menu"
            />
          </Button>
        </Right>
      )}
    </Header>
  );
};

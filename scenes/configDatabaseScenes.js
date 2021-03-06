import React, {Component, useState} from 'react';

import {StyleSheet, Root, Toast, Alert} from 'react-native';

import {
  Content,
  Text,
  Form,
  Textarea,
  Button,
  Card,
  CardItem,
  Body,
  Spinner,
} from 'native-base';

import {
  validateAndGetJsonUrl,
  setDBInformation,
} from '../services/trackingCodeServices';

function configDatabaseScenes(props) {
  const [url, setUrl] = useState(
    'https://www.dropbox.com/s/0bhucckrv1i3ngb/defaultInformation.json?dl=0',
  );
  const [isLoading, setIsLoading] = useState(false);

  const salvar = async () => {
    setIsLoading(true);
    let isDropBoxLink = url.includes('dropbox');

    if (isDropBoxLink) {
      let urlReplace = url.replace('?dl=0', '?raw=1');

      let result = await validateAndGetJsonUrl(urlReplace);
      switch (result) {
        case 'Invalid':
          setIsLoading(false);
          Alert.alert(
            'Importação de banco de dados',
            'Os dados importados são inválidos, o processo foi abortado',
          );
          break;
        case 'Error':
          setIsLoading(false);
          Alert.alert(
            'Importação de banco de dados',
            'Erro ao importar, verifique a sua URL',
          );
          break;
        default:
          console.log('gravando');
          await setDBInformation(result);
          props.navigation.goBack()
          setIsLoading(false);
          break;
      }
    }
  };

  return (
    <Content padder>
      {isLoading && <Spinner />}

      {!isLoading && (
        <>
          <Text>Url pública da fonte do banco de dados</Text>
          <Form>
            <Textarea
              rowSpan={5}
              bordered
              placeholder="Banco de dados padrão"
              onChangeText={e => setUrl(e)}
              value={url}
            />
            <Button primary block onPress={async () => salvar()}>
              <Text> Salvar</Text>
            </Button>
          </Form>

          <Card>
            <CardItem>
              <Body>
                <Text>
                  Coloque acima o endereço publico do arquivos Json compativel
                  com o aplicativo. Ao clicar será feito testes e será gravado
                  no banco de dados local.{'\n'}
                  Uma vez gravado, os dados somente são atualizados todas as
                  vezes que entrar no aplicativo. Se estiver offline, será usado
                  o único dado lido.
                </Text>
              </Body>
            </CardItem>
          </Card>
        </>
      )}
    </Content>
  );
}

const styles = StyleSheet.create({
  buttonTouchable: {
    padding: 16,
  },
});

export default configDatabaseScenes;

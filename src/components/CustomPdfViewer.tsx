import React from 'react';
import Pdf from 'react-native-pdf';
import styled from 'styled-components/native';
import { hp, ms, wp } from '../utils/size';

const CustomPdfViewer = ({uri}:{uri:string}) => {
  const source = {
    uri: uri,
    cache: true,
  };

  return (
    <Container>
      <StyledPdf
        source={source}
        onLoadComplete={(numberOfPages, filePath) => {
          console.log(`Number of pages: ${numberOfPages}`);
        }}
        onPageChanged={(page, numberOfPages) => {
          console.log(`Current page: ${page}`);
        }}
        onError={(error) => {
          console.log('PDF Error:', error);
        }}
        onPressLink={(uri) => {
          console.log(`Link pressed: ${uri}`);
        }}
      />
    </Container>
  );
};

export default CustomPdfViewer;

const Container = styled.View`
  flex: 1;
  justify-content: flex-start;
  align-items: center;
  margin-top: ${ms(25)}px;
  margin-bottom: ${ms(25)}px;
`;

const StyledPdf = styled(Pdf)`
  flex: 1;
  width: ${wp('100%') - 40}px;
  height: ${hp('100%')}px;
`;

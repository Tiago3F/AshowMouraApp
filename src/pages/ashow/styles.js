import styled from 'styled-components';

const Container = styled.View`
  flex: 1;
  alignItems: center;
  justifyContent: center;
  backgroundColor: #F5F5F5;
`;

export const ModalContainer = styled.View`
  flex: 1;
  backgroundColor: #FFF;
`;

const ModalButtons = styled.View`
  paddingHorizontal: 10px;
  paddingVertical: 5px;
  flexDirection: row;
  justifyContent: space-between;
`;

const TakePictureButtonContainer = styled.TouchableHighlight`
  position: absolute;
  alignSelf: center;
  bottom: 20;
  width: 60px;
  height: 60px;
  backgroundColor: #FFF;
  borderRadius: 30px;
  alignItems: center;
  justifyContent: center;
`;

const TakePictureButtonLabel = styled.View`
  width: 52px;
  height: 52px;
  borderRadius: 26px;
  backgroundColor: #fc6663;
`;

const Logo = styled.Image`
  height: 30%;
  marginBottom: 40px;
`;

const Input = styled.TextInput`
  paddingHorizontal: 10px;
  paddingVertical: 15px;
  borderRadius: 5px;
  backgroundColor: #FAFAFA;
  color: #000;
  alignSelf: stretch;
  marginBottom: 15px;
  marginHorizontal: 20px;
  fontSize: 16px;
  borderRadius: 5;
  borderRightWidth: 1;
  borderTopWidth: 1;
  borderBottomWidth: 1;
  borderLeftWidth: 1;
  borderColor: #000;
`;

const ErrorMessage = styled.Text`
  textAlign: center;
  color: #ce2029;
  fontSize: 16px;
  marginBottom: 15px;
  marginHorizontal: 20px;
`;

const Button = styled.TouchableHighlight`
  padding: 20px;
  borderRadius: 20px;
  backgroundColor: #008000;
  alignSelf: stretch;
  margin: 15px;
  marginHorizontal: 20px;
`;

const ButtonText = styled.Text`
  color: #FFF;
  fontWeight: bold;
  fontSize: 18px;
  textAlign: center;
`;

const TouchUpLink = styled.TouchableHighlight`
  padding: 10px;
  marginTop: 20px;
`;

const TouchUpLinkText = styled.Text`
  color: #999;
  fontWeight: bold;
  fontSize: 16px;
  textAlign: center;
`;

const Label = styled.Text`
  color: #999;
  fontWeight: bold;
  fontSize: 16px;
  textAlign: right;
  paddingVertical: 10px;
  marginHorizontal: 20px;
  alignSelf: flex-start;
`;

const SuccessMessage = styled.Text`
  textAlign: center;
  color: #08a092;
  fontSize: 16px;
  marginBottom: 15px;
  marginHorizontal: 20px;
`;

const CameraButtonContainer = styled.TouchableHighlight`
  paddingVertical: 20px;
  paddingHorizontal: 40px;
`;

const CancelButtonText = styled.Text`
  color: #333;
  fontSize: 18px;
  fontWeight: bold;
`;

const ContinueButtonText = styled.Text`
  color: #fc6663;
  fontSize: 18px;
  fontWeight: bold;
`;

export const ModalImagesListContainer = styled.View``;

export const ModalImageItem = styled.Image`
  height: 100px;
  width: 100px;
  marginRight: 10px;
`;

export { Container, Logo, Input, ErrorMessage, Button,
              ButtonText, TouchUpLink, TouchUpLinkText, Label,
    SuccessMessage, TakePictureButtonContainer, TakePictureButtonLabel,
    ModalButtons, CameraButtonContainer, CancelButtonText, ContinueButtonText};

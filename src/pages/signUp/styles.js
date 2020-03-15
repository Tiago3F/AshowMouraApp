import styled from 'styled-components';

const Container = styled.View`
  flex: 1;
  alignItems: center;
  justifyContent: center;
  backgroundColor: #f5f5f5;
`;

const Logo = styled.Image`
  height: 10%;
  marginBottom: 40px;
  marginTop: 50px;
`;

const SuccessMessage = styled.Text`
  textAlign: center;
  color: #08a092;
  fontSize: 16px;
  marginBottom: 15px;
  marginHorizontal: 20px;
`;

const Input = styled.TextInput`
  paddingHorizontal: 10px;
  paddingVertical: 10px;
  borderRadius: 5px;
  backgroundColor: #fff;
  color: #000;
  alignSelf: stretch;
  marginBottom: 10px;
  marginHorizontal: 20px;
  fontSize: 16px;
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
  color: #fff;
  fontWeight: bold;
  fontSize: 18px;
  textAlign: center;
`;

const SignInLink = styled.TouchableHighlight`
  padding: 10px;
  marginTop: 20px;
`;

const SignInLinkText = styled.Text`
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
  paddingVertical: 2px;
  marginHorizontal: 20px;
  alignSelf: flex-start;
`;

export {
    Container,
    Logo,
    SuccessMessage,
    Input,
    ErrorMessage,
    Button,
    ButtonText,
    SignInLink,
    SignInLinkText,
    Label
};

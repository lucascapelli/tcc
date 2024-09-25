import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxLogin: {
    width: '90%',
    height: 520,
    borderRadius: 10,
    backgroundColor: '#f5ebeb',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000', // Substituí o boxShadow por propriedades compatíveis no React Native
    shadowOffset: { width: 0, height: 2 }, // Ajuste para sombra
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 12,
    
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 8,
    marginBottom: 12,
    borderRadius: 10,
  },
  buttonContainer: {
    width: '100%',
    marginTop: 16,
    borderRadius: 10,
    alignItems: 'center',

  loginButton: {
    backgroundColor: 'rgb(66, 65, 65)', // Cor do botão de login
    paddingVertical: 10, // Adicionando padding vertical
    borderRadius: 5, // Bordas arredondadas
    },
    
  loginButtonText: {
   color: '#ffffff', // Cor do texto do botão de login
   textAlign: 'center', // Centralizando o texto
    },
    
  },
  linkButton: {
    marginTop: 8,
    
  },
  linkButtonText: {
    color: 'rgb(66, 65, 65)', // Cor ajustada para os textos dos links
    textDecorationLine: 'underline', // Texto sublinhado
  },
});

export default styles;
//const fs = require('fs');
//const soap = require('soap');
import dotenv from 'dotenv';
import { writeFile, readFileSync } from 'fs';
import { createClient, WSSecurityCert } from 'soap';

//dotenv.config();

const crearCliente = (url, options) => {
  return new Promise((resolve, reject) => {
    createClient(url, options, (err, client) => {
      if (err) reject(err)
      resolve(client)
    })
  })
}

const guardarResultado = (resultado) =>{
  
  writeFile("resultado.xml", resultado, (err) => {
    if (err) {
      //console.error('Error al escribir el archivo XML:', err);
    } else {
      //console.log('Archivo XML escrito exitosamente.');
    }
  });
}


const getInfoByRUT = async (ruc) => {

    const url = 'https://serviciosdp.dgi.gub.uy:6491/RUTWSPGetEntidad/servlet/arutpersonagetentidad?wsdl'
    //const url = 'arutpersonagetentidad.xml'

    const xsd = 'https://serviciosdp.dgi.gub.uy:6491/RUTWSPGetEntidad/servlet/arutpersonagetentidad.xsd1.xsd' 
    //const xsd = 'arutpersonagetentidad.xsd1.xsd'

    const cliente = await crearCliente(url, {})

    var privateKey = readFileSync("clave.key");
    var publicKey = readFileSync("certificado.pem");
    var password = 'hola123'; 

    var securityOptions = {
      hasTimeStamp: false,
      signatureAlgorithm: 'http://www.w3.org/2001/04/xmldsig-more#rsa-sha256',
      digestAlgorithm: 'http://www.w3.org/2001/04/xmlenc#sha256',
      canonicalizationAlgorithm: 'http://www.w3.org/2001/10/xml-exc-c14n#',
      signerOptions: {
        prefix: 'ds',
        attrs: { Id: 'SIG-C7F2874F2B188481A9169565362166845' },
        existingPrefixes: {
            wsse: 'http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd',
        }
    }}



    var wsSecurity = new WSSecurityCert(privateKey, publicKey, password, securityOptions);
    cliente.setSecurity(wsSecurity);

    cliente.ExecuteAsync({Ruc:ruc}, (err, result) => {
      if (err) {
        console.error('Error al llamar a la operación del servicio SOAP', err);
        guardarResultado(err.body)
        return 

      }
      console.log('Respuesta del servicio SOAP:', result);
      guardarResultado(result)
    });
} 

getInfoByRUT(216639270017)

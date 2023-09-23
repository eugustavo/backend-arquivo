const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const fs = require('fs');
const axios = require('axios');
const { format } = require('date-fns');
const glob = require('glob');
const path = require('path');
const AdmZip = require('adm-zip');
const xlsx = require('xlsx');
const { TextractClient, DetectDocumentTextCommand } = require("@aws-sdk/client-textract");

const client = new TextractClient({
    region: 'us-east-2',
    credentials: {
        accessKeyId: env.AWS_ACCESS_KEY_ID,
        secretAccessKey: env.AWS_SECRET_ACCESS_KEY
    }
});

// Configurar o caminho para o WebDriver do Chrome (ajuste o caminho conforme necessário)
const chromeOptions = new chrome.Options();
chromeOptions.addArguments('--headless'); // Executar em modo headless (sem interface gráfica)
chromeOptions.addArguments('--disable-gpu'); // Desabilitar GPU para o modo headless

async function waitForElementToBeVisibleById(driver, elementId, timeout) {
    try {
        const element = await driver.wait(until.elementLocated(By.id(elementId)), timeout);
        await driver.wait(until.elementIsVisible(element), timeout);
        return element;
    } catch (error) {
        console.error(`Captcha não resolvido.`, error.message);
        return null;  // Retornar null em caso de timeout
    }
}

const pastaProjeto = './';  // Caminho da pasta do projeto
const pastaProcessar = './processar/';  // Caminho da pasta 'processar'
const padraoArquivoZIP = 'sat-*.zip';  // Padrão dos arquivos ZIP

async function copiarArquivosZIP() {

    // Encontra os arquivos ZIP com o padrão especificado
    const arquivosZIP = glob.sync(path.join(pastaProjeto, padraoArquivoZIP));

    // Cria a pasta 'processar' se não existir
    if (!fs.existsSync(pastaProcessar)) {
        fs.mkdirSync(pastaProcessar);
    }

    // Copia os arquivos para a pasta 'processar'
    for (const arquivo of arquivosZIP) {
        const nomeArquivo = path.basename(arquivo);
        const destino = path.join(pastaProcessar, nomeArquivo);

        // Copia o arquivo
        await fs.promises.copyFile(arquivo, destino);
        console.log(`Arquivo copiado: ${nomeArquivo}`);

        await fs.promises.unlink(arquivo);
        console.log(`Arquivo removido do diretório raiz: ${nomeArquivo}`);
    }
}

async function extrairArquivosZIP() {
    // Lista todos os arquivos ZIP na pasta 'processar'
    const arquivosZIP = fs.readdirSync(pastaProcessar)
        .filter(file => file.toLowerCase().endsWith('.zip'));

    for (const arquivo of arquivosZIP) {
        const caminhoArquivoZIP = path.join(pastaProcessar, arquivo);
        const zip = new AdmZip(caminhoArquivoZIP);

        // Extrai o conteúdo do arquivo ZIP para a pasta 'processar'
        await new Promise((resolve, reject) => {
            zip.extractAllToAsync(pastaProcessar, true, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });

        console.log(`Arquivo ZIP extraído: ${arquivo}`);

        // Remove o arquivo ZIP após a extração
        await fs.promises.unlink(caminhoArquivoZIP);
        console.log(`Arquivo ZIP removido: ${arquivo}`);
    }
}

function excelToJson(filePath) {
    const workbook = xlsx.readFile(filePath);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const range = xlsx.utils.decode_range(sheet['!ref']);
    const rowCount = range.e.r + 1;
    const colCount = range.e.c + 1;

    const fieldNames = [];
    const jsonArray = [];

    
    for (let j = 0; j < colCount; j++) {
        const cellAddress = { c: j, r: 0 };
        const cellRef = xlsx.utils.encode_cell(cellAddress);
        fieldNames.push(sheet[cellRef].v);
    }

    
    for (let i = 1; i < rowCount; i++) { 
        const jsonObject = {};
        for (let j = 0; j < colCount; j++) {
            const cellAddress = { c: j, r: i };
            const cellRef = xlsx.utils.encode_cell(cellAddress);

            if (fieldNames[j].toLowerCase() === 'chaveacessoformatado') {
                const cellValue = sheet[cellRef] ? sheet[cellRef].v : null;
                jsonObject[fieldNames[j].toLowerCase()] = cellValue ? cellValue.replace(/^="(.*)"$/, '$1') : null;
            } else {
                jsonObject[fieldNames[j].toLowerCase()] = sheet[cellRef] ? sheet[cellRef].v : null;
            }

        }
        jsonArray.push(jsonObject);
    }

    // Return the JSON string
    return jsonArray
}

async function lerCamposPlanilhasExcel() {
    const arquivos = fs.readdirSync(pastaProcessar);

    for (const arquivo of arquivos) {
        console.log(`Lendo arquivo: ${arquivo}`);
        const caminhoArquivo = path.join(pastaProcessar, arquivo);

        const dados = excelToJson(caminhoArquivo);
        console.log(`Enviando ${dados.length} registros...`);

        try {
            const envio = await axios.post('https://api.aws.inf.br/connect/sat/incluir', dados);

            console.log(envio.data);

            if (envio.status === 201) {
                
                fs.unlinkSync(caminhoArquivo);
                console.log(`Arquivo excluído: ${caminhoArquivo}`);
            }
        } catch (error) {
            console.error(`Erro ao enviar arquivo ${arquivo}: ${error.message}`);
        }
    }
}
async function analyzeImage(filePath) {
    const fileContent = fs.readFileSync(filePath);

    try {
        const command = new DetectDocumentTextCommand({
            Document: {
                Bytes: fileContent
            }
        });

        const result = await client.send(command);

        if (result.Blocks && result.Blocks.length > 0) {
            const textLines = result.Blocks
                .filter(block => block.BlockType === 'LINE')
                .map(block => block.Text);

            const extractedText = textLines[0];
            console.log('Extracted text:');
            console.log(extractedText);
            return extractedText;
        } else {
            console.log('No text detected.');
            return '';
        }
    } catch (error) {
        console.error('Error extracting text using AWS Textract:', error);
        throw error;
    }
}


const logFilePath = 'log.txt';

async function addToLog(cnpj, date, status, codigoEmpresa, codigoEstabelecimento) {
    const formattedDate = format(new Date(date), 'dd/MM/yyyy HH:mm:ss');
    const logEntry = `${formattedDate} - CNPJ: ${cnpj}, Status: ${status}, Código Empresa: ${codigoEmpresa}, Código Estabelecimento: ${codigoEstabelecimento}\n`;
    fs.appendFileSync(logFilePath, logEntry, 'utf8');
    console.log('Log entry added to log.txt');
}

async function relatorio_sat() {

    const listaEmpresas = await axios.get('https://api.aws.inf.br/connect/sat/empresas/listar?processo=sat_dfe_consulta_nfe_emitidas');

    let situacao = ''
    let repetir = false;

    for (let i = 0; i < listaEmpresas.data.length;) {
        // for (let i = 0; i < 5; i++) {

        repetir = false

        const driver = new Builder()
            .forBrowser('chrome')
            .setChromeOptions(chromeOptions)
            .build();

        try {

            fs.existsSync('screenshot.png') && fs.unlinkSync('screenshot.png');
            fs.existsSync('imagem_captcha.png') && fs.unlinkSync('imagem_captcha.png');
            fs.existsSync('imagem_captcha_2.png') && fs.unlinkSync('imagem_captcha_2.png');

            await driver.get('https://sat.sef.sc.gov.br/tax.NET/tax.Net.NFE/Nfe_ConsultaOnlineCC.aspx');
            await driver.findElement(By.id('Body_pnlMain_tbxUsername')).sendKeys(listaEmpresas.data[i].sate_usuariosat);
            await driver.findElement(By.id('Body_pnlMain_tbxUserPassword')).sendKeys(listaEmpresas.data[i].sate_senhasat);
            await driver.findElement(By.id('Body_pnlMain_btnLogin')).click();

            await driver.wait(until.stalenessOf(driver.findElement(By.id('Body_pnlMain_btnLogin'))));

            await driver.findElement(By.id('ctl00_ctl00_Main_Main_txtPerInicial')).clear();
            await driver.findElement(By.id('ctl00_ctl00_Main_Main_txtPerInicial')).sendKeys('01/09/2023');

            await driver.findElement(By.id('ctl00_ctl00_Main_Main_txtPerFinal')).clear();
            await driver.findElement(By.id('ctl00_ctl00_Main_Main_txtPerFinal')).sendKeys('19/09/2023');

            await driver.findElement(By.id('ctl00_ctl00_Main_Main_ddlOperacao')).sendKeys('NF-es Emitidas pelo Contribuinte');

            await driver.findElement(By.id('ctl00_ctl00_Main_Main_txtCpfCnpjEmitente')).sendKeys(listaEmpresas.data[i].sate_cnpj);

            await driver.executeScript('HideMensagensSistema();');

            const script = `
            const imagemElemento = document.getElementById('ctl00_ctl00_Main_Main_ctl13').querySelector('img');
            const imageUrl = imagemElemento.src;
            fetch(imageUrl)
            .then(response => response.blob())
            .then(blob => {
                const blobUrl = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = blobUrl;
                link.download = 'imagem_captcha.png';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            })
            .catch(error => console.error('Erro ao fazer o download da imagem:', error));
            `;
            await driver.executeScript(script);

            await driver.wait(async () => {
                return fs.existsSync('imagem_captcha.png');
            }, 10000);


            const captchaResult = await analyzeImage('imagem_captcha.png');

            if (captchaResult === undefined) {
                console.error('Captcha result is undefined. Skipping this iteration.');
                situacao = 'Os caracteres digitados não coincidem com o texto de verificação'
                continue; 
            }

            await driver.findElement(By.name('ctl00$ctl00$Main$Main$ctl19')).sendKeys(captchaResult);

            await driver.findElement(By.id('ctl00_ctl00_Main_Main_btnPesquisar')).click();

            const lblTotalElement = await waitForElementToBeVisibleById(driver, 'ctl00_ctl00_Main_Main_lblTotal', 10000);

            const screenshot = await driver.takeScreenshot();
            fs.writeFileSync('screenshot.png', screenshot, 'base64');
            console.log('Screenshot salvo como "screenshot.png"');

            if (lblTotalElement !== null) {

                const totalText = await lblTotalElement.getText();
                console.log('Registros Localizados:', totalText);

                situacao = `Registros Localizados: ${totalText}`

                if (parseInt(totalText) > 0) {

                    const botaoExportar = await waitForElementToBeVisibleById(driver, 'ctl00_ctl00_Main_Main_btnExportar', 10000);
                    if (botaoExportar !== null) {
                        await driver.executeScript('arguments[0].click();', botaoExportar);
                        await driver.sleep(5000)

                    }

                } else {
                    console.log('O texto do elemento ctl00_ctl00_Main_Main_lblTotal não é maior que zero. Não será capturada a screenshot.');
                }

            } else {

                const errorMessageElement = await waitForElementToBeVisibleById(driver, 'ListaMensagensErro', 10000);

                const errorMessageTextElement = await errorMessageElement.findElement(By.css('dd'));
                situacao = await errorMessageTextElement.getText();

                console.log('Error Message:', situacao);
            }


        } finally {

            if (situacao !== '') {
                const currentDate = new Date().toISOString();
                const { sate_codigoempresa, sate_codigoestab } = listaEmpresas.data[i];
                await addToLog(
                    listaEmpresas.data[i].sate_cnpj,
                    currentDate,
                    situacao,
                    sate_codigoempresa,
                    sate_codigoestab
                );
            }

            await driver.quit();
            console.log('Iniciando Leitura das Planilhas')
            await copiarArquivosZIP()
            await extrairArquivosZIP()
            await lerCamposPlanilhasExcel()

        }

        if (situacao.includes('Os caracteres digitados não coincidem com o texto de verificação')) {
            console.log('Situação contém o texto "Os caracteres digitados não coincidem com o texto de verificação". Repetindo a iteração.');
            repetir = true; 
        }

        if (!repetir) {
            i++;  
        } else {
            console.log('Repetindo a iteração para o mesmo item do loop.');
        }

    }

}

relatorio_sat().catch(console.error);

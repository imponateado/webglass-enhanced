function remCNPJchars (cnpj) {
    return cnpj = cnpj.replace(/[^\d]+/g, '');
}

function isCNPJ(cnpj) {
    cnpj = remCNPJchars(cnpj);

    if (cnpj == '') return false;

    if (cnpj.length != 14)
        return false;

    if (cnpj == "00000000000000" ||
        cnpj == "11111111111111" ||
        cnpj == "22222222222222" ||
        cnpj == "33333333333333" ||
        cnpj == "44444444444444" ||
        cnpj == "55555555555555" ||
        cnpj == "66666666666666" ||
        cnpj == "77777777777777" ||
        cnpj == "88888888888888" ||
        cnpj == "99999999999999")
        return false;

    var tamanho = cnpj.length - 2
    var numeros = cnpj.substring(0, tamanho);
    var digitos = cnpj.substring(tamanho);
    var soma = 0;
    var pos = tamanho - 7;
    for (var i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2)
            pos = 9;
    }
    var resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0))
        return false;

    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (var i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1))
        return false;

    return true;
}

function replaceTdContent() {
const tables = document.querySelectorAll('table[data-v-220acddb]');
    tds = [null, null, null];
    if (tds[0] == null || tds[2] == null){
        const url = `${window.location.hostname}:${window.location.port}/backend/api/v1/clientes/`;
        tables.forEach(table => {
            const rows = table.querySelectorAll('tr');
                rows.forEach(row => {
                const tds = row.querySelectorAll('td');
                    if (tds.length >= 8) {
                        //tds[7].textContent = tds[1].textContent;
                        if(isCNPJ(tds[2].textContent)) {
                            var cnpj = remCNPJchars(tds[2].textContent);
                            var url = `https://brasilapi.com.br/api/cnpj/v1/${cnpj}`;
                            fetch(url).then(response => response.json()).then(data => {
                                tds[7].textContent = data["nome_fantasia"];
                            }).catch(error => {
                                console.error('Algo deu errado: ', error);
                            });
                        } else {
                            tds[7].textContent = "Não é CNPJ ☹️";
                        }
                    }
                });
        });
    }
}
  
replaceTdContent();
const axios = require('axios');

exports.handler = async function(event, context) {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: 'Método não permitido'
        };
    }

    try {
        const { mensagem } = JSON.parse(event.body);

        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: mensagem }]
            },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        const resposta = response.data.choices[0].message.content;

        return {
            statusCode: 200,
            body: JSON.stringify({ resposta })
        };

    } catch (err) {
        console.error(err);
        return {
            statusCode: 500,
            body: 'Erro ao chamar a API'
        };
    }
};

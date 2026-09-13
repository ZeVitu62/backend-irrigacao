🔧 Endpoints

1. Sensores

GET /sensoresRetorna os valores atuais dos sensores.Resposta exemplo:

{
  "umidadeSolo": 45,
  "temperatura": 28,
  "nivelAgua": 70
}

POST /sensoresAtualiza os valores dos sensores.Body exemplo:

{
  "umidadeSolo": 25,
  "temperatura": 30,
  "nivelAgua": 15
}

GET /sensores/historicoLista os últimos registros enviados.Resposta exemplo:

[
  {"umidadeSolo": 25, "temperatura": 30, "nivelAgua": 15, "data":"2026-09-13T14:40:00"},
  {"umidadeSolo": 45, "temperatura": 28, "nivelAgua": 70, "data":"2026-09-13T14:35:00"}
]

2. Irrigação

POST /irrigacaoLiga ou desliga irrigação.Body exemplo:

{"acionar": true}

Resposta exemplo:

{"mensagem":"Irrigação ligada 🚜💧"}

3. Relatório

GET /relatorioGera relatório com base nos sensores e alerta se necessário.Resposta exemplo:

{
  "umidadeSolo": 25,
  "temperatura": 30,
  "nivelAgua": 15,
  "alerta": "Solo seco e nível de água baixo!"
}

4. Agendamento

POST /agendarCria agendamento para irrigação futura.Body exemplo:

{"hora":"18:00","acionar":true}

Resposta exemplo:

{"mensagem":"Agendamento criado para 18:00","acionar":true}

GET /agendarLista agendamentos ativos.Resposta exemplo:

[
  {"hora":"18:00","acionar":true},
  {"hora":"19:00","acionar":false}
]

POST /agendar/testeExecuta irrigação imediatamente.Body exemplo:

{"acionar":false}

Resposta exemplo:

{"mensagem":"Irrigação desligada 🚫💧"}

5. Regras Inteligentes

Executadas automaticamente a cada minuto (não precisam de rota).

Condições atuais:

Se umidadeSolo < 30 → ligar irrigação.

Se umidadeSolo > 60 → desligar irrigação.

Se nivelAgua < 20 → alerta de bebedouro vazio.

🧪 Exemplos de Teste com curl

Atualizar sensores:

curl -X POST http://localhost:3000/sensores \
     -H "Content-Type: application/json" \
     -d '{"umidadeSolo":25,"temperatura":30,"nivelAgua":15}'

Ligar irrigação:

curl -X POST http://localhost:3000/irrigacao \
     -H "Content-Type: application/json" \
     -d '{"acionar":true}'

Criar agendamento:

curl -X POST http://localhost:3000/agendar \
     -H "Content-Type: application/json" \
     -d '{"hora":"18:00","acionar":true}'

✅ Conclusão

Essa API cobre:

Sensores (dados e histórico).

Irrigação manual.

Relatórios com alertas.

Agendamento automático.

Motor de regras inteligentes.
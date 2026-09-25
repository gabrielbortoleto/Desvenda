const bcrypt = require('bcryptjs');
const { queryGet, queryRun } = require('./database');

async function seed() {
  console.log('🌱 Iniciando atualização completa do banco de dados com o conteúdo do Livro 1: IA sem Mistério...');

  try {
    // Limpar tabelas de conteúdo para re-seed limpo com conteúdo do Livro 1
    await queryRun('DELETE FROM quiz_attempts');
    await queryRun('DELETE FROM lesson_progress');
    await queryRun('DELETE FROM questions');
    await queryRun('DELETE FROM lessons');
    await queryRun('DELETE FROM modules');
    await queryRun('DELETE FROM tracks');

    // 1. Criar Usuário Admin Padrão
    const adminEmail = 'admin@desvende.com';
    let admin = await queryGet('SELECT * FROM users WHERE email = ?', [adminEmail]);
    
    if (!admin) {
      const adminHash = await bcrypt.hash('admin123', 10);
      const adminId = 'user-admin-1';
      
      await queryRun(
        `INSERT INTO users (id, name, email, password_hash, role) VALUES (?, ?, ?, ?, ?)`,
        [adminId, 'Administrador Desvende IA', adminEmail, adminHash, 'ADMIN']
      );

      await queryRun(
        `INSERT INTO profiles (id, user_id, experience_level, learning_goal, onboarding_completed, total_points) VALUES (?, ?, ?, ?, ?, ?)`,
        ['prof-admin-1', adminId, 'ADVANCED', 'Administrar Plataforma', 1, 500]
      );
      console.log('✅ Usuário Admin ativo: admin@desvende.com / admin123');
    }

    // 2. Criar Usuário Aluno de Teste
    const studentEmail = 'aluno@desvende.com';
    let student = await queryGet('SELECT * FROM users WHERE email = ?', [studentEmail]);
    
    if (!student) {
      const studentHash = await bcrypt.hash('aluno123', 10);
      const studentId = 'user-student-1';

      await queryRun(
        `INSERT INTO users (id, name, email, password_hash, role) VALUES (?, ?, ?, ?, ?)`,
        [studentId, 'Gabriel Bortoleto', studentEmail, studentHash, 'STUDENT']
      );

      await queryRun(
        `INSERT INTO profiles (id, user_id, experience_level, learning_goal, onboarding_completed, total_points) VALUES (?, ?, ?, ?, ?, ?)`,
        ['prof-student-1', studentId, 'NEVER', 'Entender o essencial', 1, 0]
      );
      console.log('✅ Usuário Aluno ativo: aluno@desvende.com / aluno123');
    }

    // 3. Trilha Inicial: IA sem Mistério
    const trackId = 'track-ia-sem-misterio';
    await queryRun(
      `INSERT INTO tracks (id, title, slug, description, order_index, status) VALUES (?, ?, ?, ?, ?, ?)`,
      [
        trackId,
        'IA sem Mistério',
        'ia-sem-misterio',
        'Entenda o essencial, formule instruções claras e faça sua primeira aplicação prática.',
        1,
        'PUBLISHED'
      ]
    );

    // 4. Módulos e Lições Fiéis ao Livro 1
    const modulesData = [
      {
        id: 'mod-1',
        title: 'Módulo 1: O Essencial da IA Generativa',
        description: '3 lições · ~15 min',
        order_index: 1,
        lessons: [
          {
            id: 'les-1',
            title: 'Entenda o que é inteligência artificial',
            slug: 'entenda-o-que-e-inteligencia-artificial',
            estimated_minutes: 5,
            points: 10,
            hook_question: 'Você já ouviu que a inteligência artificial pode ajudar a escrever, estudar e organizar tarefas, mas ainda não sabe por onde começar? Este guia foi feito para acompanhar seus primeiros passos.',
            explanation: '<p>Inteligência artificial, ou IA, é o nome dado a um conjunto de tecnologias que permite a sistemas computacionais realizar tarefas como reconhecer padrões, classificar informações e produzir conteúdo.</p><p>Nesta trilha, utilizamos uma <strong>IA generativa de texto</strong>. "Generativa" significa que o sistema produz conteúdo novo — recebendo um pedido ou instrução e gerando uma resposta original.</p><p>Ao responder, a ferramenta considera o pedido, o contexto disponível e padrões aprendidos durante seu desenvolvimento. Ela pode criar uma explicação útil, mas também produzir uma informação incorreta com aparência convincente.</p>',
            visual_type: 'TIPS',
            visual_data: JSON.stringify({
              tips: [
                '💡 Um texto bem escrito pode conter erros. Clareza e confiança não comprovam que algo é verdadeiro.',
                '💡 A ferramenta precisa de contexto. Ela não sabe automaticamente o que você pretende ou quais condições precisa respeitar.',
                '💡 Os recursos variam. Acesso à internet, leitura de arquivos e outras funções dependem do serviço utilizado.'
              ]
            }),
            summary: 'A IA generativa produz textos novos a partir do seu pedido. Lembre-se: clareza não é garantia de verdade, a IA exige contexto claro e seus recursos variam conforme a ferramenta.',
            next_step_hint: 'Na próxima lição, vamos preparar sua primeira conversa e fazer um teste de funcionamento na prática.',
            question: {
              type: 'MULTIPLE_CHOICE',
              text: 'O que caracteriza uma IA generativa conversacional por texto?',
              options: [
                'Ela apenas busca e copia arquivos do seu computador',
                'Ela recebe uma instrução e gera uma resposta original considerando contexto e padrões',
                'Ela sempre garante 100% de verdade em todas as respostas'
              ],
              correct: 1,
              feedback_correct: 'Exato! A IA generativa constrói respostas originais com base na instrução recebida e no contexto fornecido.',
              feedback_incorrect: 'Não é essa. A IA generativa gera conteúdo novo a partir das instruções, mas não garante verdade absoluta.'
            }
          },
          {
            id: 'les-2',
            title: 'Prepare sua primeira conversa e teste de funcionamento',
            slug: 'prepare-sua-primeira-conversa',
            estimated_minutes: 5,
            points: 10,
            hook_question: 'Como dar os primeiros passos na prática? Vamos abrir a ferramenta, identificar os elementos na tela e fazer seu primeiro pedido de teste.',
            explanation: '<p>Para conversar com uma IA por texto, você precisa reconhecer três elementos na tela:</p><ol><li><strong>O campo de entrada:</strong> onde você digita sua mensagem.</li><li><strong>O controle de envio:</strong> o botão para enviar o pedido.</li><li><strong>A área de mensagens:</strong> onde aparecem sua pergunta e a resposta gerada.</li></ol><p><strong>Prompt</strong> é o nome técnico para a entrada que você envia à ferramenta; nesta plataforma, usaremos principalmente "pedido" ou "instrução".</p>',
            visual_type: 'STEPS',
            visual_data: JSON.stringify({
              steps: [
                '1. Acesse o serviço oficial escolhido pelo celular ou computador.',
                '2. Localize o campo de mensagem no rodapé da tela.',
                '3. Digite o pedido de teste: "Explique o que é um checklist em duas frases simples e dê um exemplo com três itens."',
                '4. Clique no botão de enviar e aguarde a resposta.',
                '5. Se o texto ficar difícil, envie na mesma conversa: "Explique com palavras mais simples."'
              ]
            }),
            summary: 'Para usar a IA você digita um pedido no campo de entrada e clica em enviar. Se a resposta não ficar perfeita, continue na mesma conversa pedindo ajustes simples.',
            next_step_hint: 'Na próxima lição, você aprenderá a escolher tarefas pequenas que consiga conferir sozinho(a).',
            question: {
              type: 'ORDERING',
              text: 'Coloque as etapas para realizar seu primeiro teste na ordem correta:',
              options: [
                'Acessar o serviço oficial e localizar o campo de entrada',
                'Digitar a instrução e clicar no botão de enviar',
                'Ler a resposta gerada na tela',
                'Enviar uma mensagem de ajuste caso a resposta precise ser simplificada'
              ],
              correct: [0, 1, 2, 3],
              feedback_correct: 'Perfeito! Esse é o fluxo contínuo de envio e ajuste durante a conversa. 🎯',
              feedback_incorrect: 'A ordem correta é: acessar o campo → enviar a instrução → ler a resposta → pedir ajustes.'
            }
          },
          {
            id: 'les-3',
            title: 'Escolha uma tarefa que consiga conferir',
            slug: 'escolha-uma-tarefa-que-consiga-conferir',
            estimated_minutes: 5,
            points: 10,
            hook_question: 'Antes de enviar um pedido à IA, complete a frase: "Ao final, quero ter..." Isso ajuda a definir sua meta e saber se a resposta trouxe uma ajuda real.',
            explanation: '<p>Comece sempre por atividades pequenas com informações que você conhece. Isso facilita perceber se a resposta está correta e se trouxe utilidade.</p><p><strong>O que continua dependendo de você:</strong> A IA ajuda a produzir e organizar texto. Ela não confirma reuniões por você, não compra materiais nem entra em contato com outras pessoas. Executar os passos continua sendo sua responsabilidade.</p>',
            visual_type: 'COMPARISON',
            visual_data: JSON.stringify({
              table: [
                { trad: 'Organizar anotações', ia: 'Comparar a lista gerada com o texto original' },
                { trad: 'Melhorar uma mensagem', ia: 'Verificar se o sentido e os dados foram preservados' },
                { trad: 'Criar um checklist', ia: 'Conferir se as etapas necessárias estão presentes' },
                { trad: 'Simplificar um trecho', ia: 'Comparar a explicação com o conteúdo fornecido' }
              ]
            }),
            summary: 'Defina sempre o objetivo dizendo "Ao final, quero ter...". Use a IA para gerar e estruturar texto, mas lembre-se que a revisão e as ações do dia a dia dependem de você.',
            next_step_hint: 'No próximo módulo, vamos aplicar isso a um exemplo real: transformar anotações soltas em uma tabela organizada.',
            question: {
              type: 'TRUE_FALSE',
              text: 'Avalie as afirmações sobre a divisão de papéis entre você e a IA:',
              options: [
                'A IA pode organizar suas anotações em formato de lista ou tabela.',
                'A IA envia e-mails e confirma reuniões automaticamente sem que você precise agir.',
                'Você deve comparar a resposta da IA com o texto original fornecido.'
              ],
              correct: [true, false, true],
              feedback_correct: 'Excelente! A IA organiza o texto, mas a conferência e o envio são sempre executados por você.',
              feedback_incorrect: 'Lembre-se: a IA produz o texto, mas não realiza ações externas ou envios por você.'
            }
          }
        ]
      },
      {
        id: 'mod-2',
        title: 'Módulo 2: Formulando Pedidos Claros',
        description: '3 lições · ~18 min',
        order_index: 2,
        lessons: [
          {
            id: 'les-4',
            title: 'Transforme anotações em próximos passos (Caso Prático)',
            slug: 'transforme-anotacoes-em-proximos-passos',
            estimated_minutes: 6,
            points: 15,
            hook_question: 'Imagine que você anotou 6 pendências soltas sobre uma reunião. Como pedir à IA para organizar isso em colunas sem inventar o que está faltando?',
            explanation: '<p>Anotações brutas costumam misturar tarefas, prazos e dúvidas. Vamos ver um pedido estruturado para organizar essas anotações:</p><p><strong>Anotações originais:</strong><br>1. Comprar material para a apresentação.<br>2. Confirmar o horário da reunião de quinta com a equipe.<br>3. Separar os arquivos que vou mostrar.<br>4. Perguntar à gráfica quanto custa imprimir dez cópias.<br>5. Terminar a apresentação até quarta.<br>6. Ainda não sei se vou precisar imprimir.</p>',
            visual_type: 'PROMPT_COMPARISON',
            visual_data: JSON.stringify({
              bad: 'Instrução vaga: "Organize isso"',
              good: 'Pedido claro: "Estou preparando uma apresentação. Organize as anotações abaixo em uma tabela com 3 colunas: tarefa, prazo informado e dúvida/pendência. Use apenas as informações fornecidas. Quando não houver prazo, escreva \'não informado\'. Não invente horários ou custos."'
            }),
            summary: 'Explique a situação, defina a tarefa e indique como apresentar o resultado. Ao proibir a IA de inventar dados ausentes, você evita suposições incorretas.',
            next_step_hint: 'Na próxima lição, vamos aprender o método dos 5 elementos para criar qualquer pedido com segurança.',
            question: {
              type: 'MULTIPLE_CHOICE',
              text: 'Se a resposta da IA disser "Imprimir na quarta pela manhã", o que aconteceu?',
              options: [
                'A IA descobriu uma informação verdadeira oculta',
                'Houve uma suposição incorreta, pois a impressão e o horário não foram confirmados',
                'A resposta está 100% perfeita'
              ],
              correct: 1,
              feedback_correct: 'Exato! A impressão era apenas uma dúvida pendente. Se a IA marcou como confirmada na quarta, houve uma suposição que deve ser corrigida.',
              feedback_incorrect: 'A IA fez uma suposição indevida. Corrija pedindo: "A impressão ainda não está decidida. Ajuste a tabela."'
            }
          },
          {
            id: 'les-5',
            title: 'O Método dos 5 Elementos para Criar Pedidos',
            slug: 'o-metodo-dos-5-elementos',
            estimated_minutes: 6,
            points: 15,
            hook_question: 'Como construir uma instrução completa para qualquer necessidade sem depender de frases prontas da internet?',
            explanation: '<p>Você pode estruturar qualquer pedido utilizando 5 elementos fundamentais:</p><ul><li><strong>1. Objetivo:</strong> O que você precisa obter?</li><li><strong>2. Contexto:</strong> Em qual situação vai utilizar?</li><li><strong>3. Informações:</strong> Quais dados ou textos devem ser considerados?</li><li><strong>4. Formato:</strong> Quer lista, tabela, mensagem ou resumo?</li><li><strong>5. Limites:</strong> O que precisa ser preservado ou evitado?</li></ul><p><strong>Modelo universal para adaptar:</strong><br><em>"Preciso de ajuda para [objetivo]. A situação é [contexto]. Utilize estas informações: [conteúdo]. Apresente em [formato]. Respeite estas condições: [limites]. Se faltar algo essencial, pergunte antes de concluir."</em></p>',
            visual_type: 'COMPARISON',
            visual_data: JSON.stringify({
              table: [
                { trad: '1. Objetivo', ia: 'O que preciso obter ao final?' },
                { trad: '2. Contexto', ia: 'Em qual situação vou utilizar o resultado?' },
                { trad: '3. Informações', ia: 'Quais dados ou textos a IA deve considerar?' },
                { trad: '4. Formato', ia: 'Lista, mensagem de WhatsApp, tabela ou resumo?' },
                { trad: '5. Limites', ia: 'O que não pode ser alterado ou inventado?' }
              ]
            }),
            summary: 'Os 5 elementos (Objetivo, Contexto, Informações, Formato e Limites) garantem instruções precisas. Se não souber o que informar, peça para a IA fazer perguntas primeiro!',
            next_step_hint: 'Na próxima lição, aplicaremos esse método para escrever e ajustar o tom de uma mensagem real.',
            question: {
              type: 'MULTIPLE_CHOICE',
              text: 'Se você precisa organizar um plano de estudo mas não sabe quais detalhes fornecer, qual o melhor pedido?',
              options: [
                '"Crie qualquer plano para mim"',
                '"Quero organizar um plano de estudo. Antes de montar o plano, faça até 3 perguntas para entender meu objetivo e tempo disponível."',
                '"Escreva um livro sobre estudos"'
              ],
              correct: 1,
              feedback_correct: 'Perfeito! Pedir perguntas antes de gerar a resposta permite fornecer as condições reais para a IA.',
              feedback_incorrect: 'Peça para a IA fazer 2 ou 3 perguntas antes de formular o resultado.'
            }
          },
          {
            id: 'les-6',
            title: 'Aplicando o Método em Mensagens e Ajustando o Tom',
            slug: 'aplicando-o-metodo-em-mensagens',
            estimated_minutes: 6,
            points: 15,
            hook_question: 'Como pedir à IA para escrever uma mensagem de WhatsApp para confirmar uma reunião mantendo tom cordial e direto?',
            explanation: '<p>Veja como aplicar o método dos 5 elementos a uma mensagem de trabalho:</p><p><strong>Pedido completo:</strong><br><em>"Escreva uma mensagem de WhatsApp para confirmar uma reunião com um cliente. Ela está prevista para quinta-feira, às 14h, por videochamada. Pergunte se esse horário continua adequado. Use um tom cordial e direto, em até três frases. Não acrescente links nem outros assuntos."</em></p><p><strong>Para ajustar o tom:</strong> Se o resultado ficar muito formal, diga na conversa: <em>"Deixe a mensagem mais natural, mantendo o respeito e as mesmas informações."</em></p>',
            visual_type: 'CHAT',
            visual_data: JSON.stringify({
              user: 'Escreva mensagem de WhatsApp para confirmar reunião de quinta às 14h por videochamada. Cordial, max 3 frases.',
              ai: 'Olá! Gostaria de confirmar nossa reunião por videochamada, prevista para quinta-feira, às 14h. Esse horário continua adequado para você?',
              user2: 'Deixe mais natural e amigável.',
              ai2: 'Oi! Tudo bem? Podemos confirmar nossa reunião por videochamada para quinta-feira, às 14h?'
            }),
            summary: 'Ao solicitar mensagens, defina dia, hora e modalidade. Você pode ajustar o tom na mesma conversa garantindo que dados críticos sejam preservados.',
            next_step_hint: 'Módulo 2 concluído! No próximo módulo aprenderemos a refinar respostas e revisar entregas.',
            question: {
              type: 'MULTIPLE_CHOICE',
              text: 'Antes de enviar a mensagem gerada pela IA para seu cliente, qual verificação é indispensável?',
              options: [
                'Nenhuma, a IA não erra em textos curtos',
                'Conferir se o dia (quinta), horário (14h) e modalidade (videochamada) foram preservados',
                'Pedir para outra IA enviar o WhatsApp automaticamente'
              ],
              correct: 1,
              feedback_correct: 'Exato! Confira sempre se os dados do compromisso foram mantidos exatamente como você forneceu.',
              feedback_incorrect: 'Verifique se dia, horário e formato da reunião estão totalmente corretos.'
            }
          }
        ]
      },
      {
        id: 'mod-3',
        title: 'Módulo 3: Refinando e Revisando',
        description: '3 lições · ~15 min',
        order_index: 3,
        lessons: [
          {
            id: 'les-7',
            title: 'Como melhorar respostas durante a conversa',
            slug: 'como-melhorar-respostas-durante-a-conversa',
            estimated_minutes: 5,
            points: 10,
            hook_question: 'A primeira resposta da IA raramente é a versão final. Diga exatamente o que está inadequado para chegar ao resultado útil.',
            explanation: '<p>Em vez de dizer apenas "melhore", use pedidos de ajuste específicos:</p><ul><li><strong>Texto longo:</strong> "Reduza para um parágrafo, preservando datas e condições."</li><li><strong>Linguagem difícil:</strong> "Explique os termos técnicos com um exemplo cotidiano."</li><li><strong>Dado incorreto:</strong> "A data correta é dia 18. Corrija sem mudar os demais dados."</li><li><strong>Formato inadequado:</strong> "Transforme o conteúdo em uma tabela."</li></ul><p>Se a conversa ficar confusa após muitas tentativas, reúna o objetivo, os dados corretos e o formato em uma única mensagem nova.</p>',
            visual_type: 'COMPARISON',
            visual_data: JSON.stringify({
              table: [
                { trad: 'Problema na resposta', ia: 'Pedido de ajuste eficaz' },
                { trad: 'Texto muito longo', ia: 'Reduza para um parágrafo preservando as datas' },
                { trad: 'Linguagem difícil', ia: 'Explique os termos com exemplos do cotidiano' },
                { trad: 'Dado incorreto', ia: 'A data correta é dia 18. Corrija mantendo o resto' },
                { trad: 'Formato confuso', ia: 'Transforme o texto acima em uma tabela simples' }
              ]
            }),
            summary: 'Seja específico no ajuste dizendo o que mudar e o que preservar. Se a conversa se perder, faça uma mensagem resumida com a versão definitiva.',
            next_step_hint: 'Na próxima lição, você conhecerá as 5 perguntas indispensáveis antes de usar qualquer texto gerado.',
            question: {
              type: 'MULTIPLE_CHOICE',
              text: 'Se a resposta da IA trouxe um dado errado e um formato confuso, como agir?',
              options: [
                'Enviar apenas a palavra "Melhore"',
                'Indicar o dado correto primeiro e solicitar o novo formato desejado',
                'Aceitar o erro sem corrigir'
              ],
              correct: 1,
              feedback_correct: 'Perfeito! Indique o trecho/dado incorreto e forneça a instrução de formato.',
              feedback_incorrect: 'Instrua a IA informando o dado correto e o formato desejado.'
            }
          },
          {
            id: 'les-8',
            title: 'As 5 Perguntas de Revisão: Informação vs Sugestão vs Suposição',
            slug: 'as-5-perguntas-de-revisao',
            estimated_minutes: 5,
            points: 10,
            hook_question: 'Uma resposta pode parecer bem escrita mas alterar completamente o sentido do seu pedido. Como identificar suposições equivocadas?',
            explanation: '<p>Antes de utilizar qualquer texto gerado por IA, faça a si mesmo estas <strong>5 perguntas de revisão</strong>:</p><ol><li><strong>Atendeu ao objetivo?</strong> Realizou a tarefa solicitada?</li><li><strong>Preservou os dados?</strong> Confira datas, números e nomes.</li><li><strong>Acrescentou algo?</strong> Identifique detalhes não fornecidos por você.</li><li><strong>Omitiu algo importante?</strong> Observe restrições esquecidas.</li><li><strong>Está pronto para uso?</strong> Avalie clareza e formato.</li></ol><p><strong>Diferencie 3 tipos de conteúdo:</strong><br>• <em>Informação:</em> o que você forneceu ("tenho 30 min na terça").<br>• <em>Sugestão:</em> ideia da IA ("use para revisar anotações").<br>• <em>Suposição:</em> a IA afirmou sem confirmação ("você está livre todas as terças").</p>',
            visual_type: 'TIPS',
            visual_data: JSON.stringify({
              tips: [
                '🔍 Informação: Dados que você forneceu à ferramenta.',
                '💡 Sugestão: Possibilidade proposta pela IA que você pode aceitar ou não.',
                '⚠️ Suposição: Dado que a IA inventou ou concluiu sem confirmação. Deve ser corrigido!'
              ]
            }),
            summary: 'Use as 5 perguntas de revisão e nunca confunda sugestão com suposição. Se a IA inventou um dado, peça a correção imediatamente.',
            next_step_hint: 'Na próxima lição, veremos como conferir fatos em fontes externas e proteger seus dados pessoais.',
            question: {
              type: 'TRUE_FALSE',
              text: 'Avalie os tipos de conteúdo gerados pela IA:',
              options: [
                'Se a IA afirma que você está livre todas as terças sem você ter dito isso, é uma suposição indevida.',
                'Sugestões da IA devem ser separadas e avaliadas por você antes de aceitar.',
                'Não é necessário conferir nomes e números se a resposta parecer bem escrita.'
              ],
              correct: [true, true, false],
              feedback_correct: 'Excelente! Suposições devem ser corrigidas e dados precisam ser conferidos sempre.',
              feedback_incorrect: 'Sempre confira datas, nomes e números, corrigindo suposições indevidas.'
            }
          },
          {
            id: 'les-9',
            title: 'Confira fatos e proteja informações pessoais',
            slug: 'confira-fatos-e-proteja-informacoes',
            estimated_minutes: 5,
            points: 10,
            hook_question: 'Perguntar "tem certeza?" à própria ferramenta não substitui a conferência em fontes oficiais. E como proteger seus dados sensíveis?',
            explanation: '<p>Quando a tarefa envolve fatos externos (preços, leis, horários, citações), consulte fontes oficiais adequadas. A IA pode indicar referências incorretas com tom de certeza.</p><p><strong>Cuidados com dados sensíveis:</strong></p><ul><li>Não envie senhas, senhas de banco ou códigos de acesso.</li><li>Evite compartilhar CPF, RG, dados bancários ou documentos sigilosos de trabalho.</li><li>Substitua dados reais por campos entre colchetes como <code>[nome]</code>, <code>[cliente]</code> e <code>[valor]</code>. Preencha os dados reais depois no seu documento.</li></ul>',
            visual_type: 'TWO_COLUMNS',
            visual_data: JSON.stringify({
              cannot: ['Senhas e códigos de acesso', 'CPF, RG e dados bancários', 'Documentos confidenciais da empresa'],
              can: ['Textos genéricos ou anotações fictícias', 'Campos entre colchetes como [nome]', 'Informações públicas']
            }),
            summary: 'Confirme informações críticas em fontes externas oficiais. Proteja sua privacidade usando modelos com campos entre colchetes.',
            next_step_hint: 'No próximo módulo, realizaremos o desafio prático integrador do livro!',
            question: {
              type: 'MULTIPLE_CHOICE',
              text: 'Ao criar um rascunho de contrato ou e-mail com a IA, qual a melhor prática de privacidade?',
              options: [
                'Colar todos os documentos confidenciais com CPF e dados bancários',
                'Substituir dados sensíveis por marcadores como [Nome do Cliente] e [Valor], preenchendo após a geração',
                'Pedir para a IA guardar suas senhas em segredo'
              ],
              correct: 1,
              feedback_correct: 'Perfeito! Use marcadores entre colchetes para proteger informações sensíveis.',
              feedback_incorrect: 'Substitua dados pessoais por marcadores entre colchetes para garantir total privacidade.'
            }
          }
        ]
      },
      {
        id: 'mod-4',
        title: 'Módulo 4: Prática, Modelos e Próximos Passos',
        description: '3 lições · ~15 min',
        order_index: 4,
        lessons: [
          {
            id: 'les-10',
            title: 'Desafio Prático Integrador (Encontro de Estudos)',
            slug: 'desafio-pratico-integrador',
            estimated_minutes: 5,
            points: 20,
            hook_question: 'Hora de aplicar objetivo, contexto, informações, formato e limites em um desafio completo do começo ao fim!',
            explanation: '<p><strong>Situação fictícia:</strong><br><em>Você está organizando um encontro de estudos no sábado, às 10h, com duração prevista de 1 hora. Quatro pessoas confirmaram presença. O encontro será online, mas a ferramenta de videochamada ainda não foi escolhida. O assunto será a revisão do capítulo 2. Cada participante deverá levar duas dúvidas. Ainda falta definir quem enviará o link.</em></p><p><strong>Sua tarefa:</strong> Obter um checklist de organização, uma mensagem curta de lembrete e a lista de decisões pendentes separada.</p>',
            visual_type: 'STEPS',
            visual_data: JSON.stringify({
              steps: [
                '1. Manteve sábado às 10h e 1h de duração?',
                '2. Indicou a revisão do capítulo 2 com 2 dúvidas por pessoa?',
                '3. Não inventou link nem plataforma?',
                '4. Manteve pendente quem enviará o link?',
                '5. Apresentou checklist, lembrete e pendências separadas?'
              ]
            }),
            summary: 'Concluir uma atividade significa obter a entrega revisada e identificar quais ações reais ainda precisam ser executadas por você.',
            next_step_hint: 'Na próxima lição, você aprenderá a guardar seus modelos para reutilizar no dia a dia.',
            question: {
              type: 'MULTIPLE_CHOICE',
              text: 'Se a resposta da IA incluir "Link da reunião: zoom.us/123456", qual deve ser sua atitude?',
              options: [
                'Usar esse link na reunião de sábado',
                'Corrigir a IA dizendo que a plataforma e o link não foram definidos e devem constar como pendência',
                'Cancelar a reunião'
              ],
              correct: 1,
              feedback_correct: 'Exato! A IA inventou um link fictício. Corrija mantendo o envio do link nas decisões pendentes.',
              feedback_incorrect: 'A IA inventou o link. Peça para remover o link e manter a definição como pendência.'
            }
          },
          {
            id: 'les-11',
            title: 'Salve seus modelos para usar novamente',
            slug: 'salve-seus-modelos',
            estimated_minutes: 5,
            points: 10,
            hook_question: 'Você não precisa guardar dezenas de comandos prontos. Guarde 2 ou 3 modelos flexíveis com campos editáveis no seu aplicativo de notas.',
            explanation: '<p>Quando encontrar uma instrução que funcionou bem, salve-a como modelo:</p><p><strong>Exemplo de Modelo de Anotações:</strong><br><em>Nome do modelo: Organizar anotações<br>"Organize estas anotações sobre [atividade] em [formato]. Preserve os prazos informados, separe dúvidas de tarefas e não invente informações. Anotações: [conteúdo]."<br>Conferência necessária: comparar com o original e verificar prazos e pendências.</em></p>',
            visual_type: 'TIPS',
            visual_data: JSON.stringify({
              tips: [
                '📌 Uma instrução simples e testada vale mais que dezenas de comandos prontos.',
                '📌 Substitua dados específicos por campos entre colchetes [como este].',
                '📌 Na próxima utilização, preencha os campos e revise o resultado final.'
              ]
            }),
            summary: 'Guarde seus modelos testados com campos entre colchetes em um aplicativo de notas. Na próxima tarefa, basta preencher e revisar.',
            next_step_hint: 'Na lição final, apresentamos seu Roteiro de Bolso para consulta rápida.',
            question: {
              type: 'MULTIPLE_CHOICE',
              text: 'Qual a vantagem de criar e salvar seus próprios modelos de instrução?',
              options: [
                'Você nunca mais precisará ler ou revisar as respostas da IA',
                'Facilita o início de tarefas recorrentes mantendo a estrutura clara de objetivo, formato e limites',
                'Garante que a IA nunca cometa erros'
              ],
              correct: 1,
              feedback_correct: 'Perfeito! Modelos salvos agilizam o processo mantendo suas instruções claras e padronizadas.',
              feedback_incorrect: 'Os modelos facilitam o início das tarefas, mas a revisão continua necessária.'
            }
          },
          {
            id: 'les-12',
            title: 'Roteiro Final de Consulta e Próximos Passos',
            slug: 'roteiro-final-de-consulta',
            estimated_minutes: 5,
            points: 20,
            hook_question: 'Você praticou como iniciar uma conversa, explicar uma necessidade, melhorar uma resposta e conferir o resultado. Aqui está seu roteiro de bolso!',
            explanation: '<p>Guarde este <strong>Roteiro de Consulta Rápida</strong> para o seu dia a dia:</p><ul><li><strong>1. Definir:</strong> Escolha a tarefa e o resultado desejado ("Ao final, quero ter...").</li><li><strong>2. Contextualizar:</strong> Reúna as informações necessárias.</li><li><strong>3. Pedir:</strong> Indique objetivo, contexto, informações, formato e limites.</li><li><strong>4. Revisar:</strong> Use as 5 perguntas para conferir dados, suposições e omissões.</li><li><strong>5. Aplicar:</strong> Utilize a entrega revisada e execute as ações pendentes.</li></ul>',
            visual_type: 'ACHIEVEMENT',
            visual_data: JSON.stringify({
              badge: '🏆 Parabéns! Você concluiu a trilha do Livro 1: IA sem Mistério!'
            }),
            summary: 'Parabéns! Você concluiu o conteúdo do Livro 1. Escolha uma tarefa simples do seu cotidiano, siga o roteiro e continue praticando!',
            next_step_hint: '🎉 Trilha concluída! Você está preparado(a) para explorar o Guia 2 — IA no Dia a Dia.',
            question: {
              type: 'MULTIPLE_CHOICE',
              text: 'Qual a sequência correta do Roteiro de Consulta Rápida no dia a dia?',
              options: [
                'Aplicar → Pedir → Definir → Revisar',
                'Definir → Contextualizar → Pedir → Revisar → Aplicar',
                'Pedir → Aplicar sem revisar'
              ],
              correct: 1,
              feedback_correct: 'Parabéns! 🎉 Você domina a metodologia do Desvende IA: Definir, Contextualizar, Pedir, Revisar e Aplicar!',
              feedback_incorrect: 'A sequência correta é: Definir → Contextualizar → Pedir → Revisar → Aplicar.'
            }
          }
        ]
      }
    ];

    for (const mod of modulesData) {
      await queryRun(
        `INSERT INTO modules (id, track_id, title, description, order_index, status) VALUES (?, ?, ?, ?, ?, ?)`,
        [mod.id, trackId, mod.title, mod.description, mod.order_index, 'PUBLISHED']
      );

      for (const les of mod.lessons) {
        await queryRun(
          `INSERT INTO lessons (id, module_id, title, slug, estimated_minutes, points, hook_question, explanation, visual_type, visual_data, summary, next_step_hint, order_index, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            les.id,
            mod.id,
            les.title,
            les.slug,
            les.estimated_minutes,
            les.points,
            les.hook_question,
            les.explanation,
            les.visual_type,
            les.visual_data,
            les.summary,
            les.next_step_hint,
            les.order_index || 1,
            'PUBLISHED'
          ]
        );

        const q = les.question;
        await queryRun(
          `INSERT INTO questions (id, lesson_id, type, text, options_json, correct_answer_json, feedback_correct, feedback_incorrect, points) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            `q-${les.id}`,
            les.id,
            q.type,
            q.text,
            JSON.stringify(q.options),
            JSON.stringify(q.correct),
            q.feedback_correct,
            q.feedback_incorrect,
            les.points
          ]
        );
      }
    }

    console.log('✅ Inclusão dos dados (Seed do Livro 1) concluída com sucesso!');
  } catch (err) {
    console.error('❌ Erro no seed:', err);
  }
}

seed().then(() => process.exit(0));

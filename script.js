// script.js - Desvende IA

// --- DADOS ---
const trackData = {
  id: 1,
  title: 'IA sem Mistério',
  slug: 'ia-sem-misterio',
  description: 'Sua primeira trilha: do zero até usar IA com confiança no dia a dia.',
  modules: [
    {
      id: 1,
      title: 'Entendendo o Básico',
      description: '3 lições · ~15 min',
      lessons: [1, 2, 3]
    },
    {
      id: 2,
      title: 'Suas Primeiras Conversas com IA',
      description: '3 lições · ~15 min',
      lessons: [4, 5, 6]
    },
    {
      id: 3,
      title: 'IA na Prática',
      description: '3 lições · ~18 min',
      lessons: [7, 8, 9]
    },
    {
      id: 4,
      title: 'Usando IA com Responsabilidade',
      description: '3 lições · ~15 min',
      lessons: [10, 11, 12]
    }
  ]
};

const lessonsData = [
  {
    id: 1,
    moduleId: 1,
    title: 'O que é inteligência artificial, afinal?',
    estimatedMinutes: 5,
    points: 10,
    hook: 'Quando você pede ao celular uma rota até o trabalho e ele sugere o melhor caminho com base no trânsito — quem está decidindo isso? Não é magia. É inteligência artificial.',
    explanation: '<p>Inteligência artificial (IA) é um conjunto de tecnologias que permite a computadores <strong>aprender com dados</strong>, encontrar padrões e tomar decisões.</p><p>Diferente de uma calculadora que segue regras fixas, a IA aprende com exemplos. Mostre milhares de fotos de gatos a uma IA e ela aprende a identificar gatos. Alimente-a com milhões de textos e ela aprende a escrever.</p><p>No dia a dia, a IA já está presente em muitos lugares: na sugestão de filmes que você recebe, no corretor automático do teclado, nos filtros de spam do seu e-mail e até na organização das suas fotos.</p><p>O mais importante: <strong>IA não pensa como um ser humano</strong>. Ela é muito boa em reconhecer padrões, mas não tem consciência, opiniões ou sentimentos.</p>',
    visual: '<div class="comparison-table"><table><thead><tr><th>Software tradicional</th><th>Inteligência artificial</th></tr></thead><tbody><tr><td>Segue regras exatas que alguém programou</td><td>Aprende com exemplos e dados</td></tr><tr><td>Faz sempre a mesma coisa</td><td>Pode se adaptar a situações novas</td></tr><tr><td>Não consegue lidar com o que não foi previsto</td><td>Melhora com mais dados e prática</td></tr><tr><td>Exemplo: calculadora</td><td>Exemplo: corretor inteligente do teclado</td></tr></tbody></table></div>',
    activity: {
      type: 'multiple_choice',
      question: 'Qual dessas situações usa inteligência artificial?',
      options: [
        'Uma calculadora comum fazendo 2 + 2',
        'Um corretor de texto que aprende seu estilo de escrita',
        'Um documento PDF salvo no computador',
        'Um relógio de parede analógico'
      ],
      correctIndex: 1,
      feedbackCorrect: 'Exatamente! O corretor inteligente aprende com seus textos e melhora as sugestões ao longo do tempo. Isso é IA em ação. 👏',
      feedbackIncorrect: 'Não é essa. Pense em qual opção envolve um sistema que <strong>aprende e se adapta</strong>. A resposta certa é o corretor de texto inteligente — ele analisa como você escreve e melhora suas sugestões.'
    },
    summary: 'Inteligência artificial são programas que aprendem com dados. Eles não pensam como humanos, mas conseguem reconhecer padrões e ajudar em diversas tarefas do dia a dia.',
    nextStep: 'Na próxima lição, você vai descobrir o que a IA realmente pode fazer — e o que ela <strong>não pode</strong>.'
  },
  {
    id: 2,
    moduleId: 1,
    title: 'O que a IA pode (e não pode) fazer',
    estimatedMinutes: 5,
    points: 10,
    hook: 'Uma IA pode escrever um e-mail para você em segundos. Mas será que ela sabe se aquele e-mail vai magoar alguém? Entender os limites da IA é tão importante quanto conhecer suas capacidades.',
    explanation: '<p>Ferramentas de IA são <strong>muito boas em certas tarefas</strong>: resumir textos longos, sugerir ideias, traduzir idiomas, organizar informações e responder perguntas sobre muitos assuntos.</p><p>Mas elas têm <strong>limites claros</strong>:</p><ul><li>Não entendem verdadeiramente o que leem — reconhecem padrões estatísticos</li><li>Não têm opiniões, sentimentos ou consciência</li><li>Podem gerar informações incorretas com muita confiança</li><li>Não substituem seu senso crítico e julgamento</li><li>Não sabem o que é importante <em>para você</em></li></ul><p>Pensar na IA como uma <strong>ferramenta muito capaz, mas sem bom senso</strong>, é uma boa forma de começar.</p>',
    visual: '<div class="two-columns"><div class="column-card can"><h4>✅ IA pode</h4><ul><li>Resumir textos longos em segundos</li><li>Sugerir ideias e rascunhos</li><li>Traduzir entre idiomas</li><li>Organizar dados e informações</li><li>Responder perguntas sobre muitos temas</li><li>Gerar imagens a partir de descrições</li></ul></div><div class="column-card cannot"><h4>❌ IA não pode</h4><ul><li>Garantir que tudo está 100% correto</li><li>Entender contextos emocionais</li><li>Ter opiniões genuínas</li><li>Conhecer fatos muito recentes</li><li>Substituir seu julgamento pessoal</li><li>Saber o que é melhor para a sua vida</li></ul></div></div>',
    activity: {
      type: 'true_false',
      question: 'Avalie cada afirmação como verdadeira ou falsa:',
      statements: [
        { text: 'A IA pode escrever um rascunho de e-mail para você.', correct: true },
        { text: 'A IA sempre dá respostas 100% corretas.', correct: false },
        { text: 'A IA pode ajudar a organizar uma lista de tarefas.', correct: true },
        { text: 'A IA entende suas emoções e sabe quando você está triste.', correct: false }
      ],
      feedbackCorrect: 'Mandou bem! Você já entende que a IA é uma ferramenta poderosa, mas com limites importantes.',
      feedbackIncorrect: 'Quase lá! Lembre-se: a IA é ótima em certas tarefas, mas não entende emoções e pode errar. Reveja as afirmações.'
    },
    summary: 'A IA é uma ferramenta poderosa para tarefas como resumir, traduzir e organizar. Mas ela não pensa, não sente e pode errar. Use-a como assistente, não como autoridade absoluta.',
    nextStep: 'Agora que você sabe o que a IA pode e não pode, vamos entender <strong>como ela aprende</strong> a fazer essas coisas.'
  },
  {
    id: 3,
    moduleId: 1,
    title: 'Como a IA "aprende"',
    estimatedMinutes: 5,
    points: 10,
    hook: 'Imagine que você precisa ensinar uma criança a separar frutas. Você não dá uma lista de 47 regras — você mostra exemplos: "isso é maçã, isso é banana". Com IA funciona de forma parecida.',
    explanation: '<p>O "aprendizado" da IA funciona em etapas simples:</p><ol><li><strong>Coleta de dados:</strong> A IA recebe milhares ou milhões de exemplos — textos, imagens, números.</li><li><strong>Busca de padrões:</strong> Ela analisa esses exemplos e encontra padrões. Por exemplo: "textos educados geralmente começam com saudação".</li><li><strong>Criação do modelo:</strong> Com esses padrões, ela constrói um "modelo" — uma espécie de receita interna que usa para fazer previsões.</li><li><strong>Teste e ajuste:</strong> O modelo é testado com dados novos e ajustado quando erra.</li></ol><p>Quanto mais dados de qualidade a IA recebe, melhor ela fica. Por isso, <strong>a qualidade dos dados é fundamental</strong>. Se você treinar uma IA com dados enviesados, ela vai reproduzir esses vieses.</p><p>É importante lembrar: a IA não "entende" nada disso. Ela está fazendo cálculos matemáticos muito complexos que <em>simulam</em> compreensão.</p>',
    visual: '<div class="steps-visual"><div class="step-item"><div class="step-num">1</div><div class="step-content"><strong>Dados entram</strong><p>Milhares de exemplos: textos, fotos, áudios</p></div></div><div class="step-item"><div class="step-num">2</div><div class="step-content"><strong>Padrões são encontrados</strong><p>A IA identifica o que se repete nos exemplos</p></div></div><div class="step-item"><div class="step-num">3</div><div class="step-content"><strong>Modelo é criado</strong><p>Uma "receita" interna para fazer previsões</p></div></div><div class="step-item"><div class="step-num">4</div><div class="step-content"><strong>Resultado é gerado</strong><p>A IA aplica o modelo a situações novas</p></div></div></div>',
    activity: {
      type: 'ordering',
      question: 'Coloque as etapas do aprendizado da IA na ordem correta:',
      items: [
        'A IA recebe milhares de exemplos',
        'Ela encontra padrões nos dados',
        'Um modelo interno é criado',
        'O modelo é testado e ajustado'
      ],
      correctOrder: [0, 1, 2, 3],
      feedbackCorrect: 'Perfeito! Você entendeu o ciclo de aprendizado da IA: dados → padrões → modelo → teste. 🎯',
      feedbackIncorrect: 'A ordem correta é: primeiro a IA recebe dados, depois encontra padrões, cria um modelo e finalmente testa e ajusta. Pense como em aprender uma receita: primeiro você vê exemplos, depois descobre o padrão, depois cria sua própria versão.'
    },
    summary: 'A IA aprende em etapas: recebe dados, encontra padrões, cria um modelo e é testada. A qualidade dos dados importa muito — dados ruins geram resultados ruins.',
    nextStep: 'Parabéns! Você concluiu o módulo <strong>"Entendendo o Básico"</strong>. No próximo módulo, você vai colocar a mão na massa e ter suas primeiras conversas com uma ferramenta de IA.'
  },
  {
    id: 4,
    moduleId: 2,
    title: 'Conhecendo uma ferramenta de IA',
    estimatedMinutes: 5,
    points: 10,
    hook: 'Você já conversou com uma IA? Se ainda não, essa lição vai te preparar para sua primeira conversa. Se já experimentou, vai entender melhor como funciona.',
    explanation: '<p>Ferramentas de IA conversacional — como ChatGPT, Gemini, Copilot e Claude — funcionam como um chat. Você escreve algo e a IA responde.</p><p>Mas diferente de um buscador como o Google, essas ferramentas <strong>geram respostas novas</strong> a cada vez. Elas não estão simplesmente copiando um texto de um site — estão construindo a resposta palavra por palavra.</p><p>Alguns pontos importantes para começar:</p><ul><li><strong>Não existe pergunta boba</strong> — a IA não julga</li><li><strong>Você pode pedir para ela refazer</strong> — se a resposta não ficou boa, peça de novo</li><li><strong>O contexto ajuda muito</strong> — quanto mais informação você dá, melhor a resposta</li><li><strong>Cada conversa é independente</strong> — a IA não lembra de conversas anteriores (a menos que a ferramenta tenha essa função)</li></ul>',
    visual: '<div class="chat-example"><div class="chat-bubble user"><strong>Você:</strong> Me explique o que é inflação de forma simples.</div><div class="chat-bubble ai"><strong>IA:</strong> Inflação é quando os preços das coisas sobem de forma geral ao longo do tempo. Imagine que há um ano você comprava um pão por R$ 1,00 e hoje ele custa R$ 1,20. Quando isso acontece com muitos produtos ao mesmo tempo, chamamos de inflação.</div><div class="chat-note">💡 Repare: a IA deu uma explicação simples e usou um exemplo do dia a dia.</div></div>',
    activity: {
      type: 'multiple_choice',
      question: 'Qual é a principal diferença entre buscar no Google e perguntar a uma IA conversacional?',
      options: [
        'O Google é gratuito e a IA é sempre paga',
        'A IA gera respostas novas, o Google mostra páginas existentes',
        'O Google sempre dá respostas corretas, a IA não',
        'Não existe diferença prática entre os dois'
      ],
      correctIndex: 1,
      feedbackCorrect: 'Isso mesmo! Buscadores encontram páginas existentes. IAs conversacionais constroem respostas originais a cada interação.',
      feedbackIncorrect: 'A diferença principal é que o Google mostra <strong>páginas que já existem</strong>, enquanto a IA <strong>gera respostas novas</strong> a cada conversa. Ambos podem errar e muitas IAs têm planos gratuitos.'
    },
    summary: 'Ferramentas de IA conversacional geram respostas novas a cada interação. Você pode conversar, pedir para refazer e dar mais contexto para obter respostas melhores.',
    nextStep: 'Na próxima lição, você vai aprender a fazer pedidos claros — o segredo para obter respostas realmente úteis.'
  },
  {
    id: 5,
    moduleId: 2,
    title: 'Como fazer um pedido claro',
    estimatedMinutes: 6,
    points: 15,
    hook: 'Se você pedir "me fale sobre comida", a IA pode falar sobre culinária francesa, nutrição ou fast food. Mas se pedir "me dê 3 receitas rápidas para jantar com frango e legumes", a resposta será muito mais útil.',
    explanation: '<p>A qualidade da resposta da IA depende diretamente da qualidade do seu pedido. Na área de IA, isso é chamado de <strong>prompt</strong> — a instrução que você dá à ferramenta.</p><p>Um bom pedido tem algumas características:</p><ul><li><strong>Seja específico:</strong> Diga exatamente o que quer, não fique vago</li><li><strong>Dê contexto:</strong> Explique para que você precisa e quem vai ler</li><li><strong>Defina o formato:</strong> Lista, texto corrido, tabela, passo a passo</li><li><strong>Indique o tom:</strong> Formal, informal, didático, profissional</li></ul><p>Pense na IA como um assistente muito capaz, mas que acabou de chegar e não conhece nada sobre você. Quanto mais informação útil você der, melhor o resultado.</p>',
    visual: '<div class="comparison-prompts"><div class="prompt-card bad"><span class="prompt-label">❌ Pedido vago</span><p>"Me fale sobre exercícios"</p></div><div class="prompt-card good"><span class="prompt-label">✅ Pedido claro</span><p>"Crie uma rotina de exercícios de 15 minutos para iniciantes que possa ser feita em casa sem equipamentos. Liste cada exercício com duração e descanso."</p></div></div>',
    activity: {
      type: 'multiple_choice',
      question: 'Qual desses pedidos provavelmente vai gerar a melhor resposta de uma IA?',
      options: [
        '"Fale sobre viagens"',
        '"Me ajude a planejar uma viagem de 5 dias para o Rio de Janeiro com orçamento econômico, incluindo hospedagem e passeios principais"',
        '"Viagem Rio de Janeiro"',
        '"O que você sabe sobre o Rio?"'
      ],
      correctIndex: 1,
      feedbackCorrect: 'Perfeito! Esse pedido tem destino, duração, estilo e o que incluir. Quanto mais contexto, melhor a resposta. 🎯',
      feedbackIncorrect: 'O melhor pedido é o que inclui mais contexto: destino, duração, orçamento e o que incluir. Quanto mais específico, mais útil será a resposta.'
    },
    summary: 'Para obter boas respostas da IA, faça pedidos específicos com contexto, formato desejado e tom. Quanto mais detalhes úteis, melhor o resultado.',
    nextStep: 'E se a resposta não ficou boa? Na próxima lição, você aprende a <strong>refinar e melhorar</strong> as respostas.'
  },
  {
    id: 6,
    moduleId: 2,
    title: 'Melhorando as respostas',
    estimatedMinutes: 5,
    points: 10,
    hook: 'A primeira resposta da IA raramente é perfeita. A boa notícia? Você pode pedir para ela melhorar — e isso muda tudo.',
    explanation: '<p>Conversar com uma IA é um processo <strong>iterativo</strong>. Isso significa que você pode — e deve — ir ajustando até chegar ao resultado que precisa.</p><p>Técnicas para melhorar respostas:</p><ul><li><strong>Peça para simplificar:</strong> "Explique isso de forma mais simples"</li><li><strong>Peça para expandir:</strong> "Pode detalhar mais o ponto 2?"</li><li><strong>Mude o formato:</strong> "Transforme isso em uma lista" ou "Resuma em 3 frases"</li><li><strong>Dê feedback:</strong> "Ficou bom, mas quero um tom mais informal"</li><li><strong>Peça exemplos:</strong> "Me dê um exemplo prático disso"</li></ul><p>Não tenha medo de pedir várias vezes. A IA não se cansa e não fica ofendida. 😄</p>',
    visual: '<div class="chat-example"><div class="chat-bubble user"><strong>Você:</strong> Explique o que é blockchain.</div><div class="chat-bubble ai"><strong>IA:</strong> Blockchain é uma tecnologia de registro distribuído descentralizado que utiliza criptografia para...</div><div class="chat-bubble user"><strong>Você:</strong> Muito técnico. Explique como se eu tivesse 10 anos.</div><div class="chat-bubble ai"><strong>IA:</strong> Imagine um caderno mágico que todo mundo pode ler, mas ninguém pode apagar o que já foi escrito. Cada página nova é conectada à anterior. Isso é o blockchain!</div><div class="chat-note">💡 Viu como a mesma IA dá respostas completamente diferentes dependendo do pedido?</div></div>',
    activity: {
      type: 'multiple_choice',
      question: 'A IA deu uma resposta muito longa e técnica. O que você faria?',
      options: [
        'Aceitar a resposta como está — a IA sabe o que faz',
        'Desistir e procurar a informação em outro lugar',
        'Pedir: "Resuma em 3 pontos principais, usando linguagem simples"',
        'Começar uma conversa completamente nova'
      ],
      correctIndex: 2,
      feedbackCorrect: 'Isso mesmo! Refinar o pedido é a melhor estratégia. Peça para simplificar, resumir ou mudar o formato. 💪',
      feedbackIncorrect: 'A melhor opção é pedir para a IA <strong>ajustar a resposta</strong>. Diga algo como "resuma em 3 pontos" ou "use linguagem mais simples". Você está no controle da conversa!'
    },
    summary: 'Conversar com IA é um processo iterativo. Peça para simplificar, expandir, mudar formato ou tom. A IA não se cansa — refine até ficar bom.',
    nextStep: 'Parabéns! Você completou o módulo <strong>"Suas Primeiras Conversas com IA"</strong>. No próximo módulo, vamos ver a IA em ação em situações reais.'
  },
  {
    id: 7, moduleId: 3, title: 'IA para estudo e pesquisa', estimatedMinutes: 6, points: 15,
    hook: 'E se você pudesse ter um tutor disponível 24 horas para explicar qualquer assunto do jeito que você entende melhor?',
    explanation: '<p>A IA pode ser uma aliada poderosa nos estudos — desde que você saiba usá-la corretamente.</p><p><strong>Formas de usar IA para estudar:</strong></p><ul><li>Pedir explicações simplificadas de temas complexos</li><li>Criar resumos de textos longos</li><li>Gerar perguntas de revisão sobre um assunto</li><li>Pedir exemplos práticos de conceitos abstratos</li><li>Simular uma conversa de estudo ("me faça 5 perguntas sobre fotossíntese")</li></ul><p><strong>Cuidado importante:</strong> Use a IA como ferramenta de apoio, não como substituto do estudo. Sempre verifique informações importantes em fontes confiáveis.</p>',
    visual: '<div class="tip-cards"><div class="tip-card"><strong>💡 Dica</strong><p>Peça: "Me explique [tema] como se eu nunca tivesse ouvido falar nisso"</p></div><div class="tip-card"><strong>💡 Dica</strong><p>Peça: "Crie 5 perguntas de revisão sobre [tema] com respostas"</p></div></div>',
    activity: { type: 'multiple_choice', question: 'Qual é a melhor forma de usar IA nos estudos?', options: ['Copiar as respostas da IA diretamente', 'Usar como apoio e verificar informações importantes', 'Não usar porque a IA pode errar', 'Usar só para tarefas simples'], correctIndex: 1, feedbackCorrect: 'Exato! A IA é uma ótima ferramenta de apoio, mas sempre verifique informações importantes.', feedbackIncorrect: 'O ideal é usar a IA como <strong>ferramenta de apoio</strong> e sempre verificar informações importantes em fontes confiáveis.' },
    summary: 'A IA pode explicar, resumir, criar exercícios e exemplificar. Use-a como apoio aos estudos, sempre verificando informações críticas.',
    nextStep: 'Na próxima lição: como usar IA para <strong>escrever melhor</strong>.'
  },
  {
    id: 8, moduleId: 3, title: 'IA para escrita e comunicação', estimatedMinutes: 6, points: 15,
    hook: 'Precisa escrever um e-mail profissional e travou na frente da tela em branco? A IA pode ajudar — e não, isso não é "trapacear".',
    explanation: '<p>Uma das habilidades mais úteis da IA é ajudar na escrita. Você pode usar para:</p><ul><li>Criar rascunhos iniciais de e-mails, textos e mensagens</li><li>Revisar gramática e clareza</li><li>Ajustar o tom (formal, casual, empático)</li><li>Reformular frases confusas</li><li>Traduzir mantendo o sentido original</li></ul><p><strong>Importante:</strong> A IA cria o rascunho. Você revisa, personaliza e decide o que enviar. O resultado final é sempre sua responsabilidade.</p>',
    visual: '<div class="chat-example"><div class="chat-bubble user"><strong>Você:</strong> Me ajude a escrever um e-mail pedindo adiamento de prazo. Tom: profissional mas simpático.</div><div class="chat-bubble ai"><strong>IA:</strong> Assunto: Solicitação de extensão de prazo<br><br>Olá [Nome],<br><br>Espero que esteja bem. Gostaria de solicitar uma extensão para...</div></div>',
    activity: { type: 'multiple_choice', question: 'Depois que a IA gera um rascunho de e-mail para você, qual é o próximo passo?', options: ['Enviar imediatamente', 'Revisar, personalizar e decidir se envia', 'Pedir para outra IA revisar', 'Deletar e escrever do zero'], correctIndex: 1, feedbackCorrect: 'Perfeito! Sempre revise e personalize antes de enviar. Você é responsável pelo resultado final. ✍️', feedbackIncorrect: 'O correto é <strong>revisar e personalizar</strong> o rascunho. A IA ajuda a começar, mas a decisão final é sempre sua.' },
    summary: 'Use IA para criar rascunhos, revisar textos e ajustar tom. Sempre revise o resultado — a responsabilidade pelo que você envia é sua.',
    nextStep: 'Agora vamos ver como a IA pode ajudar com <strong>organização e criatividade</strong>.'
  },
  {
    id: 9, moduleId: 3, title: 'IA para organização e criatividade', estimatedMinutes: 6, points: 15,
    hook: 'Precisa organizar um evento, planejar a semana ou ter ideias para um projeto? A IA pode ser seu brainstorming partner.',
    explanation: '<p>Além de texto e pesquisa, a IA brilha em duas áreas surpreendentes:</p><p><strong>Organização:</strong></p><ul><li>Criar cronogramas e listas de tarefas</li><li>Planejar projetos dividindo em etapas</li><li>Organizar informações em tabelas ou categorias</li></ul><p><strong>Criatividade:</strong></p><ul><li>Gerar ideias para projetos, nomes, títulos</li><li>Propor diferentes abordagens para um problema</li><li>Criar roteiros, storytelling e brainstorming</li></ul>',
    visual: '<div class="tip-cards"><div class="tip-card"><strong>📋 Organização</strong><p>"Crie um plano de 30 dias para aprender inglês básico, com tarefas diárias de 15 minutos"</p></div><div class="tip-card"><strong>🎨 Criatividade</strong><p>"Me dê 10 ideias de conteúdo para Instagram sobre culinária saudável"</p></div></div>',
    activity: { type: 'multiple_choice', question: 'Qual pedido usaria MELHOR a IA para organização?', options: ['"Organize minha vida"', '"Crie um checklist de 10 itens para preparar uma mudança de apartamento, em ordem de prioridade"', '"Lista"', '"O que preciso fazer?"'], correctIndex: 1, feedbackCorrect: 'Ótimo! Pedido específico com contexto, formato e critério de organização.', feedbackIncorrect: 'O pedido mais eficaz é o que dá contexto (mudança), formato (checklist), quantidade (10) e critério (prioridade).' },
    summary: 'A IA é ótima para organizar tarefas, planejar projetos e gerar ideias criativas. Seja específico no que precisa e o resultado vai surpreender.',
    nextStep: 'Módulo concluído! 🎉 No próximo módulo, vamos aprender a usar IA <strong>com responsabilidade</strong>.'
  },
  {
    id: 10, moduleId: 4, title: 'Como conferir o que a IA responde', estimatedMinutes: 5, points: 10,
    hook: 'A IA pode te dizer com total confiança que a capital da Austrália é Sydney. Spoiler: é Canberra. Como saber quando confiar?',
    explanation: '<p>IAs podem gerar informações incorretas com tom confiante — isso é chamado de <strong>"alucinação"</strong>. Por isso, desenvolver o hábito de checar é fundamental.</p><p><strong>Como verificar:</strong></p><ul><li>Cruze com fontes confiáveis (sites oficiais, livros, especialistas)</li><li>Desconfie de dados muito específicos (datas, números, citações)</li><li>Peça fontes: "De onde vem essa informação?"</li><li>Se algo parece estranho, provavelmente é — pesquise</li></ul><p>A regra de ouro: <strong>quanto mais importante a decisão, mais você deve verificar</strong>.</p>',
    visual: '<div class="alert-box"><strong>🔍 Sinais de alerta</strong><ul><li>Números ou estatísticas muito específicos sem fonte</li><li>Citações de pessoas famosas (IAs inventam citações frequentemente)</li><li>Informações sobre eventos recentes</li><li>Respostas que contradizem o que você já sabe</li></ul></div>',
    activity: { type: 'true_false', question: 'Verdadeiro ou falso:', statements: [ { text: 'Se a IA diz algo com confiança, está certamente correto.', correct: false }, { text: 'É importante verificar informações importantes em fontes confiáveis.', correct: true }, { text: 'Pedir fontes à IA é uma boa prática.', correct: true }, { text: 'IAs nunca inventam informações.', correct: false } ], feedbackCorrect: 'Excelente! Você está desenvolvendo senso crítico para usar IA com segurança.', feedbackIncorrect: 'Lembre-se: IAs podem errar e até inventar informações. Sempre verifique, especialmente quando a decisão é importante.' },
    summary: 'IAs podem gerar informações incorretas com confiança. Sempre verifique dados importantes, peça fontes e mantenha o senso crítico.',
    nextStep: 'Na próxima lição: <strong>cuidados com seus dados pessoais</strong>.'
  },
  {
    id: 11, moduleId: 4, title: 'Cuidados com dados pessoais', estimatedMinutes: 5, points: 10,
    hook: 'Você mandaria seu CPF e senha do banco por mensagem para um desconhecido? Com IA, às vezes fazemos algo parecido sem perceber.',
    explanation: '<p>Quando você conversa com uma IA, suas mensagens podem ser armazenadas e até usadas para treinar futuros modelos. Por isso:</p><p><strong>Nunca compartilhe com IA:</strong></p><ul><li>Senhas e dados bancários</li><li>CPF, RG e documentos pessoais</li><li>Informações confidenciais do trabalho</li><li>Dados sensíveis de outras pessoas</li><li>Informações médicas detalhadas</li></ul><p><strong>Boas práticas:</strong></p><ul><li>Use dados fictícios quando possível</li><li>Leia os termos de uso da ferramenta</li><li>Use ferramentas corporativas para dados da empresa</li><li>Revise o que está enviando antes de clicar "enviar"</li></ul>',
    visual: '<div class="two-columns"><div class="column-card cannot"><h4>🚫 Não compartilhe</h4><ul><li>Senhas e dados bancários</li><li>CPF, RG e documentos</li><li>Dados confidenciais do trabalho</li><li>Informações de terceiros</li></ul></div><div class="column-card can"><h4>✅ Pode compartilhar</h4><ul><li>Perguntas gerais sobre temas</li><li>Textos que você mesmo escreveu</li><li>Informações públicas</li><li>Dados fictícios ou anonimizados</li></ul></div></div>',
    activity: { type: 'multiple_choice', question: 'Seu chefe pediu para a IA resumir um contrato confidencial. O que fazer?', options: ['Colar o contrato inteiro na IA pública', 'Verificar se a empresa tem uma ferramenta de IA aprovada para dados confidenciais', 'Não usar IA nunca mais', 'Pedir para a IA prometer sigilo'], correctIndex: 1, feedbackCorrect: 'Correto! Para dados confidenciais, use ferramentas aprovadas pela empresa. IAs públicas podem armazenar suas mensagens.', feedbackIncorrect: 'O correto é verificar se há uma ferramenta de IA <strong>aprovada para dados confidenciais</strong>. IAs públicas podem armazenar tudo que você envia.' },
    summary: 'Proteja seus dados pessoais e confidenciais. Nunca compartilhe senhas, documentos ou dados sensíveis em IAs públicas. Use dados fictícios quando possível.',
    nextStep: 'Você chegou à última lição! Prepare-se para o <strong>desafio final</strong>. 🚀'
  },
  {
    id: 12, moduleId: 4, title: 'Desafio final: coloque tudo em prática', estimatedMinutes: 5, points: 20,
    hook: 'Você aprendeu o que é IA, como conversar com ela, como usá-la na prática e como se proteger. Agora é hora de colocar tudo junto!',
    explanation: '<p>Ao longo desta trilha, você aprendeu:</p><ul><li>✅ O que é IA e como ela funciona</li><li>✅ O que ela pode e não pode fazer</li><li>✅ Como fazer pedidos claros e refinar respostas</li><li>✅ Como usar IA para estudo, escrita, organização e criatividade</li><li>✅ Como verificar respostas e proteger seus dados</li></ul><p>Agora vamos testar seus conhecimentos com um desafio que combina vários conceitos!</p>',
    visual: '<div class="achievement-card"><div class="achievement-icon">🏆</div><h3>Desafio Final</h3><p>Responda à atividade abaixo para completar a trilha "IA sem Mistério"!</p></div>',
    activity: {
      type: 'multiple_choice',
      question: 'Uma amiga quer usar IA pela primeira vez para planejar o aniversário do filho. Qual é o MELHOR conselho que você daria?',
      options: [
        '"Cuidado, a IA vai roubar seus dados!"',
        '"Só pede pra ela: festa de aniversário"',
        '"Diga o que precisa com detalhes: idade da criança, orçamento, número de convidados e tema preferido. Depois revise as sugestões e adapte ao seu gosto."',
        '"Não precisa verificar nada, a IA é sempre confiável"'
      ],
      correctIndex: 2,
      feedbackCorrect: 'Parabéns! 🎉 Você demonstrou que entende como usar IA de forma inteligente: dar contexto, ser específico e revisar o resultado. Você completou a trilha "IA sem Mistério"!',
      feedbackIncorrect: 'O melhor conselho combina tudo que você aprendeu: <strong>dar contexto específico</strong> (idade, orçamento, tema) e <strong>revisar o resultado</strong>. A opção C é a mais completa!'
    },
    summary: 'Você completou a trilha "IA sem Mistério"! Agora você sabe o que é IA, como conversar com ela, como usá-la na prática e como se proteger. Continue praticando e explorando!',
    nextStep: '🎉 <strong>Trilha concluída!</strong> Em breve, novas trilhas estarão disponíveis: "IA no Dia a Dia", "IA no Trabalho" e "IA como Vantagem".'
  }
];

// --- STATE ---
let currentUser = null;
let userProgress = { completedLessons: [], points: 0, streak: 1, lastVisit: new Date().toISOString() };
let currentLessonId = null;
let currentSectionIndex = 0;
let currentOnboardingStep = 1;
let activityState = {}; // Guarda estado temporário da atividade atual

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
  loadProgress();
  
  if (currentUser) {
    if (currentUser.onboardingCompleted) {
      if(currentUser.role === 'admin'){
        navigateTo('admin');
      } else {
        navigateTo('app');
      }
    } else {
      navigateTo('onboarding');
    }
  }

  // Bind event listeners
  document.getElementById('login-form')?.addEventListener('submit', handleLogin);
  document.getElementById('cadastro-form')?.addEventListener('submit', handleCadastro);
  document.getElementById('perfil-form')?.addEventListener('submit', saveProfile);
  
  // Create icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
});

// --- LOCAL STORAGE ---
function saveProgress() {
  localStorage.setItem('desvendeIA_progress', JSON.stringify(userProgress));
  localStorage.setItem('desvendeIA_user', JSON.stringify(currentUser));
}

function loadProgress() {
  const storedUser = localStorage.getItem('desvendeIA_user');
  const storedProgress = localStorage.getItem('desvendeIA_progress');
  
  if (storedUser) currentUser = JSON.parse(storedUser);
  
  if (storedProgress) {
    userProgress = JSON.parse(storedProgress);
    
    // Check streak
    const last = new Date(userProgress.lastVisit);
    const now = new Date();
    const diffTime = Math.abs(now - last);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    if (diffDays > 2) {
      userProgress.streak = 1;
    } else if (diffDays === 2) {
      userProgress.streak += 1;
    }
    userProgress.lastVisit = now.toISOString();
    saveProgress();
  }
}

// --- NAVIGATION ---
function navigateTo(pageName) {
  document.querySelectorAll('.page').forEach(el => el.classList.remove('active'));
  const target = document.querySelector(`.page[data-page="${pageName}"]`);
  if (target) {
    target.classList.add('active');
    window.scrollTo(0, 0);
    
    if (pageName === 'app') {
      showView('painel');
      updateSidebarActive('painel');
    } else if (pageName === 'admin') {
      showAdminView('admin-dashboard');
    } else if (pageName === 'onboarding') {
      updateOnboardingUI();
    }
  }
}

function showView(viewName) {
  document.querySelectorAll('[data-page="app"] .view').forEach(el => el.classList.remove('active'));
  const target = document.querySelector(`.view[data-view="${viewName}"]`);
  if (target) {
    target.classList.add('active');
    window.scrollTo(0, 0);
    
    if (viewName === 'painel') refreshDashboard();
    if (viewName === 'trilha') renderModules();
    if (viewName === 'progresso') renderProgress();
    if (viewName === 'perfil') loadProfile();
    
    updateSidebarActive(viewName);
    
    // Close mobile sidebar if open
    const sidebar = document.getElementById('sidebar');
    if (sidebar && sidebar.classList.contains('open')) {
      toggleMobileSidebar();
    }
  }
}

function showAdminView(viewName) {
  document.querySelectorAll('[data-page="admin"] .admin-view').forEach(el => el.classList.remove('active'));
  const target = document.querySelector(`.admin-view[data-view="${viewName}"]`);
  if (target) {
    target.classList.add('active');
    window.scrollTo(0, 0);
  }
}

function updateSidebarActive(viewName) {
  document.querySelectorAll('.sidebar-item').forEach(el => el.classList.remove('active'));
  const target = document.querySelector(`.sidebar-item[onclick*="'${viewName}'"]`);
  if(target) target.classList.add('active');
}

function toggleMobileSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  if (sidebar && overlay) {
    sidebar.classList.toggle('open');
    if (sidebar.classList.contains('open')) {
      overlay.style.display = 'block';
    } else {
      overlay.style.display = 'none';
    }
  }
}

// --- AUTH ---
function handleLogin(event) {
  event.preventDefault();
  const email = document.getElementById('login-email').value.trim();
  const pass = document.getElementById('login-password').value;
  
  if (!email || !pass) {
    showToast('Preencha todos os campos.', 'error');
    return;
  }
  
  const role = email.includes('admin') ? 'admin' : 'student';
  
  currentUser = {
    name: email.split('@')[0],
    email: email,
    role: role,
    onboardingCompleted: false,
    experienceLevel: '',
    learningGoal: ''
  };
  
  saveProgress();
  
  if (role === 'admin') {
    navigateTo('admin');
  } else {
    navigateTo('onboarding');
  }
}

function handleCadastro(event) {
  event.preventDefault();
  const name = document.getElementById('cadastro-nome').value.trim();
  const email = document.getElementById('cadastro-email').value.trim();
  const pass = document.getElementById('cadastro-password').value;
  
  if (!name || !email || !pass) {
    showToast('Preencha todos os campos.', 'error');
    return;
  }
  
  currentUser = {
    name: name,
    email: email,
    role: 'student',
    onboardingCompleted: false,
    experienceLevel: '',
    learningGoal: ''
  };
  
  saveProgress();
  navigateTo('onboarding');
}

function logout() {
  currentUser = null;
  userProgress = { completedLessons: [], points: 0, streak: 1, lastVisit: new Date().toISOString() };
  localStorage.removeItem('desvendeIA_user');
  localStorage.removeItem('desvendeIA_progress');
  navigateTo('landing');
}

// --- ONBOARDING ---
function selectChip(element) {
  const group = element.closest('.chip-group');
  if(group) {
    group.querySelectorAll('.chip').forEach(el => el.classList.remove('selected'));
    element.classList.add('selected');
  }
}

function handleOnboardingNext() {
  const currentStepEl = document.querySelector(`.onboarding-step[data-step="${currentOnboardingStep}"]`);
  if (currentOnboardingStep < 3) {
    // Validate selection
    const selected = currentStepEl ? currentStepEl.querySelector('.chip.selected') : null;
    if (!selected) {
      showToast('Por favor, selecione uma opção.', 'error');
      return;
    }
    
    // Save data
    if (currentOnboardingStep === 1) currentUser.experienceLevel = selected.dataset.value;
    if (currentOnboardingStep === 2) currentUser.learningGoal = selected.dataset.value;
  }
  
  if (currentOnboardingStep < 3) {
    currentOnboardingStep++;
    updateOnboardingUI();
  } else {
    // Finish onboarding
    currentUser.onboardingCompleted = true;
    saveProgress();
    navigateTo('app');
  }
}

function handleOnboardingBack() {
  if (currentOnboardingStep > 1) {
    currentOnboardingStep--;
    updateOnboardingUI();
  }
}

function updateOnboardingUI() {
  // Update Steps - use data-step attribute and active class
  document.querySelectorAll('.onboarding-step').forEach(el => el.classList.remove('active'));
  const currentStep = document.querySelector(`.onboarding-step[data-step="${currentOnboardingStep}"]`);
  if (currentStep) currentStep.classList.add('active');
  
  // Update Dots
  const dots = document.querySelectorAll('#onboarding-dots .dot');
  dots.forEach((dot, index) => {
    dot.className = 'dot';
    if (index + 1 < currentOnboardingStep) dot.classList.add('completed');
    else if (index + 1 === currentOnboardingStep) dot.classList.add('active');
  });
  
  // Buttons
  const backBtn = document.getElementById('onboarding-back');
  const nextBtn = document.getElementById('onboarding-next');
  
  if (backBtn) {
    backBtn.style.display = currentOnboardingStep === 1 ? 'none' : '';
  }
  
  if (nextBtn) {
    nextBtn.textContent = currentOnboardingStep === 3 ? 'Começar a aprender' : 'Continuar';
  }
}

// --- DASHBOARD ---
function refreshDashboard() {
  if(!currentUser) return;
  const nameSpan = document.getElementById('user-display-name');
  if (nameSpan) nameSpan.textContent = currentUser.name || 'Estudante';
  
  const elStatLessons = document.getElementById('stat-lessons');
  const elStatPoints = document.getElementById('stat-points');
  const elStatStreak = document.getElementById('stat-streak');
  
  if (elStatLessons) elStatLessons.textContent = userProgress.completedLessons.length;
  if (elStatPoints) elStatPoints.textContent = userProgress.points;
  if (elStatStreak) elStatStreak.textContent = userProgress.streak;
  
  const progressPercent = Math.round((userProgress.completedLessons.length / lessonsData.length) * 100) || 0;
  const pb = document.getElementById('track-progress-bar');
  if(pb) pb.style.width = `${progressPercent}%`;
  
  // Next lesson card
  const nextLesson = getNextLesson();
  const card = document.getElementById('next-lesson-card');
  if (nextLesson && card) {
    card.innerHTML = `
      <h3>${nextLesson.title}</h3>
      <p class="lesson-meta"><i data-lucide="clock"></i> ~${nextLesson.estimatedMinutes} min</p>
      <button class="btn btn-primary" onclick="startLesson(${nextLesson.id})">Continuar Trilha</button>
    `;
    if (typeof lucide !== 'undefined') lucide.createIcons();
  } else if (card) {
    card.innerHTML = `
      <h3>Trilha Concluída!</h3>
      <p>Parabéns, você completou todas as lições desta trilha.</p>
    `;
  }
}

function startNextLesson() {
  const next = getNextLesson();
  if(next) startLesson(next.id);
}

function getNextLesson() {
  return lessonsData.find(l => !userProgress.completedLessons.includes(l.id));
}

// --- TRACK VIEW ---
function renderModules() {
  const container = document.getElementById('modules-container');
  if(!container) return;
  container.innerHTML = '';
  
  let firstUncompletedFound = false;

  trackData.modules.forEach((mod, index) => {
    const modEl = document.createElement('div');
    modEl.className = 'module-card';
    
    const lessonsHtml = mod.lessons.map(lessonId => {
      const lesson = lessonsData.find(l => l.id === lessonId);
      if(!lesson) return '';
      
      const isCompleted = userProgress.completedLessons.includes(lessonId);
      let isCurrent = false;
      
      if (!isCompleted && !firstUncompletedFound) {
        isCurrent = true;
        firstUncompletedFound = true;
      }
      
      let icon = 'circle';
      let iconClass = 'lesson-icon';
      let rowClass = 'lesson-row';
      
      if (isCompleted) {
        icon = 'check-circle';
        iconClass += ' text-success';
        rowClass += ' completed';
      } else if (isCurrent) {
        icon = 'play-circle';
        iconClass += ' text-primary';
        rowClass += ' current';
      }
      
      return `
        <div class="${rowClass}" onclick="startLesson(${lessonId})">
          <div class="lesson-info">
            <i data-lucide="${icon}" class="${iconClass}"></i>
            <span class="lesson-title">${lesson.title}</span>
          </div>
          <span class="lesson-duration">${lesson.estimatedMinutes} min</span>
        </div>
      `;
    }).join('');

    modEl.innerHTML = `
      <div class="module-header" onclick="toggleModule(${index})">
        <div class="module-header-info">
          <h3>Módulo ${index + 1}: ${mod.title}</h3>
          <p>${mod.description}</p>
        </div>
        <i data-lucide="chevron-down" class="module-chevron" id="chevron-${index}"></i>
      </div>
      <div class="module-lessons show" id="module-${index}-lessons">
        ${lessonsHtml}
      </div>
    `;
    container.appendChild(modEl);
  });
  
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

function toggleModule(index) {
  const content = document.getElementById(`module-${index}-lessons`);
  const chevron = document.getElementById(`chevron-${index}`);
  if(content) content.classList.toggle('show');
  if(chevron) chevron.classList.toggle('expanded');
}

// --- LESSON SYSTEM ---
function startLesson(lessonId) {
  currentLessonId = lessonId;
  currentSectionIndex = 0;
  activityState = {};
  
  const lesson = lessonsData.find(l => l.id === lessonId);
  if(!lesson) return;
  
  // Set headers
  const headerTitle = document.getElementById('lesson-header-title');
  if(headerTitle) headerTitle.textContent = lesson.title;
  
  const body = document.getElementById('lesson-body');
  if(body) body.innerHTML = ''; // Clear previous
  
  showView('licao');
  renderLessonSection();
}

function renderLessonSection() {
  const lesson = lessonsData.find(l => l.id === currentLessonId);
  const container = document.getElementById('lesson-body');
  const btn = document.getElementById('lesson-continue-btn');
  if(!container || !btn || !lesson) return;
  
  const wrapper = document.createElement('div');
  wrapper.className = 'lesson-section animated-in';
  
  let btnText = 'Continuar';
  let btnAction = 'nextSection()';
  
  switch(currentSectionIndex) {
    case 0: // Hook
      wrapper.classList.add('lesson-hook');
      wrapper.innerHTML = `<h2>${lesson.hook}</h2>`;
      break;
    case 1: // Explanation
      wrapper.classList.add('lesson-explanation');
      wrapper.innerHTML = lesson.explanation;
      break;
    case 2: // Visual
      wrapper.classList.add('lesson-visual');
      wrapper.innerHTML = lesson.visual;
      break;
    case 3: // Activity
      wrapper.classList.add('lesson-activity');
      let actHtml = `<h3>${lesson.activity.question}</h3>`;
      
      if (lesson.activity.type === 'multiple_choice') {
        actHtml += `<div class="activity-options">`;
        lesson.activity.options.forEach((opt, idx) => {
          actHtml += `
            <div class="activity-option" onclick="selectOption(this, ${idx})">
              <span class="option-marker"></span>
              <span class="option-text">${opt}</span>
            </div>
          `;
        });
        actHtml += `</div>`;
      } else if (lesson.activity.type === 'true_false') {
        actHtml += `<div class="tf-activity">`;
        lesson.activity.statements.forEach((stmt, idx) => {
          actHtml += `
            <div class="tf-statement">
              <p>${stmt.text}</p>
              <div class="tf-buttons">
                <button class="tf-btn" onclick="toggleTF(this, ${idx}, true)">V</button>
                <button class="tf-btn" onclick="toggleTF(this, ${idx}, false)">F</button>
              </div>
            </div>
          `;
        });
        actHtml += `</div>`;
        activityState.tfAnswers = new Array(lesson.activity.statements.length).fill(null);
      } else if (lesson.activity.type === 'ordering') {
        activityState.order = [...Array(lesson.activity.items.length).keys()];
        actHtml += `<div class="ordering-list" id="ordering-list-${currentLessonId}">`;
        actHtml += renderOrderingItems(lesson.activity.items, activityState.order);
        actHtml += `</div>`;
      }
      
      wrapper.innerHTML = actHtml;
      btnText = 'Verificar resposta';
      btnAction = 'checkAnswer()';
      break;
    case 4: // Feedback & Summary
      wrapper.classList.add('lesson-summary-box');
      wrapper.innerHTML = `
        <div class="summary-content">
          <h3>Resumo da Lição</h3>
          <p>${lesson.summary}</p>
          <div class="next-step">
            <strong>Próximo passo:</strong> ${lesson.nextStep}
          </div>
        </div>
      `;
      btnText = 'Concluir lição';
      btnAction = 'completeLesson()';
      break;
  }
  
  container.appendChild(wrapper);
  wrapper.scrollIntoView({ behavior: 'smooth', block: 'end' });
  
  // Update progress bar
  const progressPercent = (currentSectionIndex / 4) * 100;
  const fill = document.getElementById('lesson-progress-fill');
  if(fill) fill.style.width = `${progressPercent}%`;
  
  // Update step text
  const stepText = document.getElementById('lesson-step-text');
  if(stepText) stepText.textContent = `Passo ${currentSectionIndex + 1} de 5`;
  
  // Update btn
  btn.textContent = btnText;
  btn.setAttribute('onclick', btnAction);
  btn.className = 'btn btn-primary'; // reset any disabled state unless needed
  
  if (currentSectionIndex === 3) {
    btn.classList.add('disabled'); // Disable check until answered
  }
}

function nextSection() {
  if (currentSectionIndex < 4) {
    currentSectionIndex++;
    renderLessonSection();
  }
}

// Activity functions
function selectOption(element, index) {
  const container = element.closest('.activity-options');
  if(container.classList.contains('disabled')) return;
  
  container.querySelectorAll('.activity-option').forEach(el => el.classList.remove('selected'));
  element.classList.add('selected');
  activityState.selectedIndex = index;
  
  document.getElementById('lesson-continue-btn').classList.remove('disabled');
}

function toggleTF(btn, statementIndex, value) {
  const container = btn.closest('.tf-buttons');
  if(container.closest('.tf-activity').classList.contains('disabled')) return;
  
  container.querySelectorAll('.tf-btn').forEach(el => el.classList.remove('selected'));
  btn.classList.add('selected');
  
  activityState.tfAnswers[statementIndex] = value;
  
  if(activityState.tfAnswers.every(ans => ans !== null)) {
    document.getElementById('lesson-continue-btn').classList.remove('disabled');
  }
}

function renderOrderingItems(items, order) {
  return order.map((itemIdx, pos) => `
    <div class="ordering-item">
      <span>${items[itemIdx]}</span>
      <div class="ordering-controls">
        <button class="order-btn" onclick="moveItem(${pos}, -1)" ${pos === 0 ? 'disabled' : ''}>↑</button>
        <button class="order-btn" onclick="moveItem(${pos}, 1)" ${pos === items.length - 1 ? 'disabled' : ''}>↓</button>
      </div>
    </div>
  `).join('');
}

function moveItem(pos, direction) {
  const container = document.getElementById(`ordering-list-${currentLessonId}`);
  if(container.classList.contains('disabled')) return;
  
  const newPos = pos + direction;
  if(newPos >= 0 && newPos < activityState.order.length) {
    const temp = activityState.order[pos];
    activityState.order[pos] = activityState.order[newPos];
    activityState.order[newPos] = temp;
    
    const lesson = lessonsData.find(l => l.id === currentLessonId);
    container.innerHTML = renderOrderingItems(lesson.activity.items, activityState.order);
    
    document.getElementById('lesson-continue-btn').classList.remove('disabled');
  }
}

function checkAnswer() {
  const lesson = lessonsData.find(l => l.id === currentLessonId);
  const act = lesson.activity;
  let isCorrect = false;
  
  if (act.type === 'multiple_choice') {
    isCorrect = activityState.selectedIndex === act.correctIndex;
    const options = document.querySelectorAll('.activity-option');
    options.forEach(el => el.classList.add('disabled')); // Disable interaction
    if (activityState.selectedIndex !== undefined) {
       options[activityState.selectedIndex].classList.add(isCorrect ? 'correct' : 'incorrect');
    }
    options[act.correctIndex].classList.add('correct');
  } 
  else if (act.type === 'true_false') {
    isCorrect = true;
    const statements = document.querySelectorAll('.tf-statement');
    statements.forEach((stmt, idx) => {
      const isAnsCorrect = activityState.tfAnswers[idx] === act.statements[idx].correct;
      if (!isAnsCorrect) isCorrect = false;
      const btns = stmt.querySelectorAll('.tf-btn');
      btns.forEach(btn => btn.classList.add('disabled'));
    });
  }
  else if (act.type === 'ordering') {
    isCorrect = JSON.stringify(activityState.order) === JSON.stringify(act.correctOrder);
    document.getElementById(`ordering-list-${currentLessonId}`).classList.add('disabled');
  }
  
  // Disable main container interaction
  const actContainer = document.querySelector('.lesson-activity');
  actContainer.classList.add('disabled');
  
  // Show feedback
  const feedbackDiv = document.createElement('div');
  feedbackDiv.className = `lesson-feedback animated-in ${isCorrect ? 'correct' : 'incorrect'}`;
  feedbackDiv.innerHTML = `
    <h4>${isCorrect ? 'Correto!' : 'Incorreto'}</h4>
    <p>${isCorrect ? act.feedbackCorrect : act.feedbackIncorrect}</p>
  `;
  actContainer.appendChild(feedbackDiv);
  feedbackDiv.scrollIntoView({ behavior: 'smooth', block: 'end' });
  
  // Update button
  const btn = document.getElementById('lesson-continue-btn');
  btn.textContent = 'Continuar';
  btn.setAttribute('onclick', 'nextSection()');
  btn.classList.remove('disabled');
  
  // Save score percentage if needed, simple logic here
  activityState.score = isCorrect ? 100 : 0;
}

function completeLesson() {
  const lesson = lessonsData.find(l => l.id === currentLessonId);
  
  if (!userProgress.completedLessons.includes(currentLessonId)) {
    userProgress.completedLessons.push(currentLessonId);
    userProgress.points += lesson.points;
    saveProgress();
  }
  
  showConclusion(lesson.title, activityState.score || 100, lesson.points);
}

// --- CONCLUSION VIEW ---
function showConclusion(title, score, points) {
  const titleEl = document.getElementById('completed-lesson-title');
  const pointsEl = document.getElementById('earned-points');
  const scoreEl = document.getElementById('lesson-score');
  
  if (titleEl) titleEl.textContent = title;
  if (pointsEl) pointsEl.textContent = `+${points}`;
  if (scoreEl) scoreEl.textContent = `${score}%`;
  
  showView('conclusao');
}

// --- PROGRESS VIEW ---
function renderProgress() {
  const totalLessons = lessonsData.length;
  const completed = userProgress.completedLessons.length;
  const percent = Math.round((completed / totalLessons) * 100) || 0;
  
  const elPercent = document.getElementById('overall-progress-value');
  const elCompleted = document.getElementById('progress-total-completed');
  const elPoints = document.getElementById('progress-total-points');
  
  if(elPercent) elPercent.textContent = `${percent}%`;
  if(elCompleted) elCompleted.textContent = `${completed}/${totalLessons}`;
  if(elPoints) elPoints.textContent = userProgress.points;
  
  const modContainer = document.getElementById('progress-modules-container');
  if(!modContainer) return;
  modContainer.innerHTML = '';
  
  trackData.modules.forEach(mod => {
    const modLessons = mod.lessons;
    const compLessons = modLessons.filter(id => userProgress.completedLessons.includes(id)).length;
    const mPercent = Math.round((compLessons / modLessons.length) * 100);
    
    modContainer.innerHTML += `
      <div class="prog-module-item">
        <div class="prog-module-header">
          <span>${mod.title}</span>
          <span>${compLessons}/${modLessons.length}</span>
        </div>
        <div class="progress-bar">
          <div class="progress-fill" style="width: ${mPercent}%"></div>
        </div>
      </div>
    `;
  });
}

// --- PROFILE ---
function loadProfile() {
  if(!currentUser) return;
  const elNome = document.getElementById('perfil-nome');
  const elNivel = document.getElementById('perfil-nivel');
  const elObjetivo = document.getElementById('perfil-objetivo');
  
  if(elNome) elNome.value = currentUser.name || '';
  if(elNivel) elNivel.value = currentUser.experienceLevel || '';
  if(elObjetivo) elObjetivo.value = currentUser.learningGoal || '';
}

function saveProfile(event) {
  if(event) event.preventDefault();
  const elNome = document.getElementById('perfil-nome');
  const elNivel = document.getElementById('perfil-nivel');
  const elObjetivo = document.getElementById('perfil-objetivo');
  
  if(elNome) currentUser.name = elNome.value;
  if(elNivel) currentUser.experienceLevel = elNivel.value;
  if(elObjetivo) currentUser.learningGoal = elObjetivo.value;
  
  saveProgress();
  showToast('Perfil salvo com sucesso!', 'success');
  refreshDashboard();
}

// --- ADMIN ---
function adminSelectLesson() {
  const select = document.getElementById('admin-lesson-select');
  if(!select) return;
  const id = parseInt(select.value);
  if(isNaN(id)) return;
  
  const lesson = lessonsData.find(l => l.id === id);
  if(!lesson) return;
  
  const titleEl = document.getElementById('admin-title');
  const hookEl = document.getElementById('admin-hook');
  const explanationEl = document.getElementById('admin-explanation');
  
  if(titleEl) titleEl.value = lesson.title;
  if(hookEl) hookEl.value = lesson.hook;
  if(explanationEl) explanationEl.value = lesson.explanation;
}

function adminSaveLesson(event) {
  if(event) event.preventDefault();
  const select = document.getElementById('admin-lesson-select');
  if(!select) return;
  
  const id = parseInt(select.value);
  const lesson = lessonsData.find(l => l.id === id);
  
  if(lesson) {
    const titleEl = document.getElementById('admin-title');
    const hookEl = document.getElementById('admin-hook');
    const explanationEl = document.getElementById('admin-explanation');
    
    if(titleEl) lesson.title = titleEl.value;
    if(hookEl) lesson.hook = hookEl.value;
    if(explanationEl) lesson.explanation = explanationEl.value;
    
    showToast('Lição atualizada!', 'success');
  }
}

function adminPreviewLesson() {
  const select = document.getElementById('admin-lesson-select');
  if(!select) return;
  const id = parseInt(select.value);
  if(isNaN(id)) {
    showToast('Selecione uma lição primeiro.', 'error');
    return;
  }
  
  showAdminView('admin-preview');
  
  const container = document.getElementById('admin-preview-container');
  if(container) {
    // Quick render of the whole lesson
    const l = lessonsData.find(l => l.id === id);
    if(l) {
      container.innerHTML = `
        <h2>${l.title}</h2>
        <div class="lesson-section lesson-hook"><h3>${l.hook}</h3></div>
        <div class="lesson-section lesson-explanation">${l.explanation}</div>
        <div class="lesson-section lesson-visual">${l.visual}</div>
        <div class="lesson-section lesson-activity">
          <h3>Atividade: ${l.activity.type}</h3>
          <p>${l.activity.question}</p>
        </div>
        <button class="btn btn-secondary mt-3" onclick="showAdminView('admin-licao-editor')">Voltar ao Editor</button>
      `;
    }
  }
}

// --- UI HELPERS ---
function showToast(message, type = 'info') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }
  
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <span>${message}</span>
    <button onclick="this.parentElement.remove()">✕</button>
  `;
  
  container.appendChild(toast);
  
  setTimeout(() => {
    toast.style.opacity = '1';
  }, 10);
  
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

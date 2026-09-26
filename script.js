
// DADOS LOCAIS DE FALLBACK PARA RENDERIZAÇÃO GARANTIDA
const fallbackTrackData = {
  id: 1,
  title: 'IA sem Mistério',
  modules: [
    {
      id: 1,
      title: 'Entendendo o Básico',
      description: '3 lições · ~15 min',
      lessons: [
        { id: 1, title: 'O que é inteligência artificial, afinal?', estimated_minutes: 5 },
        { id: 2, title: 'O que a IA pode (e não pode) fazer', estimated_minutes: 5 },
        { id: 3, title: 'Como a IA "aprende"', estimated_minutes: 5 }
      ]
    },
    {
      id: 2,
      title: 'Suas Primeiras Conversas com IA',
      description: '3 lições · ~15 min',
      lessons: [
        { id: 4, title: 'Conhecendo uma ferramenta de IA', estimated_minutes: 5 },
        { id: 5, title: 'Como fazer um pedido claro (Prompting)', estimated_minutes: 6 },
        { id: 6, title: 'Melhorando e refinando as respostas', estimated_minutes: 5 }
      ]
    },
    {
      id: 3,
      title: 'IA na Prática',
      description: '3 lições · ~18 min',
      lessons: [
        { id: 7, title: 'IA para estudo e pesquisa acelerada', estimated_minutes: 6 },
        { id: 8, title: 'IA para escrita, e-mails e comunicação', estimated_minutes: 6 },
        { id: 9, title: 'IA para organização e criatividade no dia a dia', estimated_minutes: 6 }
      ]
    },
    {
      id: 4,
      title: 'Usando IA com Responsabilidade',
      description: '3 lições · ~15 min',
      lessons: [
        { id: 10, title: 'Como conferir o que a IA responde (Checagem)', estimated_minutes: 5 },
        { id: 11, title: 'Cuidados com dados pessoais e sigilo', estimated_minutes: 5 },
        { id: 12, title: 'Desafio final: coloque tudo em prática!', estimated_minutes: 5 }
      ]
    }
  ]
};

const fallbackProgressData = {
  completedLessons: [1, 2],
  totalPoints: 80,
  streak: 1
};

// ==========================================================================
// DESVENDE IA — CLIENT-SIDE NETFLIX MEMBER AREA & API REST INTEGRATION
// ==========================================================================

const API_BASE = '/api';

// Estado global do cliente
let token = localStorage.getItem('token') || null;
let currentUser = null;
let currentLessonData = null;
let currentSectionIndex = 0;
let activityState = {};
let currentOnboardingStep = 1;
let adminHasUnsavedChanges = false;

// DADOS MOCK DOS CURSOS EM ESTILO NETFLIX (FORMATO PÔSTER VERTICAL 2:3)
const netflixCoursesData = {
  fundamentos: [
    {
      id: 'c-1',
      title: 'Introdução à IA Neural',
      prefix: 'Introdução à',
      keyword: 'IA NEURAL',
      caption: 'Introdução à IA Neural',
      progress: 65,
      cover: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=600&auto=format&fit=crop',
      lessonsCount: 8,
      duration: '45 min'
    },
    {
      id: 'c-2',
      title: 'Machine Learning Avançado',
      prefix: 'Conceitos de',
      keyword: 'MACHINE LEARNING',
      caption: 'Machine Learning Avançado',
      progress: 40,
      cover: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?q=80&w=600&auto=format&fit=crop',
      lessonsCount: 10,
      duration: '60 min'
    },
    {
      id: 'c-3',
      title: 'Processamento de Linguagem (NLP)',
      prefix: 'Modelos de',
      keyword: 'LINGUAGEM (NLP)',
      caption: 'Processamento de Linguagem',
      progress: 80,
      cover: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop',
      lessonsCount: 6,
      duration: '35 min'
    },
    {
      id: 'c-4',
      title: 'Visão Computacional',
      prefix: 'Visão por',
      keyword: 'COMPUTAÇÃO',
      caption: 'Visão Computacional',
      progress: 20,
      cover: 'https://images.unsplash.com/photo-1507146426996-ef05306b995a?q=80&w=600&auto=format&fit=crop',
      lessonsCount: 7,
      duration: '40 min'
    },
    {
      id: 'c-5',
      title: 'Engenharia de Prompts',
      prefix: 'Engenharia de',
      keyword: 'PROMPTS',
      caption: 'Engenharia de Prompts',
      progress: 90,
      cover: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=600&auto=format&fit=crop',
      lessonsCount: 5,
      duration: '30 min'
    }
  ],
  destaque: [
    {
      id: 'c-6',
      title: 'Masterclass de LLM',
      prefix: 'Masterclass de',
      keyword: 'MODELOS LLM',
      caption: 'Masterclass de LLM',
      progress: 50,
      cover: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=600&auto=format&fit=crop',
      lessonsCount: 12,
      duration: '90 min'
    },
    {
      id: 'c-7',
      title: 'IA e Negócios',
      prefix: 'Estratégia de',
      keyword: 'IA E NEGÓCIOS',
      caption: 'IA e Negócios',
      progress: 30,
      cover: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop',
      lessonsCount: 8,
      duration: '50 min'
    },
    {
      id: 'c-8',
      title: 'IA no Dia a Dia e Produtividade',
      prefix: 'IA no Dia a Dia e',
      keyword: 'PRODUTIVIDADE',
      caption: 'IA no Dia a Dia',
      progress: 100,
      cover: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=600&auto=format&fit=crop',
      lessonsCount: 6,
      duration: '40 min'
    },
    {
      id: 'c-9',
      title: 'IA com Responsabilidade e Ética',
      prefix: 'Uso com Ética e',
      keyword: 'SEGURANÇA',
      caption: 'IA com Responsabilidade',
      progress: 75,
      cover: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600&auto=format&fit=crop',
      lessonsCount: 5,
      duration: '30 min'
    }
  ],
  aulas: [
    {
      id: 'c-10',
      title: 'GESTÃO DE CARREIRA',
      prefix: 'Plano de',
      keyword: 'GESTÃO DE CARREIRA',
      caption: 'Gestão de Carreira',
      progress: 100,
      cover: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=600&auto=format&fit=crop',
      lessonsCount: 1,
      duration: '25 min'
    },
    {
      id: 'c-11',
      title: 'PROCESSOS NA GESTÃO DE CRISES',
      prefix: 'Processos na',
      keyword: 'GESTÃO DE CRISES',
      caption: 'Gestão de Crises',
      progress: 85,
      cover: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=600&auto=format&fit=crop',
      lessonsCount: 1,
      duration: '30 min'
    },
    {
      id: 'c-12',
      title: 'ORGANIZAÇÃO FINANCEIRA COM IA',
      prefix: 'Finanças com',
      keyword: 'ORGANIZAÇÃO FINANCEIRA',
      caption: 'Organização Financeira',
      progress: 60,
      cover: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=600&auto=format&fit=crop',
      lessonsCount: 1,
      duration: '20 min'
    },
    {
      id: 'c-13',
      title: 'POTENCIALIZANDO A ROTINA DE ESTUDOS',
      prefix: 'Rotina de',
      keyword: 'ESTUDOS DE ALTA PERFORMANCE',
      caption: 'Rotina de Estudos',
      progress: 45,
      cover: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=600&auto=format&fit=crop',
      lessonsCount: 1,
      duration: '35 min'
    }
  ]
};

// --- INICIALIZAÇÃO ---
document.addEventListener('DOMContentLoaded', async () => {
  renderNetflixCarousels();

  if (token) {
    try {
      const res = await apiFetch('/auth/me');
      if (res && res.user) {
        currentUser = res.user;
        updateUserUI();
      } else {
        logout();
      }
    } catch (e) {
      console.warn('Sessão expirada:', e);
      logout();
    }
  }

  // Bind forms
  const loginForm = document.getElementById('login-form');
  if (loginForm) loginForm.addEventListener('submit', handleLogin);

  const cadastroForm = document.getElementById('cadastro-form');
  if (cadastroForm) cadastroForm.addEventListener('submit', handleCadastro);

  const perfilForm = document.getElementById('perfil-form');
  if (perfilForm) perfilForm.addEventListener('submit', saveProfile);

  // Monitorar alterações no formulário de admin
  const adminForm = document.getElementById('admin-lesson-form');
  if (adminForm) {
    adminForm.addEventListener('input', () => {
      adminHasUnsavedChanges = true;
    });
  }

  // Iniciar ícones
  if (typeof lucide !== 'undefined') lucide.createIcons();
});

// --- RENDERIZAR CARROSSÉIS ESTILO NETFLIX ---
function renderNetflixCarousels() {
  renderTrack('track-fundamentos', netflixCoursesData.fundamentos);
  renderTrack('track-destaque', netflixCoursesData.destaque);
  renderTrack('track-aulas', netflixCoursesData.aulas);
}

function renderTrack(trackId, courses) {
  const container = document.getElementById(trackId);
  if (!container) return;

  container.innerHTML = courses.map(course => `
    <div class="course-card-wrapper" onclick="startCourseFromCard('${course.caption}')">
      <div class="course-card" style="background-image: url('${course.cover}');">
        <span class="course-card-badge">${course.lessonsCount} ${course.lessonsCount === 1 ? 'Aula' : 'Aulas'}</span>
        <div class="course-card-overlay">
          <span class="course-card-prefix">${course.prefix}</span>
          <h3 class="course-card-keyword">${course.keyword}</h3>
          <div class="course-card-progress">
            <div class="course-card-fill" style="width: ${course.progress}%;"></div>
          </div>
        </div>
      </div>
      <span class="course-card-caption">${course.caption}</span>
    </div>
  `).join('');
}

function scrollCarousel(trackId, direction) {
  const track = document.getElementById(trackId);
  if (track) {
    const scrollAmount = 300 * direction;
    track.parentElement.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  }
}

function startCourseFromCard(title) {
  showToast(`Iniciando curso: "${title}"`, 'info');
  showView('trilha');
}

// --- HELPER API FETCH COM JWT ---
async function apiFetch(endpoint, method = 'GET', body = null) {
  const headers = { 'Content-Type': 'application/json' };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config = { method, headers };
  if (body) config.body = JSON.stringify(body);

  const response = await fetch(`${API_BASE}${endpoint}`, config);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Ocorreu um erro na requisição.');
  }

  return data;
}

// --- NAVEGAÇÃO DE PÁGINAS E VISÕES ---
function navigateTo(pageName) {
  document.querySelectorAll('.page').forEach(el => el.classList.remove('active'));
  const target = document.querySelector(`.page[data-page="${pageName}"]`);
  if (target) {
    target.classList.add('active');
    window.scrollTo(0, 0);

    if (pageName === 'app') {
      showView('painel');
    } else if (pageName === 'admin') {
      showAdminView('admin-dashboard');
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
    updateDockActive(viewName);

    // Fechar menu mobile se aberto
    const sidebar = document.getElementById('sidebar');
    if (sidebar && sidebar.classList.contains('open')) toggleMobileSidebar();
  }
}

function showAdminView(viewName) {
  document.querySelectorAll('[data-page="admin"] .admin-view').forEach(el => el.classList.remove('active'));
  const target = document.querySelector(`.admin-view[data-view="${viewName}"]`);
  if (target) {
    target.classList.add('active');
    window.scrollTo(0, 0);

    if (viewName === 'admin-dashboard') loadAdminDashboard();
    if (viewName === 'admin-trilhas') loadAdminTracks();
    if (viewName === 'admin-licao-editor') loadAdminLessonsList();
  }
}

function updateSidebarActive(viewName) {
  document.querySelectorAll('.sidebar-item').forEach(el => el.classList.remove('active'));
  const target = document.querySelector(`.sidebar-item[data-view="${viewName}"]`);
  if (target) target.classList.add('active');
}

function updateDockActive(viewName) {
  document.querySelectorAll('.dock-btn').forEach(el => el.classList.remove('active'));
  if (viewName === 'painel') {
    const dashBtn = document.getElementById('dock-btn-dashboards');
    if (dashBtn) dashBtn.classList.add('active');
  }
}

function toggleMobileSidebar() {
  const sidebar = document.getElementById('sidebar') || document.querySelector('.admin-sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  if (sidebar && overlay) {
    sidebar.classList.toggle('open');
    overlay.classList.toggle('open');
  }
}

function toggleUserDropdown() {
  const dropdown = document.getElementById('user-dropdown-menu');
  if (dropdown) dropdown.classList.toggle('show');
}

// --- BUSCA GLOBAL ---
function handleSearch(query) {
  const q = query.toLowerCase().trim();
  if (!q) {
    renderNetflixCarousels();
    return;
  }

  const filteredFundamentos = netflixCoursesData.fundamentos.filter(c => c.title.toLowerCase().includes(q) || c.tag.toLowerCase().includes(q));
  const filteredDestaque = netflixCoursesData.destaque.filter(c => c.title.toLowerCase().includes(q) || c.tag.toLowerCase().includes(q));
  const filteredAulas = netflixCoursesData.aulas.filter(c => c.title.toLowerCase().includes(q) || c.tag.toLowerCase().includes(q));

  renderTrack('track-fundamentos', filteredFundamentos);
  renderTrack('track-destaque', filteredDestaque);
  renderTrack('track-aulas', filteredAulas);
}

// --- MODAIS DO DOCK INFERIOR ---
function openCertificadosModal() {
  const body = document.getElementById('modal-content-body');
  if (!body) return;
  body.innerHTML = `
    <h2><i data-lucide="award" style="color: var(--neon-cyan);"></i> Meus Certificados</h2>
    <p class="text-muted mb-24">Certificados emitidos após a conclusão dos cursos da plataforma.</p>
    <div class="feature-card mb-16">
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <div>
          <strong>Certificado: IA sem Mistério</strong>
          <p class="text-muted" style="font-size: 13px;">Conclua 100% da trilha para liberar seu certificado digital.</p>
        </div>
        <button class="btn btn-outline btn-sm" disabled>Download (Em breve)</button>
      </div>
    </div>
  `;
  document.getElementById('modal-overlay').classList.add('show');
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

function openComunidadeModal() {
  const body = document.getElementById('modal-content-body');
  if (!body) return;
  body.innerHTML = `
    <h2><i data-lucide="users" style="color: var(--neon-purple);"></i> Comunidade de Alunos</h2>
    <p class="text-muted mb-24">Troque experiências, dúvidas e modelos de prompts com outros membros.</p>
    <div class="feature-card mb-16">
      <h3>Grupo VIP Discord & WhatsApp</h3>
      <p class="text-muted" style="font-size: 14px; margin-bottom: 16px;">Junte-se a mais de 1.200 alunos praticando IA diariamente.</p>
      <button class="btn btn-primary btn-sm" onclick="showToast('Link da comunidade liberado!', 'success')">Entrar na Comunidade</button>
    </div>
  `;
  document.getElementById('modal-overlay').classList.add('show');
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

function openSuporteModal() {
  const body = document.getElementById('modal-content-body');
  if (!body) return;
  body.innerHTML = `
    <h2><i data-lucide="help-circle" style="color: var(--accent-orange);"></i> Suporte ao Aluno</h2>
    <p class="text-muted mb-24">Fale com nossa equipe técnica de atendimento.</p>
    <div class="form-group">
      <label>Qual sua dúvida?</label>
      <textarea rows="4" placeholder="Descreva sua dúvida sobre as aulas ou o sistema..."></textarea>
    </div>
    <button class="btn btn-primary btn-block" onclick="closeModal(); showToast('Mensagem enviada ao suporte com sucesso!', 'success')">Enviar Mensagem</button>
  `;
  document.getElementById('modal-overlay').classList.add('show');
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

function toggleNotificationsModal() {
  showToast('Você tem 3 novas notificações de conteúdo!', 'info');
}

function closeModal() {
  const overlay = document.getElementById('modal-overlay');
  if (overlay) overlay.classList.remove('show');
}

// --- AUTENTICAÇÃO REAL ---
async function handleLogin(event) {
  event.preventDefault();
  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value;

  try {
    const data = await apiFetch('/auth/login', 'POST', { email, password });
    token = data.token;
    localStorage.setItem('token', token);
    currentUser = data.user;

    showToast(data.message, 'success');
    updateUserUI();

    if (!currentUser.onboardingCompleted) {
      navigateTo('onboarding');
    } else if (currentUser.role === 'ADMIN') {
      navigateTo('admin');
    } else {
      navigateTo('app');
    }
  } catch (err) {
    showToast(err.message, 'error');
  }
}

async function handleCadastro(event) {
  event.preventDefault();
  const name = document.getElementById('cadastro-nome').value.trim();
  const email = document.getElementById('cadastro-email').value.trim();
  const password = document.getElementById('cadastro-password').value;

  try {
    const data = await apiFetch('/auth/register', 'POST', { name, email, password });
    token = data.token;
    localStorage.setItem('token', token);
    currentUser = data.user;

    showToast(data.message, 'success');
    updateUserUI();
    navigateTo('onboarding');
  } catch (err) {
    showToast(err.message, 'error');
  }
}

function handleRecuperar(event) {
  event.preventDefault();
  const email = document.getElementById('recuperar-email').value;
  showToast(`Link de recuperação enviado para ${email}.`, 'info');
  setTimeout(() => navigateTo('login'), 2000);
}

function logout() {
  token = null;
  currentUser = null;
  localStorage.removeItem('token');
  navigateTo('landing');
  showToast('Você saiu da sua conta com segurança.', 'info');
}

function updateUserUI() {
  if (!currentUser) return;

  const displayName = document.getElementById('user-display-name');
  if (displayName) displayName.textContent = currentUser.name;

  const topbarName = document.getElementById('user-name-topbar');
  if (topbarName) topbarName.textContent = currentUser.name;

  const dropdownName = document.getElementById('dropdown-user-name');
  if (dropdownName) dropdownName.textContent = currentUser.name;

  const dropdownEmail = document.getElementById('dropdown-user-email');
  if (dropdownEmail) dropdownEmail.textContent = currentUser.email;

  const sidebarName = document.getElementById('sidebar-user-name');
  if (sidebarName) sidebarName.textContent = currentUser.name;

  const initials = currentUser.name ? currentUser.name.substring(0, 3).toUpperCase() : 'EST';

  const avatarTopbar = document.getElementById('user-avatar-initials');
  if (avatarTopbar) avatarTopbar.textContent = initials;

  const avatarSidebar = document.getElementById('sidebar-avatar-img');
  if (avatarSidebar) avatarSidebar.textContent = initials;

  const adminLink = document.getElementById('admin-link-btn');
  if (adminLink) adminLink.style.display = currentUser.role === 'ADMIN' ? 'flex' : 'none';

  const dropdownAdmin = document.getElementById('dropdown-admin-link');
  if (dropdownAdmin) dropdownAdmin.style.display = currentUser.role === 'ADMIN' ? 'flex' : 'none';
}

// --- ONBOARDING ---
function selectChip(element) {
  const group = element.closest('.chip-group');
  if (group) {
    group.querySelectorAll('.chip').forEach(el => el.classList.remove('selected'));
    element.classList.add('selected');
  }
}

async function handleOnboardingNext() {
  const currentStepEl = document.querySelector(`.onboarding-step[data-step="${currentOnboardingStep}"]`);
  if (currentOnboardingStep < 3) {
    const selected = currentStepEl ? currentStepEl.querySelector('.chip.selected') : null;
    if (!selected) {
      showToast('Por favor, selecione uma opção para continuar.', 'error');
      return;
    }

    if (currentOnboardingStep === 1) currentUser.experienceLevel = selected.dataset.value;
    if (currentOnboardingStep === 2) currentUser.learningGoal = selected.dataset.value;
  }

  if (currentOnboardingStep < 3) {
    currentOnboardingStep++;
    updateOnboardingUI();
  } else {
    try {
      const res = await apiFetch('/profile', 'PUT', {
        experienceLevel: currentUser.experienceLevel,
        learningGoal: currentUser.learningGoal,
        onboardingCompleted: true
      });
      currentUser = res.user;
      showToast('Onboarding concluído! Bem-vindo(a) ao Desvende IA.', 'success');
      navigateTo('app');
    } catch (err) {
      showToast(err.message, 'error');
    }
  }
}

function handleOnboardingBack() {
  if (currentOnboardingStep > 1) {
    currentOnboardingStep--;
    updateOnboardingUI();
  }
}

function updateOnboardingUI() {
  document.querySelectorAll('.onboarding-step').forEach(el => el.classList.remove('active'));
  const currentStep = document.querySelector(`.onboarding-step[data-step="${currentOnboardingStep}"]`);
  if (currentStep) currentStep.classList.add('active');

  const dots = document.querySelectorAll('#onboarding-dots .dot');
  dots.forEach((dot, index) => {
    dot.className = 'dot';
    if (index + 1 < currentOnboardingStep) dot.classList.add('completed');
    else if (index + 1 === currentOnboardingStep) dot.classList.add('active');
  });

  const backBtn = document.getElementById('onboarding-back');
  const nextBtn = document.getElementById('onboarding-next');

  if (backBtn) backBtn.style.display = currentOnboardingStep === 1 ? 'none' : 'block';
  if (nextBtn) nextBtn.textContent = currentOnboardingStep === 3 ? 'Começar a aprender' : 'Continuar';
}

// --- PAINEL DO ALUNO & METRICAS ---
async function refreshDashboard() {
  if (!currentUser) return;
  updateUserUI();

  try {
    const progressData = await apiFetch('/progress');
    const trackData = await apiFetch('/lessons/track');

    let totalLessonsCount = 0;
    trackData.modules.forEach(mod => {
      mod.lessons.forEach(l => totalLessonsCount++);
    });

    const pct = totalLessonsCount > 0 ? Math.round((progressData.completedLessons.length / totalLessonsCount) * 100) : 0;
    
    const progressPct = document.getElementById('track-progress-pct');
    const progressBar = document.getElementById('track-progress-bar');
    const heroPct = document.getElementById('hero-progress-pct');
    const heroFill = document.getElementById('hero-progress-fill');

    if (progressPct) progressPct.textContent = `${pct}%`;
    if (progressBar) progressBar.style.width = `${pct}%`;
    if (heroPct) heroPct.textContent = `${pct}%`;
    if (heroFill) heroFill.style.width = `${pct}%`;

    if (typeof lucide !== 'undefined') lucide.createIcons();
  } catch (err) {
    console.error('Erro ao atualizar dashboard:', err);
  }
}

// --- VISÃO DA TRILHA ---
async function renderModules() {
  const container = document.getElementById('modules-container');
  if (!container) return;

  try {
    const [trackData, progressData] = await Promise.all([
      apiFetch('/lessons/track'),
      apiFetch('/progress')
    ]);

    const completed = progressData.completedLessons;
    container.innerHTML = '';
    let firstUncompletedFound = false;

    let totalLessons = 0;
    trackData.modules.forEach(mod => {
      totalLessons += mod.lessons.length;
    });

    const totalPct = totalLessons > 0 ? Math.round((completed.length / totalLessons) * 100) : 0;
    const trackPctEl = document.getElementById('trilha-progress-pct');
    const trackBarEl = document.getElementById('trilha-progress-bar');
    if (trackPctEl) trackPctEl.textContent = `${totalPct}%`;
    if (trackBarEl) trackBarEl.style.width = `${totalPct}%`;

    trackData.modules.forEach((mod, index) => {
      const modEl = document.createElement('div');
      modEl.className = 'module-card';

      const modCompletedCount = mod.lessons.filter(l => completed.includes(l.id)).length;

      const lessonsHtml = mod.lessons.map(lesson => {
        const isCompleted = completed.includes(lesson.id);
        let isCurrent = false;

        if (!isCompleted && !firstUncompletedFound) {
          isCurrent = true;
          firstUncompletedFound = true;
        }

        let icon = isCompleted ? 'check-circle-2' : isCurrent ? 'play-circle' : 'circle';
        let rowClass = isCompleted ? 'completed' : isCurrent ? 'current' : '';
        let statusIconClass = isCompleted ? 'completed' : isCurrent ? 'current' : 'pending';

        return `
          <div class="lesson-row ${rowClass}" onclick="startLesson('${lesson.id}')">
            <div class="lesson-row-left">
              <div class="lesson-status-icon ${statusIconClass}">
                <i data-lucide="${icon}"></i>
              </div>
              <div class="lesson-row-info">
                <span class="lesson-title-text">${lesson.title}</span>
                <span class="lesson-row-meta">${lesson.estimated_minutes} min de aula · 10 pts</span>
              </div>
            </div>
            <div class="lesson-row-right">
              <button class="lesson-action-btn ${isCompleted ? 'completed' : isCurrent ? 'current' : ''}">
                ${isCompleted ? '<i data-lucide="check"></i> Concluído' : isCurrent ? '<i data-lucide="play"></i> Continuar' : '<i data-lucide="play"></i> Iniciar'}
              </button>
            </div>
          </div>
        `;
      }).join('');

      modEl.innerHTML = `
        <div class="module-header expanded" onclick="toggleModule(${index}, this)">
          <div class="module-header-left">
            <span class="module-badge">Módulo ${String(index + 1).padStart(2, '0')}</span>
            <div>
              <h3 class="module-title">${mod.title}</h3>
              <p class="module-subtitle">${mod.description}</p>
            </div>
          </div>
          <div class="module-header-right">
            <span class="module-progress-pill">${modCompletedCount}/${mod.lessons.length} Concluídas</span>
            <div class="module-chevron-box">
              <i data-lucide="chevron-down"></i>
            </div>
          </div>
        </div>
        <div class="module-lessons show" id="module-${index}-lessons">
          ${lessonsHtml}
        </div>
      `;
      container.appendChild(modEl);
    });

    if (typeof lucide !== 'undefined') lucide.createIcons();
  } catch (err) {
    console.error('Erro ao renderizar módulos:', err);
    showToast('Erro ao carregar a trilha.', 'error');
  }
}

function toggleModule(index, headerEl) {
  const content = document.getElementById(`module-${index}-lessons`);
  if (content) content.classList.toggle('show');
  if (headerEl) headerEl.classList.toggle('expanded');
}

// --- SISTEMA DE LIÇÃO PLAYER ---
async function startLesson(lessonId) {
  try {
    const data = await apiFetch(`/lessons/${lessonId}`);
    currentLessonData = data.lesson;
    currentSectionIndex = 0;
    activityState = {};

    const body = document.getElementById('lesson-body');
    if (body) body.innerHTML = '';

    showView('licao');
    renderLessonSection();
  } catch (err) {
    showToast(err.message, 'error');
  }
}

function renderLessonSection() {
  const lesson = currentLessonData;
  const container = document.getElementById('lesson-body');
  const btn = document.getElementById('lesson-continue-btn');
  if (!container || !btn || !lesson) return;

  const wrapper = document.createElement('div');
  wrapper.className = 'lesson-section';

  let btnText = 'Continuar';
  let btnAction = 'nextSection()';

  switch (currentSectionIndex) {
    case 0: // Hook
      wrapper.classList.add('lesson-hook');
      wrapper.innerHTML = `<h2>${lesson.hook_question}</h2>`;
      break;

    case 1: // Explanation
      wrapper.classList.add('lesson-explanation');
      wrapper.innerHTML = lesson.explanation;
      break;

    case 2: // Visual Example
      wrapper.classList.add('lesson-visual');
      wrapper.innerHTML = renderVisualComponent(lesson.visual_type, lesson.visualData);
      break;

    case 3: // Activity
      wrapper.classList.add('lesson-activity');
      if (lesson.question) {
        let qHtml = `<h3>${lesson.question.text}</h3>`;
        if (lesson.question.type === 'MULTIPLE_CHOICE') {
          qHtml += `<div class="activity-options">`;
          lesson.question.options.forEach((opt, idx) => {
            qHtml += `
              <div class="activity-option" onclick="selectOption(this, ${idx})">
                <span class="option-marker"></span>
                <span>${opt}</span>
              </div>
            `;
          });
          qHtml += `</div>`;
        } else if (lesson.question.type === 'TRUE_FALSE') {
          qHtml += `<div class="activity-options">`;
          lesson.question.options.forEach((stmt, idx) => {
            qHtml += `
              <div class="tf-statement mb-16">
                <p><strong>${idx + 1}.</strong> ${stmt}</p>
                <div class="chip-group" style="flex-direction: row; gap: 8px;">
                  <button class="btn btn-outline btn-sm tf-btn" onclick="selectTF(this, ${idx}, true)">Verdadeiro</button>
                  <button class="btn btn-outline btn-sm tf-btn" onclick="selectTF(this, ${idx}, false)">Falso</button>
                </div>
              </div>
            `;
          });
          qHtml += `</div>`;
          activityState.tfAnswers = new Array(lesson.question.options.length).fill(null);
        }
        wrapper.innerHTML = qHtml;
        btnText = 'Verificar resposta';
        btnAction = 'checkAnswer()';
      }
      break;

    case 4: // Summary & Next Step
      wrapper.classList.add('lesson-explanation');
      wrapper.innerHTML = `
        <div class="feature-card">
          <h3>Resumo das Ideias Essenciais</h3>
          <p>${lesson.summary}</p>
          <div class="mt-16" style="border-top: 1px solid var(--border); padding-top: 12px;">
            <strong>Próximo passo:</strong> ${lesson.next_step_hint}
          </div>
        </div>
      `;
      btnText = 'Concluir lição';
      btnAction = 'completeLesson()';
      break;
  }

  container.appendChild(wrapper);
  wrapper.scrollIntoView({ behavior: 'smooth', block: 'end' });

  const progressPercent = ((currentSectionIndex + 1) / 5) * 100;
  const fill = document.getElementById('lesson-progress-fill');
  if (fill) fill.style.width = `${progressPercent}%`;

  const stepText = document.getElementById('lesson-step-text');
  if (stepText) stepText.textContent = `Passo ${currentSectionIndex + 1} de 5`;

  btn.textContent = btnText;
  btn.setAttribute('onclick', btnAction);
  btn.classList.remove('disabled');

  if (currentSectionIndex === 3) {
    btn.classList.add('disabled');
  }
}

function renderVisualComponent(type, data) {
  if (type === 'COMPARISON' && data.table) {
    let rows = data.table.map(r => `<tr><td>${r.trad}</td><td><strong>${r.ia}</strong></td></tr>`).join('');
    return `<div class="comparison-table"><table><thead><tr><th>Tarefa / Contexto</th><th>Instrução / Ação</th></tr></thead><tbody>${rows}</tbody></table></div>`;
  } else if (type === 'STEPS' && data.steps) {
    let steps = data.steps.map(s => `<div class="step-item"><div class="mod-num">✓</div><div>${s}</div></div>`).join('');
    return `<div class="steps-visual">${steps}</div>`;
  } else if (type === 'CHAT' && data.user) {
    return `<div class="chat-example"><div class="chat-bubble user"><strong>Você:</strong> ${data.user}</div><div class="chat-bubble ai"><strong>IA:</strong> ${data.ai}</div></div>`;
  } else if (type === 'TWO_COLUMNS' && data.can) {
    let cans = data.can.map(c => `<li>✅ ${c}</li>`).join('');
    let cannots = data.cannot.map(c => `<li>❌ ${c}</li>`).join('');
    return `<div class="form-row"><div class="flex-1"><h4>A IA Pode:</h4><ul>${cans}</ul></div><div class="flex-1"><h4>A IA Não Pode:</h4><ul>${cannots}</ul></div></div>`;
  }
  return `<p class="text-muted">Exemplo visual prático da lição.</p>`;
}

function nextSection() {
  if (currentSectionIndex < 4) {
    currentSectionIndex++;
    renderLessonSection();
  }
}

function selectOption(el, index) {
  const parent = el.closest('.activity-options');
  if (parent.classList.contains('disabled')) return;

  parent.querySelectorAll('.activity-option').forEach(o => o.classList.remove('selected'));
  el.classList.add('selected');
  activityState.selectedIndex = index;

  document.getElementById('lesson-continue-btn').classList.remove('disabled');
}

function selectTF(btn, statementIdx, val) {
  const group = btn.closest('.chip-group');
  group.querySelectorAll('.tf-btn').forEach(b => b.classList.remove('btn-primary'));
  btn.classList.add('btn-primary');

  activityState.tfAnswers[statementIdx] = val;
  if (activityState.tfAnswers.every(a => a !== null)) {
    document.getElementById('lesson-continue-btn').classList.remove('disabled');
  }
}

async function checkAnswer() {
  const q = currentLessonData.question;
  let isCorrect = false;

  if (q.type === 'MULTIPLE_CHOICE') {
    isCorrect = activityState.selectedIndex === q.correctAnswer;
  } else if (q.type === 'TRUE_FALSE') {
    isCorrect = JSON.stringify(activityState.tfAnswers) === JSON.stringify(q.correctAnswer);
  }

  document.querySelectorAll('.activity-option').forEach(o => o.classList.add('disabled'));

  try {
    await apiFetch('/progress/attempt', 'POST', {
      questionId: q.id,
      userAnswer: q.type === 'MULTIPLE_CHOICE' ? activityState.selectedIndex : activityState.tfAnswers,
      isCorrect
    });
  } catch (e) {
    console.warn('Erro ao gravar tentativa:', e);
  }

  const actContainer = document.querySelector('.lesson-activity');
  const feedbackDiv = document.createElement('div');
  feedbackDiv.className = `lesson-feedback ${isCorrect ? 'correct' : 'incorrect'}`;
  feedbackDiv.innerHTML = `
    <strong>${isCorrect ? 'Correto! 👏' : 'Atenção:'}</strong>
    <p>${isCorrect ? q.feedbackCorrect : q.feedbackIncorrect}</p>
  `;
  actContainer.appendChild(feedbackDiv);
  feedbackDiv.scrollIntoView({ behavior: 'smooth', block: 'end' });

  const btn = document.getElementById('lesson-continue-btn');
  btn.textContent = 'Continuar';
  btn.setAttribute('onclick', 'nextSection()');
  btn.classList.remove('disabled');
}

async function completeLesson() {
  try {
    const res = await apiFetch('/progress/complete', 'POST', {
      lessonId: currentLessonData.id,
      score: 100
    });

    const titleEl = document.getElementById('completed-lesson-title');
    const pointsEl = document.getElementById('earned-points');
    const scoreEl = document.getElementById('lesson-score');

    if (titleEl) titleEl.textContent = currentLessonData.title;
    if (pointsEl) pointsEl.textContent = `+${res.earnedPoints}`;
    if (scoreEl) scoreEl.textContent = '100%';

    showView('conclusao');
  } catch (err) {
    showToast(err.message, 'error');
  }
}

// --- PROGRESSO & PERFIL ---
async function renderProgress() {
  let progressData = fallbackProgressData;
  let trackData = fallbackTrackData;

  try {
    const [pData, tData] = await Promise.all([
      apiFetch('/progress').catch(() => null),
      apiFetch('/lessons/track').catch(() => null)
    ]);
    if (pData && pData.completedLessons) progressData = pData;
    if (tData && tData.modules) trackData = tData;
  } catch (err) {
    console.warn('Usando dados de progresso locais:', err);
  }

  let totalCount = 0;
  if (trackData && trackData.modules) {
    trackData.modules.forEach(m => totalCount += m.lessons.length);
  }

  const completedCount = (progressData.completedLessons || [1, 2]).length;
  const pct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 17;

  const overall = document.getElementById('overall-progress-value');
  const totalComp = document.getElementById('progress-total-completed');
  const totalPts = document.getElementById('progress-total-points');
  const bannerFill = document.getElementById('progresso-banner-fill');
  const bannerText = document.getElementById('progresso-banner-text');

  if (overall) overall.textContent = `${pct}%`;
  if (totalComp) totalComp.textContent = `${completedCount}/${totalCount}`;
  if (totalPts) totalPts.textContent = `${progressData.totalPoints || 80} XP`;
  if (bannerFill) bannerFill.style.width = `${pct}%`;
  if (bannerText) bannerText.textContent = `${completedCount} de ${totalCount} lições completas (${pct}% da trilha)`;

  // Atualizar dados de gamificação do header do jogador
  const userName = (currentUser && currentUser.name) ? currentUser.name : 'Gabriel Bortoleto';
  const gName = document.getElementById('game-user-name');
  const gAvatar = document.getElementById('game-user-avatar');
  const gLevel = document.getElementById('game-user-level');
  const gStreak = document.getElementById('game-user-streak');

  if (gName) gName.textContent = userName;
  if (gAvatar) gAvatar.textContent = userName ? userName.substring(0, 2).toUpperCase() : 'GB';
  if (gLevel) gLevel.textContent = Math.floor(completedCount / 3) + 1;
  if (gStreak) gStreak.textContent = `${progressData.streak || 1} Dia(s)`;

  // RENDERIZAR O MAPA INTERATIVO DO JOGO (GARANTIDO)
  renderGameMap(trackData, progressData.completedLessons || [1, 2]);

  // Atualizar conquistas desbloqueadas
  updateAchievements(completedCount, progressData.totalPoints || 80, progressData.streak || 1);

  // Módulos detalhados
  const container = document.getElementById('progress-modules-container');
  if (container && trackData.modules) {
    container.innerHTML = trackData.modules.map((mod, idx) => {
      const modComp = mod.lessons.filter(l => (progressData.completedLessons || []).includes(l.id)).length;
      const modPct = mod.lessons.length > 0 ? Math.round((modComp / mod.lessons.length) * 100) : 0;
      return `
        <div class="progresso-module-card mb-16">
          <div class="progresso-module-header">
            <div class="progresso-module-title-box">
              <span class="progresso-mod-badge">Módulo ${String(idx + 1).padStart(2, '0')}</span>
              <strong class="progresso-mod-title">${mod.title}</strong>
            </div>
            <div class="progresso-mod-stats">
              <span class="progresso-mod-count">${modComp} de ${mod.lessons.length} aulas</span>
              <span class="progresso-mod-pct">${modPct}%</span>
            </div>
          </div>
          <div class="progress-bar mt-12">
            <div class="progress-fill" style="width: ${modPct}%;"></div>
          </div>
        </div>
      `;
    }).join('');
  }

  if (typeof lucide !== 'undefined') lucide.createIcons();
}

function renderGameMap(trackData, completedLessons) {
  const container = document.getElementById('game-map-board');
  if (!container) return;

  let allLessons = [];
  if (trackData && trackData.modules) {
    trackData.modules.forEach(mod => {
      if (mod.lessons) {
        mod.lessons.forEach(l => {
          allLessons.push({ ...l, moduleTitle: mod.title, moduleId: mod.id });
        });
      }
    });
  }

  const firstIncompleteLesson = allLessons.find(l => !completedLessons.includes(l.id));
  const currentLessonId = firstIncompleteLesson ? firstIncompleteLesson.id : (allLessons[allLessons.length - 1]?.id || 1);

  let html = '<div class="game-map-trail">';
  let currentModuleId = null;

  const positions = ['pos-center', 'pos-right', 'pos-center', 'pos-left'];

  allLessons.forEach((lesson, index) => {
    const isCompleted = completedLessons.includes(lesson.id);
    const isCurrent = lesson.id === currentLessonId && !isCompleted;
    const isLocked = !isCompleted && !isCurrent;

    if (lesson.moduleId !== currentModuleId) {
      currentModuleId = lesson.moduleId;
      const modObj = trackData.modules.find(m => m.id === currentModuleId);
      html += `
        <div class="map-stage-divider">
          <span class="stage-chip">Módulo ${currentModuleId}</span>
          <h4>${modObj ? modObj.title : ''}</h4>
        </div>
      `;
    }

    const posClass = positions[index % 4];
    let statusClass = 'locked';
    let iconContent = '<i data-lucide="lock"></i>';
    let badgeText = 'Bloqueado';

    if (isCompleted) {
      statusClass = 'completed';
      iconContent = '<i data-lucide="check"></i>';
      badgeText = 'Concluído (+10 XP)';
    } else if (isCurrent) {
      statusClass = 'current';
      iconContent = '<i data-lucide="play"></i>';
      badgeText = 'JOGAR FASE';
    }

    html += `
      <div class="game-node-wrapper ${posClass} ${statusClass}" onclick="${isLocked ? "showToast('Conclua as lições anteriores para desbloquear esta fase!', 'info')" : `startLesson(${lesson.id})`}">
        ${isCurrent ? '<div class="player-current-marker">🕹️ SUA FASE ATUAL</div>' : ''}
        <div class="game-node">
          <span class="node-number">${index + 1}</span>
          <div class="node-icon">${iconContent}</div>
        </div>
        <div class="node-details">
          <strong>${lesson.title}</strong>
          <span class="node-meta">${badgeText} · ~${lesson.estimated_minutes || 5} min</span>
        </div>
      </div>
    `;

    if (index < allLessons.length - 1) {
      html += `<div class="trail-connector ${isCompleted ? 'completed' : ''}"></div>`;
    }
  });

  html += '</div>';
  container.innerHTML = html;
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

function updateAchievements(completedCount, totalPoints, streak) {
  const ach1 = document.getElementById('ach-1');
  const ach2 = document.getElementById('ach-2');
  const ach3 = document.getElementById('ach-3');
  const ach4 = document.getElementById('ach-4');

  if (ach1) ach1.className = `achievement-item ${completedCount >= 1 ? 'unlocked' : 'locked'}`;
  if (ach2) ach2.className = `achievement-item ${totalPoints >= 50 ? 'unlocked' : 'locked'}`;
  if (ach3) ach3.className = `achievement-item ${streak >= 3 ? 'unlocked' : 'locked'}`;
  if (ach4) ach4.className = `achievement-item ${completedCount >= 12 ? 'unlocked' : 'locked'}`;
}

function loadProfile() {
  if (!currentUser) return;
  const nome = document.getElementById('perfil-nome');
  const email = document.getElementById('perfil-email');
  const nivel = document.getElementById('perfil-nivel');
  const obj = document.getElementById('perfil-objetivo');

  if (nome) nome.value = currentUser.name || '';
  if (email) email.value = currentUser.email || '';
  if (nivel) nivel.value = currentUser.experienceLevel || 'NEVER';
  if (obj) obj.value = currentUser.learningGoal || '';
}

async function saveProfile(event) {
  event.preventDefault();
  const name = document.getElementById('perfil-nome').value.trim();
  const experienceLevel = document.getElementById('perfil-nivel').value;
  const learningGoal = document.getElementById('perfil-objetivo').value.trim();

  try {
    const res = await apiFetch('/profile', 'PUT', { name, experienceLevel, learningGoal });
    currentUser = res.user;
    updateUserUI();
    showToast('Perfil salvo com sucesso no banco de dados!', 'success');
  } catch (err) {
    showToast(err.message, 'error');
  }
}

// --- ÁREA ADMINISTRATIVA ---
async function loadAdminDashboard() {
  try {
    const data = await apiFetch('/admin/stats');
    const s = data.stats;

    document.getElementById('admin-stat-students').textContent = s.students;
    document.getElementById('admin-stat-lessons').textContent = s.publishedLessons;
    document.getElementById('admin-stat-modules').textContent = s.modules;
    document.getElementById('admin-stat-tracks').textContent = s.tracks;

    const activityList = document.getElementById('admin-activity-container');
    if (activityList) {
      if (data.recentActivity.length === 0) {
        activityList.innerHTML = '<p class="text-muted">Nenhuma atividade recente registrada.</p>';
      } else {
        activityList.innerHTML = data.recentActivity.map(act => `
          <div class="activity-item">
            <i data-lucide="check-circle"></i>
            <span>${act.text}</span>
            <span class="activity-time">${new Date(act.time).toLocaleTimeString()}</span>
          </div>
        `).join('');
      }
      if (typeof lucide !== 'undefined') lucide.createIcons();
    }
  } catch (e) {
    showToast('Erro ao carregar dados do admin.', 'error');
  }
}

async function loadAdminTracks() {
  try {
    const data = await apiFetch('/admin/tracks');
    const tbody = document.getElementById('admin-tracks-tbody');
    if (tbody) {
      tbody.innerHTML = data.tracks.map(t => `
        <tr>
          <td><strong>${t.title}</strong></td>
          <td><span class="status-badge published">${t.status}</span></td>
          <td>${t.modules_count}</td>
          <td>${t.lessons_count}</td>
          <td>
            <button class="btn btn-outline btn-sm" onclick="showAdminView('admin-licao-editor')">Gerenciar Lições</button>
          </td>
        </tr>
      `).join('');
    }
  } catch (e) {
    showToast('Erro ao carregar trilhas.', 'error');
  }
}

async function loadAdminLessonsList() {
  try {
    const data = await apiFetch('/admin/lessons');
    const select = document.getElementById('admin-lesson-select');
    if (select) {
      select.innerHTML = data.lessons.map(l => `
        <option value="${l.id}">[${l.status}] ${l.moduleTitle} — ${l.title}</option>
      `).join('');

      if (data.lessons.length > 0) {
        adminSelectLesson();
      }
    }
  } catch (e) {
    showToast('Erro ao carregar lista de lições.', 'error');
  }
}

async function adminSelectLesson() {
  if (adminHasUnsavedChanges) {
    if (!confirm('Existem alterações não salvas. Deseja descartar e carregar a lição selecionada?')) {
      return;
    }
  }

  const select = document.getElementById('admin-lesson-select');
  if (!select) return;

  const id = select.value;
  try {
    const data = await apiFetch(`/admin/lessons/${id}`);
    const l = data.lesson;

    document.getElementById('admin-title').value = l.title;
    document.getElementById('admin-time').value = l.estimated_minutes;
    document.getElementById('admin-status').value = l.status;
    document.getElementById('admin-hook').value = l.hook_question;
    document.getElementById('admin-explanation').value = l.explanation;
    document.getElementById('admin-visual-type').value = l.visual_type;
    document.getElementById('admin-visual-data').value = l.visual_data;
    document.getElementById('admin-summary').value = l.summary;
    document.getElementById('admin-next-step').value = l.next_step_hint;

    if (l.question) {
      document.getElementById('admin-question-text').value = l.question.text;
      document.getElementById('admin-question-type').value = l.question.type;
      document.getElementById('admin-question-options').value = Array.isArray(l.question.options) ? l.question.options.join('\n') : '';
      document.getElementById('admin-correct-answer').value = JSON.stringify(l.question.correctAnswer);
      document.getElementById('admin-feedback-correct').value = l.question.feedbackCorrect;
      document.getElementById('admin-feedback-incorrect').value = l.question.feedbackIncorrect;
    }

    const badge = document.getElementById('admin-editor-status-badge');
    if (badge) {
      badge.textContent = l.status === 'PUBLISHED' ? 'Publicado' : 'Rascunho';
      badge.className = `status-badge ${l.status.toLowerCase()}`;
    }

    adminHasUnsavedChanges = false;
  } catch (e) {
    showToast('Erro ao carregar detalhes da lição.', 'error');
  }
}

async function adminSaveLesson(event) {
  if (event) event.preventDefault();
  const select = document.getElementById('admin-lesson-select');
  if (!select) return;

  const id = select.value;
  const optionsRaw = document.getElementById('admin-question-options').value.split('\n').filter(o => o.trim());

  let correctParsed = 0;
  try {
    correctParsed = JSON.parse(document.getElementById('admin-correct-answer').value);
  } catch (e) {
    correctParsed = 0;
  }

  const payload = {
    title: document.getElementById('admin-title').value,
    estimatedMinutes: parseInt(document.getElementById('admin-time').value),
    status: document.getElementById('admin-status').value,
    hookQuestion: document.getElementById('admin-hook').value,
    explanation: document.getElementById('admin-explanation').value,
    visualType: document.getElementById('admin-visual-type').value,
    visualData: document.getElementById('admin-visual-data').value,
    summary: document.getElementById('admin-summary').value,
    nextStepHint: document.getElementById('admin-next-step').value,
    question: {
      text: document.getElementById('admin-question-text').value,
      type: document.getElementById('admin-question-type').value,
      options: optionsRaw,
      correctAnswer: correctParsed,
      feedbackCorrect: document.getElementById('admin-feedback-correct').value,
      feedbackIncorrect: document.getElementById('admin-feedback-incorrect').value
    }
  };

  try {
    const res = await apiFetch(`/admin/lessons/${id}`, 'PUT', payload);
    showToast(res.message, 'success');
    adminHasUnsavedChanges = false;
    loadAdminLessonsList();
  } catch (err) {
    showToast(err.message, 'error');
  }
}

async function adminPublishLesson() {
  const select = document.getElementById('admin-lesson-select');
  if (!select) return;
  const id = select.value;

  const currentStatus = document.getElementById('admin-status').value;
  const newStatus = currentStatus === 'PUBLISHED' ? 'DRAFT' : 'PUBLISHED';

  try {
    const res = await apiFetch('/admin/publish', 'POST', { lessonId: id, status: newStatus });
    document.getElementById('admin-status').value = newStatus;
    showToast(res.message, 'success');
    adminSaveLesson();
  } catch (e) {
    showToast(e.message, 'error');
  }
}

async function adminPreviewLesson() {
  const select = document.getElementById('admin-lesson-select');
  if (!select) return;

  const id = select.value;
  try {
    const data = await apiFetch(`/admin/lessons/${id}`);
    currentLessonData = data.lesson;
    currentSectionIndex = 0;

    showAdminView('admin-preview');
    const container = document.getElementById('admin-preview-container');
    if (container) {
      container.innerHTML = `
        <div class="next-lesson-module">Lição: ${currentLessonData.title}</div>
        <div class="lesson-section lesson-hook"><h2>${currentLessonData.hook_question}</h2></div>
        <div class="lesson-section lesson-explanation">${currentLessonData.explanation}</div>
        <div class="lesson-section lesson-visual">${renderVisualComponent(currentLessonData.visual_type, currentLessonData.visualData)}</div>
        <div class="lesson-section feature-card">
          <h3>Resumo</h3>
          <p>${currentLessonData.summary}</p>
        </div>
      `;
    }
  } catch (e) {
    showToast('Erro ao carregar pré-visualização.', 'error');
  }
}

// --- UI TOAST HELPER ---
function showToast(message, type = 'info') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;

  container.appendChild(toast);
  setTimeout(() => toast.classList.add('show'), 10);
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

function toggleFaq(element) {
  element.classList.toggle('open');
}

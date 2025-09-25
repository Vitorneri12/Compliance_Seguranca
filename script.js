// Modern JavaScript for enhanced user experience
document.addEventListener('DOMContentLoaded', function() {
    // Add scrolled class to header on scroll
    const header = document.querySelector('.header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = header.offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Initialize chatbot after DOM is loaded
    initializeChatbot();
});

// Initialize chatbot functionality
function initializeChatbot() {
    const chatbotInput = document.getElementById('chatbot-input-field');
    if (chatbotInput) {
        chatbotInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });

        // Focus input when chatbot opens
        const chatbotButton = document.querySelector('.chatbot-button');
        if (chatbotButton) {
            chatbotButton.addEventListener('click', () => {
                setTimeout(() => {
                    const container = document.getElementById('chatbot-container');
                    if (container && container.classList.contains('active')) {
                        chatbotInput.focus();
                    }
                }, 300);
            });
        }
    }
}

// Mobile menu toggle (for future mobile menu implementation)
const createMobileMenu = () => {
    const navbar = document.querySelector('.navbar');
    const mobileToggle = document.createElement('button');
    mobileToggle.className = 'mobile-toggle';
    mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';

    // Insert mobile toggle before navbar
    navbar.parentNode.insertBefore(mobileToggle, navbar);

    mobileToggle.addEventListener('click', () => {
        navbar.classList.toggle('mobile-active');
        const icon = mobileToggle.querySelector('i');
        if (navbar.classList.contains('mobile-active')) {
            icon.className = 'fas fa-times';
        } else {
            icon.className = 'fas fa-bars';
        }
    });
};

// Form submission handler
const form = document.querySelector('.hero-form form');
if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);

        // Simple validation
        const requiredFields = ['nome', 'email', 'telefone', 'servico'];
        let isValid = true;

        requiredFields.forEach(field => {
            const input = document.getElementById(field);
            if (!data[field] || data[field].trim() === '') {
                input.style.borderColor = '#dc2626';
                isValid = false;
            } else {
                input.style.borderColor = 'rgba(0, 0, 0, 0.1)';
            }
        });

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const emailInput = document.getElementById('email');
        if (data.email && !emailRegex.test(data.email)) {
            emailInput.style.borderColor = '#dc2626';
            isValid = false;
        }

        if (isValid) {
            // Show success message
            const button = this.querySelector('.btn');
            const originalText = button.textContent;
            button.textContent = 'Enviando...';
            button.disabled = true;

            // Format message for WhatsApp
            const whatsappMessage = formatWhatsAppMessage(data);

            // Send to WhatsApp
            const whatsappURL = `https://wa.me/5519998630306?text=${encodeURIComponent(whatsappMessage)}`;

            setTimeout(() => {
                // Reset form
                this.reset();
                button.textContent = originalText;
                button.disabled = false;

                // Open WhatsApp with formatted message
                window.open(whatsappURL, '_blank');

                // Show success message
                alert('Redirecionando para WhatsApp com seus dados preenchidos!');
            }, 1000);
        } else {
            alert('Por favor, preencha todos os campos obrigatórios corretamente.');
        }
    });
}

// Function to format message for WhatsApp
function formatWhatsAppMessage(data) {
    const servicoMap = {
        'compliance': 'Consultoria em Compliance',
        'seguranca': 'Segurança Jurídica Empresarial',
        'lgpd': 'Consultoria LGPD',
        'protecao': 'Proteção Jurídica',
        'outro': 'Outro'
    };

    let message = `🏢 *SOLICITAÇÃO DE CONSULTA - MARTINS PALMEIRA & BERGAMO*\n\n`;
    message += `👤 *Nome:* ${data.nome}\n`;
    message += `📧 *E-mail:* ${data.email}\n`;
    message += `📱 *Telefone:* ${data.telefone}\n`;

    if (data.empresa) {
        message += `🏢 *Empresa:* ${data.empresa}\n`;
    }

    message += `⚖️ *Serviço de Interesse:* ${servicoMap[data.servico] || data.servico}\n`;

    if (data.mensagem) {
        message += `💬 *Mensagem:*\n${data.mensagem}\n`;
    }

    message += `\n📅 *Enviado em:* ${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR')}`;

    return message;
}

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe service cards and benefit items
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.service-card, .benefit-item');

    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Initialize mobile menu for smaller screens
    if (window.innerWidth <= 768) {
        createMobileMenu();
    }

    // Add resize listener for mobile menu
    window.addEventListener('resize', () => {
        const existingToggle = document.querySelector('.mobile-toggle');
        if (window.innerWidth <= 768 && !existingToggle) {
            createMobileMenu();
        } else if (window.innerWidth > 768 && existingToggle) {
            existingToggle.remove();
            document.querySelector('.navbar').classList.remove('mobile-active');
        }
    });
});

// Counter animation for stats
const animateCounters = () => {
    const counters = document.querySelectorAll('.stat-number');

    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        const increment = target / 50;
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (counter.textContent.includes('%')) {
                counter.textContent = Math.floor(current) + '%';
            } else {
                counter.textContent = Math.floor(current) + '+';
            }

            if (current >= target) {
                if (counter.textContent.includes('%')) {
                    counter.textContent = target + '%';
                } else {
                    counter.textContent = target + '+';
                }
                clearInterval(timer);
            }
        }, 40);
    });
};

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
    const statsSection = document.querySelector('.stats-container');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
});

// Add hover effects to service cards
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.borderTopColor = '#dc2626';
    });

    card.addEventListener('mouseleave', function() {
        this.style.borderTopColor = '#dc2626';
    });
});

// Chatbot functionality
function toggleChatbot() {
    const container = document.getElementById('chatbot-container');
    container.classList.toggle('active');
}

function handleChatInput(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

async function sendMessage() {
    const inputField = document.getElementById('chatbot-input-field');
    const message = inputField.value.trim();

    if (!message) return;

    // Disable input while processing
    inputField.disabled = true;
    const sendButton = inputField.nextElementSibling;
    sendButton.disabled = true;

    // Add user message
    addMessage(message, 'user');
    inputField.value = '';

    // Show typing indicator
    showTypingIndicator();

    // Get bot response (async)
    try {
        const botResponse = await getBotResponse(message);
        hideTypingIndicator();
        addMessage(botResponse, 'bot');
    } catch (error) {
        console.error('Erro ao enviar mensagem:', error);
        hideTypingIndicator();
        addMessage('Desculpe, houve um erro. Tente novamente em instantes.', 'bot');
    } finally {
        // Re-enable input
        inputField.disabled = false;
        sendButton.disabled = false;
        inputField.focus();
    }
}

function addMessage(text, sender) {
    const messagesContainer = document.getElementById('chatbot-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;

    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';

    // Handle line breaks and formatting
    const formattedText = text.replace(/\n/g, '<br>');
    messageContent.innerHTML = formattedText;

    messageDiv.appendChild(messageContent);
    messagesContainer.appendChild(messageDiv);

    // Smooth scroll to bottom
    setTimeout(() => {
        messagesContainer.scrollTo({
            top: messagesContainer.scrollHeight,
            behavior: 'smooth'
        });
    }, 100);
}

// Chatbot with Advanced AI Integration - COMPLIANCE VERSION
const CHATBOT_CONFIG = {
    // Context do escritório para IA - COMPLIANCE E SEGURANÇA JURÍDICA
    SYSTEM_CONTEXT: `Você é Clara, assistente virtual EXCLUSIVAMENTE do escritório de advocacia Martins Palmeira & Bergamo.

⚖️ FOCO OBRIGATÓRIO: APENAS COMPLIANCE E SEGURANÇA JURÍDICA EMPRESARIAL

INFORMAÇÕES DO ESCRITÓRIO:
- Especialização: EXCLUSIVAMENTE Compliance e Segurança Jurídica Empresarial
- Localização: Swiss Park Office - Av. Antonio Artioli, 570, Sala 108, Campinas-SP
- WhatsApp: (19) 99863-0306
- Email: contato@martinspalmeiraebergamo.com.br
- Horário: Seg-Sex: 9h-18h + Plantão WhatsApp 24h
- Experiência: 15+ anos, 500+ empresas protegidas, 100% conformidade LGPD

SERVIÇOS ESPECIALIZADOS:
1. Consultoria em Compliance Empresarial (programas de conformidade, análise de riscos)
2. Segurança Jurídica para Empresas (contratos, estruturação societária, minimização de riscos)
3. Proteção Jurídica Empresarial (blindagem patrimonial, prevenção de litígios)
4. Consultoria LGPD Empresarial (adequação completa, mapeamento de dados, políticas)

REGRAS RÍGIDAS - NUNCA VIOLE:
🚨 RESPONDA APENAS sobre: compliance empresarial, LGPD, segurança jurídica, proteção empresarial, governança corporativa, análise de riscos, políticas internas, blindagem patrimonial
🚨 JAMAIS responda sobre: direito trabalhista, civil, criminal, família, consumidor, tributário (exceto se relacionado a compliance)
🚨 Se perguntarem sobre outros assuntos: "Sou especializada exclusivamente em compliance e segurança jurídica empresarial. Para outras questões jurídicas, recomendo contatar um escritório generalista. Posso ajudá-lo com questões de compliance?"
🚨 Não forneça consultoria específica - sempre direcione para consulta
🚨 Seja técnica mas acessível
🚨 Máximo 3 frases por resposta
🚨 Sempre ofereça contato: WhatsApp (19) 99863-0306`
};

// SISTEMA DE VALIDAÇÃO PARA COMPLIANCE
function isComplianceTopic(message) {
    const complianceKeywords = [
        // Termos diretos de compliance
        'compliance', 'conformidade', 'lgpd', 'proteção de dados', 'privacidade',
        'segurança jurídica', 'proteção jurídica', 'blindagem patrimonial',
        'governança', 'corporativa', 'risco', 'análise de risco', 'gestão de risco',
        'política interna', 'procedimento', 'auditoria', 'controle interno',
        'regulamentação', 'norma', 'lei', 'regulamento',
        // Termos empresariais
        'empresa', 'empresarial', 'corporativo', 'negócio', 'organização',
        'estrutura societária', 'societário', 'contrato empresarial',
        // Termos do escritório
        'martins palmeira', 'bergamo', 'advocacia', 'advogado', 'escritório',
        'consulta', 'serviços', 'contato', 'whatsapp', 'telefone'
    ];

    const nonComplianceKeywords = [
        // Direito Trabalhista
        'trabalhista', 'trabalho', 'clt', 'empregado', 'demissão', 'rescisão',
        'hora extra', 'férias', 'décimo terceiro', 'fgts', 'reclamatória trabalhista',
        // Direito Civil
        'divórcio', 'separação conjugal', 'pensão alimentícia', 'herança', 'inventário',
        // Direito Criminal
        'homicídio', 'roubo', 'furto', 'tráfico', 'prisão', 'delegacia',
        // Direito do Consumidor
        'procon', 'produto defeituoso', 'devolução produto'
    ];

    const messageLower = message.toLowerCase().trim();

    // SAUDAÇÕES E PERGUNTAS GERAIS - SEMPRE ACEITAR
    const basicGreetings = /^(ol[aá]|oi|hello|hey|e a[ií]|blz|tudo bem|bom dia|boa tarde|boa noite)[\s\!]*$/i.test(messageLower);
    const basicQuestions = /\b(como|onde|quando|quanto|que|qual|quem|por que|porque|o que|ajuda|ajudar|info|informa[çc][ãa]o|dúvida|d[uú]vida|pergunta)\b/i.test(messageLower);
    const serviceQuestions = /\b(servi[çc]os?|atua[çc][ãa]o|especialidade|fazem|trabalham|oferecem|atendimento)\b/i.test(messageLower);
    const contactQuestions = /\b(contato|telefone|whatsapp|falar|ligar|email|endere[çc]o|localiza[çc][ãa]o|fica)\b/i.test(messageLower);

    // Se é saudação básica ou pergunta geral, sempre aceitar
    if (basicGreetings || basicQuestions || serviceQuestions || contactQuestions) {
        return true;
    }

    // Se contém palavras explicitamente proibidas, rejeitar
    const hasNonComplianceKeywords = nonComplianceKeywords.some(keyword =>
        messageLower.includes(keyword)
    );

    if (hasNonComplianceKeywords) return false;

    // Se contém palavras de compliance específicas, aceitar
    const hasComplianceKeywords = complianceKeywords.some(keyword =>
        messageLower.includes(keyword)
    );

    if (hasComplianceKeywords) return true;

    // Para mensagens muito curtas (até 3 palavras), aceitar (provavelmente saudações)
    if (messageLower.split(' ').length <= 3) return true;

    // Para outras mensagens, aceitar por padrão (serão redirecionadas se necessário)
    return true;
}

// Função principal para obter resposta do bot
async function getBotResponse(userMessage) {
    try {
        console.log('Mensagem recebida:', userMessage);

        // Pequeno delay para simular digitação
        await new Promise(resolve => setTimeout(resolve, 300));

        const response = getBotResponseLocal(userMessage);

        console.log('Resposta gerada:', response);
        return response;

    } catch (error) {
        console.error('Erro no chatbot:', error);
        return 'Oi! Tive um probleminha técnico, mas estou aqui para ajudar! Pode repetir sua pergunta ou entrar em contato pelo WhatsApp (19) 99863-0306.';
    }
}

// VERSÃO COMPLIANCE - RESPOSTAS LOCAIS
function getBotResponseLocal(userMessage) {
    const message = userMessage.toLowerCase().trim();
    console.log('Processando mensagem:', message);

    // Saudações - PRIMEIRA PRIORIDADE
    if (message.includes('ola') || message.includes('olá') || message.includes('oi') ||
        message.includes('bom dia') || message.includes('boa tarde') || message.includes('boa noite') ||
        message.includes('hello') || message.includes('hey')) {
        const greetings = [
            'Olá! Sou Clara, assistente do escritório Martins Palmeira & Bergamo. Como posso ajudá-lo com compliance e segurança jurídica?',
            'Oi! Somos especialistas em compliance empresarial e LGPD. Pode me contar sua dúvida que vou orientá-lo!',
            'Olá! Tem alguma dúvida sobre compliance ou proteção de dados? Estou aqui para ajudar!',
            'Oi! Sou Clara do escritório Martins Palmeira & Bergamo, especializado em compliance. Como posso ajudá-lo hoje?'
        ];
        return greetings[Math.floor(Math.random() * greetings.length)];
    }

    // Perguntas sobre saber/conhecer/dúvidas
    if (message.includes('gostaria de saber') || message.includes('quero saber') ||
        message.includes('duvida') || message.includes('dúvida') || message.includes('pergunta') ||
        message.includes('me tire') || message.includes('esclareça') || message.includes('explique')) {
        return 'Claro! Estou aqui para esclarecer dúvidas sobre compliance, LGPD, segurança jurídica e proteção empresarial. O que você gostaria de saber?';
    }

    // Perguntas sobre ajuda
    if (message.includes('ajuda') || message.includes('ajudar') || message.includes('me ajude') ||
        message.includes('preciso de') || message.includes('como você') || message.includes('pode')) {
        return 'Claro! Posso ajudá-lo com compliance, LGPD, segurança jurídica e proteção empresarial. Qual sua dúvida específica?';
    }

    // Serviços
    if (message.includes('serviço') || message.includes('fazem') || message.includes('trabalham') ||
        message.includes('especialidade') || message.includes('oferecem')) {
        return 'Nossos serviços especializados:\n\n🛡️ COMPLIANCE empresarial\n📋 SEGURANÇA jurídica\n🔒 PROTEÇÃO empresarial\n⚖️ CONSULTORIA LGPD\n\nSobre qual você quer saber mais?';
    }

    // LGPD específico
    if (message.includes('lgpd') || message.includes('proteção de dados') || message.includes('privacidade') ||
        message.includes('dados pessoais') || message.includes('gdpr')) {
        return 'Oferecemos consultoria completa em LGPD: adequação, mapeamento de dados, políticas de privacidade e treinamentos. Entre em contato para uma avaliação: (19) 99863-0306';
    }

    // Compliance específico
    if (message.includes('compliance') || message.includes('conformidade') || message.includes('programa de compliance') ||
        message.includes('governança') || message.includes('risco')) {
        return 'Implementamos programas de compliance eficazes, análise de riscos e políticas internas para sua empresa. Quer saber mais? WhatsApp: (19) 99863-0306';
    }

    // Segurança jurídica
    if (message.includes('segurança jurídica') || message.includes('proteção jurídica') || message.includes('blindagem') ||
        message.includes('proteção empresarial') || message.includes('estrutura societária')) {
        return 'Oferecemos segurança jurídica integral: análise de contratos, estruturação societária e blindagem patrimonial. Vamos conversar? (19) 99863-0306';
    }

    // Contato
    if (message.includes('contato') || message.includes('telefone') || message.includes('whatsapp') ||
        message.includes('email') || message.includes('falar') || message.includes('ligar')) {
        return 'Entre em contato conosco:\n📱 WhatsApp: (19) 99863-0306\n📧 Email: contato@martinspalmeiraebergamo.com.br\n🕐 Seg-Sex: 9h-18h + Plantão 24h\n📍 Campinas-SP';
    }

    // Localização
    if (message.includes('onde') || message.includes('endereço') || message.includes('localização') ||
        message.includes('fica') || message.includes('campinas')) {
        return 'Nosso escritório fica em Campinas-SP:\n📍 Swiss Park Office\n📍 Av. Antonio Artioli, 570\n📍 Edifício Locarno - Sala 108\n🅿️ Estacionamento próprio';
    }

    // Horários
    if (message.includes('horário') || message.includes('que horas') || message.includes('funciona') ||
        message.includes('aberto') || message.includes('atende')) {
        return 'Nosso horário: Segunda a Sexta das 9h às 18h, mas temos plantão 24h pelo WhatsApp (19) 99863-0306 para emergências de compliance!';
    }

    // Preços
    if (message.includes('preço') || message.includes('valor') || message.includes('quanto') ||
        message.includes('custo') || message.includes('honorário') || message.includes('cobram')) {
        return 'Nossos valores variam conforme a complexidade do projeto. Oferecemos consulta inicial para avaliação e orçamento personalizado. Entre em contato: (19) 99863-0306!';
    }

    // Agradecimentos
    if (message.includes('obrigad') || message.includes('valeu') || message.includes('agradeço') ||
        message.includes('muito bom') || message.includes('ótimo') || message.includes('perfeito')) {
        return 'Fico feliz em ajudar! Tem mais alguma dúvida sobre compliance ou segurança jurídica? Estou aqui para orientá-lo!';
    }

    // Resposta padrão para qualquer outra mensagem
    return 'Entendi sua pergunta! Para uma orientação específica sobre compliance e segurança jurídica, recomendo falar diretamente com nossos advogados pelo WhatsApp (19) 99863-0306. Assim podemos analisar sua situação detalhadamente!';
}

// Indicadores visuais melhorados
function showTypingIndicator() {
    // Remove indicador existente se houver
    hideTypingIndicator();

    const messagesContainer = document.getElementById('chatbot-messages');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot-message typing-indicator';
    typingDiv.id = 'typing-indicator';
    typingDiv.innerHTML = `
        <div class="message-content">
            <span class="typing-dots">
                <span></span>
                <span></span>
                <span></span>
            </span>
            Clara está digitando...
        </div>
    `;
    messagesContainer.appendChild(typingDiv);

    // Smooth scroll
    setTimeout(() => {
        messagesContainer.scrollTo({
            top: messagesContainer.scrollHeight,
            behavior: 'smooth'
        });
    }, 100);
}

function hideTypingIndicator() {
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}
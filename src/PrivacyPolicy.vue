<template>
  <div class="privacy-page">
    <!-- Navbar -->
    <nav class="navbar" :class="{ scrolled: isScrolled }">
      <div class="nav-container">
        <a href="/" class="nav-logo">
          <img src="/logo-25-anos.png" alt="CBLG Advogados" class="logo-img">
        </a>
        <button class="nav-toggle" @click="isNavOpen = !isNavOpen" :aria-label="t('nav.openMenu')">
          <i class="fas fa-bars"></i>
        </button>
        <ul class="nav-links" :class="{ open: isNavOpen }">
          <li><a href="/#sobre" @click="isNavOpen = false">{{ t('nav.about') }}</a></li>
          <li><a href="/#equipe" @click="isNavOpen = false">{{ t('nav.team') }}</a></li>
          <li><a href="/#areas" @click="isNavOpen = false">{{ t('nav.areas') }}</a></li>
          <li><a href="/blog" @click="isNavOpen = false">{{ t('nav.blog') }}</a></li>
          <li><a href="/#contato" @click="isNavOpen = false">{{ t('nav.contact') }}</a></li>
        </ul>
        <LanguageToggle :inverted="!isScrolled" />
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="privacy-hero">
      <div class="container">
        <h1 class="privacy-title">{{ t('privacy.title') }}</h1>
        <p class="privacy-subtitle">{{ t('privacy.subtitle') }}</p>
      </div>
    </section>

    <!-- Content Section -->
    <section class="privacy-content">
      <div class="container">
        <div class="privacy-text">
          <template v-if="locale === 'pt'">
          <h2>I – NOSSO OBJETIVO</h2>
          <p>O escritório de advocacia denominado Castello Branco, Lobosco e Gama Advogados ("CBLG Advogados") adota medidas rigorosas de proteção de dados pessoais dos Titulares desse Direito.</p>
          
          <p>A sua privacidade é importante para nós. É política da CBLG Advogados respeitar a sua privacidade em relação a qualquer informação sua que possamos coletar. Solicitamos informações pessoais apenas quando realmente precisamos delas para lhe fornecer um serviço. Fazemo-lo por meios justos e legais, com o seu conhecimento e consentimento. Também informamos por que estamos coletando e como será usado. Apenas retemos as informações coletadas pelo tempo necessário para fornecer o serviço solicitado. Quando armazenamos dados, protegemos dentro de meios comercialmente aceitáveis ​​para evitar perdas e roubos, bem como acesso, divulgação, cópia, uso ou modificação não autorizados. Não compartilhamos informações de identificação pessoal publicamente ou com terceiros, exceto quando exigido por lei. O nosso site pode ter links para sites externos que não são operados por nós. Esteja ciente de que não temos controle sobre o conteúdo e práticas desses sites e não podemos aceitar responsabilidade por suas respectivas políticas de privacidade. Você é livre para recusar a nossa solicitação de informações pessoais, entendendo que talvez não possamos fornecer alguns dos serviços desejados. O uso continuado de nosso site será considerado como aceitação de nossas práticas em torno de privacidade e informações pessoais. Se você tiver alguma dúvida sobre como lidamos com dados do usuário e informações pessoais, entre em contato conosco.</p>
          
          <p>Diante disso, resolvemos estabelecer esta Política de Privacidade e Proteção de Dados Pessoais que expressa nosso compromisso com o Tratamento dos Dados Pessoais de modo responsável, ético, em consonância com os princípios e valores que regem a advocacia e, em especialmente, de acordo com as regras da Lei Geral de Proteção de Dados Pessoais – "LGPD" (Lei nº 13.709/2018) e demais legislações vigentes aplicáveis.</p>
          
          <p>Em reconhecimento ao caráter de constância e de dinamicidade das modificações do tratamento de dados, nosso escritório assume o compromisso de atualização periódica desta Política de Privacidade, sempre que houver a implantação de novos procedimentos de privacidade e proteção dos dados pessoais.</p>
          
          <p>Ao navegar pelos portais em páginas públicas ou privadas vinculadas ao nosso escritório de advocacia, o Usuário concorda com o tratamento de seus dados pessoais conforme descrito nesta Política de Privacidade e Proteção de Dados Pessoais.</p>
          
          <p>Havendo quaisquer dúvidas sobre esta Política de Privacidade e Proteção de Dados Pessoais, o usuário deverá entrar em contato pelo telefone 11 3816-4001 ou pelo e-mail institucional recepcao@cblg.adv.br.</p>

          <h2>II – FUNDAMENTOS</h2>
          <p>A disciplina da política de privacidade e uso de cookies, pautada principalmente no art. 2º da Lei Geral de Proteção de Dados, tem como fundamentos:</p>
          <ul>
            <li>Respeito à privacidade;</li>
            <li>Autodeterminação informativa;</li>
            <li>Liberdade de expressão, de informação, de comunicação e de opinião;</li>
            <li>Inviolabilidade da intimidade, da honra e da imagem;</li>
            <li>Desenvolvimento econômico e tecnológico e a inovação;</li>
            <li>Livre iniciativa, a livre concorrência e a defesa do consumidor; e</li>
            <li>Direitos humanos, o livre desenvolvimento da personalidade, a dignidade e o exercício da cidadania pelas pessoas naturais.</li>
          </ul>

          <h2>III – PROCESSOS GERAIS</h2>
          <p>Esta Política de Privacidade e Proteção de Dados Pessoais expressa quais dados pessoais coletamos, para que o coletamos, como, onde e por quanto tempo armazenamos e com quem compartilhamos, nos casos em que houver compartilhamento.</p>
          
          <p>Esta Política de Privacidade também define os direitos do Titular em relação aos seus dados pessoais e quem pode ser contactado para obter mais informações ou esclarecimentos a respeito desse tema.</p>
          
          <p>Nosso tratamento de dados pessoais orienta-se pela boa-fé e pelos seguintes princípios:</p>
          <ul>
            <li><strong>Finalidade:</strong> realização do tratamento para propósitos legítimos, específicos, explícitos e informados ao titular, sem possibilidade de tratamento posterior de forma incompatível com essas finalidades;</li>
            <li><strong>Adequação:</strong> compatibilidade do tratamento com as finalidades informadas ao titular, de acordo com o contexto do tratamento;</li>
            <li><strong>Necessidade:</strong> limitação do tratamento ao mínimo necessário para a realização de suas finalidades, com abrangência dos dados pertinentes, proporcionais e não excessivos em relação às finalidades do tratamento de dados;</li>
            <li><strong>Livre acesso:</strong> garantia, aos titulares, de consulta facilitada e gratuita sobre a forma e a duração do tratamento, bem como sobre a integralidade de seus dados pessoais;</li>
            <li><strong>Qualidade dos dados:</strong> garantia, aos titulares, de exatidão, clareza, relevância e atualização dos dados, de acordo com a necessidade e para o cumprimento da finalidade de seu tratamento;</li>
            <li><strong>Transparência:</strong> garantia, aos titulares, de informações claras, precisas e facilmente acessíveis sobre a realização do tratamento e os respectivos agentes de tratamento, observados os segredos comercial e industrial;</li>
            <li><strong>Segurança:</strong> utilização de medidas técnicas e administrativas aptas a proteger os dados pessoais de acessos não autorizados e de situações acidentais ou ilícitas de destruição, perda, alteração, comunicação ou difusão;</li>
            <li><strong>Prevenção:</strong> adoção de medidas para prevenir a ocorrência de danos em virtude do tratamento de dados pessoais;</li>
            <li><strong>Não discriminação:</strong> impossibilidade de realização do tratamento para fins discriminatórios ilícitos ou abusivos;</li>
            <li><strong>Responsabilização e prestação de contas:</strong> demonstração, pelo agente, da adoção de medidas eficazes e capazes de comprovar a observância e o cumprimento das normas de proteção de dados pessoais e, inclusive, da eficácia dessas medidas.</li>
          </ul>

          <h2>IV – COMO SÃO COLETADOS OS DADOS PESSOAIS</h2>
          <p>CBLG Advogados coleta os dados pessoais e dados pessoais sensíveis (em conjunto referidos nesta Política simplesmente como "dados pessoais") durante a prestação de serviços, contratação de pessoal ou contratação de prestadores de serviços e afins. Assim, a coleta de dados pode advir das seguintes fontes:</p>
          <ul>
            <li><strong>diretamente do titular:</strong> coleta de dados pessoais que o Titular fornece quando contrata serviços, de acordo com a finalidade específica desses, bem como por meio de acesso a processos administrativos e judiciais dos quais o titular seja parte;</li>
            <li><strong>coleta na contratação de pessoal;</strong></li>
            <li><strong>quando são firmados contratos com prestadores de serviços e parceiros, dentre outros;</strong></li>
            <li><strong>em casos específicos, poderá haver coleta de dados pessoais de incapazes e relativamente incapazes, como por exemplo, crianças, adolescentes, interditados e curatelados, fornecidos por seus pais ou responsáveis legais;</strong></li>
            <li><strong>via interação por meios digitais:</strong> através da interação no website de CBLG Advogados ou por outros canais poderão ser coletados dados pessoais sobre o Titular para a prestação de serviços;</li>
            <li><strong>por meio de terceiros:</strong> coleta de dados pessoais por meio de parceiros ou fornecedores. Neste caso, CBLG Advogados adota medidas para garantir que foram cumpridas as regras de privacidade e proteção de dados pessoais, dispostas na LGPD, incluindo a coleta de termo de consentimento quando necessário;</li>
            <li><strong>por meio de integração de sistemas:</strong> compartilhamos dados pessoais quando da utilização de sistemas de controle de processos e outros de uso corporativo, sempre observando as informações necessárias para a prestação de serviços.</li>
          </ul>

          <h2>V – TIPOS DE DADOS PESSOAIS COLETADOS E COMO SÃO UTILIZADOS</h2>
          <p>Durante a execução ou prestação de serviços, ou mesmo durante a navegação em seus sites, CBLG Advogados pode coletar alguns dados pessoais, tais como:</p>
          <ul>
            <li><strong>dados de identificação:</strong> nome, RG, CPF, idade, sexo, endereço de e-mail, endereço comercial/residencial, telefone, data de nascimento, estado civil, número da carteira do plano de saúde, filiação, telefone de contato, convênio médico, documentos para fins de identidade (documentos do conselho de classe, carteira nacional de habilitação, número do passaporte e outros documentos oficiais), fotografia e biometria;</li>
            <li><strong>dados financeiros:</strong> dados necessários a forma de pagamento ao titular, aqui incluindo pagamento em moeda corrente nacional, dados bancários, dentre outros;</li>
            <li><strong>dados de navegação:</strong> login e senha de acesso às estações de trabalho, conexões de rede e sistemas corporativos; endereço IP, tipo de navegador e idioma, horários de acesso e todas as demais informações de navegação realizadas em máquinas, sistemas ou conexões disponibilizadas por CBLG Advogados, sem distinção de conteúdo. Além disso, e prezando pela transparência, CBLG Advogados sinaliza que poderá eventualmente realizar coleta de cookies quando for acessado seu site, para melhor experiência do usuário;</li>
          </ul>

          <h2>VI – TRANSFERÊNCIA INTERNACIONAL DE DADOS</h2>
          <p>CBLG Advogados não aluga, vende e tampouco libera dados a terceiros com a finalidade de permitir qualquer comercialização de seus serviços, mas informa que seus dados poderão ser transferidos e mantidos em ambiente fora do seu município, estado ou país onde as leis de proteção de dados podem ser diferentes das vigentes no Brasil, mas assegura grau de proteção de dados pessoais adequado ao previsto na Lei Geral de Proteção de Dados (LGPD).</p>
          
          <p>CBLG Advogados adota todas as medidas razoavelmente necessárias para garantir que seus dados sejam tratados de forma confiável, segura e de acordo com esta Política de Privacidade.</p>

          <h2>VII – FUNDAMENTOS LEGAIS PARA O TRATAMENTO DOS DADOS PESSOAIS</h2>
          <p>Destacamos abaixo as hipóteses legais em que os dados pessoais poderão ser tratados, quando CBLG Advogados estiver na posição de Controlador, aplicando-se de acordo com a categoria dos dados (dados pessoais ou dados pessoais sensíveis):</p>
          <ul>
            <li>mediante o fornecimento de consentimento para acessar sistemas, portais e outras plataformas digitais mantidas por CBLG Advogados e receber informações sobre seus interesses;</li>
            <li>quando existentes legítimos interesses para tratamento de dados pessoais como no oferecimento e entrega de serviços, bem como para o funcionamento eficaz e lícito da operação de CBLG Advogados, desde que tais interesses não sejam superados pelos interesses, direitos e liberdades fundamentais;</li>
            <li>para o cumprimento de obrigações legais e regulatórias que podem exigir a coleta, armazenamento e compartilhamento dos dados pessoais e dados pessoais sensíveis do Titular, tais como manutenção de registros para fins fiscais ou fornecimento de informações a um órgão público ou entidade reguladora de leis/atividades do objeto social de CBLG Advogados e cumprimento de obrigações de combate à corrupção, lavagem de dinheiro, fraude e condutas irregulares;</li>
            <li>para executar eventual contrato, bem como para fornecer serviços ao destinatário final;</li>
            <li>para o exercício regular de direitos em contratos, processos judiciais, administrativos ou arbitrais;</li>
            <li>para proteção da vida ou da incolumidade física do titular;</li>
            <li>para proteção de crédito; para garantir prevenção à fraude e à segurança nos processos de identificação e autenticação de cadastro em sistemas eletrônicos;</li>
            <li>quando CBLG Advogados atuar na posição de Operador, a hipótese legal em que o modo pelo qual os dados pessoais serão tratados será definido pelo Controlador do dado pessoal.</li>
          </ul>

          <h2>VIII – COMPARTILHAMENTO DE DADOS PESSOAIS</h2>
          <p>No decorrer da operação, poderão ser compartilhados os dados pessoais dos Titulares com:</p>
          <ul>
            <li>– autoridades competentes (incluindo tribunais e autoridades que nos regulam);</li>
            <li>– empresas de tecnologia que fazem a gestão dos sistemas integrados ou responsáveis pelo armazenamento e garantia de segurança no tratamento de dados pessoais;</li>
            <li>– internamente, para áreas que necessitam ter acesso aos dados pessoais para cumprir alguma obrigação legal regulatória ou exercício regular de direitos.</li>
          </ul>
          
          <p>É assegurado que os dados pessoais eventualmente tratados serão compartilhados de forma ética e em linha com esta Política.</p>
          
          <p>Outros compartilhamentos podem ser realizados para finalidades lícitas, observadas as condições estabelecidas pela legislação vigente. Para informações detalhadas sobre os terceiros com os quais vierem a ser compartilhados dados pessoais, o titular poderá entrar em contato com o DPO/Encarregado, através do endereço constante nessa Política de Privacidade.</p>

          <h2>IX – DADOS DE CRIANÇAS E ADOLESCENTES</h2>
          <p>Durante a prestação de serviços, CBLG Advogados poderá coletar dados pessoais de crianças e adolescentes e garantirá que o tratamento sempre ocorra no melhor interesse da criança e do adolescente.</p>
          
          <p>O tratamento de dados pessoais de crianças será realizado mediante consentimento específico de pelo menos um de seus pais ou responsáveis legais. Em se tratando de adolescente, será realizado desde que esteja presente outro fundamento legal que autorize o tratamento, nos termos da LGPD. Em caso de urgência/emergência, a coleta e tratamento dos dados pessoais da criança será realizada imediatamente para proteção de sua vida e, posteriormente, será comunicado a um de seus pais ou responsável legal. Estas mesmas disposições serão aplicáveis aos dados pessoais de interditados e curatelados.</p>

          <h2>X – RETENÇÃO DE DADOS PESSOAIS</h2>
          <p>O nosso escritório armazena e mantem os dados pessoais dos Usuários de forma segura, em conformidade com a legislação aplicável e pelo período necessário ou permitido legalmente, em vista das finalidades para as quais os dados pessoais foram coletados, conforme exposto nesta Política de Privacidade e Proteção de Dados Pessoais.</p>
          
          <p>Os critérios utilizados para determinar os períodos de retenção incluem, mas não se limitam a: (i) duração do relacionamento com o titular dos dados; (ii) enquanto válido seu consentimento, nas hipóteses aplicáveis; (iii) diante de eventual obrigação legal ou regulatória que exija a manutenção dos dados pessoais; (iv) quando necessário para atividade ou serviços relevantes; e (v) para atender prazos prescricionais aplicáveis, conforme previsto em lei ou regulamento.</p>

          <h2>XI – PROTEÇÃO E SEGURANÇA DOS DADOS PESSOAIS</h2>
          <p>CBLG Advogados está comprometida com a proteção da privacidade e dos dados pessoais dos seus Usuários, Clientes, Colaboradores e Terceiros. Para isso, adota medidas de segurança técnicas e administrativas aptas a proteger os dados pessoais de acessos não autorizados e de situações acidentais ou ilícitas de destruição, perda, alteração, comunicação ou qualquer forma de tratamento inadequado ou ilícito, o que inclui, mas não se limita à:</p>
          <ul>
            <li>– limitação do acesso a dados pessoais por parte dos colaboradores, prestadores de serviços e visitantes, restringindo-os apenas nos limites da necessidade e finalidade de tratamento dos dados pessoais;</li>
            <li>– utilização de tecnologias concebidas para proteger os dados pessoais durante a sua transmissão, como encriptação dos dados e utilização de segurança adequada para proteger os dados pessoais recebidos.</li>
          </ul>
          
          <p>CBLG Advogados aplica processos e medidas para a detecção e resposta às tentativas de violação de sistemas. Todavia, não existe um método de transmissão pela Internet ou um método de armazenamento eletrônico que seja 100% seguro.</p>
          
          <p>CBLG Advogados adota todas as precauções necessárias e exigidas pelos órgãos competentes, embora não possa garantir a segurança absoluta dos dados pessoais a que tenha acesso.</p>
          
          <p>A Internet, enquanto fórum público, é navegada por muitos e, nesse sentido, é recomendado ao Usuário que tenha cautela ao divulgar informações online. Com algumas exceções, o próprio Titular dos dados pessoais é quem se encontra na melhor posição para proteger a si mesmo no ambiente virtual, adotando mediadas de segurança e seguindo orientações especificas de definição de senhas e sua guarda. Assim, o Usuário é responsável pela proteção do seu nome de usuário e senha contra o acesso de terceiros, assim como pela escolha de senhas seguras.</p>

          <h2>XII – PÁGINAS DE TERCEIROS</h2>
          <p>Através de seu website, CBLG Advogados poderá disponibilizar conexão para websites de terceiros, os quais estão sujeitos a Políticas de Privacidade independentes. Esta Política de Privacidade de dados e Uso de cookies não se aplica, necessariamente, a tais websites e não há responsabilidade do nosso escritório pela forma como os dados são tratados por parte dos referidos terceiros.</p>

          <h2>XIII – DIREITOS DOS USUÁRIOS</h2>
          <p>O Usuário possui direitos em relação aos seus dados pessoais, nos termos da LGPD. Para tanto, foram disponibilizadas informações adicionais de transparência na área de Privacidade para disponibilizar aos usuários o acesso livre e gratuito a esses direitos. Dentre os mencionados Direitos, tem-se o de:</p>
          <ul>
            <li>– confirmação de que há tratamento de seus dados pessoais;</li>
            <li>– acesso aos dados pessoais que são objeto de tratamento;</li>
            <li>– solicitação de alteração ou atualização de dados pessoais quando estiverem incorretos, incompletos ou inexatos;</li>
            <li>– solicitação para que os dados pessoais que o titular entenda como desnecessários, excessivos ou tratados em desconformidade com a LGPD sejam anonimizados, bloqueados ou eliminados, desde que permitido pela legislação/regulamentos que estejam relacionados ao objeto social de CBLG Advogados;</li>
            <li>– se opor ao tratamento de dados pessoais, quando não houver mais necessidade legítima ou legal de tratá-los;</li>
            <li>– solicitação da transmissão dos dados pessoais para outro fornecedor;</li>
            <li>– solicitação de informações das entidades públicas e privadas com as quais seus dados pessoais tiverem sido compartilhados;</li>
            <li>– revogação, a qualquer momento, do consentimento concedido, solicitando a eliminação dos dados pessoais tratados com base nesse consentimento, bem como de ter acesso a informações sobre a possibilidade de o Usuário não fornecer o consentimento e as respectivas consequências da negativa;</li>
            <li>– solicitação da revisão do tratamento de dados pessoais, com base em decisões automatizadas.</li>
          </ul>
          
          <p>Em caso de dúvidas, observações, solicitações ou reclamações sobre a coleta ou o uso de dados pessoais ou sobre esta Política de Privacidade e Proteção de Dados Pessoais, entre em contato através do e-mail recepcao@cblg.adv.br.</p>

          <h2>XIV – INCIDENTE DE SEGURANÇA QUE POSSA ACARRETAR RISCO OU DANO RELEVANTE AOS TITULARES</h2>
          <p>CBLG Advogados, diante um de incidente de segurança que possa acarretar risco ou dano relevante aos titulares, se compromete em comunicar aos Titulares, em prazo razoável:</p>
          <ul>
            <li>A descrição da natureza dos dados pessoais afetados;</li>
            <li>As informações sobre os titulares envolvidos;</li>
            <li>A indicação das medidas técnicas e de segurança utilizadas para a proteção dos dados, observados os segredos comercial e industrial;</li>
            <li>Os riscos relacionados ao incidente;</li>
            <li>Os motivos da demora, no caso de a comunicação não ter sido imediata; e</li>
            <li>As medidas que foram ou que serão adotadas para reverter ou mitigar os efeitos do prejuízo.</li>
          </ul>

          <h2>XV – COOKIES E TECNOLOGIAS SEMELHANTES</h2>
          <p>CBLG Advogados poderá receber e armazenar dados dos seus Usuários mediante a utilização de cookies.</p>
          
          <p>A maioria dos softwares de navegação está definida para aceitar cookies automaticamente, embora seja possível configurar o navegador para recusar todos os cookies, ou para indicar quando um cookie será enviado. Quando o cookie é aceito, em uma próxima visita ao nosso website o servidor de Internet reconhecerá o computador ou dispositivo móvel do usuário.</p>
          
          <p>O website poderá utilizar cookies persistentes e de sessão. Os cookies persistentes podem ser removidos seguindo as instruções do arquivo de ajuda do navegador de Internet do usuário.</p>
          
          <p>A finalidade de eventual uso dos Cookies pelo nosso escritório é a análise estatística da navegação, com o objetivo de melhorar a experiência de navegação dos usuários.</p>

          <h2>XVI – ALTERAÇÕES NESTA POLÍTICA DE PRIVACIDADE E PROTEÇÃO DE DADOS PESSOAIS</h2>
          <p>O teor da presente Política de Privacidade e Proteção de Dados Pessoais poderá ser modificado a qualquer tempo. Nesse sentido, recomendamos que o Titular reveja esta Política de tempos em tempos para se informar sobre como nosso escritório está protegendo suas informações.</p>
          
          <p>Todas as alterações serão comunicadas por meio de um aviso no site ou por meio de qualquer outra forma de comunicação com o Titular dos dados, sempre que for cabível e viável.</p>

          <h2>XVII – RECLAMAÇÕES, DÚVIDAS E/OU SOLICITAÇÕES</h2>
          <p>Se o Titular não estiver satisfeito com a maneira como são tratados os seus dados pessoais ou em caso de qualquer dúvida, reclamação, preocupação ou solicitações relacionadas a sua privacidade e proteção de seus dados pessoais, poderá entrar em contato com o DPO/Encarregado, mediante envio de e-mail para o endereço recepcao@cblg.adv.br</p>

          <div class="privacy-footer">
            <p><strong>Publicado em: 27.03.2023</strong></p>
          </div>
          </template>
          <template v-else>
          <h2>I – OUR PURPOSE</h2>
          <p>The law firm Castello Branco, Lobosco e Gama Advogados ("CBLG Advogados") adopts strict measures to protect the personal data of Data Subjects.</p>

          <p>Your privacy is important to us. It is CBLG Advogados' policy to respect your privacy regarding any information we may collect from you. We only request personal information when we truly need it to provide you with a service. We do so by fair and lawful means, with your knowledge and consent. We also tell you why we are collecting it and how it will be used. We only retain collected information for as long as necessary to provide the requested service. When we store data, we protect it within commercially acceptable means to prevent loss and theft, as well as unauthorized access, disclosure, copying, use or modification. We do not share personally identifiable information publicly or with third parties, except when required by law. Our website may link to external sites that are not operated by us. Please be aware that we have no control over the content and practices of these sites and cannot accept responsibility for their respective privacy policies. You are free to refuse our request for personal information, with the understanding that we may be unable to provide some of the desired services. Your continued use of our website will be regarded as acceptance of our practices regarding privacy and personal information. If you have any questions about how we handle user data and personal information, please contact us.</p>

          <p>Accordingly, we have established this Privacy and Personal Data Protection Policy, which expresses our commitment to processing Personal Data responsibly and ethically, in line with the principles and values that govern the legal profession and, in particular, in accordance with the rules of the Brazilian General Data Protection Law – "LGPD" (Law No. 13,709/2018) and other applicable legislation in force.</p>

          <p>In recognition of the ongoing and dynamic nature of changes in data processing, our firm undertakes to update this Privacy Policy periodically, whenever new privacy and personal data protection procedures are implemented.</p>

          <p>By browsing public or private pages linked to our law firm, the User agrees to the processing of their personal data as described in this Privacy and Personal Data Protection Policy.</p>

          <p>Should you have any questions about this Privacy and Personal Data Protection Policy, please contact us by phone at +55 11 3816-4001 or by email at recepcao@cblg.adv.br.</p>

          <h2>II – FOUNDATIONS</h2>
          <p>The rules on privacy and the use of cookies, based mainly on Article 2 of the General Data Protection Law, are founded on:</p>
          <ul>
            <li>Respect for privacy;</li>
            <li>Informational self-determination;</li>
            <li>Freedom of expression, information, communication and opinion;</li>
            <li>Inviolability of intimacy, honor and image;</li>
            <li>Economic and technological development and innovation;</li>
            <li>Free enterprise, free competition and consumer protection; and</li>
            <li>Human rights, the free development of personality, dignity and the exercise of citizenship by natural persons.</li>
          </ul>

          <h2>III – GENERAL PROCESSES</h2>
          <p>This Privacy and Personal Data Protection Policy sets out which personal data we collect, why we collect it, how, where and for how long we store it, and with whom we share it, where sharing occurs.</p>

          <p>This Privacy Policy also defines the rights of Data Subjects regarding their personal data and who may be contacted for further information or clarification on this subject.</p>

          <p>Our processing of personal data is guided by good faith and by the following principles:</p>
          <ul>
            <li><strong>Purpose:</strong> processing for legitimate, specific and explicit purposes disclosed to the data subject, with no possibility of further processing in a manner incompatible with those purposes;</li>
            <li><strong>Adequacy:</strong> compatibility of the processing with the purposes disclosed to the data subject, according to the context of the processing;</li>
            <li><strong>Necessity:</strong> limitation of processing to the minimum necessary to achieve its purposes, covering data that is relevant, proportionate and not excessive in relation to the purposes of the data processing;</li>
            <li><strong>Free access:</strong> assurance to data subjects of easy, free-of-charge consultation on the form and duration of the processing, as well as on the completeness of their personal data;</li>
            <li><strong>Data quality:</strong> assurance to data subjects of the accuracy, clarity, relevance and updating of the data, as necessary and to fulfill the purpose of its processing;</li>
            <li><strong>Transparency:</strong> assurance to data subjects of clear, accurate and easily accessible information about the processing and the respective processing agents, subject to commercial and industrial secrets;</li>
            <li><strong>Security:</strong> use of technical and administrative measures capable of protecting personal data from unauthorized access and from accidental or unlawful destruction, loss, alteration, communication or dissemination;</li>
            <li><strong>Prevention:</strong> adoption of measures to prevent damage arising from the processing of personal data;</li>
            <li><strong>Non-discrimination:</strong> impossibility of processing for unlawful or abusive discriminatory purposes;</li>
            <li><strong>Accountability:</strong> demonstration, by the agent, of the adoption of effective measures capable of proving observance of and compliance with personal data protection rules, including the effectiveness of such measures.</li>
          </ul>

          <h2>IV – HOW PERSONAL DATA IS COLLECTED</h2>
          <p>CBLG Advogados collects personal data and sensitive personal data (together referred to in this Policy simply as "personal data") in the course of providing services, hiring staff or engaging service providers and the like. Data may therefore be collected from the following sources:</p>
          <ul>
            <li><strong>directly from the data subject:</strong> collection of personal data that the Data Subject provides when engaging services, according to the specific purpose of those services, as well as through access to administrative and judicial proceedings to which the data subject is a party;</li>
            <li><strong>collection when hiring staff;</strong></li>
            <li><strong>when contracts are signed with service providers and partners, among others;</strong></li>
            <li><strong>in specific cases, personal data of persons lacking full legal capacity, such as children, adolescents and persons under guardianship or conservatorship, may be collected, as provided by their parents or legal guardians;</strong></li>
            <li><strong>via interaction through digital means:</strong> through interaction on the CBLG Advogados website or other channels, personal data about the Data Subject may be collected for the provision of services;</li>
            <li><strong>through third parties:</strong> collection of personal data through partners or suppliers. In this case, CBLG Advogados takes measures to ensure that the privacy and personal data protection rules set out in the LGPD have been complied with, including obtaining consent where necessary;</li>
            <li><strong>through systems integration:</strong> we share personal data when using case management systems and other corporate systems, always limited to the information necessary for the provision of services.</li>
          </ul>

          <h2>V – TYPES OF PERSONAL DATA COLLECTED AND HOW THEY ARE USED</h2>
          <p>During the performance or provision of services, or even while its websites are being browsed, CBLG Advogados may collect certain personal data, such as:</p>
          <ul>
            <li><strong>identification data:</strong> name, ID card (RG), taxpayer number (CPF), age, sex, email address, business/residential address, telephone, date of birth, marital status, health plan card number, parentage, contact telephone, health insurance, identity documents (professional council documents, driver's license, passport number and other official documents), photograph and biometrics;</li>
            <li><strong>financial data:</strong> data necessary for payments to the data subject, including payment in national currency, bank details, among others;</li>
            <li><strong>browsing data:</strong> login and password for access to workstations, network connections and corporate systems; IP address, browser type and language, access times and all other browsing information generated on machines, systems or connections provided by CBLG Advogados, regardless of content. In addition, and in the interest of transparency, CBLG Advogados notes that it may occasionally collect cookies when its website is accessed, to improve the user experience;</li>
          </ul>

          <h2>VI – INTERNATIONAL DATA TRANSFER</h2>
          <p>CBLG Advogados does not rent, sell or release data to third parties for the purpose of enabling any marketing of their services, but informs that your data may be transferred to and kept in environments outside your municipality, state or country, where data protection laws may differ from those in force in Brazil, while ensuring a level of personal data protection consistent with the General Data Protection Law (LGPD).</p>

          <p>CBLG Advogados takes all reasonably necessary measures to ensure that your data is processed reliably, securely and in accordance with this Privacy Policy.</p>

          <h2>VII – LEGAL BASES FOR PROCESSING PERSONAL DATA</h2>
          <p>Below are the legal bases on which personal data may be processed when CBLG Advogados acts as Controller, applied according to the category of data (personal data or sensitive personal data):</p>
          <ul>
            <li>upon consent to access systems, portals and other digital platforms maintained by CBLG Advogados and to receive information about your interests;</li>
            <li>when there are legitimate interests in processing personal data, such as offering and delivering services, and for the effective and lawful operation of CBLG Advogados, provided that such interests are not overridden by fundamental interests, rights and freedoms;</li>
            <li>to comply with legal and regulatory obligations that may require the collection, storage and sharing of the Data Subject's personal data and sensitive personal data, such as keeping records for tax purposes or providing information to a public body or authority regulating the laws/activities within the corporate purpose of CBLG Advogados, and complying with obligations to combat corruption, money laundering, fraud and misconduct;</li>
            <li>to perform a contract, as well as to provide services to the end recipient;</li>
            <li>for the regular exercise of rights in contracts and in judicial, administrative or arbitration proceedings;</li>
            <li>to protect the life or physical safety of the data subject;</li>
            <li>for credit protection; to ensure fraud prevention and security in identification and registration authentication processes in electronic systems;</li>
            <li>when CBLG Advogados acts as Processor, the legal basis and the manner in which personal data will be processed will be defined by the Controller of the personal data.</li>
          </ul>

          <h2>VIII – SHARING OF PERSONAL DATA</h2>
          <p>In the course of operations, Data Subjects' personal data may be shared with:</p>
          <ul>
            <li>– competent authorities (including courts and authorities that regulate us);</li>
            <li>– technology companies that manage integrated systems or are responsible for storing and ensuring security in the processing of personal data;</li>
            <li>– internally, with areas that need access to personal data to fulfill a legal or regulatory obligation or for the regular exercise of rights.</li>
          </ul>

          <p>We ensure that any personal data processed will be shared ethically and in line with this Policy.</p>

          <p>Other sharing may take place for lawful purposes, subject to the conditions established by applicable law. For detailed information about the third parties with whom personal data may be shared, the data subject may contact the DPO/Data Protection Officer at the address provided in this Privacy Policy.</p>

          <h2>IX – DATA OF CHILDREN AND ADOLESCENTS</h2>
          <p>In the course of providing services, CBLG Advogados may collect personal data of children and adolescents and will ensure that processing always takes place in the best interest of the child and adolescent.</p>

          <p>Personal data of children will be processed with the specific consent of at least one parent or legal guardian. For adolescents, processing will take place provided another legal basis authorizing it is present, under the LGPD. In urgent/emergency situations, the child's personal data will be collected and processed immediately to protect the child's life, and one parent or legal guardian will be notified afterwards. The same provisions apply to the personal data of persons under guardianship or conservatorship.</p>

          <h2>X – RETENTION OF PERSONAL DATA</h2>
          <p>Our firm stores and keeps Users' personal data securely, in compliance with applicable law and for the period necessary or legally permitted, in view of the purposes for which the personal data was collected, as set out in this Privacy and Personal Data Protection Policy.</p>

          <p>The criteria used to determine retention periods include, but are not limited to: (i) the duration of the relationship with the data subject; (ii) while consent remains valid, where applicable; (iii) any legal or regulatory obligation requiring the retention of personal data; (iv) when necessary for relevant activities or services; and (v) to meet applicable limitation periods, as provided by law or regulation.</p>

          <h2>XI – PROTECTION AND SECURITY OF PERSONAL DATA</h2>
          <p>CBLG Advogados is committed to protecting the privacy and personal data of its Users, Clients, Employees and Third Parties. To this end, it adopts technical and administrative security measures capable of protecting personal data from unauthorized access and from accidental or unlawful destruction, loss, alteration, communication or any form of inappropriate or unlawful processing, including but not limited to:</p>
          <ul>
            <li>– limiting access to personal data by employees, service providers and visitors strictly to what is necessary for the purpose of processing the personal data;</li>
            <li>– using technologies designed to protect personal data during transmission, such as data encryption and adequate security to protect the personal data received.</li>
          </ul>

          <p>CBLG Advogados applies processes and measures to detect and respond to attempted system breaches. However, no method of transmission over the Internet or method of electronic storage is 100% secure.</p>

          <p>CBLG Advogados takes all precautions necessary and required by the competent authorities, although it cannot guarantee the absolute security of the personal data to which it has access.</p>

          <p>The Internet, as a public forum, is browsed by many, and Users are therefore advised to exercise caution when disclosing information online. With some exceptions, Data Subjects are in the best position to protect themselves in the online environment, by adopting security measures and following specific guidance on creating and safeguarding passwords. Users are therefore responsible for protecting their username and password from third-party access, as well as for choosing secure passwords.</p>

          <h2>XII – THIRD-PARTY PAGES</h2>
          <p>Through its website, CBLG Advogados may provide links to third-party websites, which are subject to independent Privacy Policies. This Data Privacy and Cookie Use Policy does not necessarily apply to such websites, and our firm is not responsible for how data is processed by such third parties.</p>

          <h2>XIII – USERS' RIGHTS</h2>
          <p>Users have rights regarding their personal data under the LGPD. To that end, additional transparency information has been made available in the Privacy area to give users free and unrestricted access to these rights. These rights include:</p>
          <ul>
            <li>– confirmation that their personal data is being processed;</li>
            <li>– access to the personal data being processed;</li>
            <li>– requesting the correction or updating of personal data that is incorrect, incomplete or inaccurate;</li>
            <li>– requesting that personal data the data subject considers unnecessary, excessive or processed in breach of the LGPD be anonymized, blocked or deleted, provided this is permitted by the laws/regulations related to the corporate purpose of CBLG Advogados;</li>
            <li>– objecting to the processing of personal data when there is no longer a legitimate or legal need to process it;</li>
            <li>– requesting the transfer of personal data to another provider;</li>
            <li>– requesting information about the public and private entities with which their personal data has been shared;</li>
            <li>– revoking, at any time, consent previously given, requesting the deletion of personal data processed on the basis of that consent, as well as having access to information about the possibility of not providing consent and the consequences of refusal;</li>
            <li>– requesting a review of personal data processing based on automated decisions.</li>
          </ul>

          <p>For questions, comments, requests or complaints about the collection or use of personal data or about this Privacy and Personal Data Protection Policy, please contact us by email at recepcao@cblg.adv.br.</p>

          <h2>XIV – SECURITY INCIDENTS THAT MAY POSE A RISK OR RELEVANT HARM TO DATA SUBJECTS</h2>
          <p>In the event of a security incident that may pose a risk or relevant harm to data subjects, CBLG Advogados undertakes to notify Data Subjects, within a reasonable time, of:</p>
          <ul>
            <li>A description of the nature of the personal data affected;</li>
            <li>Information about the data subjects involved;</li>
            <li>The technical and security measures used to protect the data, subject to commercial and industrial secrets;</li>
            <li>The risks related to the incident;</li>
            <li>The reasons for the delay, if notification was not immediate; and</li>
            <li>The measures that have been or will be taken to reverse or mitigate the effects of the harm.</li>
          </ul>

          <h2>XV – COOKIES AND SIMILAR TECHNOLOGIES</h2>
          <p>CBLG Advogados may receive and store data from its Users through the use of cookies.</p>

          <p>Most browsers are set to accept cookies automatically, although it is possible to configure the browser to refuse all cookies or to indicate when a cookie is being sent. Once a cookie is accepted, on a subsequent visit to our website the web server will recognize the user's computer or mobile device.</p>

          <p>The website may use persistent and session cookies. Persistent cookies can be removed by following the instructions in the help file of the user's web browser.</p>

          <p>The purpose of any use of Cookies by our firm is the statistical analysis of browsing, in order to improve users' browsing experience.</p>

          <h2>XVI – CHANGES TO THIS PRIVACY AND PERSONAL DATA PROTECTION POLICY</h2>
          <p>The content of this Privacy and Personal Data Protection Policy may be modified at any time. We therefore recommend that Data Subjects review this Policy from time to time to stay informed about how our firm is protecting their information.</p>

          <p>All changes will be communicated through a notice on the website or through any other form of communication with the Data Subject, whenever appropriate and feasible.</p>

          <h2>XVII – COMPLAINTS, QUESTIONS AND/OR REQUESTS</h2>
          <p>If Data Subjects are not satisfied with the way their personal data is processed, or have any questions, complaints, concerns or requests related to their privacy and the protection of their personal data, they may contact the DPO/Data Protection Officer by sending an email to recepcao@cblg.adv.br</p>

          <div class="privacy-footer">
            <p><strong>Published on: March 27, 2023</strong></p>
          </div>
          </template>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-section">
            <img src="/logo-25-anos-white.png" alt="CBLG Advogados" class="footer-logo">
            <p>{{ t('footer.tagline') }}</p>
          </div>
          <div class="footer-section">
            <h4>{{ t('footer.quickLinks') }}</h4>
            <ul>
              <li><a href="/#sobre">{{ t('footer.about') }}</a></li>
              <li><a href="/#equipe">{{ t('footer.team') }}</a></li>
              <li><a href="/#areas">{{ t('footer.areas') }}</a></li>
              <li><a href="/blog">{{ t('footer.blog') }}</a></li>
            </ul>
          </div>
          <div class="footer-section">
            <h4>{{ t('footer.legal') }}</h4>
            <ul>
              <li><a href="/privacy-policy">{{ t('footer.privacy') }}</a></li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; 2025 Castello Branco, Lobosco & Gama Advogados. {{ t('footer.rights') }}</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import LanguageToggle from './LanguageToggle.vue'
import { locale, t } from './i18n.js'

const isScrolled = ref(false)
const isNavOpen = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.privacy-page {
  font-family: 'Roboto Mono', 'Montserrat', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
  overflow-x: hidden;
}

/* Navbar */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: transparent;
  backdrop-filter: none;
  transition: all 0.3s ease;
  padding: 1.25rem 0;
  border-bottom: none;
}

.navbar.scrolled {
  background: rgba(255, 255, 255, 0.96);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.08);
}

.nav-container {
  width: 100vw;
  margin: 0;
  padding: 0 2rem 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-logo {
  display: flex;
  align-items: center;
  text-decoration: none;
  margin-right: auto;
}

.logo-img {
  height: 56px;
  width: auto;
  transition: transform 0.3s ease;
}

.logo-img:hover {
  transform: scale(1.05);
}

.nav-links {
  display: flex;
  list-style: none;
  gap: 3.5rem;
  font-family: 'Roboto Mono', 'Montserrat', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-weight: 400;
  font-size: 1.15rem;
  margin-left: auto;
  padding-right: 2rem;
}

.nav-links a {
  color: #2c3e50;
  text-decoration: none;
  font-weight: 400;
  letter-spacing: 0.02em;
  transition: color 0.3s ease;
  position: relative;
}

.nav-links a::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 0;
  height: 2px;
  background: #c9a961;
  transition: width 0.3s ease;
}

.nav-links a:hover {
  color: #c9a961;
}
.navbar:not(.scrolled) .nav-links a { color: #fff; }
.navbar:not(.scrolled) .nav-links a:hover { color: #fff; }
.navbar:not(.scrolled) .nav-links a::after { background: #fff; }
.navbar:not(.scrolled) .nav-toggle { color: #fff; }
.navbar.scrolled .nav-links a { color: #2c3e50; }
.navbar.scrolled .nav-links a:hover { color: #c9a961; }
.navbar.scrolled .nav-links a::after { background: #c9a961; }

.nav-links a:hover::after {
  width: 100%;
}

.nav-toggle {
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #2c3e50;
  cursor: pointer;
}

/* Hero Section */
.privacy-hero {
  background-image: url('/background-fachada.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  padding: 8rem 0 4rem;
  text-align: center;
  color: white;
  position: relative;
  overflow: hidden;
}

.privacy-hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, rgba(255,255,255,0.0), rgba(255,255,255,0.0));
}

.privacy-hero .container {
  position: relative;
  z-index: 2;
}

.privacy-title {
  font-family: 'Roboto Mono', 'Montserrat', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  letter-spacing: 1px;
  color: #2c3e50;
  animation: fadeInUp 1s ease;
}

.privacy-subtitle {
  font-size: 1.3rem;
  font-weight: 400;
  opacity: 0.9;
  letter-spacing: 0.5px;
  color: #2c3e50;
  animation: fadeInUp 1s ease 0.2s both;
}

/* Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Content Section */
.privacy-content {
  padding: 4rem 0;
  background: #ffffff;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.privacy-text {
  max-width: 900px;
  margin: 0 auto;
  line-height: 1.8;
}

.privacy-text h2 {
  font-family: 'Roboto Mono', 'Montserrat', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 1.8rem;
  color: #2c3e50;
  margin: 3rem 0 1.5rem 0;
  font-weight: 600;
  letter-spacing: 0.5px;
  position: relative;
  padding-bottom: 1rem;
}

.privacy-text h2::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 80px;
  height: 3px;
  background: #c9a961;
  border-radius: 2px;
}

.privacy-text p {
  color: #4a5568;
  margin-bottom: 1.5rem;
  font-size: 1rem;
  text-align: justify;
}

.privacy-text ul {
  margin: 1.5rem 0;
  padding-left: 2rem;
}

.privacy-text li {
  color: #4a5568;
  margin-bottom: 0.8rem;
  font-size: 1rem;
  line-height: 1.6;
}

.privacy-text strong {
  color: #2c3e50;
  font-weight: 600;
}

.privacy-footer {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 2px solid #e2e8f0;
  text-align: center;
}

.privacy-footer p {
  color: #2c3e50;
  font-weight: 600;
  margin: 0;
}

/* Footer */
.footer {
  background: #2c3e50;
  color: #fff;
  padding: 3rem 0 1rem;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3rem;
  margin-bottom: 2rem;
}

.footer-logo {
  max-width: 250px;
  width: 100%;
  height: auto;
  margin-bottom: 1rem;
  opacity: 0.9;
}

.footer-section h4 {
  margin-bottom: 1rem;
  color: #c9a961;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 1rem;
}

.footer-section p {
  color: #bdc3c7;
  line-height: 1.6;
  font-size: 0.95rem;
}

.footer-section ul {
  list-style: none;
}

.footer-section ul li {
  margin-bottom: 0.5rem;
}

.footer-section ul li a {
  color: #bdc3c7;
  text-decoration: none;
  transition: color 0.3s ease;
  font-size: 0.95rem;
}

.footer-section ul li a:hover {
  color: #c9a961;
}

.footer-bottom {
  text-align: center;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: #cbd5e0;
}

/* Responsive Design */
@media (max-width: 768px) {
  .navbar { 
    padding: 0.5rem 0;
  }
  
  .nav-container {
    padding: 0 0.75rem;
    justify-content: space-between;
  }

  .nav-toggle {
    display: block;
    order: 2;
  }

  .nav-links {
    position: absolute;
    top: 64px;
    right: 1rem;
    background: #ffffff;
    border: 1px solid rgba(0,0,0,0.06);
    border-radius: 6px;
    padding: 0.75rem 1rem;
    flex-direction: column;
    gap: 0.5rem;
    box-shadow: 0 10px 25px rgba(0,0,0,0.1);
    display: none;
    align-items: flex-end;
  }

  .nav-links.open {
    display: flex;
  }

  .nav-links a {
    color: #2c3e50 !important;
    text-align: right;
    padding: 0.5rem 0;
    width: auto;
  }

  .nav-links a:hover {
    color: #c9a961 !important;
  }

  .logo-img {
    height: 44px;
    order: 1;
  }

  .privacy-title {
    font-size: 2.5rem;
  }

  .privacy-subtitle {
    font-size: 1.1rem;
  }

  .privacy-text h2 {
    font-size: 1.5rem;
  }

  .footer-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}

@media (max-width: 480px) {
  .logo-img {
    height: 35px;
  }

  .privacy-title {
    font-size: 2rem;
  }

  .privacy-subtitle {
    font-size: 1rem;
  }

  .privacy-text h2 {
    font-size: 1.3rem;
  }

  .nav-links {
    right: 0.5rem;
    padding: 0.5rem 0.75rem;
  }
}
</style>

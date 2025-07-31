// Define o perfil padrão como "Main"
const perfilAtivoInicial = localStorage.getItem("perfilAtivo") || "Main";
localStorage.setItem("perfilAtivo", perfilAtivoInicial);

// Define os perfis com dados armazenados no localStorage
const perfis = {
  Joaquim: {
    nome: "Joaquim",
    bio: localStorage.getItem("bioJoaquim") || "O Criador e Investidor",
    nivel: parseInt(localStorage.getItem("nivelJoaquim")) || 1,
    xp: parseInt(localStorage.getItem("xpJoaquim")) || 0,
    notesLer: localStorage.getItem("notes-ler-Joaquim") || "",
    musicPlaceNotes1: localStorage.getItem("musicPlaceNotes1-Joaquim") || "",
    gymNotes: localStorage.getItem("gymNotes-Joaquim") || "",
    complaints: JSON.parse(localStorage.getItem("complaints-Joaquim")) || [],
    notas: localStorage.getItem("notas-Joaquim") || "",
    pagarNotas: localStorage.getItem("pagarNotas-Joaquim") || "",
    gameNotes: localStorage.getItem("gameNotes-Joaquim") || "",
    
    // 🆕 Novos campos adicionados:
    programados: localStorage.getItem("programados-Joaquim") || "",
    anotacoes: localStorage.getItem("anotacoes-Joaquim") || "",
    anotacoes2: localStorage.getItem("anotacoes2-Joaquim") || "",
    anotacoes3: localStorage.getItem("anotacoes3-Joaquim") || "",
    metas: localStorage.getItem("metas-Joaquim") || ""
  },
  Vitoria: {
    nome: "Vitória",
    bio: localStorage.getItem("bioVitoria") || "Irmã mais nova",
    nivel: parseInt(localStorage.getItem("nivelVitoria")) || 1,
    xp: parseInt(localStorage.getItem("xpVitoria")) || 0,
    notesLer: localStorage.getItem("notes-ler-Vitoria") || "",
    musicPlaceNotes1: localStorage.getItem("musicPlaceNotes1-Vitoria") || "",
    gymNotes: localStorage.getItem("gymNotes-Vitoria") || "",
    complaints: JSON.parse(localStorage.getItem("complaints-Vitoria")) || [],
    notas: localStorage.getItem("notas-Vitoria") || "",
    pagarNotas: localStorage.getItem("pagarNotas-Vitoria") || "",
    gameNotes: localStorage.getItem("gameNotes-Vitoria") || "",

    // 🆕 Novos campos
    programados: localStorage.getItem("programados-Vitoria") || "",
    anotacoes: localStorage.getItem("anotacoes-Vitoria") || "",
    anotacoes2: localStorage.getItem("anotacoes2-Vitoria") || "",
    anotacoes3: localStorage.getItem("anotacoes3-Vitoria") || "",
    metas: localStorage.getItem("metas-Vitoria") || ""
  },
  Main: {
    nome: "Main",
    bio: localStorage.getItem("bioMain") || "Perfil principal",
    nivel: parseInt(localStorage.getItem("nivelMain")) || 1,
    xp: parseInt(localStorage.getItem("xpMain")) || 0,
    notesLer: localStorage.getItem("notes-ler-Main") || "",
    musicPlaceNotes1: localStorage.getItem("musicPlaceNotes1-Main") || "",
    gymNotes: localStorage.getItem("gymNotes-Main") || "",
    complaints: JSON.parse(localStorage.getItem("complaints-Main")) || [],
    notas: localStorage.getItem("notas-Main") || "",
    pagarNotas: localStorage.getItem("pagarNotas-Main") || "",
    gameNotes: localStorage.getItem("gameNotes-Main") || "",

    // 🆕 Novos campos
    programados: localStorage.getItem("programados-Main") || "",
    anotacoes: localStorage.getItem("anotacoes-Main") || "",
    anotacoes2: localStorage.getItem("anotacoes2-Main") || "",
    anotacoes3: localStorage.getItem("anotacoes3-Main") || "",
    metas: localStorage.getItem("metas-Main") || ""
  }
};

let perfilAtivo = perfilAtivoInicial;

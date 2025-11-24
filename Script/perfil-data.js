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
    metas: localStorage.getItem("metas-Joaquim") || "",

    // 🆕 Campos file1 e file2
    file1: localStorage.getItem("file1-Joaquim") || "",
    file2: localStorage.getItem("file2-Joaquim") || ""
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
    metas: localStorage.getItem("metas-Main") || "",
  }
};

let perfilAtivo = perfilAtivoInicial;

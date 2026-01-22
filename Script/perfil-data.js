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
    notas: localStorage.getItem("notas-Joaquim") || "",
    programados: localStorage.getItem("programados-Joaquim") || "",
    anotacoes: localStorage.getItem("anotacoes-Joaquim") || "",
    squadFiles: localStorage.getItem("squadFiles-Joaquim") || "",
    complaints: JSON.parse(localStorage.getItem("complaints-Joaquim")) || [],
  },
  Main: {
    nome: "Main",
    bio: localStorage.getItem("bioMain") || "Perfil principal",
    nivel: parseInt(localStorage.getItem("nivelMain")) || 1,
    xp: parseInt(localStorage.getItem("xpMain")) || 0,
    notesLer: localStorage.getItem("notes-ler-Main") || "",
    musicPlaceNotes1: localStorage.getItem("musicPlaceNotes1-Main") || "",
    gymNotes: localStorage.getItem("gymNotes-Main") || "",
    notas: localStorage.getItem("notas-Main") || "",
    programados: localStorage.getItem("programados-Main") || "",
    anotacoes: localStorage.getItem("anotacoes-Main") || "",
    complaints: JSON.parse(localStorage.getItem("complaints-Main")) || [],
  }
};

let perfilAtivo = perfilAtivoInicial;
